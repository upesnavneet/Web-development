#ifndef CONTACTS_H
#define CONTACTS_H

// Structure to represent a contact
typedef struct {
    char name[50];
    char email[50];
    char phone[15];
} Contact;

// Function declarations
void addContact(const char *filename, Contact contact);
void readContacts(const char *filename);
void updateContact(const char *filename, const char *searchName, Contact newContact);
void deleteContact(const char *filename, const char *searchName);
void searchContact(const char *filename, const char *query);
void sortContactsByName(const char *filename);

#endif