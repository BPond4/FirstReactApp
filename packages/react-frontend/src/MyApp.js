import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from './Form';

function MyApp() {
    const [characters, setCharacters] = useState([]);

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
    }, [] );

    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
    
        return promise;
      }

    function updateList(person) { 
        postUser(person)
          .then((response) => {
            if(response.status === 201){
                response.json()
                    .then((userData) => {
                        setCharacters([...characters, userData])
                    })
            }
            else{
                throw new Error(`Unexpected status code: ${response.status}`);
            }
          })
          .catch((error) => {
            console.log(error);
          })
    }

    function removeOneCharacter(index) {
        const userIdToDelete = characters[index].id;
      
        // make a http delete request to the backend
        fetch(`http://localhost:8000/users/${userIdToDelete}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.status === 204) {
              // if the delete request was successful, update the state to remove the user from the frontend
              const updatedCharacters = characters.filter((character, i) => i !== index);
              setCharacters(updatedCharacters);
            } else {
              throw new Error(`Unexpected status code: ${response.status}`);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }


      

    return (
        <div className="container">
            <Table characterData={characters} 
                removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList} />
        </div>
    );
}

export default MyApp;