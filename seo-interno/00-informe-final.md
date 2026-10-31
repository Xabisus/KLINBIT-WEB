# Informe final · SEO Klinbit (31-10-2026)

Rama de trabajo: `claude/bold-mendel-uaoykh`. **Nada está en producción**: GitHub Pages publica desde `main`; tú decides cuándo fusionar.

## A. TRABAJO REALIZADO
| Archivo | Qué se hizo |
|---|---|
| `index.html` | Title y meta description con términos de búsqueda; robots, canonical, Open Graph completo (+imagen), Twitter Card; JSON-LD (Organization, WebSite, ProfessionalService con `areaServed` España/País Vasco/Navarra, FAQPage); preload y `srcset` de la imagen LCP; keywords en el párrafo de apertura (H1 intacto); pregunta nueva «¿En qué zonas trabajáis?»; enlaces internos a servicios (FAQ y pie) |
| `huella-de-carbono-festivales/index.html` | **Nueva.** Intención: medir/calcular huella. Solo contenido ya presente en la web + definición estándar de alcances GHG |
| `estrategia-sostenibilidad-eventos/index.html` | **Nueva.** Intención: plan de reducción/sostenibilidad |
| `comunicacion-ambiental-festivales/index.html` | **Nueva.** Intención: comunicar sin greenwashing (Directiva 2024/825) |
| `css/styles.css` | Estilos de páginas de servicio y de textos legales con los mismos tokens (colores, tipografías, botones). Home sin cambios visuales |
| `js/script.js` | Cargador GA4/GTM tras consentimiento (IDs vacíos); eventos `email_click`, `phone_click`, `outbound_click`, `generate_lead`; corregido posible doble envío gtag + dataLayer |
| `robots.txt`, `sitemap.xml`, `404.html` | **Nuevos** |
| `images/og-klinbit.jpg`, `dj-publico-800/1200.webp` | **Nuevas**: imagen social 1200×630 y variantes responsive del hero (−66 % el peso en móvil) |
| `aviso-legal.html`, `privacidad.html`, `cookies.html` | Texto legal de gakotc.com trasladado en castellano, íntegro. Solo se corrigieron un fragmento en euskera y un correo que faltaba en su versión en castellano |
| `README.md` | Estructura y pendientes actualizados |
| `seo-interno/*.md` | Auditoría, palabras clave, contenidos, link building, GBP, analítica |

**Verificado:** JSON-LD válido en todas las páginas; 0 enlaces/anclas/recursos rotos; sin errores de consola (Playwright, escritorio y móvil); capturas revisadas. **No verificado:** Rich Results Test y PageSpeed (requieren la URL publicada).

## B. TAREAS QUE DEBO HACER YO
1. **Revisar y fusionar** la rama a `main` cuando estés conforme (GitHub → Pull requests → *New pull request*). Pages publica en 1-2 min.
2. **Search Console**: <https://search.google.com/search-console> → *Añadir propiedad* → **Dominio** `klinbit.es` → copia el registro TXT → Hostinger → Dominios → klinbit.es → DNS → añadir TXT en `@` (no toques MX/TXT de correo) → *Verificar*. Luego *Sitemaps* → escribe `sitemap.xml` → *Enviar*. Después *Inspección de URLs* → pega cada URL nueva → *Solicitar indexación*.
3. **GA4**: <https://analytics.google.com> → *Administrar* → *Crear cuenta/propiedad* → *Flujos de datos* → *Web* → `https://klinbit.es` → copia el **ID de medición** `G-…` y pásamelo (o pégalo en `ga4Id` de `js/script.js`). Luego *Eventos* → marca `generate_lead` como **evento clave**.
4. **GTM (opcional)**: <https://tagmanager.google.com> → crear contenedor Web → copia `GTM-…`; usar uno de los dos, no ambos.
5. **Bing Webmaster Tools** (opcional): <https://www.bing.com/webmasters> → importar desde Search Console.
6. **Google Business Profile**: sigue `seo-interno/05-google-business-profile.md`.
7. **Confirmar con Gako** los textos legales (ver C).
8. En GitHub Pages: *Settings → Pages* → marcar **Enforce HTTPS**.
9. Pásame el logo en SVG o PNG ≥512 px para hacer favicon/apple-touch-icon.

