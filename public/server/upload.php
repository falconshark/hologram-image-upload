<?php
    $db_url = 'mysql:host=localhost;dbname=test;';
    $db = new PDO($db_url, );
    $request = file_get_contents('php://input');
    $files = json_decode($request);
    if($files){
        foreach($files as $file){
          $data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $file->preview));
          file_put_contents($file->name, $data);
        }
    }
?>
