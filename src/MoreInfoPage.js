import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}

function ProfileForm() {
    const [nickname, setNickname] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const accessToken = getCookie('access_cookie');
            const authHeader = accessToken ? `Bearer ${accessToken}` : '';

            const response = await fetch('https://mooko-bucket.s3.ap-northeast-2.amazonaws.com/profile_img/default_img.png');
            const blob = await response.blob();
            const file = new File([blob], 'default_img.png', { type: 'image/png' });

            const formData = new FormData();
            formData.append('profileImage', file);
            formData.append('nickname', nickname);
            formData.append('birth', birth);
            formData.append('gender', gender);

            const serverUrl = 'http://localhost:8080/api/v1/user/user-info'; 
            const postResponse = await fetch(serverUrl, {
                method: 'POST',
                headers: {
                    'Authorization': authHeader
                },
                body: formData
            });

            if (postResponse.ok) {
                navigate('/chat'); 
            } else {
                throw new Error('서버로부터 응답이 성공적이지 않습니다.');
            }
        } catch (error) {
            console.error('업로드 중 오류 발생:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="nickname">닉네임:</label>
            <input type="text" id="nickname" name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <br />

            <label htmlFor="birth">생일:</label>
            <input type="text" id="birth" name="birth" value={birth} onChange={(e) => setBirth(e.target.value)} />
            <br />

            <label htmlFor="gender">성별:</label>
            <input type="text" id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
            <br />

            <input type="submit" value="Upload" />
        </form>
    );
}

export default ProfileForm;
