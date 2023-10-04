import React, { useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function ChatPage() {
    const serverUrlRef = useRef(null);
    const senderIdRef = useRef(null);
    const receiverIdRef = useRef(null);
    const roomIdRef = useRef(null);
    const messageRef = useRef(null);
    const chatAreaRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const stompClientRef = useRef(null);

    const connectToServer = () => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            console.warn("Already connected!");
            return;
        }

        const serverUrl = serverUrlRef.current.value;
        const socket = new SockJS(serverUrl);
        stompClientRef.current = Stomp.over(socket);
    
        stompClientRef.current.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            const roomId = roomIdRef.current.value;
            stompClientRef.current.subscribe('/subscribe/rooms/' + roomId, (messageOutput) => {
                showMessageOutput(JSON.parse(messageOutput.body));
            });
        }, (error) => {
            console.error('WebSocket Connection Error: ', error);
            setTimeout(connectToServer, 5000); // 연결이 끊어질 경우 5초 후에 재연결 시도
        });
    };

    const sendMessage = () => {
        if (!stompClientRef.current || !stompClientRef.current.connected) {
            console.error("WebSocket connection is not established. Please connect first.");
            return;
        }

        const chatRequest = {
            senderId: senderIdRef.current.value,
            receiverId: [receiverIdRef.current.value],
            roomId: roomIdRef.current.value,
            message: messageRef.current.value
        };
    
        stompClientRef.current.send("/app/messages", {}, JSON.stringify(chatRequest));
    };

    const showMessageOutput = (messageOutput) => {
        setMessages(prevMessages => [...prevMessages, `${messageOutput.senderId}: ${messageOutput.message}`]);
    };

    return (
        <div>
            <h2>Chat Test</h2>
            Server URL: <input type="text" ref={serverUrlRef} defaultValue="http://localhost:8080/ws-connection" /><br />
            Sender ID: <input type="text" ref={senderIdRef} defaultValue="1" /><br />
            Receiver ID: <input type="text" ref={receiverIdRef} defaultValue="2" /><br />
            Room ID: <input type="text" ref={roomIdRef} defaultValue="1001" /><br />
            Message: <input type="text" ref={messageRef} /><br />
            <button onClick={sendMessage}>Send</button>
            <button onClick={connectToServer}>Connect</button>

            <div ref={chatAreaRef} style={{ border: '1px solid black', padding: '10px', marginTop: '20px', height: '300px', overflowY: 'scroll' }}>
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
        </div>
    );
}

export default ChatPage;
