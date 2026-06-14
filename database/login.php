<!doctype html>
<html>
<head>
    <title id="title">Login</title>
    <link rel="stylesheet" href="..//assets/css/custem.css">
</head>
<body>
    <div class="box">
        <div class="box-login">
            <h2>Login</h2>
            <form class="login" action="proses_login.php" method="post">
                <label for="username">Username:</label>
                <br>
                <br>
                <input type="text" class="falud-login" name="username" required />
            <br />
        <label for="password">Password:</label>
        <br>
        <br>
        <input type="password" class="falud-login" name="password" required />
    <br />
<div class="button">
    <input type="submit" class="btn-login" value="Login" />
</div>
</form>
<p>
Belum punya akun? <a href="register.php">Register</a>
</p>
</div>
</div>
</body>
</html>