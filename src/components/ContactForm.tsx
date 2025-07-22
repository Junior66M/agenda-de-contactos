import React, { useState, useEffect } from 'react';
import { Contact } from '../types/Contact'; 

interface ContactFormProps {
  onSubmit: (contact: Omit<Contact, 'id'>) => void; 
  editingContact: Contact | null; 
  onUpdate: (contact: Contact) => void; 
  onCancelEdit: () => void; 
}

function ContactForm({ onSubmit, editingContact, onUpdate, onCancelEdit }: ContactFormProps) {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState(''); 
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(''); 


  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setLastName(editingContact.lastName);
      setPhone(editingContact.phone);
      setEmail(editingContact.email || '');
    } else {
      setName('');
      setLastName('');
      setPhone('');
      setEmail('');

    }
  }, [editingContact]); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 


    if (editingContact) {

      onUpdate({
        ...editingContact, 
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(), 
        lastName: lastName.trim(),
      });
    } else {
      onSubmit({
        name: name.trim(),
        lastName : lastName.trim(), 
        phone: phone.trim(),
        email: email.trim(),
        
      });
    }
    setName('');
    setLastName('');
    setPhone('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingrese el Nombre"
          required 
        />
      </div>

       <div className="form-group">
        <label htmlFor="lastName">Apellido:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Ingrese el Apellido"
          required 
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Teléfono:</label>
        <input
          type="tel" 
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Ingrese el Teléfono"
          required 
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email" 
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingrese el Email "
        />
      </div>

      <div className="form-actions">
        <button type="submit">
          {editingContact ? 'Actualizar Contacto' : 'Agregar Contacto'}
        </button>
        {editingContact && (
          <button type="button" onClick={onCancelEdit} className="cancel-button">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default ContactForm;