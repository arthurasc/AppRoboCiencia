<?php

    try
    {
        require_once('../connection.php');

        if(isset($_GET['m']))
        {
            $search = $conn->prepare('SELECT class.id, class.class, lessons.lesson, DAY(schedule.date) as date   FROM robocien_db.schedule, robocien_db.class, robocien_db.lessons WHERE class.id = schedule.class AND lessons.id = schedule.lesson AND schedule.user = :u AND class.school = :s AND MONTH(schedule.date) = :m ORDER BY class.class ASC;');
            $search->bindValue(':m', $_GET['m'], PDO::PARAM_INT);
        }
        else
        {
            $search = $conn->prepare('SELECT class.id, class.class, lessons.lesson, schedule.date FROM robocien_db.schedule, robocien_db.class, robocien_db.lessons WHERE class.id = schedule.class AND lessons.id = schedule.lesson AND schedule.user = :u AND class.school = :s AND MONTH(schedule.date) = MONTH(CURDATE()) ORDER BY class.class ASC;');
        }


        $search->bindValue(':u', $_GET['u'], PDO::PARAM_INT);
        $search->bindValue(':s', $_GET['s'], PDO::PARAM_INT);
        $search->execute();
        echo json_encode($search->fetchAll());
    }
    catch(PDOException $e)
    {
        echo 'Error:' . $e->getMessage();
    }

?>
