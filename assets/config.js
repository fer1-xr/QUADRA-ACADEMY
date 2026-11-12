/* =========================================================
   QUADRA ACADEMY — Configuración
   ---------------------------------------------------------
   Sin Supabase configurado, el sitio funciona en "modo demo":
   las cuentas, compras y progreso se guardan en el navegador
   (localStorage). Sirve para probar y mostrar, NO para vender.

   Para producción, completá supabaseUrl y supabaseAnonKey
   (ver README.md → "Pasar a producción").
   ========================================================= */
window.QA_CONFIG = {
  brand: 'Quadra Academy',

  // Supabase (cuentas reales + videos protegidos)
  supabaseUrl: '',
  supabaseAnonKey: '',

  // A dónde va el botón "Comprar" en producción.
  // Puede ser un link de pago (Pagopar, Bancard, Stripe, Mercado Pago…)
  // o WhatsApp. {curso} se reemplaza por el nombre del curso y {email} por el del alumno.
  checkoutUrl: 'https://wa.me/595000000000?text=Hola%2C%20quiero%20comprar%20el%20curso%20%22{curso}%22.%20Mi%20cuenta%3A%20{email}',

  contactEmail: 'hola@quadraacademy.com.py',
  whatsapp: 'https://wa.me/595000000000',
  city: 'Asunción, Paraguay'
};
