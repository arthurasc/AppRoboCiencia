<?php

    try
    {
        require_once('../connection.php');
        $search = $conn->prepare('SELECT * FROM robocien_db.attendance WHERE student = :u');
        $search->bindValue(':u', $_GET['u'], PDO::PARAM_STR);
        $search->execute();
        echo json_encode($search->fetchAll());
    }
    catch(PDOException $e)
    {

    }

?>