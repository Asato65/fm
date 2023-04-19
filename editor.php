<!DOCTYPE html>
<html lang="ja">
<html>

<head>
  <meta charset="UTF-8">
  <title>editor</title>
  <link rel="stylesheet" href="main.css">
  <script src="main.js"></script>
</head>

<body>
  <main>
    PATH: <?php echo $_GET["path"]; ?><br>
    FILENAME: <?php echo $_GET["filename"]; ?><br>
    <?php echo "./".$_GET["path"]."/".$_GET["filename"]; ?><br>
    <textarea><?php
        $file = file_get_contents("./".$_GET["path"]."/".$_GET["filename"]);
        echo htmlspecialchars($file);
      ?></textarea>
  </main>
</body>

</html>
