<?php
session_start();
include 'koneksi.php';

$username = mysqli_real_escape_string($conn, $_POST['username']);
$password = $_POST['password'];
$query = "SELECT * FROM users WHERE username='$username'";
$result = mysqli_query($conn, $query);
if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    if (password_verify($password, $row['password'])) {
        $_SESSION['login'] = true;
        $_SESSION['username'] = $row['username'];
        header("Location: halaman_utama.php");
        exit;
    } else {
        echo "Password salah";
    }
} else {
    echo "Username tidak ditemukan";
}
?>