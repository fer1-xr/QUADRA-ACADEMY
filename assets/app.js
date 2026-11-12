/* =========================================================
   QUADRA ACADEMY — Interfaz común (nav, footer, tema, utilidades)
   ========================================================= */
(function () {
  var cfg = window.QA_CONFIG || {};
  var root = document.documentElement;

  var ICON = {
    arrow: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
    check: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8.5l3 3 7-7"/></svg>',
    clock: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 1.5"/></svg>',
    play: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="12" height="10" rx="2"/><path d="M7 6.2v3.6L10 8z" fill="currentColor"/></svg>',
    level: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 13V9M8 13V6M13 13V3"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 018 0v3"/></svg>',
    plus: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 3v10M3 8h10"/></svg>',
    moon: '<svg class="i-moon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M16.5 12.2A7 7 0 017.8 3.5a7 7 0 108.7 8.7z"/></svg>',
    sun: '<svg class="i-sun" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10" cy="10" r="3.4"/><path d="M10 1.8v2M10 16.2v2M1.8 10h2M16.2 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4"/></svg>'
  };

  var LOGO = '<svg viewBox="0 0 28 28" fill="none" aria-hidden="true">' +
    '<rect class="bm-a" x="1" y="1" width="11.5" height="11.5" rx="2.5"/>' +
    '<rect x="15.5" y="1" width="11.5" height="11.5" rx="2.5" stroke="currentColor" stroke-width="1.5"/>' +
    '<rect x="1" y="15.5" width="11.5" height="11.5" rx="2.5" stroke="currentColor" stroke-width="1.5"/>' +
    '<rect x="15.5" y="15.5" width="11.5" height="11.5" rx="2.5" fill="currentColor"/></svg>';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function py(n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function gs(n) { return '₲ ' + py(n); }
  function initials(name) {
    var p = String(name || '?').trim().split(/\s+/);
    return ((p[0] || '?')[0] + (p[1] ? p[1][0] : '')).toUpperCase();
  }
  function param(k) { return new URLSearchParams(location.search).get(k); }
  function lessonCount(c) { return window.QA_lessons(c).length; }

  /* ---------- Tema ---------- */
  function bindTheme() {
    document.querySelectorAll('.theme-btn').forEach(function (tb) {
      function sync() { var d = root.getAttribute('data-theme') === 'dark'; tb.setAttribute('aria-label', d ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'); }
      sync();
      tb.addEventListener('click', function () {
        var t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', t); sync();
        try { localStorage.setItem('quadra-theme', t); } catch (e) {}
      });
    });
  }

  /* ---------- Nav ---------- */
  function navHTML(user, active) {
    var links = [
      ['index.html#cursos', 'Cursos', 'cursos'],
      ['index.html#como-funciona', 'Cómo funciona', 'como'],
      ['index.html#planes', 'Planes', 'planes'],
      ['index.html#faq', 'Preguntas', 'faq']
    ];
    if (user) links.push(['mis-cursos.html', 'Mis cursos', 'mis-cursos']);
    var linksHTML = links.map(function (l) { return '<a href="' + l[0] + '"' + (active === l[2] ? ' class="active"' : '') + '>' + l[1] + '</a>'; }).join('');

    var cta = user
      ? '<a href="#" class="login" data-logout>Salir</a>' +
        '<a href="mis-cursos.html" class="user-chip" title="' + esc(user.email) + '">' + esc(user.name.split(' ')[0]) + '<i>' + esc(initials(user.name)) + '</i></a>'
      : '<a href="ingresar.html" class="login">Ingresar</a>' +
        '<a href="ingresar.html?modo=registro" class="btn btn-primary">Crear cuenta</a>';

    var mobileCta = user
      ? '<a href="mis-cursos.html" class="btn btn-primary">Ir a mis cursos</a><a href="#" data-logout>Cerrar sesión</a>'
      : '<a href="ingresar.html">Ingresar</a><a href="ingresar.html?modo=registro" class="btn btn-primary">Crear cuenta</a>';

    return '<div class="wrap">' +
      '<a href="index.html" class="brand" aria-label="Quadra Academy, inicio">' + LOGO + 'Quadra <span class="serif" style="font-size:1.08em;margin-left:-4px">Academy</span></a>' +
      '<nav class="nav-links" aria-label="Principal">' + linksHTML + '</nav>' +
      '<div class="nav-cta">' +
        '<button class="theme-btn" aria-label="Cambiar tema" title="Cambiar tema">' + ICON.moon + ICON.sun + '</button>' +
        cta +
        '<button class="menu-btn" aria-label="Abrir menú" aria-expanded="false"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 6h14M3 10h14M3 14h14"/></svg></button>' +
      '</div></div>' +
      '<div class="mobile-menu">' + links.map(function (l) { return '<a href="' + l[0] + '">' + l[1] + '</a>'; }).join('') + mobileCta + '</div>';
  }

  function footerHTML() {
    var cats = window.QA_COURSES.slice(0, 6).map(function (c) { return '<li><a href="curso.html?c=' + c.slug + '">' + esc(c.title) + '</a></li>'; }).join('');
    return '<div class="wrap"><div class="foot-grid">' +
      '<div><a href="index.html" class="brand">' + LOGO + 'Quadra <span class="serif" style="font-size:1.08em;margin-left:-4px">Academy</span></a>' +
      '<p class="about">Cursos online de contabilidad, tributación, legislación laboral e inteligencia artificial para contadores y emprendedores en Paraguay.</p></div>' +
      '<div><h6>Cursos</h6><ul>' + cats + '</ul></div>' +
      '<div><h6>Alumnos</h6><ul><li><a href="ingresar.html?modo=registro">Crear cuenta</a></li><li><a href="ingresar.html">Ingresar</a></li><li><a href="mis-cursos.html">Mis cursos</a></li><li><a href="index.html#faq">Preguntas frecuentes</a></li></ul></div>' +
      '<div><h6>Contacto</h6><ul><li><a href="mailto:' + esc(cfg.contactEmail) + '">' + esc(cfg.contactEmail) + '</a></li><li><a href="' + esc(cfg.whatsapp) + '" target="_blank" rel="noopener">WhatsApp</a></li><li>' + esc(cfg.city) + '</li></ul></div>' +
      '</div><div class="foot-bottom"><span>© ' + new Date().getFullYear() + ' Quadra Academy. Todos los derechos reservados.</span><span><a href="#">Términos</a> &nbsp;·&nbsp; <a href="#">Privacidad</a></span></div></div>';
  }

  async function mountShell(opts) {
    opts = opts || {};
    var user = await window.QA_STORE.getUser().catch(function () { return null; });

    var nav = document.getElementById('nav');
    if (nav) {
      nav.innerHTML = navHTML(user, opts.active);
      if (opts.solidNav) nav.classList.add('scrolled');
      else {
        var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 24); };
        onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
      }
      var mb = nav.querySelector('.menu-btn'), mm = nav.querySelector('.mobile-menu');
      mb.addEventListener('click', function () { var o = mm.classList.toggle('open'); mb.setAttribute('aria-expanded', o); });
      mm.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { mm.classList.remove('open'); mb.setAttribute('aria-expanded', false); }); });
    }
    var foot = document.getElementById('footer');
    if (foot) foot.innerHTML = footerHTML();

    document.querySelectorAll('[data-logout]').forEach(function (a) {
      a.addEventListener('click', async function (e) {
        e.preventDefault();
        await window.QA_STORE.signOut();
        location.href = 'index.html';
      });
    });
    bindTheme();
    return user;
  }

  /* ---------- Reveal ---------- */
  function reveal(scope) {
    var els = (scope || document).querySelectorAll('.rv:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show'); }, 3200);
  }

  /* ---------- Tarjeta de curso ---------- */
  function courseCard(c, opts) {
    opts = opts || {};
    var owned = opts.owned;
    var progress = opts.progress;
    var foot;
    if (owned) {
      var pct = progress != null ? Math.round(progress * 100) : 0;
      foot = '<div style="margin-top:auto;padding-top:20px">' +
        '<div class="progress"><i style="width:' + pct + '%"></i></div>' +
        '<div class="progress-lbl"><span>' + pct + '% completado</span><span>' + lessonCount(c) + ' lecciones</span></div>' +
        '<a href="aula.html?c=' + c.slug + '" class="btn btn-dark" style="margin-top:18px;width:100%;justify-content:center">' + (pct > 0 ? 'Continuar curso' : 'Empezar curso') + ICON.arrow + '</a></div>';
    } else {
      foot = '<div class="course-foot"><div class="course-price">' + (c.oldPrice ? '<s class="num">' + gs(c.oldPrice) + '</s>' : '') +
        '<strong class="num">' + gs(c.price) + '</strong></div>' +
        '<a href="curso.html?c=' + c.slug + '" class="btn btn-dark">Ver curso' + ICON.arrow + '</a></div>';
    }
    return '<article class="course rv">' +
      '<a href="' + (owned ? 'aula.html' : 'curso.html') + '?c=' + c.slug + '" class="cover" style="--c1:' + c.c1 + ';--c2:' + c.c2 + '" aria-label="' + esc(c.title) + '">' +
        '<span class="cat">' + esc(c.category) + '</span>' +
        (owned && !opts.hideOwned ? '<span class="owned">Comprado</span>' : '') +
        '<span class="glyph">' + esc(c.glyph) + '</span></a>' +
      '<div class="course-body"><h3>' + esc(c.title) + '</h3><p>' + esc(c.short) + '</p>' +
      '<div class="course-meta"><span>' + ICON.clock + c.hours + ' h</span><span>' + ICON.play + lessonCount(c) + ' lecciones</span><span>' + ICON.level + esc(c.level) + '</span></div>' +
      foot + '</div></article>';
  }

  /* ---------- Video ---------- */
  function videoHTML(src) {
    if (!src) return '';
    var m;
    if ((m = /^youtube:(.+)$/.exec(src)) || (m = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/.exec(src))) {
      return '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(m[1]) + '?rel=0&modestbranding=1" title="Video de la lección" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    }
    if ((m = /^vimeo:(.+)$/.exec(src)) || (m = /vimeo\.com\/(?:video\/)?(\d+)/.exec(src))) {
      return '<iframe src="https://player.vimeo.com/video/' + encodeURIComponent(m[1]) + '?dnt=1" title="Video de la lección" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    }
    return '<video src="' + esc(src) + '" controls playsinline controlsList="nodownload" preload="metadata"></video>';
  }

  window.QA = {
    cfg: cfg, ICON: ICON, LOGO: LOGO, esc: esc, py: py, gs: gs, initials: initials, param: param,
    lessonCount: lessonCount, mountShell: mountShell, reveal: reveal, toast: toast,
    courseCard: courseCard, videoHTML: videoHTML, bindTheme: bindTheme
  };
})();
