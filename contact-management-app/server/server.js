const express = require('express');
const { exec } = require('child_process');
const path = require('path');

// Create an Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Define the path to the contacts executable
const CONTACTS_EXECUTABLE = path.join(__dirname, '../backend/contacts.exe');

// Debug log to confirm valid executable path
console.log(`Using contacts executable at: ${CONTACTS_EXECUTABLE}`);

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Root route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Endpoint to add a contact
app.post('/add', (req, res) => {
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
        return res.status(400).send('Name, email, and phone are required.');
    }

    const command = `"${CONTACTS_EXECUTABLE}" add "${name}" "${email}" "${phone}"`;

    console.log(`Executing command: ${command}`);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${stderr}`);
            return res.status(500).send('Failed to add contact.');
        }

        res.send(stdout.trim());
    });
});

// Endpoint to read all contacts
app.get('/read', (req, res) => {
    const command = `"${CONTACTS_EXECUTABLE}" read`;

    console.log(`Executing command: ${command}`);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${stderr}`);
            return res.status(500).send('Failed to read contacts.');
        }

        // Parse and validate the output into an array of contact objects
        const contacts = stdout
            .split('\n')
            .filter(line => line.trim() !== '' && line.includes(',')) // Remove empty or invalid lines
            .map(line => {
                const [name, email, phone] = line.split(',');
                return {
                    name: name ? name.trim() : 'N/A',
                    email: email ? email.trim() : 'N/A',
                    phone: phone ? phone.trim() : 'N/A',
                };
            });

        res.json(contacts);
    });
});

// Endpoint to search for a contact
app.get('/search', (req, res) => {
    const query = req.query.query;

    // Validate query parameter
    if (!query) {
        return res.status(400).send('Search query is required.');
    }

    const command = `"${CONTACTS_EXECUTABLE}" search "${query}"`;

    console.log(`Executing command: ${command}`);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${stderr}`);
            return res.status(500).send('Failed to search contacts.');
        }

        // Parse and validate the output into an array of contact objects
        const results = stdout
            .split('\n')
            .filter(line => line.trim() !== '' && line.includes(',')) // Remove empty or invalid lines
            .map(line => {
                const [name, email, phone] = line.split(',');
                return {
                    name: name ? name.trim() : 'N/A',
                    email: email ? email.trim() : 'N/A',
                    phone: phone ? phone.trim() : 'N/A',
                };
            });

        res.json(results);
    });
});

// Endpoint to update a contact
app.put('/update', (req, res) => {
    const { searchName, newName, newEmail, newPhone } = req.body;

    // Validate required fields
    if (!searchName || (!newName && !newEmail && !newPhone)) {
        return res.status(400).send('Search name and at least one field to update are required.');
    }

    const command = `"${CONTACTS_EXECUTABLE}" update "${searchName}" "${newName || ''}" "${newEmail || ''}" "${newPhone || ''}"`;

    console.log(`Executing command: ${command}`);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${stderr}`);
            return res.status(500).send('Failed to update contact.');
        }

        res.send(stdout.trim());
    });
});

// Endpoint to delete a contact
app.delete('/delete', (req, res) => {
    const { searchName } = req.body;

    // Validate required fields
    if (!searchName) {
        return res.status(400).send('Name to delete is required.');
    }

    const command = `"${CONTACTS_EXECUTABLE}" delete "${searchName}"`;

    console.log(`Executing command: ${command}`);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${stderr}`);
            return res.status(500).send('Failed to delete contact.');
        }

        res.send(stdout.trim());
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});