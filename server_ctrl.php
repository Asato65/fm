<?php
  $cmd = $_POST["cmd"];

  switch($cmd) {
    case "delete":
      $filepath = $_POST['filepath'];
      unlink($filepath) ? exit("COMP") : exit("FAIL");
    case "rename":
      $filepath = $_POST['filepath'];
      $newfilepath = $_POST['newfilepath'];
      rename($filepath, $newfilepath) ? exit("COMP") : exit("FAIL");
    case "get_filelist":
      $path = $_POST["path"];
      // echo $path;
      $res = glob($path);
      // var_dump($res);
      // exit(json_encode($res));
      $res ? exit(json_encode($res)) : exit("FAIL");
    default:
      break;
  }