/* ==========================================================================
   KLINBIT · script.js
   Un único archivo, cuatro módulos independientes en este orden:
     1/4 Pruebas reales (datos editables: caso, logos, equipo)
     2/4 Pruebas reales (render)
     3/4 Interfaz (titulares, aparición, menú, formulario, cookies, medición)
     4/4 Escenas de scroll (un único bucle requestAnimationFrame)
   ========================================================================== */

/* ############################## MÓDULO 1/4 · PRUEBAS REALES (datos editables) ############################## */
/* ==========================================================================
   KLINBIT · Pruebas reales (clientes, caso de estudio, equipo)
   --------------------------------------------------------------------------
   La auditoría señala que lo que más sube la confianza es mostrar pruebas
   reales. Esta web NO inventa ninguna: las secciones de abajo se activan
   solas en cuanto rellenes los datos. Mientras estén vacíos no se muestran.

   clientes: [{ nombre: "Festival X", logo: "images/clientes/festival-x.svg" }]
   caso: {
     festival: "Nombre del festival", ciudad: "Ciudad · 2026",
     titular: "Una frase con el resultado principal",
     antes:   { valor: "000", etiqueta: "t CO₂e antes" },
     despues: { valor: "000", etiqueta: "t CO₂e después" },
     cita:    { texto: "…", autor: "Nombre", cargo: "Cargo, festival" },
     foto:    "images/caso/foto.jpg"      // foto real del festival (opcional)
   }
   equipo: [{ nombre: "Nombre", rol: "Rol", frase: "Su relación con la música", foto: "images/equipo/nombre.jpg" }]
   ========================================================================== */
window.KLINBIT_PROOF = {
  clientes: [],
  caso: null,
  equipo: []
};

/* ############################## MÓDULO 2/4 · PRUEBAS REALES (render) ############################## */
/* ==========================================================================
   KLINBIT · Render de pruebas (clientes, caso, equipo)
   Lee window.KLINBIT_PROOF y construye el DOM con textContent (sin innerHTML).
   ========================================================================== */
(function () {
  'use strict';
  var P = window.KLINBIT_PROOF || {};
  var el = function (tag, cls, text, attrs) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    return n;
  };

  // Logos de clientes junto a las credenciales del hero
  var creds = document.querySelector('[data-creds]');
  if (creds && P.clientes && P.clientes.length) {
    var logos = el('p', 'proof-logos');
    logos.appendChild(el('span', null, 'Han confiado'));
    P.clientes.forEach(function (c) { logos.appendChild(el('img', null, null, { src: c.logo, alt: c.nombre, loading: 'lazy' })); });
    creds.replaceWith(logos);
  }

  // Caso de estudio a pantalla completa
  var host = document.querySelector('[data-proof-case]');
  var c = P.caso;
  if (host && c && c.titular) {
    var sec = el('section', 'proof-case tone-dark', null, { id: 'caso', 'data-tone': 'dark', 'aria-labelledby': 'caso-t' });
    if (c.foto) { var bg = el('div', 'proof-case__bg'); bg.style.backgroundImage = 'url("' + c.foto + '")'; sec.appendChild(bg); }
    var wrap = el('div', 'wrap'), inn = el('div', 'proof-case__in');
    inn.appendChild(el('p', 'label', 'La prueba · ' + [c.festival, c.ciudad].filter(Boolean).join(' · ')));
    var h = el('h2', 'h2 split', c.titular, { id: 'caso-t' }); inn.appendChild(h);
    if (c.antes && c.despues) {
      var nums = el('div', 'proof-case__nums');
      [c.antes, c.despues].forEach(function (n) { var d = el('div', 'rv'); d.appendChild(el('strong', null, n.valor)); d.appendChild(el('span', 'label', n.etiqueta)); nums.appendChild(d); });
      inn.appendChild(nums);
    }
    if (c.cita && c.cita.texto) {
      var bq = el('blockquote', 'rv', c.cita.texto);
      bq.appendChild(el('cite', null, [c.cita.autor, c.cita.cargo].filter(Boolean).join(' · ')));
      inn.appendChild(bq);
    }
    wrap.appendChild(inn); sec.appendChild(wrap); host.replaceWith(sec);
  }

  // Equipo con cara y voz
  var teamHost = document.querySelector('[data-proof-team]');
  if (teamHost && P.equipo && P.equipo.length) {
    var grid = el('div', 'proof-team');
    P.equipo.forEach(function (p) {
      var f = el('figure', 'rv');
      f.appendChild(el('img', null, null, { src: p.foto, alt: p.nombre, loading: 'lazy' }));
      var cap = el('figcaption'); cap.appendChild(el('b', null, p.nombre)); cap.appendChild(el('span', null, p.rol));
      if (p.frase) cap.appendChild(el('q', null, p.frase));
      f.appendChild(cap); grid.appendChild(f);
    });
    teamHost.replaceWith(grid);
  }
})();

