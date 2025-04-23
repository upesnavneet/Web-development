const BASE_URL = "http://localhost:3000";

// Add Contact
function addContact() {
    const name = document.getElementById("add-name").value.trim();
    const email = document.getElementById("add-email").value.trim();
    const phone = document.getElementById("add-phone").value.trim();

    if (!name || !email || !phone) {
        alert("All fields are required!");
        return;
    }

    fetch(`${BASE_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
    })
        .then((response) => response.text())
        .then((message) => {
            alert(message);
            listContacts(); // Refresh contacts after adding
        })
        .catch((error) => console.error("Error:", error));
}

// List Contacts
function listContacts() {
    fetch(`${BASE_URL}/read`)
        .then((response) => response.json())
        .then((contacts) => {
            const contactsList = document.getElementById("contacts-list");

            // Clear previous content
            contactsList.innerHTML = "";

            if (contacts.length === 0) {
                contactsList.textContent = "No contacts available.";
                return;
            }

            // Create a table to display contacts
            const table = document.createElement("table");
            table.className = "contacts-table"; // Add a CSS class for styling
            table.innerHTML = `
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
            `;

            contacts.forEach((contact) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${contact.name || "N/A"}</td>
                    <td>${contact.email || "N/A"}</td>
                    <td>${contact.phone || "N/A"}</td>
                `;
                table.appendChild(row);
            });

            contactsList.appendChild(table);
        })
        .catch((error) => console.error("Error:", error));
}

// Sort Contacts
function sortContactsFrontend() {
    fetch(`${BASE_URL}/read`)
        .then((response) => response.json())
        .then((contacts) => {
            // Sort contacts alphabetically by name
            contacts.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });

            // Display sorted contacts
            const contactsList = document.getElementById("contacts-list");
            contactsList.innerHTML = ""; // Clear the existing list

            // Create a table to display contacts
            const table = document.createElement("table");
            table.className = "contacts-table";
            table.innerHTML = `
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
            `;

            contacts.forEach((contact) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${contact.name || "N/A"}</td>
                    <td>${contact.email || "N/A"}</td>
                    <td>${contact.phone || "N/A"}</td>
                `;
                table.appendChild(row);
            });

            contactsList.appendChild(table);
        })
        .catch((error) => console.error("Error:", error));
}

// Search Contacts
function searchContact() {
    const query = document.getElementById("search-query").value.trim();

    if (!query) {
        alert("Please enter a search query.");
        return;
    }

    fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`)
        .then((response) => response.json())
        .then((data) => {
            const searchResults = document.getElementById("search-results");

            // Clear previous search results
            searchResults.innerHTML = "";

            if (data.length === 0) {
                searchResults.textContent = "No contacts found.";
                return;
            }

            // Create a list to display search results
            const list = document.createElement("ul");
            data.forEach((contact) => {
                const item = document.createElement("li");
                item.textContent = `Name: ${contact.name}, Email: ${contact.email}, Phone: ${contact.phone}`;
                list.appendChild(item);
            });

            searchResults.appendChild(list);
        })
        .catch((error) => console.error("Error:", error));
}

// Update Contact
function updateContact() {
    const searchName = document.getElementById("update-search-name").value.trim();
    const newName = document.getElementById("update-new-name").value.trim();
    const newEmail = document.getElementById("update-new-email").value.trim();
    const newPhone = document.getElementById("update-new-phone").value.trim();

    if (!searchName) {
        alert("Search name is required.");
        return;
    }

    fetch(`${BASE_URL}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchName, newName, newEmail, newPhone }),
    })
        .then((response) => response.text())
        .then((message) => {
            alert(message);
            listContacts(); // Refresh contacts after updating
        })
        .catch((error) => console.error("Error:", error));
}

// Delete Contact
function deleteContact() {
    const name = document.getElementById("delete-name").value.trim();

    if (!name) {
        alert("Name to delete is required.");
        return;
    }

    fetch(`${BASE_URL}/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchName: name }),
    })
        .then((response) => response.text())
        .then((message) => {
            alert(message);
            listContacts(); // Refresh contacts after deleting
        })
        .catch((error) => console.error("Error:", error));
}

// Initial fetch for listing contacts
listContacts();