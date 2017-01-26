<?php

    try
    {
        require_once('../connection.php');
        $search = $conn->prepare('SELECT * FROM robocien_db.schools ORDER BY school ASC');
        $search->execute();
        echo json_encode($search->fetchAll());
    }
    catch(PDOException $e)
    {
        echo 'Error:' . $e->getMessage();
    }

?>