<?php

    try
    {
        require_once('../connection.php');
        $search = $conn->prepare('SELECT attendance.data, students.id, students.name FROM robocien_db.attendance, robocien_db.students WHERE students.id = attendance.student AND students.class = :c ORDER BY attendance.data DESC, students.name ASC;');
        $search->bindValue(':c', $_GET['c'], PDO::PARAM_STR);
        $search->execute();
        echo json_encode($search->fetchAll());
    }
    catch(PDOException $e)
    {
        echo 'Error:' . $e->getMessage();
    }

?>