<?php

    require_once('../connection.php');

    try
    {
        $remove = $con->prepare('DELETE FROM robocien_db.attendance WHERE id = :i');
        $remove->bindValue(':i', $_GET['i'], PDO::PARAM_STR);
        $remove->execute();
    }
    catch(PDOException $e)
    {
        echo 'Error:' . $e->getMessage();
    }

?>