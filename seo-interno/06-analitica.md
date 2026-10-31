# 06 · Analítica y medición

La web ya está preparada: **nada se carga sin consentimiento** y solo falta pegar un identificador en `js/script.js` (objeto `CONFIG`, campos `ga4Id` y `gtmId`).

## Eventos que ya se emiten (tras aceptar cookies)
| Evento | Cuándo | Uso |
|---|---|---|
| `cta_click` (`location`) | Clic en cualquier botón "Pedir reunión" | Ver qué CTA funciona |
| `email_click` | Clic en `mailto:` | Conversión secundaria |
| `phone_click` | Clic en `tel:` (aún no hay teléfono en la web) | Conversión secundaria |
| `outbound_click` | Enlaces externos (Creast, LinkedIn) | Interés |
| `form_submit` | Formulario válido enviado | Intento |
| `generate_lead` | Respuesta correcta de Web3Forms | **Conversión principal** (marcar como "evento clave" en GA4) |

## Qué debes facilitarme / hacer tú
Ver informe, apartado B. Resumen: ID de medición GA4 (`G-…`) o ID de contenedor GTM (`GTM-…`); verificación de Search Console.

## Importante
- Con GA4 hay que actualizar `cookies.html` y `privacidad.html` (Google Analytics, finalidad, conservación). Textos legales pendientes de redactar con tus datos fiscales.
- Si usas GTM, define en GTM etiquetas GA4 para los eventos anteriores (el nombre del evento es `event` en la capa de datos).
- Las visitas de quien rechaza cookies no se miden: Search Console es la fuente fiable de impresiones/clics orgánicos.
