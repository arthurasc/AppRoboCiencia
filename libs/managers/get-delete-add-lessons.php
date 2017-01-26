<?php

    try
    {
        require_once('../connection.php');

        if(isset($_GET['get']))
        {
            $search = $conn->prepare('SELECT * FROM robocien_db.lessons ORDER BY lesson ASC');
            $search->execute();
            echo json_encode($search->fetchAll());
        }
        else if(isset($_GET['i']))
        {
            $delete = $conn->prepare('DELETE FROM robocien_db.lessons WHERE id = :i');
            $delete->bindValue(':i', $_GET['i'], PDO::PARAM_INT);
            $delete->execute();
        }
        else if(isset($_GET['l']))
        {
            $insert = $conn->prepare('INSERT INTO robocien_db.lessons VALUES (null, :l, :n)');
            $insert->bindValue(':l', $_GET['l'], PDO::PARAM_STR);
            $insert->bindValue(':n', $_GET['n'], PDO::PARAM_STR);
            if($insert->execute())
            {
                $result = $conn->prepare('SELECT * FROM robocien_db.lessons ORDER BY lesson ASC');
                $result->execute();
                echo json_encode($result->fetchAll());
            }
        }
    }
    catch(PDOException $e)
    {
        echo 'Error: ' . $e->getMessage();
    }

?>