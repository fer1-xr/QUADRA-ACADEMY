/* =========================================================
   QUADRA ACADEMY — Cuentas, compras y progreso
   ---------------------------------------------------------
   Dos modos con la misma interfaz (window.QA_STORE):
   · "supabase": si config.js tiene supabaseUrl + supabaseAnonKey.
   · "demo":     todo en localStorage de este navegador.
   ========================================================= */
(function () {
  var cfg = window.QA_CONFIG || {};
  var useSupabase = !!(cfg.supabaseUrl && cfg.supabaseAnonKey);
  var sb = null;
  var readyPromise = null;

  /* ---------- helpers localStorage ---------- */
  function read(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {} }

  async function hash(text) {
    if (window.crypto && crypto.subtle) {
      var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
    }
    return 'plain:' + text; // file:// en navegadores antiguos
  }

  function normEmail(e) { return String(e || '').trim().toLowerCase(); }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src; s.onload = resolve; s.onerror = function () { reject(new Error('No se pudo cargar ' + src)); };
      document.head.appendChild(s);
    });
  }

  /* =========================================================
     MODO DEMO
     ========================================================= */
  var demo = {
    mode: 'demo',
    async ready() {},
    async getUser() {
      var s = read('qa-session', null);
      if (!s) return null;
      var u = read('qa-users', {})[s.email];
      return u ? { id: u.email, email: u.email, name: u.name } : null;
    },
    async signUp(name, email, password) {
      email = normEmail(email);
      var users = read('qa-users', {});
      if (users[email]) throw new Error('Ya existe una cuenta con ese correo. Iniciá sesión.');
      users[email] = { name: name.trim(), email: email, pass: await hash(password), createdAt: Date.now() };
      write('qa-users', users);
      write('qa-session', { email: email });
      return { needsConfirmation: false };
    },
    async signIn(email, password) {
      email = normEmail(email);
      var u = read('qa-users', {})[email];
      if (!u || u.pass !== await hash(password)) throw new Error('Correo o contraseña incorrectos.');
      write('qa-session', { email: email });
    },
    async signOut() { try { localStorage.removeItem('qa-session'); } catch (e) {} },
    async resetPassword() { throw new Error('En modo demo no hay recuperación por correo. Creá una cuenta nueva.'); },
    async getEnrollments() {
      var u = await this.getUser(); if (!u) return [];
      return read('qa-enroll-' + u.id, []);
    },
    async purchase(slug) {
      var u = await this.getUser(); if (!u) throw new Error('Iniciá sesión para comprar.');
      var list = read('qa-enroll-' + u.id, []);
      if (list.indexOf(slug) === -1) list.push(slug);
      write('qa-enroll-' + u.id, list);
      return { enrolled: true };
    },
    async getProgress(slug) {
      var u = await this.getUser(); if (!u) return [];
      return read('qa-prog-' + u.id + '-' + slug, []);
    },
    async setLessonDone(slug, lessonId, done) {
      var u = await this.getUser(); if (!u) return;
      var key = 'qa-prog-' + u.id + '-' + slug, list = read(key, []);
      var i = list.indexOf(lessonId);
      if (done && i === -1) list.push(lessonId);
      if (!done && i !== -1) list.splice(i, 1);
      write(key, list);
    },
    async getLessonVideo(course, lesson) { return lesson.video || null; }
  };

  /* =========================================================
     MODO SUPABASE
     ========================================================= */
  var live = {
    mode: 'supabase',
    async ready() {
      if (!readyPromise) {
        readyPromise = (window.supabase ? Promise.resolve() : loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'))
          .then(function () { sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey); });
      }
      return readyPromise;
    },
    async getUser() {
      await this.ready();
      var r = await sb.auth.getSession();
      var s = r.data && r.data.session;
      if (!s) return null;
      var meta = s.user.user_metadata || {};
      return { id: s.user.id, email: s.user.email, name: meta.full_name || s.user.email.split('@')[0] };
    },
    async signUp(name, email, password) {
      await this.ready();
      var r = await sb.auth.signUp({
        email: normEmail(email), password: password,
        options: { data: { full_name: name.trim() }, emailRedirectTo: location.origin + location.pathname.replace(/[^/]*$/, '') + 'mis-cursos.html' }
      });
      if (r.error) throw new Error(translate(r.error.message));
      return { needsConfirmation: !r.data.session };
    },
    async signIn(email, password) {
      await this.ready();
      var r = await sb.auth.signInWithPassword({ email: normEmail(email), password: password });
      if (r.error) throw new Error(translate(r.error.message));
    },
    async signOut() { await this.ready(); await sb.auth.signOut(); },
    async resetPassword(email) {
      await this.ready();
      var r = await sb.auth.resetPasswordForEmail(normEmail(email), { redirectTo: location.origin + location.pathname.replace(/[^/]*$/, '') + 'ingresar.html' });
      if (r.error) throw new Error(translate(r.error.message));
    },
    async getEnrollments() {
      var u = await this.getUser(); if (!u) return [];
      var r = await sb.from('enrollments').select('course_slug').eq('user_id', u.id);
      if (r.error) { console.error(r.error); return []; }
      return r.data.map(function (x) { return x.course_slug; });
    },
    async purchase(slug) {
      // Las inscripciones las crea el administrador (o el webhook del medio de pago).
      var u = await this.getUser(); if (!u) throw new Error('Iniciá sesión para comprar.');
      var c = window.QA_findCourse(slug);
      var url = (cfg.checkoutUrl || '').replace('{curso}', encodeURIComponent(c ? c.title : slug)).replace('{email}', encodeURIComponent(u.email)).replace('{slug}', encodeURIComponent(slug));
      if (url) window.open(url, '_blank', 'noopener');
      return { enrolled: false, redirected: !!url };
    },
    async getProgress(slug) {
      var u = await this.getUser(); if (!u) return [];
      var r = await sb.from('lesson_progress').select('lesson_id').eq('user_id', u.id).eq('course_slug', slug);
      if (r.error) { console.error(r.error); return []; }
      return r.data.map(function (x) { return x.lesson_id; });
    },
    async setLessonDone(slug, lessonId, done) {
      var u = await this.getUser(); if (!u) return;
      if (done) await sb.from('lesson_progress').upsert({ user_id: u.id, course_slug: slug, lesson_id: lessonId }, { onConflict: 'user_id,course_slug,lesson_id', ignoreDuplicates: true });
      else await sb.from('lesson_progress').delete().eq('user_id', u.id).eq('course_slug', slug).eq('lesson_id', lessonId);
    },
    async getLessonVideo(course, lesson) {
      await this.ready();
      // RLS: solo devuelve filas si el alumno está inscrito o la lección es gratuita.
      var r = await sb.from('lesson_videos').select('video').eq('course_slug', course.slug).eq('lesson_id', lesson.id).maybeSingle();
      if (r.data && r.data.video) return r.data.video;
      return lesson.free ? (lesson.video || null) : null;
    }
  };

  function translate(msg) {
    var m = String(msg || '');
    if (/Invalid login credentials/i.test(m)) return 'Correo o contraseña incorrectos.';
    if (/already registered/i.test(m)) return 'Ya existe una cuenta con ese correo. Iniciá sesión.';
    if (/Email not confirmed/i.test(m)) return 'Confirmá tu correo: te enviamos un enlace de activación.';
    if (/Password should be at least/i.test(m)) return 'La contraseña debe tener al menos 6 caracteres.';
    if (/rate limit/i.test(m)) return 'Demasiados intentos. Esperá unos minutos y probá de nuevo.';
    return m;
  }

  window.QA_STORE = useSupabase ? live : demo;
})();
