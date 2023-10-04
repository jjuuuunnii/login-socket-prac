import React from 'react';

function LoginPage() {
    return (
        <div>
            <h1>카카오톡 로그인</h1>
            <a href="http://localhost:8080/oauth2/authorization/kakao">
                <button>카카오톡으로 로그인하기</button>
            </a>
        </div>
    );
}

export default LoginPage;
