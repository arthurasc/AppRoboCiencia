<?php

    try
    {
        require_once('connection.php');
        $search = $conn->prepare('SELECT * FROM robocien_db.users WHERE user = :u AND pass = :p');
        $search->bindParam(':u', $_GET['u'], PDO::PARAM_STR);
        $search->bindParam(':p', $_GET['p'], PDO::PARAM_STR);
        $search->execute();
        echo json_encode($search->fetchAll());
    }
    catch(PDOException $e)
    {
        echo 'Error:' . $e->getMessage();
    }

?>