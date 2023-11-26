import { useState } from 'react';
import contactsData from './contacts.json';
import './App.css';

// total = 52 contacts

function App() {
  // Iteration 1: Display 5 contacts
  const firstContacts = contactsData.slice(0, 5);
  const [contacts, setContacts] = useState(firstContacts);

  // create an array with remaining contacts that will also be updated
  const remainingContacts = contactsData.slice(5);
  const [remaining, setRemaining] = useState(remainingContacts);

  // Iteration 3: Add Random Contacts
  const randomPicker = array => {
    let min = 0;
    let max = array.length;
    let random = Math.floor(Math.random() * (max - min) + min);

    return array[random]; // should return an object
  };

  const addContacts = () => {
    // create a new contact
    let newContact = randomPicker(remaining);

    // update the contacts list with new contact
    let updatedContacts = [...contacts, newContact];

    // and remove it from the remaining list
    const remainingCopy = [...remaining];
    const newContactIndex = remainingCopy.indexOf(newContact);
    remainingCopy.splice(newContactIndex, 1);

    // update the state
    setContacts(updatedContacts);
    setRemaining(remainingCopy);
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

  // Iteration 4: Sort by name
  const sortByName = () => {
    const abcOrder = (a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      else return 0;
    };

    const sortedContactsByName = contacts.sort(abcOrder);

    setContacts([...sortedContactsByName]);
  };

  // Iteration 4: Sort by popularity
  const sortByPop = () => {
    const sortedContactsByPop = contacts.sort(
      (a, b) => b.popularity - a.popularity
    );
    // needs to be created a shallow copy
    setContacts([...sortedContactsByPop]);
  };

  // Iteration 5: Delete button
  const deleteContact = id => {
    const filteredContacts = contacts.filter(contact => {
      return id !== contact.id;
    });

    setContacts(filteredContacts);
  };

  return (
    <div className='App'>
      <h1>IronContacts</h1>
      {/* Iteration 3: Add Random Contact button */}
      <button onClick={addContacts}>Add Random Contact</button>
      {/* Iteration 4: Sort by Name & Popularity */}
      <button onClick={sortByName}>Sort by name</button>
      <button onClick={sortByPop}>Sort by popularity</button>
      <table>
        <tbody>
          <tr className='table-header'>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            {/* Iteration 2: Add Oscar and Emmy info */}
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
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

                {/* Iteration 5: Delete button */}
                <td>
                  <button onClick={() => deleteContact(contact.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