## C. TAREAS PENDIENTES
**Imprescindibles**
- **Textos legales:** copiados tal cual de gakotc.com. Hay que revisar: (a) `cookies.html` cita cookies de WordPress y Google Maps y dice que sin aceptar «la web no funcionará», cosa que no ocurre en Klinbit; (b) `privacidad.html` no menciona el formulario (Web3Forms, tercero que procesa los datos) ni Google Analytics cuando se active; (c) confirmar que Gako es la entidad responsable de Klinbit en la web y en el formulario. Esto es asesoramiento legal que no puedo dar: conviene validarlo con quien lleve la parte jurídica de Gako.
- IDs de GA4/GTM (sin ellos no hay medición).
- Verificar en Search Console y enviar sitemap.
- Revisar el texto de las 3 páginas nuevas (ya no hay invenciones, pero deben ser tuyas): sobre todo la frase «Trabajamos con festivales y eventos de toda España, con especial foco en País Vasco y Navarra», la afirmación de que la Directiva 2024/825 «se aplica desde el 27-9-2026» (verificado en búsquedas; falta comprobar el estado de la transposición en España) y la nota de que no es asesoramiento jurídico.

**Recomendables**
- Decidir si cambiar el **H1** de la home incluyendo la palabra «festivales»/«huella de carbono» (no lo he tocado por ser decisión de marca). Propuesta: mantener el H1 y reforzar con el subtítulo, o probar «Huella de carbono para festivales. Ponle cifras.».
- Caso de estudio, clientes, equipo con foto (se activan solos en `js/script.js`): son las mayores palancas de confianza y de posicionamiento. **No inventados.**
- Datos reales de búsqueda (Planificador de Google Ads / Search Console).
- Crear blog y los 6 artículos del calendario (necesitan tu revisión).
- Dirección o área de servicio, teléfono y datos de empresa para schema LocalBusiness/GBP.
- Sin dirección postal, Google puede no mostrar ficha local; GBP solo con área de servicio es posible (ver `05-google-business-profile.md`).
- Valorar Cloudflare si quieres cabeceras, redirecciones 301 propias o Brotli (GitHub Pages no los permite).
- Mover `seo-interno/` fuera del repositorio público si no quieres que sea visible al publicar.

## D. PLAN DE POSICIONAMIENTO (90 días)
| Semana | Prioridad |
|---|---|
| 1 | Fusionar a `main`; verificar Search Console; enviar sitemap; solicitar indexación; HTTPS; GA4/GTM con ID |
| 2 | Revisión legal de Gako; GBP; alta en LinkedIn con enlaces a las 3 páginas |
| 3-4 | Escribir artículo «Cómo medir la huella de un festival»; datos reales de keywords; email a Creast, FMA y 3 festivales de la zona |
| 5-6 | Primer artículo + difusión; revisar impresiones por consulta y ajustar títulos |
| 7-8 | Artículo greenwashing; contactar medios de sostenibilidad y música |
| 9-10 | Artículo plan de sostenibilidad; si hay caso real, página de caso |
| 11-12 | Artículo reducción de impacto; revisión de Core Web Vitals en Search Console |
| 13 | Informe de resultados y plan del trimestre siguiente |

**Indicadores** (Search Console → Rendimiento; GA4): impresiones y clics orgánicos (semanal); posición media (por consulta/página); nº de palabras con impresiones (consultas únicas); sesiones orgánicas (GA4 → Adquisición); solicitudes de contacto = `generate_lead` + `email_click`; conversiones comerciales = reuniones realizadas y propuestas enviadas (registro manual en tu CRM con origen «web»). No hay objetivos numéricos: no hay línea base; fíjalos tras las 4 primeras semanas de datos.
