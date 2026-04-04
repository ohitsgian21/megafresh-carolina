<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Only require the autoloader for PHPMailer
require "vendor/autoload.php";

// ── Load .env file (local development / shared hosting) ──────────────────────
// On production servers, set these as real server environment variables instead.
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') continue;
        if (strpos($line, '=') !== false) {
            [$key, $val] = explode('=', $line, 2);
            $key = trim($key);
            $val = trim($val, " \t\"'");
            if (!isset($_ENV[$key])) {
                $_ENV[$key] = $val;
                putenv("$key=$val");
            }
        }
    }
}

// ── Read credentials from environment (NEVER hardcode here) ──────────────────
$smtpUser      = $_ENV['MAIL_USERNAME']  ?? getenv('MAIL_USERNAME')  ?: '';
$smtpPass      = $_ENV['MAIL_PASSWORD']  ?? getenv('MAIL_PASSWORD')  ?: '';
$mailTo        = $_ENV['MAIL_TO']        ?? getenv('MAIL_TO')        ?: '';

if (!$smtpUser || !$smtpPass || !$mailTo) {
    http_response_code(500);
    echo "Error de configuración del servidor. Contacte al administrador.";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    // ── Input validation & sanitization ──────────────────────────────────────
    $name    = trim(htmlspecialchars($_POST['name']    ?? '', ENT_QUOTES, 'UTF-8'));
    $email   = trim(filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL));
    $subject = trim(htmlspecialchars($_POST['subject'] ?? '', ENT_QUOTES, 'UTF-8'));
    $message = trim(htmlspecialchars($_POST['message'] ?? '', ENT_QUOTES, 'UTF-8'));

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Por favor ingresa un correo electrónico válido.";
        exit;
    }

    // Enforce max lengths to prevent abuse
    if (strlen($name) > 100 || strlen($subject) > 200 || strlen($message) > 5000) {
        http_response_code(400);
        echo "Uno o más campos exceden el tamaño permitido.";
        exit;
    }

    if (!$name || !$email || !$subject || !$message) {
        http_response_code(400);
        echo "Por favor completa todos los campos requeridos.";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // SMTP configuration — credentials from environment only
        $mail->isSMTP();
        $mail->Host       = "smtp.gmail.com";
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtpUser;
        $mail->Password   = $smtpPass;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Sender and recipient
        $mail->setFrom($smtpUser, "Mega Fresh Carolina — Web Contact");
        $mail->addAddress($mailTo);

        // Reply to the customer's email so you can respond directly
        $mail->addReplyTo($email, $name);

        // Email content
        $mail->isHTML(true);
        $mail->Subject = "Contacto Web: " . $subject;
        $mail->Body    = "
            <h3 style='color:#CC0000;'>Nuevo Mensaje de Contacto — Mega Fresh Carolina</h3>
            <p><strong>Nombre:</strong> " . $name . "</p>
            <p><strong>Email:</strong> " . $email . "</p>
            <p><strong>Asunto:</strong> " . $subject . "</p>
            <p><strong>Mensaje:</strong><br>" . nl2br($message) . "</p>
        ";
        $mail->AltBody = "Nombre: $name\nEmail: $email\nAsunto: $subject\nMensaje: $message";

        $mail->send();
        http_response_code(200);
        echo "¡Gracias! Tu mensaje ha sido enviado correctamente.";

    } catch (Exception $e) {
        http_response_code(500);
        // Do NOT expose internal error details to the user
        error_log("PHPMailer error: " . $mail->ErrorInfo);
        echo "No se pudo enviar el mensaje. Por favor inténtalo de nuevo más tarde.";
    }
} else {
    http_response_code(405);
    echo "Acceso no autorizado.";
}
?>