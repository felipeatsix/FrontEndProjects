import React, { useState } from 'react';
import './App.css'

function GithubUserPicker() {
    // Define default avatar variable
    const defaultImageUrl = 'https://th.bing.com/th/id/OIP.1DLYAqE5UY19idJJOkFQegHaHa?pid=ImgDet&rs=1'

    // Define state variables
    const [inputValue, setInputValue] = useState('');
    const [name, setName] = useState('Name');
    const [username, setUsername] = useState('Username');
    const [imgSrc, setImgSrc] = useState(defaultImageUrl);
    const [status, setStatus] = useState('');

    // Define a function to be called to reset username, name and image fields
    function clearData() {
        setImgSrc(defaultImageUrl);
        setUsername('Username');
        setName('Name');
    }

    // Define a function to handle the user input
    function handleInputChange(e) {
        setInputValue(e.target.value);
    }

    // Define function to handle the main event (when user click "GO" button)
    function handleSearchClick() {
        // Provide alert when user does not enter a valid input, reset fields and then return
        if (inputValue === '') {
            alert('You must provide a valid username!');
            clearData();
            return;
        }
        // Provide status just before sending API request
        setStatus(`Searching for user "${inputValue}" on Github...`);
        // Send github API request
        fetch(`https://api.github.com/users/${inputValue}`)
            // If the request response is not ok, throw new error, otherwise return response in json format.
            .then((result) => {
                if (!result.ok) {
                    throw new Error(`HTTP error! status: ${result.status}`);
                }
                return result.json();
            })
            // Use the json response to set the app name, username and image fields
            .then((result) => {
                setName(result.name);
                setUsername(`@${result.login}`);
                setImgSrc(result.avatar_url);
            })
            // Clear status
            .then(() => {
                setStatus('');
            })
            // Handle errors if any
            .catch((error) => {
                const errorMessage = 'There was a problem with the fetch operation';
                setStatus(`${errorMessage}: ${error}`);
                console.error(`${errorMessage}:`, error);
            });
        // Clear the user input field
        setInputValue('');
    }
    return (
        <div>
            <div id="search">
                <label>Github username</label>
                <input type="text" placeholder="Search github username" onChange={handleInputChange} />
                <button onClick={handleSearchClick}>GO</button>
            </div>
            <div id="card">
                <div id="details">
                    <img src={imgSrc} alt="User avatar" />
                    <label id="name">{name}</label>
                    <label id="username">{username}</label>
                </div>
            </div>
            <div id="status">{status}</div>
        </div>
    );
}

export default GithubUserPicker;
