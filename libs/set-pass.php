<?php

    try
    {
        require_once('connection.php');
        $update = $conn->prepare('UPDATE robocien_db.users SET pass = :p WHERE id = :i');
        $update->bindValue(':p', $_GET['p'], PDO::PARAM_STR);
        $update->bindValue(':i', $_GET['i'], PDO::PARAM_INT);
        $update->execute();
    }
    catch(PDOException $e)
    {
        echo 'Error:' . $e->getMessage();
    }

?>