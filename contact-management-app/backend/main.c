#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "contacts.h"

int main(int argc, char *argv[]) 
{
    if (argc < 2) 
    {
        printf("Usage: %s [command] [arguments...]\n", argv[0]);
        return 1;
    }

    const char *command = argv[1];
    const char *filename = "contacts.csv";

    if (strcmp(command, "add") == 0 && argc == 5) 
    {
        Contact newContact;
        strncpy(newContact.name, argv[2], sizeof(newContact.name));
        strncpy(newContact.email, argv[3], sizeof(newContact.email));
        strncpy(newContact.phone, argv[4], sizeof(newContact.phone));
        addContact(filename, newContact);
    } 
    else if (strcmp(command, "read") == 0) 
    {
        readContacts(filename);
    } 
    else if (strcmp(command, "update") == 0 && argc == 6) 
    {
        Contact updatedContact;
        strncpy(updatedContact.name, argv[3], sizeof(updatedContact.name));
        strncpy(updatedContact.email, argv[4], sizeof(updatedContact.email));
        strncpy(updatedContact.phone, argv[5], sizeof(updatedContact.phone));
        updateContact(filename, argv[2], updatedContact);
    } 
    else if (strcmp(command, "delete") == 0 && argc == 3) 
    {
        deleteContact(filename, argv[2]);
    } 
    else if (strcmp(command, "search") == 0 && argc == 3) 
    {
        searchContact(filename, argv[2]);
    } 
    else if (strcmp(command, "sort") == 0) 
    {
        sortContactsByName(filename);
    } 
    else 
    {
        printf("Invalid command or arguments.\n");
    }

    return 0;
}