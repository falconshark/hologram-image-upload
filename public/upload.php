<?php
    $request = file_get_contents('php://input');
    $files = json_decode($request);
    if($files){
        foreach($files as $file){
            var_dump($file);
        }
    }
?>
