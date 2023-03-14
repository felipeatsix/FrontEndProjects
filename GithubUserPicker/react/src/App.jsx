import React, { useState } from 'react';
import './App.css'

function GithubUserPicker() {
    // Define default avatar variable
    const defaultImageUrl = "https://th.bing.com/th/id/OIP.1DLYAqE5UY19idJJOkFQegHaHa?pid=ImgDet&rs=1"

    // Define state variables
    const [inputValue, setInputValue] = useState("");
    const [name, setName] = useState("Name");
    const [username, setUsername] = useState("Username");
    const [imgSrc, setImgSrc] = useState(defaultImageUrl);
    const [status, setStatus] = useState("");

    // Define a function to be called to reset username, name and image fields
    const clearData = () => {
        setName("Name");
        setUsername("Username");
        setImgSrc(defaultImageUrl);
    }

    // Define a function to handle the user input
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    // Define function to handle the main event (when user click "GO" button)
    const handleSearchClick = () => {
        // Provide alert when user does not enter a valid input, reset fields and then return
        if (inputValue === "") {
            alert("You must provide a valid username");
            clearData();
            return;
        }
        // Provide status just before sending API request
        setStatus(`Searching for ${inputValue} on Github...`);
        // Send github API request
        fetch(`https://api.github.com/users/${inputValue}`)
            // If the request response is not ok, throw new error, otherwise return it in json format
            .then((result) => {
                if (!result.ok) {
                    throw new Error(`HTTP request has returned status ${result.status}`)
                }
                return result.json()
            })
            // Use the json response to set the variables name, username and image
            .then((result) => {
                setName(result.name);
                setUsername(`@${result.login}`);
                setImgSrc(result.avatar_url);
            })
            // Clear status
            .then(() => {
                setStatus("");
            })
            // Handle errors if any
            .catch((error) => {
                const errorMessage = "There was a problem with the fetch operation"
                setStatus(`${errorMessage}: ${error}`);
                console.error(errorMessage, error)
            })
        // Clear the user input field
        setInputValue("");
    }
    // render page
    return (
        <div>
            <div id="search">
                <label htmlFor="username">Github username</label>
                <input id="username" type="text" placeholder="Search github username" onChange={handleInputChange} />
                <button onClick={handleSearchClick}>GO</button>
            </div>
            <div id="card">
                <div id="details">
                    <img src={imgSrc} alt="User avatar" />
                    <span>{name}</span>
                    <span>{username}</span>
                </div>
            </div>
            <div id="status">{status}</div>
        </div>
    );
}

export default GithubUserPicker;