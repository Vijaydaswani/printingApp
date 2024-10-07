<?php
// Content for the receipt
$receiptContent = "Receipt\n";
$receiptContent .= "-----------------\n";
$receiptContent .= "Item 1: $10\n";
$receiptContent .= "Item 2: $15\n";
$receiptContent .= "Total: $25\n";

// Send the receipt content to the local print agent
$url = 'http://localhost:3000/print';

$data = json_encode([
    'content' => $receiptContent
]);

$options = [
    'http' => [
        'header'  => "Content-Type: application/json\r\n",
        'method'  => 'POST',
        'content' => $data,
    ],
];

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === FALSE) {
    die('Error sending print request');
}

echo 'Receipt sent to the printer!';
?>
