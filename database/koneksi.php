<?php
$host = "localhost:3306";
$username = "root";
$password = "root";
$database = "glinkmedia_db";
// Membuat koneksi
$conn = mysqli_connect($host, $username, $password, $database);
// Cek koneksi
if (!$conn) {
    die("Koneksi Database Gagal: " . mysqli_connect_error());
}
?>