<?php

    try
    {
        require_once('../connection.php');

        if(isset($_GET['u']))
        {
            $search = $conn->prepare('SELECT schedule.id, schedule.date, lessons.lesson FROM robocien_db.schedule, robocien_db.lessons WHERE schedule.class = :c AND schedule.user = :u AND MONTH(schedule.date) = :m AND lessons.id = schedule.lesson');
            $search->bindValue(':c', $_GET['c'], PDO::PARAM_STR);
            $search->bindValue(':u', $_GET['u'], PDO::PARAM_STR);
            $search->bindValue(':m', $_GET['m'], PDO::PARAM_STR);
            $search->execute();
            echo json_encode($search->fetchAll());
        }
        else if(isset($_GET['i']))
        {
            $delete = $conn->prepare('DELETE FROM robocien_db.schedule WHERE id = :i');
            $delete->bindValue(':i', $_GET['i'], PDO::PARAM_STR);
            $delete->execute();
        }

    }
    catch(PDOException $e)
    {
        echo 'Erro:' . $e->getMessage();
    }

?>