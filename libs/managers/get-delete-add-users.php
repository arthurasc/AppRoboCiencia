<?php

    try
    {
        require_once('../connection.php');

        if(isset($_GET['get']))
        {
            $search = $conn->prepare('SELECT * FROM robocien_db.users ORDER BY user ASC');
            $search->execute();
            echo json_encode($search->fetchAll());
        }
        else if(isset($_GET['i']))
        {
            $delete = $conn->prepare('DELETE FROM robocien_db.users WHERE id = :i');
            $delete->bindValue(':i', $_GET['i'], PDO::PARAM_INT);
            $delete->execute();
        }
        else if(isset($_GET['u']))
        {
            $insert = $conn->prepare('INSERT INTO robocien_db.users VALUES (null, :u, "0000", :a)');
            $insert->bindValue(':u', $_GET['u'], PDO::PARAM_STR);
            $insert->bindValue(':a', $_GET['a'], PDO::PARAM_STR);
            if($insert->execute())
            {
                $result = $conn->prepare('SELECT * FROM robocien_db.users ORDER BY user ASC');
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