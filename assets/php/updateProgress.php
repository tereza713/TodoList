<?php
require_once __DIR__ . "/../database/conn.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;
    $completed = $_POST['completed'] ?? null;

    if ($id !== null && $completed !== null) {
        $stmt = $pdo->prepare("UPDATE task SET completed = ? WHERE id = ?");
        $stmt->execute([$completed, $id]);
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Dados incompletos']);
    }
}

