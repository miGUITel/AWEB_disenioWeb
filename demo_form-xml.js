// Añade al HTML: un form#formulario y un pre#resultado.
// Opcional: un enlace a#descargar con download="solicitud.xml" y hidden.
// Carga este archivo con <script src="formulario-xml.js" defer></script>.
// Los controles necesitan name sencillos: nombre, correo, servicio...
// Usa letras sin tildes, números, guiones o guiones bajos; empieza por letra o _.
// Esta demo no admite archivos adjuntos.

const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");
const descargar = document.querySelector("#descargar");
let urlXML = null;

function limpiarResultado() {
  resultado.textContent = "Pulsa Enviar para generar el XML.";
  if (urlXML) URL.revokeObjectURL(urlXML);
  urlXML = null;
  if (descargar) {
    descargar.hidden = true;
    descargar.removeAttribute("href");
  }
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // Procesamos los datos aquí, en el navegador.
  limpiarResultado();

  const datos = new FormData(formulario);
  const xml = document.implementation.createDocument(null, "solicitud");
  const raiz = xml.documentElement;

  // El name del control se convierte en la etiqueta: <nombre>Ana</nombre>.
  // Al recorrer FormData se conservan los nombres repetidos (checkbox).
  for (const [nombre, valor] of datos) {
    if (typeof valor !== "string") {
      resultado.textContent = "Este ejemplo admite campos de texto, pero no archivos adjuntos.";
      return;
    }
    if (!/^[A-Za-z_][A-Za-z0-9_-]*$/.test(nombre)) {
      resultado.textContent = `El name "${nombre}" no sirve como etiqueta en este ejemplo. Usa nombres sencillos como nombre, correo o servicio.`;
      return;
    }
    const campo = xml.createElement(nombre);
    campo.textContent = valor;
    raiz.appendChild(xml.createTextNode("\n  "));
    raiz.appendChild(campo);
  }
  raiz.appendChild(xml.createTextNode("\n"));

  // El serializador convierte el árbol en texto y escapa caracteres como & y <.
  const contenido = '<?xml version="1.0" encoding="UTF-8"?>\n'
    + new XMLSerializer().serializeToString(xml);
  resultado.textContent = contenido;

  if (descargar) {
    const archivo = new Blob([contenido], { type: "application/xml;charset=utf-8" });
    urlXML = URL.createObjectURL(archivo);
    descargar.href = urlXML;
    descargar.hidden = false;
  }
});

// Si cambian los datos, el XML anterior deja de representar el formulario.
formulario.addEventListener("input", limpiarResultado);
formulario.addEventListener("reset", limpiarResultado);