/* ############################## MÓDULO 3/4 · INTERFAZ ############################## */
/* ==========================================================================
   KLINBIT · Interfaz
   01 Configuración · 02 Titulares por palabras · 03 Aparición · 04 Menú móvil
   05 Botones magnéticos · 06 Formulario · 07 Medición de CTAs · 08 Pie
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 01. Configuración ---------- */
  var CONFIG = {
    emailDestino: 'contacto@klinbit.es',
    // Clave de acceso de Web3Forms (https://web3forms.com). Es pública por diseño: se genera con el
    // correo que debe recibir los mensajes. Mientras esté vacía, el formulario abre el correo del visitante.
    web3formsKey: 'f83e246c-9f6b-4a20-9faf-93c5fa640007',
    // Analítica. Rellena UNO de los dos con tu identificador real (ver seo-interno/06-analitica.md).
    // Mientras estén vacíos no se carga ningún script de terceros. Solo se cargan si el visitante acepta las cookies.
    ga4Id: '',   // p. ej. 'G-XXXXXXXXXX' (Google Analytics 4, sin Tag Manager)
    gtmId: ''    // p. ej. 'GTM-XXXXXXX' (Google Tag Manager; si lo usas, deja ga4Id vacío)
  };
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 02. Titulares: revelado palabra a palabra ---------- */
  var wordIndex;
  function splitNode(node) {
    Array.prototype.slice.call(node.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          var w = document.createElement('span'), i = document.createElement('span');
          w.className = 'w'; i.textContent = part; i.style.setProperty('--i', wordIndex++);
          w.appendChild(i); frag.appendChild(w);
        });
        node.replaceChild(frag, n);
      } else if (n.nodeType === 1) { splitNode(n); }
    });
  }
  $$('.split').forEach(function (h) { wordIndex = 0; splitNode(h); });

  /* ---------- 03. Aparición al hacer scroll (titulares, bloques, ilustraciones) ---------- */
  var targets = $$('.split, .rv, .wipe:not([data-hero-art])');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('is-in'); });
  }

  /* ---------- 04. Menú móvil ---------- */
  var burger = $('[data-burger]'), menu = $('[data-menu]');
  if (burger && menu) {
    var label = $('[data-burger-label]', burger);
    var setMenu = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
      document.documentElement.classList.toggle('menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (label) label.textContent = open ? 'Cerrar' : 'Menú';
      if ('inert' in menu) menu.inert = !open;
      if (open) { var a = $('a', menu); if (a) a.focus({ preventScroll: true }); }
    };
    setMenu(false);
    burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    $$('[data-menu-link]', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); burger.focus(); } });
    window.matchMedia('(min-width: 961px)').addEventListener('change', function (e) { if (e.matches) setMenu(false); });
  }

  /* ---------- 05. Botones magnéticos (solo con ratón) ---------- */
  if (!reduce && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $$('[data-magnet]').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1) + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }

  /* ---------- 06. Formulario de reunión ---------- */
  var form = $('[data-form]');
  if (form) {
    var status = $('[data-form-status]', form);
    var say = function (msg, kind) { status.textContent = msg; status.className = 'form__status' + (kind ? ' is-' + kind : ''); };
    var body = function (fd) {
      return ['Hola Klinbit,', '', 'Quiero pedir una reunión.', '',
        'Nombre: ' + fd.get('nombre'), 'Festival / evento: ' + fd.get('evento'), 'Email: ' + fd.get('email'),
        '',
        (fd.get('mensaje') || '').trim()].join('\n');
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault(); say('', '');
      if (form.elements.web && form.elements.web.value) return; // anti-spam
      var bad = null;
      $$('input[required]', form).forEach(function (i) {
        var ok = i.type === 'checkbox' ? i.checked : (i.checkValidity() && i.value.trim() !== '');
        i.setAttribute('aria-invalid', ok ? 'false' : 'true');
        if (!ok && !bad) bad = i;
      });
      if (bad) { say(bad.type === 'checkbox' ? 'Para continuar, acepta la política de privacidad.' : 'Faltan tu nombre, el festival o un email válido.', 'err'); bad.focus(); return; }
      var fd = new FormData(form);
      track('form_submit', { method: CONFIG.web3formsKey ? 'web3forms' : 'mailto' });
      var enlaceCorreo = 'mailto:' + CONFIG.emailDestino + '?subject=' + encodeURIComponent('Reunión · ' + fd.get('evento')) + '&body=' + encodeURIComponent(body(fd));
      // Sin clave configurada (solo en desarrollo): abre el correo del visitante con el mensaje redactado
      if (!CONFIG.web3formsKey) {
        window.location.href = enlaceCorreo;
        say('Preparando tu correo. Si no se abre, escríbenos a ' + CONFIG.emailDestino + '.', 'ok');
        return;
      }
      var btn = $('button[type="submit"]', form); btn.disabled = true; say('Enviando…', '');
      // Si el envío falla NO se abre el correo por sorpresa: se explica y se ofrece como opción
      var fallo = function (motivo) {
        if (window.console) console.warn('[Klinbit] El formulario no se pudo enviar:', motivo);
        status.className = 'form__status is-err'; status.textContent = 'No hemos podido enviar tu mensaje. Inténtalo de nuevo o ';
        var a = document.createElement('a'); a.href = enlaceCorreo; a.textContent = 'escríbenos por correo'; status.appendChild(a); status.appendChild(document.createTextNode('.'));
      };
      var control = window.AbortController ? new AbortController() : null;
      var limite = setTimeout(function () { if (control) control.abort(); }, 15000);
      var texto = ['Festival / evento: ' + fd.get('evento'), '', (fd.get('mensaje') || '').trim() || '(Sin mensaje)'].join('\n');
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: CONFIG.web3formsKey, subject: 'Reunión · ' + fd.get('evento'), from_name: 'Web Klinbit',
          name: fd.get('nombre'), email: fd.get('email'), message: texto }),
        signal: control ? control.signal : undefined
      })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok && d.success === true, status: r.status, msg: d.message }; }); })
        .then(function (res) {
          if (res.ok) { form.reset(); say('Recibido. Te escribimos en breve para proponerte una fecha.', 'ok'); track('form_sent', {}); track('generate_lead', { form: 'reunion' }); }
          else { fallo('HTTP ' + res.status + ' · ' + (res.msg || 'sin mensaje')); }
        })
        .catch(function (err) { fallo((err && err.message) || 'sin conexión o bloqueado'); })
        .then(function () { clearTimeout(limite); btn.disabled = false; });
    });
  }

  /* ---------- 07. Cookies y medición ----------
     La elección se guarda en el navegador. Mientras no se acepte, no se envía
     ningún evento de medición. Si instalas GA4/GTM, cárgalo al recibir el evento
     "klinbit:consent" (detail.analytics === true) o si KLINBIT_CONSENT.analytics ya es true. */
  var CK = 'klinbit-cookies';
  var store = {
    get: function () { try { return window.localStorage.getItem(CK); } catch (_) { return null; } },
    set: function (v) { try { window.localStorage.setItem(CK, v); } catch (_) { /* sin almacenamiento: se vuelve a preguntar */ } }
  };
  window.KLINBIT_CONSENT = { analytics: store.get() === 'accepted' };
  var banner = $('[data-cookie]');
  function showBanner(on) {
    if (!banner) return;
    banner.classList.toggle('is-on', on);
    document.documentElement.classList.toggle('cookie-open', on);
    if ('inert' in banner) banner.inert = !on;
  }
  if (banner) {
    showBanner(false);
    if (!store.get()) setTimeout(function () { showBanner(true); }, 700);
    $$('[data-cookie-choice]', banner).forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-cookie-choice');
        store.set(v); window.KLINBIT_CONSENT.analytics = v === 'accepted'; showBanner(false);
        document.dispatchEvent(new CustomEvent('klinbit:consent', { detail: { analytics: v === 'accepted' } }));
      });
    });
    $$('[data-cookie-open]').forEach(function (b) { b.addEventListener('click', function () { showBanner(true); var f = $('[data-cookie-choice]', banner); if (f) f.focus({ preventScroll: true }); }); });
  }

  /* ---------- 07b. Analítica (GA4 / GTM) y medición de eventos ----------
     Nada se carga ni se envía sin consentimiento. Eventos: cta_click, email_click, phone_click,
     outbound_click, form_submit (intento válido) y generate_lead (solicitud enviada = conversión). */
  var analyticsLoaded = false;
  function loadAnalytics() {
    if (analyticsLoaded || !window.KLINBIT_CONSENT || !window.KLINBIT_CONSENT.analytics) return;
    var id = CONFIG.gtmId || CONFIG.ga4Id;
    if (!id) return;
    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    var s = document.createElement('script'); s.async = true;
    if (CONFIG.gtmId) {
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(CONFIG.gtmId);
    } else {
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', CONFIG.ga4Id, { anonymize_ip: true });
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(CONFIG.ga4Id);
    }
    document.head.appendChild(s);
  }
  loadAnalytics();
  document.addEventListener('klinbit:consent', loadAnalytics);

  function track(name, params) {
    if (!window.KLINBIT_CONSENT || !window.KLINBIT_CONSENT.analytics) return;
    try {
      if (CONFIG.gtmId) { window.dataLayer = window.dataLayer || []; window.dataLayer.push(Object.assign({ event: name }, params || {})); }
      else if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
    } catch (_) { /* la analítica nunca debe romper la web */ }
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('a, button');
    if (!t) return;
    var c = t.closest('[data-cta]');
    if (c) track('cta_click', { location: c.getAttribute('data-cta') });
    var h = t.tagName === 'A' ? (t.getAttribute('href') || '') : '';
    if (/^mailto:/i.test(h)) track('email_click', { location: (c && c.getAttribute('data-cta')) || 'enlace' });
    else if (/^tel:/i.test(h)) track('phone_click', { location: (c && c.getAttribute('data-cta')) || 'enlace' });
    else if (/^https?:\/\//i.test(h) && t.hostname && t.hostname !== window.location.hostname) track('outbound_click', { destination: t.hostname });
  });

  /* ---------- 08. Pie ---------- */
  var y = $('[data-year]'); if (y) y.textContent = new Date().getFullYear();
})();

