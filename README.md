# Quadra Academy

Plataforma para vender y dictar cursos online de **contabilidad, tributación, IPS, Ministerio de Trabajo, SIFEN e inteligencia artificial**, con el mismo sistema visual que la landing de Quadra (navy + menta, Geist + Instrument Serif, modo claro/oscuro).

## Páginas

| Archivo | Qué hace |
|---|---|
| `index.html` | Inicio (hero), cuerpo (catálogo con filtros, cómo funciona, beneficios, para quién es, planes, preguntas frecuentes, llamado a la acción) y footer |
| `ingresar.html` | Iniciar sesión, crear cuenta y recuperar contraseña |
| `curso.html?c=<slug>` | Detalle del curso: temario, lo que vas a aprender, precio y botón **Comprar** |
| `mis-cursos.html` | Panel del alumno: cursos comprados, avance y sugerencias |
| `aula.html?c=<slug>&l=<lección>` | Aula: reproductor de video, temario lateral y "Marcar como completada" |

Es un sitio estático (HTML + CSS + JS, sin compilación).

## Probarlo en tu PC

```bash
python3 -m http.server 8080
```

Abrí http://localhost:8080. Sin configurar nada, funciona en **modo demo**: las cuentas, compras y progreso se guardan en el navegador y "Comprar" activa el curso al instante. Sirve para probar el flujo completo, **no para vender**.

## Cargar tus cursos y videos

Editá `assets/data.js`. Cada lección acepta:

- `'youtube:ID'` — YouTube (subilo como **no listado**)
- `'vimeo:ID'` — Vimeo (recomendado: permite restringir el video a tu dominio)
- `'https://…/video.mp4'` — archivo directo

Los videos actuales son de muestra. Marcá `free: true` en las lecciones que quieras mostrar gratis.

## Pasar a producción (cuentas reales y videos protegidos)

1. Creá un proyecto gratis en [supabase.com](https://supabase.com).
2. En **SQL Editor**, pegá y ejecutá `supabase/schema.sql`.
3. En **Project Settings → API**, copiá la *Project URL* y la *anon public key* en `assets/config.js` (`supabaseUrl`, `supabaseAnonKey`).
4. En **Authentication → URL Configuration**, poné la URL de tu sitio.
5. Cargá las URLs de los videos en la tabla `lesson_videos` (ver ejemplos al final de `schema.sql`). Así, el video de una lección paga solo lo puede ver quien compró el curso.
6. Configurá `checkoutUrl` en `config.js` con tu link de pago (Pagopar, Bancard, Stripe, Mercado Pago…) o tu WhatsApp.
7. Cuando un alumno paga, activale el curso con el `insert into public.enrollments …` de `schema.sql`. Más adelante se puede automatizar con un webhook del medio de pago.

## Publicar

Es estático: se publica en Vercel, Netlify o GitHub Pages sin configuración (framework: *Other*, sin comando de build).
