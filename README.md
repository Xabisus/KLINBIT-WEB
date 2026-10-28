# Klinbit · Web

Web de **Klinbit**, consultoría de sostenibilidad para festivales y eventos culturales.
El objetivo de la página es que un director de festival o una promotora pida una reunión.

Sitio **estático**: HTML, CSS y JavaScript sin dependencias ni compilación. Fuentes, imágenes y
scripts son locales (no se carga nada de CDNs externos).

Se publica en GitHub Pages; no necesita servidor propio.

## Estructura de carpetas

```
/
├── index.html            Página principal (semántica, un comentario por sección)
├── CNAME                 Dominio personalizado para GitHub Pages (klinbit.es)
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

Cada cambio que se sube a `main` se publica solo en uno o dos minutos.

## Formulario de contacto (Web3Forms)

El formulario envía el mensaje a [Web3Forms](https://web3forms.com), que lo reenvía por correo a `contacto@klinbit.es`. No hace falta servidor.

1. En web3forms.com, *Create your Access Key* con el correo `contacto@klinbit.es`. La clave llega a ese buzón.
2. Pégala en `web3formsKey` al principio de `js/script.js` (módulo 3/4). La clave es pública por diseño: solo permite enviar mensajes a ese correo.
3. Sube el cambio a GitHub; la web se actualiza sola.

Mientras `web3formsKey` esté vacía, o si el servicio falla o está bloqueado, el formulario abre el correo del visitante con el mensaje ya redactado, así que nunca se pierde una solicitud.

Web3Forms procesa los datos del formulario: hay que mencionarlo en la política de privacidad.

## Qué hay que completar

| Qué | Dónde |
|---|---|
| Textos legales definitivos | `aviso-legal.html`, `privacidad.html`, `cookies.html` (ahora son páginas provisionales) |
| Clave de Web3Forms | `web3formsKey` en `js/script.js` (ver «Formulario de contacto») |
| Caso de estudio, logos de clientes y equipo con foto | Datos al principio de `js/script.js` (módulo 1/4); las secciones se activan solas al rellenarlos |
| Analítica (GA4 / GTM) | Cárgala solo al recibir el evento `klinbit:consent` o si `KLINBIT_CONSENT.analytics` es `true`. Sin consentimiento no se envía nada |

## Tipografías

Archivo Black y Bricolage Grotesque, ambas con licencia SIL Open Font License.
