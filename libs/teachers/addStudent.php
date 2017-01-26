<?php

    try
    {
        require_once('../connection.php');

        $req = "INSERT INTO robocien_db.students (id, name, personal_phone, class, year, parent, parent_phone) " .
            "VALUES (NULL, :n, :ph, :c, :y, :np, :pp)";

        $insert = $conn->prepare($req);
        $insert->bindValue(':n', $_GET['n'], PDO::PARAM_STR);
        $insert->bindValue(':ph', $_GET['ph'], PDO::PARAM_STR);
        $insert->bindValue(':c', $_GET['c'], PDO::PARAM_INT);
        $insert->bindValue(':y', $_GET['y'], PDO::PARAM_INT);
        $insert->bindValue(':np', $_GET['np'], PDO::PARAM_STR);
        $insert->bindValue(':pp', $_GET['pp'], PDO::PARAM_STR);

        if($insert->execute())
        {
            $lastId = $conn->lastInsertId();
            $insertAsUsu = $conn->prepare('INSERT INTO robocien_db.users VALUES(null, :u, :p, 3)');
            $insertAsUsu->bindValue(':u', explode(' ', $_GET['n'])[0], PDO::PARAM_STR);
            $insertAsUsu->bindValue(':p', $lastId, PDO::PARAM_STR);
            $insertAsUsu->execute();
        }

    }
    catch(PDOException $e)
    {
        echo 'Error:' . $e->getMessage();
    }

?>