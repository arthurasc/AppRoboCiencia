<?php

    try
    {
        require_once('../connection.php');
        $update = $conn->prepare('UPDATE robocien_db.attendance SET stars = :s AND obs = :o WHERE id = :i');
        $update->bindValue(':s', $_GET['s'], PDO::PARAM_STR);
        $update->bindValue(':o', $_GET['o'], PDO::PARAM_STR);
        $update->bindValue(':i', $_GET['i'], PDO::PARAM_STR);
        $update->execute();
    }
    catch(PDOException $e)
    {
        echo 'Erro:' . $e->getMessage();
    }

?>