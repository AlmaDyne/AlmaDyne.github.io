<?php
/*ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);*/

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'mail/Exception.php';
require 'mail/PHPMailer.php';
require 'mail/SMTP.php';

function problem($error)
{
    echo "We are very sorry, but there were error(s) found with the form you submitted. ";
    echo "These errors appear below.<br><br>";
    echo $error . "<br><br>";
    echo "Please go back and fix these errors.<br><br>";
    die();
}

function clean_string($string)
{
    $bad = array("content-type", "bcc:", "to:", "cc:", "href");
    return str_replace($bad, "", $string);
}

if (isset($_POST['email'])) {
    // validation expected data exists
    if (
        !isset($_POST['name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['subject']) ||
        !isset($_POST['message'])
    ) {
        problem('We are sorry, but there appears to be a problem with the form you submitted.');
    }

    //$email_to = "almadyne.music@gmail.com";
    $email_to = "kastro.delcorpego@yandex.ru";
    $email_from = clean_string($_POST['email']);
    $name = clean_string($_POST['name']);
    $subject = clean_string($_POST['subject']);
    $message = clean_string($_POST['message']);
    $message .= "<br><br>Имя отправителя: " . $name;
    $message .= "<br>Адрес отправителя: " . $email_from;

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

    if (!preg_match($email_exp, $email_from)) {
        $error_message .= 'The Email address you entered does not appear to be valid.<br>';
    }

    $string_exp = "/^[\p{L} .'-]+$/u";

    if (!preg_match($string_exp, $name)) {
        $error_message .= 'The Name you entered does not appear to be valid.<br>';
    }

    if (strlen($message) < 2) {
        $error_message .= 'The Message you entered do not appear to be valid.<br>';
    }

    if (strlen($error_message) > 0) {
        problem($error_message);
    }

    $mail = new PHPMailer(true);
    //$mail->SMTPDebug = 4;

    try {
        //Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.yandex.ru';
        $mail->SMTPAuth   = true;
        $mail->Username = $email_to;
        $config = require '../config.php';
        $mail->Password = $config['mail_password'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        //Recipients
        $mail->setFrom($email_to, $name);
        $mail->addAddress($email_to, 'ATD');
        $mail->addReplyTo($email_from, $name);

        //Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        //echo "<script>console.log('" . $mail->Username . "');</script>";

        $mail->send();
        echo "<h3>Сообщение было отправлено. Вы будете перенаправлены на главную страницу через <span id='countdown'>10</span> секунд.</h3>";
        echo "<script>
            const countdownDisplay = document.getElementById('countdown');
            const timeInterval = 1000;
            let seconds = 10;

            setTimeout(function countdownToChangeLocation() {
                seconds--;
                countdownDisplay.textContent = seconds;

                if (seconds > 0) {
                    setTimeout(countdownToChangeLocation, timeInterval);
                } else {
                    window.location.href = 'index.html';
                }
            }, timeInterval);
        </script>";
    } catch (Exception $e) {
        echo "Сообщение не было отправлено. Описание ошибки: {$mail->ErrorInfo}";
    }
}
?>
