<?php

    header('Access-Control-Allow-Origin: *');

    try
    {
        $conn = new PDO('mysql:host=localhost;dbName=robocien_db', 'root', '');
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e)
    {
        echo 'Error:' . $e->getMessage();
    }

?>