/* ############################## MÓDULO 4/4 · ESCENAS DE SCROLL ############################## */
/* ==========================================================================
   KLINBIT · Escenas de scroll
   Un único bucle requestAnimationFrame lee la posición y actualiza variables
   CSS. Primero se lee (rects), después se escribe, para no forzar reflujos.
   Escenas: cabecera · apertura · problema (53 %) · método (4 pasos) ·
            entregable (abanico) · botón flotante.
   "has-pin": solo escritorio, con altura suficiente y sin movimiento
   reducido. En móvil todo se apila en flujo normal y las cifras se animan
   por tiempo.
   ========================================================================== */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var root = document.documentElement;
  var clamp = function (v, a, b) { return Math.min(b === undefined ? 1 : b, Math.max(a === undefined ? 0 : a, v)); };
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };

  var hdr = $('[data-hdr]'), hero = $('[data-scene="hero"]'), problem = $('[data-scene="problem"]'),
      method = $('[data-scene="method"]'), steps = $$('[data-step]'), roll = $('[data-roll]'), indexBtns = $$('[data-goto]'),
      deliver = $('[data-scene="deliver"]'), docs = $('[data-docs]'), fab = $('[data-fab]'), closeSec = $('#contacto'),
      n53 = $('.stat53 .n'), stat40 = $('[data-stat40]'), n40 = stat40 && $('[data-count]', stat40), stamp = $('[data-stamp]');
  var tones = $$('[data-tone]').filter(function (n) { return n !== hdr; });
  var N = steps.length;

  var mq = window.matchMedia('(min-width: 961px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pinned = false, vh = window.innerHeight, lastY = window.scrollY, dir = 0, queued = false, last = {};
  var STEP_VH = 0.8;                      // pantallas de scroll por paso del método

  function setPin() {
    pinned = mq.matches; root.classList.toggle('has-pin', pinned);
    vh = window.innerHeight;
    if (method) method.style.height = pinned ? (vh * (1 + N * STEP_VH)) + 'px' : '';
    if (stat40 && pinned) { stat40.style.opacity = 0; stat40.style.transform = 'translateY(24px)'; } else if (stat40) { stat40.style.opacity = ''; stat40.style.transform = ''; }
    last.step = -1;
    schedule();
  }

  /* Índice del método: saltar a un paso */
  indexBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      if (!pinned || !method) return;
      var i = +b.getAttribute('data-goto'), top = method.getBoundingClientRect().top + window.scrollY, total = method.offsetHeight - vh;
      window.scrollTo({ top: top + total * ((i + 0.5) / N), behavior: 'smooth' });
    });
  });

  /* Cifras por tiempo (sin pin): arrancan al entrar en pantalla */
  function countTo(el, target, dur) {
    var s = null; el.textContent = '0';
    (function tick(t) { if (s === null) s = t; var p = clamp((t - s) / dur); el.textContent = Math.round(target * easeOut(p)); if (p < 1) requestAnimationFrame(tick); })(performance.now());
  }
  var timed = false;
  if ('IntersectionObserver' in window && n53 && !reduce) {
    new IntersectionObserver(function (es, o) {
      es.forEach(function (e) { if (e.isIntersecting && !pinned && !timed) { timed = true; countTo(n53, 53, 1500); if (n40) countTo(n40, 40, 1500); o.disconnect(); } });
    }, { threshold: 0.5 }).observe(n53);
  }

  /* Abanico de páginas: inclinación según el puntero */
  if (docs && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce) {
    docs.addEventListener('pointermove', function (e) {
      var r = docs.getBoundingClientRect();
      docs.style.setProperty('--ry', (((e.clientX - r.left) / r.width - .5) * 14).toFixed(2));
      docs.style.setProperty('--rx', ((.5 - (e.clientY - r.top) / r.height) * 10).toFixed(2));
    });
    docs.addEventListener('pointerleave', function () { docs.style.setProperty('--ry', 0); docs.style.setProperty('--rx', 0); });
  }

  function setVar(el, k, v) { if (last[k] !== v) { last[k] = v; el.style.setProperty(k, v); } }

  function frame() {
    queued = false;
    var y = window.scrollY, max = Math.max(1, root.scrollHeight - vh);
    dir = y > lastY + 4 ? 1 : (y < lastY - 4 ? -1 : dir); lastY = y;

    /* — Lectura — */
    var rP = problem && problem.getBoundingClientRect(), rM = method && method.getBoundingClientRect(),
        rD = deliver && deliver.getBoundingClientRect(), rC = closeSec && closeSec.getBoundingClientRect();
    var tone = 'light', probe = 36;
    tones.forEach(function (n) { var r = n.getBoundingClientRect(); if (r.top <= probe && r.bottom > probe) tone = n.getAttribute('data-tone'); });

    /* — Escritura — */
    if (hdr) {
      hdr.classList.toggle('is-solid', y > 8);
      if (hdr.getAttribute('data-tone') !== tone) hdr.setAttribute('data-tone', tone);
      hdr.style.setProperty('--prog', (y / max).toFixed(4));
    }
    if (hero && !reduce) setVar(hero, '--hp', clamp(y / (vh * .95)).toFixed(3));

    /* Problema: el 53 % cuenta, el 40 % aparece, el sello gira */
    if (pinned && rP) {
      var p = clamp(-rP.top / Math.max(1, rP.height - vh));
      if (n53) { var v = Math.round(53 * easeOut(clamp(p / .4))); if (last.n53 !== v) { last.n53 = v; n53.textContent = v; } }
      if (stat40) {
        var q = clamp((p - .42) / .2);
        stat40.style.opacity = q.toFixed(3); stat40.style.transform = 'translateY(' + ((1 - easeOut(q)) * 24).toFixed(1) + 'px)';
        if (n40) { var v2 = Math.round(40 * easeOut(q)); if (last.n40 !== v2) { last.n40 = v2; n40.textContent = v2; } }
      }
      if (stamp) setVar(stamp, '--sp', p.toFixed(3));
    } else if (stamp && rP) { setVar(stamp, '--sp', clamp((vh - rP.top) / (vh + rP.height)).toFixed(3)); }

    /* Método: la palabra rueda, cambian texto e ilustración, el índice avanza */
    if (pinned && rM && N) {
      var pm = clamp(-rM.top / Math.max(1, rM.height - vh)), pos = pm * N, idx = clamp(Math.floor(pos), 0, N - 1);
      if (last.step !== idx) {
        last.step = idx;
        if (roll) roll.style.setProperty('--i', idx);
        steps.forEach(function (s, i) { s.classList.toggle('is-on', i === idx); });
        indexBtns.forEach(function (b, i) { b.classList.toggle('on', i === idx); b.setAttribute('aria-current', i === idx ? 'step' : 'false'); });
      }
      indexBtns.forEach(function (b, i) { var f = clamp(pos - i).toFixed(3); if (last['f' + i] !== f) { last['f' + i] = f; b.style.setProperty('--f', f); } });
    }

    if (docs && rD) setVar(docs, '--dp', reduce ? '1' : easeOut(clamp((vh - rD.top) / (vh * .85))).toFixed(3));

    /* Botón flotante: aparece tras el hero, se esconde al bajar y en el cierre */
    if (fab) {
      var inClose = rC && rC.top < vh * .7;
      var on = y > vh * .9 && !inClose && dir <= 0;
      fab.classList.toggle('is-on', on);
      var a = $('a', fab); if (a) a.tabIndex = on ? 0 : -1;
    }
  }

  function schedule() { if (!queued) { queued = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', setPin);
  mq.addEventListener('change', setPin);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setPin);
  setPin();
})();
