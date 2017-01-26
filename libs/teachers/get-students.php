<?php

    try
    {
        require_once('../connection.php');
        $search = $conn->prepare('SELECT students.id, students.name, lessons.id as l_id FROM robocien_db.students, robocien_db.class, robocien_db.lessons WHERE students.class = :c AND lessons.lesson = :l AND students.id NOT IN (SELECT attendance.student FROM robocien_db.attendance WHERE attendance.data = :d)');
        $search->bindValue(':c', $_GET['c'], PDO::PARAM_STR);
        $search->bindValue(':l', $_GET['l'], PDO::PARAM_STR);
        $search->bindValue(':d', date('Y-m-d'), PDO::PARAM_STR);
        $search->execute();
        echo json_encode($search->fetchAll());
    }
    catch(PDOException $e)
    {
        echo 'Error:' . $e->getMessage();
    }

?>