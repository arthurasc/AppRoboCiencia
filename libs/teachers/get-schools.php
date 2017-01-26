<?php

    try
    {
        require_once('../connection.php');
        $search = $conn->prepare('SELECT schools.id, schools.school FROM robocien_db.schedule, robocien_db.class, robocien_db.schools WHERE class.id = schedule.class AND schools.id = class.school AND schedule.user = :u;');
        $search->bindValue(':u', $_GET['u'], PDO::PARAM_INT);
        $search->execute();
        echo json_encode($search->fetchAll());
    }
    catch(PDOException $e)
    {
        echo 'Error:' . $e->getMessage();
    }

?>