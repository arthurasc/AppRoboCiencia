<?php

    try
    {
        require_once('../connection.php');
        $insert = $conn->prepare('INSERT INTO robocien_db.schools VALUES (null, :s, :r, :t)');
        $insert->bindValue(':s', $_GET['s'], PDO::PARAM_STR);
        $insert->bindValue(':r', $_GET['r'], PDO::PARAM_STR);
        $insert->bindValue(':t', $_GET['t'], PDO::PARAM_STR);
        $insert->execute();
    }
    catch(PDOException $e)
    {
        echo 'Error: ' . $e->getMessage();
    }

?>