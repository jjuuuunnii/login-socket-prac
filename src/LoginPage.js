import React from 'react';

function LoginPage() {
    return (
        <div>
            <div>
                <h1>카카오톡 로그인</h1>
                <a href="http://localhost:8080/oauth2/authorization/kakao">
                    <button>카카오톡으로 로그인하기</button>
                </a>
            </div>

            <div>
                <h1>네이버 로그인</h1>
                <a href="http://localhost:8080/oauth2/authorization/naver">
                    <button>네이버로 로그인하기</button>
                </a>
            </div>
        </div>
    );
}

export default LoginPage;
