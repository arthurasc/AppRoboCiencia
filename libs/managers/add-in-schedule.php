<?php

    try
    {
        require_once('../connection.php');

        $insert = $conn->prepare('INSERT INTO robocien_db.schedule VALUES(null, :u, :c, :l, :d)');
        $insert->bindValue(':u', $_GET['u'], PDO::PARAM_STR);
        $insert->bindValue(':c', $_GET['c'], PDO::PARAM_STR);
        $insert->bindValue(':l', $_GET['l'], PDO::PARAM_STR);
        $insert->bindValue(':d', date('Y-m-d'), PDO::PARAM_STR);
        $insert->execute();
    }
    catch(PDOException $e)
    {
        echo 'Error: ' . $e->getMessage();
    }

?>