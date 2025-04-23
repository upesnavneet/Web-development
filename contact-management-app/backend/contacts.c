#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "contacts.h"

// Helper function to load contacts into an array
int loadContacts(const char *filename, Contact contacts[], int maxContacts) 
{
    FILE *file = fopen(filename, "r");
    if (!file) 
    {
        printf("Error: Unable to open file '%s'.\n", filename);
        return 0;
    }

    int count = 0;
    char line[128];
    while (fgets(line, sizeof(line), file) && count < maxContacts) 
    {
        sscanf(line, "%49[^,],%49[^,],%14[^\n]", contacts[count].name, contacts[count].email, contacts[count].phone);
        count++;
    }
    fclose(file);
    return count;
}

// Helper function to save contacts from an array to a CSV file
void saveContacts(const char *filename, Contact contacts[], int count) 
{
    FILE *file = fopen(filename, "w");
    if (!file) 
    {
        printf("Error: Unable to open file '%s' for writing.\n", filename);
        return;
    }

    for (int i = 0; i < count; i++) 
    {
        fprintf(file, "%s,%s,%s\n", contacts[i].name, contacts[i].email, contacts[i].phone);
    }
    fclose(file);
}

// Function to add a contact
void addContact(const char *filename, Contact contact) 
{
    FILE *file = fopen(filename, "a");
    if (!file) 
    {
        printf("Error: Unable to open file '%s' for appending.\n", filename);
        return;
    }
    fprintf(file, "%s,%s,%s\n", contact.name, contact.email, contact.phone);
    fclose(file);
    printf("Contact added successfully.\n");
}

// Function to read and display all contacts
void readContacts(const char *filename) 
{
    FILE *file = fopen(filename, "r");
    if (!file) {
        printf("Error: Unable to open file '%s'.\n", filename);
        return;
    }

    char line[128];
    printf("Contacts:\n");
    while (fgets(line, sizeof(line), file)) 
    {
        printf("%s", line);
    }
    fclose(file);
}

// Function to update a contact
void updateContact(const char *filename, const char *searchName, Contact newContact) 
{
    Contact contacts[100];
    int count = loadContacts(filename, contacts, 100);
    int found = 0;

    for (int i = 0; i < count; i++) 
    {
        if (strcmp(contacts[i].name, searchName) == 0) 
        {
            contacts[i] = newContact;
            found = 1;
            break;
        }
    }

    if (!found) 
    {
        printf("Error: Contact '%s' not found.\n", searchName);
    } 
    else 
    {
        saveContacts(filename, contacts, count);
        printf("Contact updated successfully.\n");
    }
}

// Function to delete a contact
void deleteContact(const char *filename, const char *searchName) 
{
    Contact contacts[100];
    int count = loadContacts(filename, contacts, 100);
    int found = 0;

    FILE *file = fopen(filename, "w");
    if (!file) 
    {
        printf("Error: Unable to open file '%s' for writing.\n", filename);
        return;
    }

    for (int i = 0; i < count; i++) 
    {
        if (strcmp(contacts[i].name, searchName) == 0) 
        {
            found = 1;
        } 
        else 
        {
            fprintf(file, "%s,%s,%s\n", contacts[i].name, contacts[i].email, contacts[i].phone);
        }
    }
    fclose(file);

    if (found) 
    {
        printf("Contact deleted successfully.\n");
    } 
    else 
    {
        printf("Error: Contact '%s' not found.\n", searchName);
    }
}

// Function to search for a contact
void searchContact(const char *filename, const char *query) 
{
    Contact contacts[100];
    int count = loadContacts(filename, contacts, 100);
    int found = 0;

    printf("Search Results:\n");
    for (int i = 0; i < count; i++) 
    {
        if (strstr(contacts[i].name, query) || strstr(contacts[i].email, query) || strstr(contacts[i].phone, query)) 
        {
            printf("%s,%s,%s\n", contacts[i].name, contacts[i].email, contacts[i].phone);
            found = 1;
        }
    }

    if (!found) 
    {
        printf("No contacts found matching '%s'.\n", query);
    }
}

// Function to sort contacts by name
void sortContactsByName(const char *filename) 
{
    Contact contacts[100];
    int count = loadContacts(filename, contacts, 100);

    for (int i = 0; i < count - 1; i++) 
    {
        for (int j = 0; j < count - i - 1; j++) 
        {
            if (strcmp(contacts[j].name, contacts[j + 1].name) > 0) 
            {
                Contact temp = contacts[j];
                contacts[j] = contacts[j + 1];
                contacts[j + 1] = temp;
            }
        }
    }

    saveContacts(filename, contacts, count);
    printf("Contacts sorted by name.\n");
}