<?php
/**
 * save_config.php - Backend helper to overwrite config.json
 */
header('Content-Type: application/json');

// Security Warning: In a public production environment, you should add password 
// authentication here to prevent unauthorized changes to your config.

$json = file_get_contents('php://input');
$data = json_decode($json);

if ($data === null) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data received.']);
    exit;
}

$file = 'config.json';

// Create a backup of the existing config before overwriting
if (file_exists($file)) {
    copy($file, $file . '.bak');
}

if (file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT))) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to write to config.json. Check file permissions on the server.']);
}
?>