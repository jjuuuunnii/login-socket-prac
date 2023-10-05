import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getCookie(name) {
    console.log("get accessToken")
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(";").shift());
  }
}

function MoreInfoPage() {
    const [mbti, setMbti] = useState('');        // MBTI
    const [gender, setGender] = useState('');    // 성별
    const [nickname, setNickname] = useState('');// 닉네임
    const [face, setface] = useState(''); // 닮은꼴
    const [selfInfo, setSelfInfo] = useState('');   // 자신에 대한 정보

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
  
        const accessToken = getCookie("accessCookie");
  
        const response = await fetch('http://localhost:8080/api/v1/users/additional', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            body: JSON.stringify({ mbti, gender, nickname, face, selfInfo })
        });
  
        if (response.ok) {
            navigate('/chat');
        } else {
            console.error("데이터 전송에 실패했습니다.");
        }
    };

    return (
        <div>
            <h2>추가 정보 입력</h2>
            <form onSubmit={handleSubmit}>
                {/* 기존의 입력 필드들... */}
                <label htmlFor="gender">성별:</label>
                <input type="text" id="gender" name="gender" required value={gender} onChange={e => setGender(e.target.value)} />
                <br />
                <label htmlFor="mbti">mbti:</label>
                <input type="text" id="mbti" name="mbti" required value={mbti} onChange={e => setMbti(e.target.value)} />
                <br />
                <label htmlFor="nickname">닉네임:</label>
                <input type="text" id="nickname" name="nickname" required value={nickname} onChange={e => setNickname(e.target.value)} />
                <br />
                <label htmlFor="face">닮은꼴:</label>
                <input type="text" id="face" name="face" required value={face} onChange={e => setface(e.target.value)} />
                <br />
                <label htmlFor="selfInfo">자신에 대한 정보:</label>
                <input type="text" id="selfInfo" name="selfInfo" required value={selfInfo} onChange={e => setSelfInfo(e.target.value)} />
                <br />
                <input type="submit" value="제출" />
            </form>
        </div>
    );
}


export default MoreInfoPage;
