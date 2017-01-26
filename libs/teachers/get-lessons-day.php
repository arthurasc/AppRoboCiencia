<?php

    try
    {
        require_once('../connection.php');
        $search = $conn->prepare('SELECT attendance.lesson, attendance.data FROM robocien_db.attendance, robocien_db.students WHERE students.id = attendance.student AND attendance.user = :u AND students.class = :c ORDER BY attendance.data DESC');
        $search->bindValue(':u', $_GET['u'], PDO::PARAM_INT);
        $search->bindValue(':c', $_GET['c'], PDO::PARAM_INT);
        $search->execute();
        echo json_encode($search->fetchAll());
    }
    catch(PDOException $e)
    {
        echo 'Error:' . $e->getMessage();
    }

?>