<?php

    try
    {
        require_once('../connection.php');
        $search = $conn->prepare('DELETE FROM robocien_db.class WHERE id = :i');
        $search->bindValue(':i', $_GET['i'], PDO::PARAM_INT);
        $search->execute();
    }
    catch(PDOException $e)
    {
        echo 'Error:' . $e->getMessage();
    }

?>