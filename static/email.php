<?php
error_reporting(0);

if(isset($_POST["submit"])) {
    // Checking For Blank Fields..
    if($_POST["name"]==""||$_POST["email"]==""||$_POST["message"]=="") {
        echo '<div class="success serr">Fill All Fields.</div>';
    } else {
        $name = $_POST["name"];
        // Check if the "Sender's Email" input field is filled out
        $email = $_POST['email'];
        // Sanitize E-mail Address
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        // Validate E-mail Address
        $email= filter_var($email, FILTER_VALIDATE_EMAIL);
        if (!$email) {
            echo '<div class="success serr">Invalid Email</div>';
        }
        else {
            $subject = "Contact Form from " . $name . " (IP: " . $_SERVER['REMOTE_ADDR'] . ")";
            $message = $_POST['message'];
            $headers = 'From:'. $email . "\r\n"; // Sender's Email
            $headers .= 'Cc:'. $email . "\r\n"; // Carbon copy to Sender
            // Message lines should not exceed 70 characters (PHP rule), so wrap it
            $message = wordwrap($message, 70);
            // Send Mail By PHP Mail Function
            mail("peter@abbondanzo.com", $subject, $message, $headers);
            echo "peter@abbondanzo.com", $subject, $message, $headers;
            echo '<div class="success sdone">Your mail has been sent successfully! We will be in touch soon</div>';
        }
    }
}
?>
