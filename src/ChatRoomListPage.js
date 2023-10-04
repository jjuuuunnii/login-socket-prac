import React, { useState, useEffect } from 'react';

function ChatRoomListPage() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // 서버에서 사용자가 참여 중인 채팅방 목록을 가져오는 API 호출
        fetch('http://localhost:8080/api/chatRooms', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 필요하다면 인증 토큰을 헤더에 추가
                // 'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            setRooms(data);
        })
        .catch(error => {
            console.error('Error fetching chat rooms:', error);
        });
    }, []);

    return (
        <div>
            <h2>My Chat Rooms</h2>
            <ul>
                {rooms.map(room => (
                    <li key={room.id}>
                        <a href={`/chat/${room.id}`}>{room.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatRoomListPage;
