<?php

    try
    {
        require_once('../connection.php');
        $search = $conn->prepare('SELECT * FROM robocien_db.class WHERE school = :s');
        $search->bindValue(':s', $_GET['s'], PDO::PARAM_STR);
        $search->execute();
        echo json_encode($search->fetchAll());
    }
    catch(PDOException $e)
    {
        echo 'Erro :' . $e->getMessage();
    }

?>