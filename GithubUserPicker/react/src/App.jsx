import React, { useState } from 'react';
import './App.css'

function GithubUserPicker() {
    const defaultImageUrl = 'https://th.bing.com/th/id/OIP.1DLYAqE5UY19idJJOkFQegHaHa?pid=ImgDet&rs=1'

    const [inputValue, setInputValue] = useState('');
    const [name, setName] = useState('Name');
    const [username, setUsername] = useState('Username');
    const [imgSrc, setImgSrc] = useState(defaultImageUrl);
    const [status, setStatus] = useState('');

    function clearData() {
        setImgSrc(defaultImageUrl);
        setUsername('Username');
        setName('Name');
    }

    function handleInputChange(e) {
        setInputValue(e.target.value);
    }

    function handleSearchClick() {
        if (inputValue === '') {
            alert('You must provide a valid username!');
            clearData();
            return;
        }
        setStatus(`Searching for user "${inputValue}" on Github...`);
        fetch(`https://api.github.com/users/${inputValue}`)
            .then((result) => {
                if (!result.ok) {
                    throw new Error(`HTTP error! status: ${result.status}`);
                }
                return result.json();
            })
            .then((result) => {
                setName(result.name);
                setUsername(`@${result.login}`);
                setImgSrc(result.avatar_url);
            })
            .then(() => {
                setStatus('');
            })
            .catch((error) => {
                const errorMessage = 'There was a problem with the fetch operation';
                setStatus(`${errorMessage}: ${error}`);
                console.error(`${errorMessage}:`, error);
            });
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
