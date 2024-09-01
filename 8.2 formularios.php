<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir y sanitizar datos del formulario
    $nombre = htmlspecialchars(trim($_POST['nombre']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $telefono = htmlspecialchars(trim($_POST['telefono']));
    $fecha_nacimiento = htmlspecialchars(trim($_POST['fecha_nacimiento']));
    $pais = htmlspecialchars(trim($_POST['pais']));
    $genero = htmlspecialchars(trim($_POST['genero']));
    $nivel_experiencia = htmlspecialchars(trim($_POST['nivel_experiencia']));
    $comentarios = htmlspecialchars(trim($_POST['comentarios']));
    $lenguajes = isset($_POST['lenguajes']) ? $_POST['lenguajes'] : [];

    // Procesar el archivo subido (si se ha subido)
    $cv = null;
    if (isset($_FILES['cv']) && $_FILES['cv']['error'] == 0) {
        $cv = $_FILES['cv']['name'];
        $cv_tmp = $_FILES['cv']['tmp_name'];
        $cv_destino = 'uploads/' . basename($cv); // Asegúrate de que la carpeta 'uploads' exista y tenga permisos de escritura
        move_uploaded_file($cv_tmp, $cv_destino);
    }

    // Mostrar datos recibidos (esto es para propósitos educativos; en producción, generalmente guardarías estos datos en una base de datos)
    echo "<h1>Datos recibidos</h1>";
    echo "<p><strong>Nombre:</strong> $nombre</p>";
    echo "<p><strong>Correo Electrónico:</strong> $email</p>";
    echo "<p><strong>Teléfono:</strong> $telefono</p>";
    echo "<p><strong>Fecha de Nacimiento:</strong> $fecha_nacimiento</p>";
    echo "<p><strong>País:</strong> $pais</p>";
    echo "<p><strong>Género:</strong> $genero</p>";
    echo "<p><strong>Nivel de Experiencia:</strong> $nivel_experiencia</p>";
    echo "<p><strong>Lenguajes de Programación Conocidos:</strong> " . implode(", ", $lenguajes) . "</p>";
    echo "<p><strong>Comentarios Adicionales:</strong> $comentarios</p>";

    if ($cv) {
        echo "<p><strong>Currículum Vitae Subido:</strong> <a href='$cv_destino'>$cv</a></p>";
    } else {
        echo "<p><strong>Currículum Vitae:</strong> No se ha subido ningún archivo.</p>";
    }
} else {
    echo "<p>No se ha enviado ningún formulario.</p>";
}
?>
