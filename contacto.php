<?php
/**
 * Klinbit · Envío del formulario de contacto
 * --------------------------------------------------------------------------
 * Recibe el POST de index.html y envía un correo a contacto@klinbit.es.
 * Responde siempre en JSON: { "ok": true } o { "ok": false, "error": "..." }.
 *
 * Pensado para el hosting de Hostinger (PHP 8+). No necesita librerías ni
 * credenciales: usa mail() con un remitente del propio dominio, que Hostinger
 * firma con SPF/DKIM. Si el sitio se sirve sin PHP (p. ej. GitHub Pages),
 * el JavaScript detecta el fallo y abre el correo del visitante como alternativa.
 */
declare(strict_types=1);

const DESTINO      = 'contacto@klinbit.es';
const REMITENTE    = 'contacto@klinbit.es';   // debe ser un buzón del mismo dominio
const MAX_POR_HORA = 5;                       // envíos por IP y hora

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function responder(int $codigo, array $datos): never
{
    http_response_code($codigo);
    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    exit;
}

/** Texto de una sola línea (sin saltos que permitan inyectar cabeceras). */
function linea(mixed $v, int $max): string
{
    $v = trim((string) preg_replace('/\s+/u', ' ', (string) $v));
    return mb_substr($v, 0, $max);
}

/** Limita los envíos por IP guardando marcas de tiempo en la carpeta temporal. */
function limiteSuperado(): bool
{
    $archivo = sys_get_temp_dir() . '/klinbit_rl_' . hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'desconocida');
    $ahora   = time();
    $marcas  = [];
    if (is_file($archivo)) {
        $marcas = array_values(array_filter(
            array_map('intval', file($archivo, FILE_IGNORE_NEW_LINES) ?: []),
            static fn(int $t): bool => $t > $ahora - 3600
        ));
    }
    if (count($marcas) >= MAX_POR_HORA) {
        return true;
    }
    $marcas[] = $ahora;
    @file_put_contents($archivo, implode("\n", $marcas), LOCK_EX);
    return false;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    responder(405, ['ok' => false, 'error' => 'Método no permitido.']);
}

// Solo se acepta desde el propio sitio (el navegador envía Origin en los POST)
$origen = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origen !== '') {
    $hostOrigen = (string) parse_url($origen, PHP_URL_HOST);
    $hostSitio  = (string) preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? '');
    if ($hostOrigen === '' || strcasecmp($hostOrigen, $hostSitio) !== 0) {
        responder(403, ['ok' => false, 'error' => 'Origen no permitido.']);
    }
}

// Campo trampa: las personas no lo ven; los bots lo rellenan. Se responde "ok" sin enviar nada.
if (!empty($_POST['web'])) {
    responder(200, ['ok' => true]);
}

$nombre  = linea($_POST['nombre'] ?? '', 120);
$evento  = linea($_POST['evento'] ?? '', 160);
$email   = linea($_POST['email'] ?? '', 254);
$mensaje = mb_substr(trim(str_replace("\r", '', (string) ($_POST['mensaje'] ?? ''))), 0, 3000);

if ($nombre === '' || $evento === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(400, ['ok' => false, 'error' => 'Faltan tu nombre, el festival o un email válido.']);
}
if (empty($_POST['privacidad'])) {
    responder(400, ['ok' => false, 'error' => 'Para continuar, acepta la política de privacidad.']);
}
if (limiteSuperado()) {
    responder(429, ['ok' => false, 'error' => 'Demasiados envíos seguidos. Inténtalo de nuevo más tarde.']);
}

$asunto = 'Reunión · ' . $evento;
$cuerpo = implode("\n", [
    'Nueva solicitud de reunión desde la web de Klinbit.',
    '',
    'Nombre: ' . $nombre,
    'Festival / evento: ' . $evento,
    'Email: ' . $email,
    '',
    $mensaje !== '' ? "Mensaje:\n" . $mensaje : '(Sin mensaje)',
    '',
]);
$cabeceras = [
    'From'                      => 'Web Klinbit <' . REMITENTE . '>',
    'Reply-To'                  => $email,                       // responder llega a quien escribe
    'MIME-Version'              => '1.0',
    'Content-Type'              => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit',
    'X-Mailer'                  => 'klinbit-web',
];

// KLINBIT_DRY_RUN=1 solo se usa en pruebas locales: valida todo y no envía.
if (getenv('KLINBIT_DRY_RUN') === '1') {
    responder(200, ['ok' => true, 'dry' => true]);
}

$enviado = mail(DESTINO, '=?UTF-8?B?' . base64_encode($asunto) . '?=', $cuerpo, $cabeceras);
if (!$enviado) {
    responder(500, ['ok' => false, 'error' => 'No hemos podido enviarlo.']);
}
responder(200, ['ok' => true]);
