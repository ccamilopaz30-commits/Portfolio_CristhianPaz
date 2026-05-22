// Helpers localStorage (como en las notas del curso)
function guardar(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

function leer(clave, valorPorDefecto = null) {
  const item = localStorage.getItem(clave);
  return item ? JSON.parse(item) : valorPorDefecto;
}

// AOS
AOS.init({
  duration: 800,
  once: true,
  offset: 100
});

// Swiper (proyectos)
const swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: { delay: 4000 },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  slidesPerView: 1,
  breakpoints: {
    768: { slidesPerView: 2, spaceBetween: 20 }
  }
});

// Formulario contacto (como en clase del 13 de abril)
const form = document.querySelector('#form-contacto');
const alerta = document.querySelector('#alerta-contacto');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.querySelector('#nombre').value.trim();
  const email = document.querySelector('#email').value.trim();
  const mensaje = document.querySelector('#mensaje').value.trim();

  if (!nombre || !email || !mensaje) {
    alert('Tienes campos obligatorios sin llenar');
    return;
  }

  const datos = {
    nombre: nombre,
    email: email,
    mensaje: mensaje,
    fecha: new Date().toLocaleString()
  };

  console.log(datos.nombre, datos.email, datos.mensaje);

  // Guardar mensajes en localStorage (módulo async/storage)
  const mensajesGuardados = leer('mensajesContacto', []);
  mensajesGuardados.push(datos);
  guardar('mensajesContacto', mensajesGuardados);

  alerta.textContent = '¡Mensaje guardado! Te contactaré pronto.';
  alerta.classList.remove('d-none');

  form.reset();
});

// Al cargar, mostrar en consola si hay mensajes guardados
window.addEventListener('DOMContentLoaded', () => {
  const mensajes = leer('mensajesContacto', []);
  if (mensajes.length > 0) {
    console.log('Mensajes guardados:', mensajes);
  }
});