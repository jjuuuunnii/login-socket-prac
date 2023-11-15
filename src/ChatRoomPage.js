import React, { useState, useEffect } from 'react';

function ChatRoomPage({ match }) {
    const eventId = match.params.eventId;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetch(`/api/chatRooms/${eventId}/messages`)
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error("Error fetching messages:", error));
    }, [eventId]);

    const handleSendMessage = () => {
        // TODO: 서버로 메시지 전송 로직
    };

    return (
        <div>
            <h2>Chat Room: {eventId}</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg.userId}: {msg.message}</li>
                ))}
            </ul>
            <div>
                <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatRoomPage;
