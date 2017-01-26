<?php

    try
    {
        require_once('../connection.php');
        $insert = $conn->prepare('INSERT INTO robocien_db.class VALUES (null, :s, :c, "1");');
        $insert->bindValue(':s', $_GET['s'], PDO::PARAM_STR);
        $insert->bindValue(':c', $_GET['c'], PDO::PARAM_STR);

        if($insert->execute())
        {
            $search = $conn->prepare('SELECT * FROM robocien_db.class WHERE school = :s');
            $search->bindValue(':s', $_GET['s'], PDO::PARAM_INT);
            $search->execute();
            echo json_encode($search->fetchAll());
        }

    }
    catch(PDOException $e)
    {
        echo 'Error: ' . $e->getMessage();
    }

?>