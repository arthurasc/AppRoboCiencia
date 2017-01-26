<?php

    try
    {
        require_once('../connection.php');

        $insert = $conn->prepare('INSERT INTO robocien_db.attendance VALUES (null, :u, :s, :l, :d, :h, 0, "")');

        $insert->bindValue(':u', $_GET['u'], PDO::PARAM_INT);
        $insert->bindValue(':s', $_GET['s'], PDO::PARAM_INT);
        $insert->bindValue(':l', $_GET['l'], PDO::PARAM_STR);
        $insert->bindValue(':d', date('Y-m-d'), PDO::PARAM_STR);
        $insert->bindValue(':h', strftime('%H:%M'), PDO::PARAM_STR);

        if($insert->execute())
        {
            echo $conn->lastInsertId();
        }

    }
    catch(PDOException $e)
    {
        echo 'Error:' . $e->getMessage();
    }

?>