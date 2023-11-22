import { useState } from 'react';
import contactsData from './contacts.json';
import './App.css';

function App() {
  // Iteration 1: Display 5 contacts
  const firstContacts = contactsData.slice(0, 4);
  // const remainingContacts
  const [contacts, setContacts] = useState(firstContacts);
  console.log(contacts);

  // Iteration 3: Add Random Contacts
  // to-do: change random picker to get random contacts from the remaining contacts tha are still not showing
  const randomPicker = array => {
    let min = 5;
    let max = array.length;
    let random = Math.floor(Math.random() * (max - min) + min);
    return random;
  };

  const addContacts = () => {
    let newContact = contactsData[randomPicker(contactsData)];
    console.log(newContact);
    let updatedContacts = [...contacts, newContact];

    setContacts(updatedContacts);
  };

  const didWin = celeb => {
    if (!celeb.wonOscar && celeb.wonEmmy)
      return (
        <>
          <td> </td>
          <td>🌟</td>
        </>
      );
    else if (celeb.wonOscar && !celeb.wonEmmy)
      return (
        <>
          <td>🏆</td>
          <td> </td>
        </>
      );
    else if (celeb.wonOscar && celeb.wonEmmy)
      return (
        <>
          <td>🏆</td>
          <td>🌟</td>
        </>
      );
    else
      return (
        <>
          <td> </td>
          <td> </td>
        </>
      );
  };

  return (
    <div className='App'>
      <h1>IronContacts</h1>
      {/* Iteration 3: Add Random Contact button */}
      <button onClick={addContacts}>Add Random Contact</button>
      <table>
        <tbody>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            {/* Iteration 2: Add Oscar and Emmy info */}
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
          {contacts.map(contact => {
            return (
              <tr key={contact.id}>
                <td>
                  {/* Iteration 1: Display 5 contacts */}
                  <img src={contact.pictureUrl} alt='celeb picture' />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>

                {/* Iteration 2: Add Oscar and Emmy info */}
                {didWin(contact)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
