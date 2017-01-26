<?php

    try
    {
        require_once('../connection.php');
        $delete = $conn->prepare('DELETE FROM robocien_db.schools WHERE id = :i');
        $delete->bindValue(':i', $_GET['i'], PDO::PARAM_STR);
        $delete->execute();
    }
    catch(PDOException $e)
    {
        echo 'Error: ' . $e->getMessage();
    }

?>