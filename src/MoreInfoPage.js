import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getCookie(name) {
    console.log("get accessToken")
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    let cookieValue = decodeURIComponent(parts.pop().split(";").shift());
    return cookieValue.replace('+', ' ');  // + 문자를 공백으로 변환
  }
}

function MoreInfoPage() {
    const [explain, setExplain] = useState('');
    const [mbti, setMbti] = useState('');
    const navigate = useNavigate();  // useNavigate hook을 사용하여 navigate 함수를 가져옵니다.

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const accessToken = getCookie("accessCookie");

      console.log(accessToken);
  
      const response = await fetch('http://localhost:8080/api/submitMoreInfo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': accessToken  // "Bearer" 포함한 accessToken을 헤더에 추가
          },
          body: JSON.stringify({ explain, mbti })
      });
  
      if (response.ok) {
          console.log("데이터가 성공적으로 전송되었습니다.");
          navigate('/chat');  // 성공적으로 데이터를 전송한 후 ChatPage로 리다이렉트합니다.
      } else {
          console.error("데이터 전송에 실패했습니다.");
      }
    };
  
    return (
        <div>
            <h2>추가 정보 입력</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="explain">자기소개:</label>
                <textarea id="explain" name="explain" rows="4" cols="50" required value={explain} onChange={e => setExplain(e.target.value)}></textarea>
                <br />
                <label htmlFor="mbti">MBTI:</label>
                <input type="text" id="mbti" name="mbti" required value={mbti} onChange={e => setMbti(e.target.value)} />
                <br />
                <input type="submit" value="제출" />
            </form>
        </div>
    );
}

export default MoreInfoPage;
