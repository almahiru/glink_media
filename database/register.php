<?php
include 'koneksi.php';
if (isset($_POST['register'])) {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $confirm_password = mysqli_real_escape_string($conn, $_POST['confirm_password']);
    // Cek username sudah ada atau belum
    $cek = mysqli_query($conn, "SELECT * FROM users WHERE username='$username'");
    if (mysqli_num_rows($cek) > 0) {
        echo "Username sudah digunakan!";
    } elseif ($password != $confirm_password) {
        echo "Konfirmasi password tidak cocok!";
    } else {
        // Enkripsi password
        $hash_password = password_hash($password, PASSWORD_DEFAULT);
        $query = "INSERT INTO users (username, password)
                  VALUES ('$username', '$hash_password')";
        if (mysqli_query($conn, $query)) {
            echo "<script>
                    alert('Registrasi berhasil!');
                    window.location='login.php';
                  </script>";
        } else {
            echo "Registrasi gagal: " . mysqli_error($conn);
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title id="title">Register</title>
</head>
<body>
    <h2>Form Register</h2>
    <form method="POST">
        <input type="text" name="username" placeholder="Username" required><br><br>
        <input type="password" name="password" placeholder="Password" required><br><br>
        <input type="password" name="confirm_password" placeholder="Konfirmasi Password" required><br><br>
        <button type="submit" name="register">Daftar</button>
    </form>
    <p>
        Sudah punya akun? <a href="login.php">Login</a>
    </p>
</body>
</html>