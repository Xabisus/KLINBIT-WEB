# Klinbit · Web

Web de **Klinbit**, consultoría de sostenibilidad para festivales y eventos culturales.
El objetivo de la página es que un director de festival o una promotora pida una reunión.

Sitio **100 % estático**: HTML, CSS y JavaScript sin dependencias, sin compilación y sin servidor.
Fuentes, imágenes y scripts son locales (no se carga nada de CDNs externos), así que funciona
sin conexión y es compatible con GitHub Pages tal cual.

## Estructura de carpetas

```
/
├── index.html            Página principal (semántica, un comentario por sección)
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

## Publicar en GitHub Pages

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
| Recibir el formulario sin abrir el correo del visitante | `formEndpoint` en `js/script.js` (módulo 3/4): Formspree, Getform, backend propio… |
| Caso de estudio, logos de clientes y equipo con foto | Datos al principio de `js/script.js` (módulo 1/4); las secciones se activan solas al rellenarlos |
| Analítica (GA4 / GTM) | Cárgala solo al recibir el evento `klinbit:consent` o si `KLINBIT_CONSENT.analytics` es `true`. Sin consentimiento no se envía nada |

## Tipografías

Archivo Black y Bricolage Grotesque, ambas con licencia SIL Open Font License.
