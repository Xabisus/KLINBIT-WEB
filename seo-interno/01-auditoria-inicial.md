# 01 · Auditoría SEO inicial (31-10-2026)

**Tecnología:** sitio estático (HTML + CSS + JS propio, sin build) en GitHub Pages con dominio `klinbit.es`. Se verificó con `curl` que http→https y www→apex redirigen con 301, y que `/robots.txt`, `/sitemap.xml` y las 404 no existían (404 = página de GitHub por defecto).

| # | Hallazgo | Prioridad | Estado |
|---|---|---|---|
| 1 | Sin `robots.txt` ni `sitemap.xml` | Alta | Resuelto |
| 2 | Sin `canonical`, `og:url`, `og:image` ni Twitter Card (al compartir el enlace no salía imagen) | Alta | Resuelto (imagen 1200×630 propia con la ilustración del hero) |
| 3 | Una sola URL indexable: todo el contenido comercial en una página con anclas; sin páginas para búsquedas de servicio | Alta | Resuelto parcialmente: 3 páginas de servicio con contenido ya existente en la web |
| 4 | `<title>` y H1 sin términos de búsqueda ("huella de carbono", "sostenibilidad", "festivales" no aparecían en el title) | Alta | Title y meta description reescritos. **H1 sin tocar** (decisión de marca, ver C) |
| 5 | Schema.org mínimo (Organization sin url/logo) | Media | Organization + WebSite + ProfessionalService (areaServed España/País Vasco/Navarra) + FAQPage; Service + BreadcrumbList en cada servicio |
| 6 | Sin página 404 propia | Media | `404.html` creada (noindex) |
| 7 | Imagen LCP del hero de 395 KB para todos los dispositivos, sin `preload` | Media | `srcset` 800/1200/1968 px + preload con `fetchpriority` |
| 8 | Sin enlaces internos hacia páginas de servicio | Media | Enlaces en FAQ, pie y entre servicios |
| 9 | Analítica sin cargador (solo emitía eventos si ya existía `gtag`); doble envío posible gtag+dataLayer | Media | Cargador GA4/GTM tras consentimiento; eventos de email, teléfono, salientes y `generate_lead` |
| 10 | Páginas legales con texto provisional (están en `noindex`, correcto) | Alta legal / nula SEO | Pendiente de ti: ver informe C |
| 11 | Favicon 64×64 (Google pide múltiplos de 48 px, ≥48) y sin `apple-touch-icon` | Baja | Pendiente: necesito el logo en SVG/PNG ≥512 px |
| 12 | Contenido visible tras animaciones JS (`.rv`, `.split`) | Baja | Sin riesgo: el texto está en el HTML; con JS desactivado se muestra |

**Lo que está bien:** HTML semántico (`header/main/nav/section/footer`), `lang="es"`, un solo H1, `alt` descriptivos, `loading="lazy"` en imágenes bajo el pliegue, fuentes locales WOFF2 con `font-display: swap`, sin recursos de terceros, `width/height` en imágenes (sin CLS), accesibilidad con skip-link, `aria-*` y `prefers-reduced-motion`.

**Limitación de GitHub Pages:** no permite cabeceras HTTP personalizadas, redirecciones 301 propias ni compresión Brotli configurable. No hay URLs antiguas que redirigir (no se han cambiado URLs existentes). Si en el futuro se necesitan redirecciones, la opción es Cloudflare delante del dominio (decisión tuya).
