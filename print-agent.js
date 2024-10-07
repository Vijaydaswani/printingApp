const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Endpoint to receive print requests
app.post('/print', (req, res) => {
    const content = req.body.content;

    // Save the content to a local file
    const fs = require('fs');
    const filePath = 'receipt.txt';

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send('Error printing');
        }

        // Use system command to print the file
        exec(`lp ${filePath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing print: ${error.message}`);
                return res.status(500).send('Print failed');
            }
            console.log(`Print successful: ${stdout}`);
            res.send('Print successful');
        });
    });
});

// Start the local server
exports.start = function() {
    app.listen(port, () => {
        console.log(`Print agent running at http://localhost:${port}`);
    });
};
