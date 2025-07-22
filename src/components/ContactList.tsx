import { Contact } from '../types/Contact.tsx'

interface ContactListProps {
  contacts: Contact[]
  onDelete: (contact:Contact) => void
  onEdit: (contact: Contact) => void
}

function ContactList({ contacts, onDelete, onEdit }: ContactListProps) {
  return (
    <div className="contact-list">
      {contacts.length === 0 ? (
        <p className="empty-message">No hay contactos agregados</p>
      ) : (
        <ul>
          {contacts.map(contact => (
            <li key={contact.id} className="contact-item">
              <div>
                <strong>{contact.name}</strong>
                <strong> {contact.lastName}</strong>
                <span> - {contact.phone}</span>
                <span> - {contact.email}</span>
                
              </div>
              <div className="contact-actions">
                <button onClick={() => onEdit(contact)}>Editar</button>
                <button onClick={() => onDelete(contact)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ContactList