import React, { useState } from 'react';
import'../stylesheets/Chat.css'; // Import the Chat CSS

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedManager, setSelectedManager] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const propertyManagers = [
        { name: "Human", id: "12M4", lastMessage: "ok thanks for contacting." },
        { name: "Hassan", id: "10N23", lastMessage: "I will let the owner know." },
        { name: "Salma", id: "00N02", lastMessage: "Thanks" },
        { name: "Bismah", id: "mer14", lastMessage: "Your Rent is reserved!" },
        { name: "Javald", id: "lun33", lastMessage: "Tu me dois des soes" },
        { name: "Mashall", id: "ven28", lastMessage: "Ok ça marche" },
        { name: "Kashan", id: "mer12", lastMessage: "On se redit" },
    ];

    const handleSend = () => {
        if (inputValue.trim()) {
            const newMessage = { text: inputValue, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            setMessages([...messages, newMessage]);
            setInputValue('');
            // Simulate a response from the property manager
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'Thank you for your message! We will get back to you shortly.', sender: 'manager', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
                ]);
            }, 1000);
        }
    };

    const handleManagerClick = (manager) => {
        setSelectedManager(manager);
        setMessages([]); // Clear messages when switching to a new manager
    };

    const filteredManagers = propertyManagers.filter((manager) =>
        manager.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="chat-page">
            {/* Left Sidebar - Property Managers List */}
            <div className="sidebar">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search Property Managers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="property-managers-list">
                    {filteredManagers.map((manager, index) => (
                        <div
                            key={index}
                            className={`manager-item ${selectedManager?.id === manager.id ? 'selected' : ''}`}
                            onClick={() => handleManagerClick(manager)}
                        >
                            <div className="manager-name">{manager.name}</div>
                            <div className="manager-last-message">{manager.lastMessage}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="chat-area">
                {/* Chat Header */}
                <div className="chat-header">
                    <h2>{selectedManager ? `Chat with ${selectedManager.name}` : 'Select a Property Manager'}</h2>
                </div>

                {/* Chat Body */}
                <div className="chat-body">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            <div className="message-text">{message.text}</div>
                            <div className="message-time">{message.time}</div>
                        </div>
                    ))}
                </div>

                {/* Chat Input Area */}
                {selectedManager && (
                    <div className="chat-input-container">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message..."
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;