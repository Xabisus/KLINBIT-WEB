# Klinbit · Web

Web de **Klinbit**, consultoría de sostenibilidad para festivales y eventos culturales.
El objetivo de la página es que un director de festival o una promotora pida una reunión.

Sitio **estático**: HTML, CSS y JavaScript sin dependencias ni compilación. Fuentes, imágenes y
scripts son locales (no se carga nada de CDNs externos).

Se publica en GitHub Pages. `contacto.php` y `.htaccess` solo se usan si algún día se pasa a un
hosting con PHP; en GitHub Pages el formulario abre el correo del visitante con el mensaje redactado.

## Estructura de carpetas

```
/
├── index.html            Página principal (semántica, un comentario por sección)
├── CNAME                 Dominio personalizado para GitHub Pages (klinbit.es)
├── contacto.php          (opcional) Envío del formulario por PHP; solo con hosting PHP
├── .htaccess             (opcional) Apache: solo con hosting; GitHub Pages lo ignora
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

## Publicar en GitHub Pages con el dominio klinbit.es

El dominio y el correo están en Hostinger; la web se sirve desde GitHub Pages (el archivo `CNAME` ya indica `klinbit.es`).

1. **Activar Pages.** En GitHub: *Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`*.
2. **Apuntar el dominio.** En Hostinger: *Dominios → klinbit.es → DNS / Nameservers → Registros DNS*. Deja los nameservers como están y crea:

   | Tipo | Nombre | Valor |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `xabisus.github.io` |

   Borra antes los registros `A` de `@` y el `CNAME`/`A` de `www` que apunten a otro sitio. **No toques los registros `MX` ni los `TXT` (SPF, DKIM, DMARC)**: son los del correo.
3. **Dominio personalizado.** En *Settings → Pages → Custom domain* escribe `klinbit.es` y guarda. Cuando GitHub verifique el DNS (minutos u horas), marca **Enforce HTTPS**.

El formulario, sin PHP, abre el correo del visitante con el mensaje redactado.

## Alternativa: hosting con PHP en Hostinger

Solo si se contrata un plan de hosting. Permite que el formulario envíe el correo directamente (pon `formEndpoint: 'contacto.php'` en `js/script.js`). El sitio se despliega solo cada vez que se sube un cambio a GitHub.

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

## Qué hay que completar

| Qué | Dónde |
|---|---|
| Textos legales definitivos | `aviso-legal.html`, `privacidad.html`, `cookies.html` (ahora son páginas provisionales) |
| Envío directo del formulario (opcional) | Solo con hosting PHP: `formEndpoint` en `js/script.js` y `DESTINO`/`REMITENTE` en `contacto.php` |
| Caso de estudio, logos de clientes y equipo con foto | Datos al principio de `js/script.js` (módulo 1/4); las secciones se activan solas al rellenarlos |
| Analítica (GA4 / GTM) | Cárgala solo al recibir el evento `klinbit:consent` o si `KLINBIT_CONSENT.analytics` es `true`. Sin consentimiento no se envía nada |

## Tipografías

Archivo Black y Bricolage Grotesque, ambas con licencia SIL Open Font License.
