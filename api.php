<?php
  $user = $_GET['user'];
  $pwd = $_GET['pwd'];

  $pwds = [
    'andrea' => 'test',
    'riccardo' => 'test2'
  ];

  if($pwd != $pwds[$user]) {
    echo("Wrong code.");
    return 1;
  }



  $datas = json_encode(json_decode($_GET['datas']));
  $file = fopen("api.json", "w") or die ("Error while saving.");
  fwrite($file, $datas);
  fclose($file);

  echo("Saved.");
?>
