// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function getCookie(name) {
//     console.log("get accessToken")
//   const value = "; " + document.cookie;
//   const parts = value.split("; " + name + "=");
//   if (parts.length === 2) {
//     return decodeURIComponent(parts.pop().split(";").shift());
//   }
// }

// function MoreInfoPage() {
//     const [mbti, setMbti] = useState('');        // MBTI
//     const [gender, setGender] = useState('');    // 성별
//     const [nickname, setNickname] = useState('');// 닉네임
//     const [face, setBirth] = useState(''); // 닮은꼴
//     const [selfInfo, setProfileImage] = useState('');   // 자신에 대한 정보

//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
  
//         const accessToken = getCookie("accessCookie");
  
//         const response = await fetch('http://localhost:8080/api/v1/user/user-info', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': accessToken
//             },
//             body: JSON.stringify({ mbti, gender, nickname, face, selfInfo })
//         });
  
//         if (response.ok) {
//             navigate('/chat');
//         } else {
//             console.error("데이터 전송에 실패했습니다.");
//         }
//     };

//     return (
//         <div>
//             <h2>추가 정보 입력</h2>
//             <form onSubmit={handleSubmit}>
//                 {/* 기존의 입력 필드들... */}
//                 <label htmlFor="gender">성별:</label>
//                 <input type="text" id="gender" name="gender" required value={gender} onChange={e => setGender(e.target.value)} />
//                 <br />
//                 <label htmlFor="nickname">닉네임:</label>
//                 <input type="text" id="nickname" name="nickname" required value={nickname} onChange={e => setNickname(e.target.value)} />
//                 <br />
//                 <label htmlFor="birth"> 생일 :</label>
//                 <input type="text" id="birth" name="birth" required value={face} onChange={e => setBirth(e.target.value)} />
//                 <br />
//                 <label htmlFor="profileImage">자신에 대한 정보:</label>
//                 <input type="text" id="profileImage" name="profileImage" required value={selfInfo} onChange={e => setProfileImage(e.target.value)} />
//                 <br />
//                 <input type="submit" value="제출" />
//             </form>
//         </div>
//     );
// }


// export default MoreInfoPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileForm() {
    const [nickname, setNickname] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://mooko-bucket.s3.ap-northeast-2.amazonaws.com/profile_img/default_img.png');
            const blob = await response.blob();
            const file = new File([blob], 'default_img.png', { type: 'image/png' });

            const formData = new FormData();
            formData.append('profileImage', file);
            formData.append('nickname', nickname);
            formData.append('birth', birth);
            formData.append('gender', gender);

            navigate('/chat'); // 성공 시 채팅 페이지로 이동

        } catch (error) {
            console.error('업로드 중 오류 발생:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <input type="text" name="birth" value={birth} onChange={(e) => setBirth(e.target.value)} />
            <input type="text" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
            <input type="submit" value="Upload" />
        </form>
    );
}

export default ProfileForm;
