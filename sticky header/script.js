

// Seleccionamos el elemento del encabezado
const header = document.querySelector('.sticky-header');

// Agregamos un evento de desplazamiento (scroll)
window.addEventListener('scroll', function() {
  // Verificamos si el desplazamiento vertical de la ventana es mayor que 0
  if (window.scrollY > 0) {
    // Si es mayor que 0, añadimos la clase "scrolled" al encabezado
    header.classList.add('scrolled');
  } else {
    // Si no es mayor que 0, removemos la clase "scrolled" del encabezado
    header.classList.remove('scrolled');
  }
});
