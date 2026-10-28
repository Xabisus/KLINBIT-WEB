# Klinbit · Web

Web de **Klinbit**, consultoría de sostenibilidad para festivales y eventos culturales.
El objetivo de la página es que un director de festival o una promotora pida una reunión.

Sitio **estático**: HTML, CSS y JavaScript sin dependencias ni compilación. Fuentes, imágenes y
scripts son locales (no se carga nada de CDNs externos).

La única pieza de servidor es `contacto.php` (formulario). Si el sitio se sirve sin PHP, por ejemplo
en GitHub Pages, el formulario sigue funcionando: abre el correo del visitante con el mensaje redactado.

## Estructura de carpetas

```
/
├── index.html            Página principal (semántica, un comentario por sección)
├── contacto.php          Recibe el formulario y envía el correo a contacto@klinbit.es (necesita PHP)
├── .htaccess             Apache (Hostinger): HTTPS, sin www, caché, seguridad, archivos protegidos
├── aviso-legal.html      Página legal (pendiente de texto definitivo)
├── privacidad.html       Página legal (pendiente de texto definitivo)
├── cookies.html          Página legal (pendiente de texto definitivo)
├── css/
│   └── styles.css        Todos los estilos: tokens → base → componentes → secciones → responsive
├── js/
│   └── script.js         Todo el JavaScript, en 4 módulos (pruebas, render, interfaz, escenas de scroll)
├── images/               Logotipos e ilustraciones (WebP)
├── fonts/                Archivo Black y Bricolage Grotesque (WOFF2, subconjunto latino)
├── icons/                Favicon
├── videos/               (vacía) para vídeos futuros
├── assets/
│   ├── models/           (vacía) para modelos 3D futuros
│   └── textures/         (vacía) para texturas futuras
├── .nojekyll             Evita que GitHub Pages procese el sitio con Jekyll
└── README.md
```

Las carpetas vacías llevan un `.gitkeep` para que Git las conserve.

## Ejecutar en local

Abre `index.html` directamente en el navegador, o sirve la carpeta (recomendado):

```bash
python3 -m http.server 8000
```

Y entra en <http://localhost:8000>. Con Node.js también vale `npx serve`.

## Publicar en Hostinger (recomendado: incluye el formulario)

El sitio se sirve desde el hosting de Hostinger y se despliega solo cada vez que se sube un cambio a GitHub.

1. **Vaciar `public_html`.** En hPanel: *Websites → klinbit.es → Manage → File Manager*. Haz copia de lo que hubiera y borra su contenido (el despliegue por Git exige la carpeta vacía).
2. **Conectar el repositorio.** *Advanced → Git*:
   - Repository: `https://github.com/Xabisus/KLINBIT-WEB.git`
   - Branch: `main`
   - Install path: vacío (= `public_html`)
   - Pulsa **Create** y después **Deploy**.
3. **Despliegue automático.** En la misma pantalla de Git, copia la **Webhook URL**. En GitHub: *Settings → Webhooks → Add webhook*, pega la URL en *Payload URL*, *Content type* `application/json`, evento **Just the push event**. Desde entonces, cada `git push` publica la web.
4. **HTTPS.** *Security → SSL*: comprueba que el certificado de `klinbit.es` está activo (gratuito). El `.htaccess` redirige a HTTPS y quita el `www`.
5. **Correo.** *Emails → Email deliverability* (o *DNS Zone*): los registros SPF y DKIM de `klinbit.es` deben aparecer como correctos, para que los avisos del formulario no acaben en spam.
6. **Probar.** Abre `https://klinbit.es`, rellena el formulario y comprueba que llega a `contacto@klinbit.es`.

El dominio debe apuntar al hosting de Hostinger (es lo normal si lo compraste allí). **No actives GitHub Pages ni añadas un `CNAME`** en este repositorio: un dominio solo puede servir un sitio.

## Publicar en GitHub Pages (alternativa sin PHP)

Sirve para una vista previa. El formulario usa entonces la alternativa de abrir el correo del visitante.

1. Sube el contenido de esta carpeta a un repositorio de GitHub (rama `main`, `index.html` en la raíz).
2. En el repositorio: **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**, rama **main** y carpeta **/ (root)**. Guarda.
4. En uno o dos minutos la web estará en `https://<usuario>.github.io/<repositorio>/`.

Todas las rutas son relativas, por lo que funciona igual en `usuario.github.io/repositorio/` que en un dominio propio.
Para un dominio propio, añade un archivo `CNAME` con el dominio y configúralo en *Settings → Pages*.

## Qué hay que completar

| Qué | Dónde |
|---|---|
| Textos legales definitivos | `aviso-legal.html`, `privacidad.html`, `cookies.html` (ahora son páginas provisionales) |
| Destino del formulario | `DESTINO` y `REMITENTE` al principio de `contacto.php`. El remitente debe ser un buzón del mismo dominio |
| Caso de estudio, logos de clientes y equipo con foto | Datos al principio de `js/script.js` (módulo 1/4); las secciones se activan solas al rellenarlos |
| Analítica (GA4 / GTM) | Cárgala solo al recibir el evento `klinbit:consent` o si `KLINBIT_CONSENT.analytics` es `true`. Sin consentimiento no se envía nada |

## Tipografías

Archivo Black y Bricolage Grotesque, ambas con licencia SIL Open Font License.
