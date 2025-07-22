import React, { useState, useEffect } from 'react';
import { Contact } from './types/Contact';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';
import './App.css'; 

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [displayedContacts, setDisplayedContacts] = useState<Contact[]>([]);

  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    if (lowercasedSearchTerm.length === 0) {
      setDisplayedContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(lowercasedSearchTerm) ||
        contact.phone.includes(lowercasedSearchTerm) ||
        contact.email?.toLowerCase().includes(lowercasedSearchTerm)
      );
      setDisplayedContacts(filtered);
    }
  }, [searchTerm, contacts]);

  const handleAddContact = (contact: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString()
    };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleDeleteRequest = (contact: Contact) => {
    setContactToDelete(contact); 
  };

  const handleConfirmDelete = () => {
    if (contactToDelete) { 
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactToDelete.id));

      if (editingContact && editingContact.id === contactToDelete.id) {
        setEditingContact(null);
      }
      setContactToDelete(null); 
    }
  };

  const handleCancelDelete = () => {
    setContactToDelete(null); 
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleUpdateContact = (updatedContact: Contact) => {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setEditingContact(null);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Agenda de Contactos</h1>
        <ThemeToggle />
      </header>

      <main className="app-main">
        <section className="form-section">
          <h2>{editingContact ? 'Editar Contacto' : 'Agregar Contacto'}</h2>
          <ContactForm
            onSubmit={handleAddContact}
            editingContact={editingContact}
            onUpdate={handleUpdateContact}
            onCancelEdit={handleCancelEdit}
          />
        </section>

        <section className="contacts-section">
          <h2>Lista de Contactos</h2>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <ContactList
            contacts={displayedContacts}
            onDelete={handleDeleteRequest}
            onEdit={handleEditContact}
          />
        </section>

      
        {contactToDelete && 
          <div className="confirmation-dialog-overlay">
            <div className="confirmation-dialog">
              <p>¿Está seguro que desea eliminar este Contacto: {contactToDelete.name} {contactToDelete.lastName}</p>
              <div className="dialog-actions">
                <button onClick={handleConfirmDelete} className="confirm-button">Sí, eliminar</button>
                <button onClick={handleCancelDelete} className="cancel-button">Cancelar</button>
              </div>
            </div>
          </div>
        }
      </main>
    </div>
  );
}

export default App;