import React, { useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function ChatPage() {
    const serverUrlRef = useRef(null);
    const userIdRef = useRef(null);
    const eventIdRef = useRef(null);
    const [checkStatus, setCheckStatus] = useState(false);
    const [messages, setMessages] = useState([]);
    const stompClientRef = useRef(null);

    const connectToServer = () => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            alert("Already connected!");
            return;
        }

        const serverUrl = serverUrlRef.current.value;
        const socket = new SockJS(serverUrl);
        stompClientRef.current = Stomp.over(socket);
    
        stompClientRef.current.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            const eventId = eventIdRef.current.value;
            stompClientRef.current.subscribe('/subscribe/check/' + eventId, (messageOutput) => {
                showMessageOutput(JSON.parse(messageOutput.body));
            });
        }, (error) => {
            alert('WebSocket Connection Error: ' + error);
            setTimeout(connectToServer, 5000);
        });
    };

    const sendMessage = () => {
        if (!stompClientRef.current || !stompClientRef.current.connected) {
            alert("WebSocket connection is not established. Please connect first.");
            return;
        }

        const chatRequest = {
            userId: userIdRef.current.value,
            checkStatus: checkStatus
        };
    
        const eventId = eventIdRef.current.value;
        stompClientRef.current.send("/topic/check/"+ eventId, {}, JSON.stringify(chatRequest));
    };

    const showMessageOutput = (messageOutput) => {
        setMessages(prevMessages => [...prevMessages, `${messageOutput.userId}: ${messageOutput.checkStatus}`]);
    };

    return (
        <div>
            <h2>Chat Test</h2>
            Server URL: <input type="text" ref={serverUrlRef} defaultValue="http://localhost:8080/ws-check" /><br />
            USER ID: <input type="text" ref={userIdRef} defaultValue="1" /><br />
            Check Status: <input type="checkbox" checked={checkStatus} onChange={e => setCheckStatus(e.target.checked)} /><br />
            Event ID: <input type="text" ref={eventIdRef} /><br />
            <button onClick={sendMessage}>Send</button>
            <button onClick={connectToServer}>Connect</button>

            <div style={{ border: '1px solid black', padding: '10px', marginTop: '20px', height: '300px', overflowY: 'scroll' }}>
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
        </div>
    );
}

export default ChatPage;
