import { useState } from 'react'
import './App.css'

function App() {
    const [input, setInput] = useState("")
    const [items, setItems] = useState([]);

    const handleClick = () => {
        if (input === "") {
            alert("You must provide something!")
            return;
        }

        const newItem = {
            id: items.length,
            text: input,
            completed: false
        };
        setItems((prevItems) => [...prevItems, newItem]);
    };

    const handleRemove = (itemId) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }

    return (
        <div>
            <div className="header">
                <h1>My todo list</h1>
                <div className="fields">
                    <input type="text" placeholder="To do" onChange={(e) => setInput(e.target.value)} />
                    <button onClick={handleClick}>Add</button>
                </div>
            </div>
            <ul>
                {items.map((item) => (
                    <li
                        key={item.id}
                        className={item.completed ? "checked" : ""}
                        onClick={() =>
                            setItems((prevItems) =>
                                prevItems.map((prevItem) =>
                                    prevItem.id === item.id
                                        ? { ...prevItem, completed: !prevItem.completed }
                                        : prevItem
                                )
                            )
                        }
                    >
                        {item.text}
                        <button
                            onClick={() => handleRemove(item.id)}
                            className="removeButton">
                            X
                        </button>
                    </li>
                ))}

            </ul>
        </div>
    );
}

export default App;