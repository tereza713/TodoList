<?php
require_once __DIR__ . "/assets/database/conn.php";
$tasks = [];
$sql = $pdo->query("SELECT * FROM task ORDER BY id ASC");

if($sql->rowCount()>0){
    $tasks = $sql -> fetchAll(PDO::FETCH_ASSOC);
}
?><!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de tarefas</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <header></header>
    <main>
     <section id="list">
        <h1>Preciso fazer...</h1>
        <form action="/assets/php/create.php" method="POST" id="toDoTaskForm">
            <input name="descriptionInput" placeholder="Digite sua tarefa aqui" required>
            <button type="submit" class="add">
                <i class="fa-solid fa-plus"></i>
            </button>
        </form>

        <ul id="tasks">
            <?php foreach($tasks as $task):?>
            <li class="task" data-id="<?= $task['id'] ?>">
                <div class="infoTask">
                <input 
                    type="checkbox"
                    name="pending"
                    class="progress <?= $task['completed'] ? 'done' : "" ?>"
                    <?= $task['completed'] ? 'checked' : "" ?>
                    data-id="<?= $task['id'] ?>"
                    >
                    <p class="descriptionTask">
                        <?= $task["description"] ?>
                    </p>
                </div>
                <div class="taskActions">
                        <a href="" class="editButton">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="assets/php/delete.php?id=<?=$task['id']?>" class="deleteButton">
                            <i class="fa-solid fa-trash"></i>
                        </a>
                </div>

                <form action="/assets/php/update.php" method="POST" class="editTaskForm" hidden>
                    <input type="text" name="descriptionEditInput" placeholder="Edite sua tarefa aqui" value="<?=$task['description']?>">
                    <input type="hidden" name="id" class="hidden" value="<?= $task["id"] ?>">
                    <button type="submit" class="confirmEdit">
                            <i class="fa-solid fa-check"></i>
                    </button>
                </form>
            </li>
            <?php endforeach?>
        </ul>
    </section>
</main>

  <script src="/assets/js/script.js"></script>
</body>
</html>