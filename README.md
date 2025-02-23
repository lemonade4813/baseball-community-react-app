# 야구 커뮤니티 사이트 구현(2025.2.24 기준 - 진행중입니다.)
✍️ ## 구현 목적

야구팬들에 본인이 응원하는 팀의 경기 일정 확인 및 팬들과 채팅할 수 있는 공간을 제공
자유 게시판 구현(CRUD)
🛠️ ## 사용 기술 / 환경

> - node v18.20.5
> - npm v10.8.2

> - React 19
> - typescript 5.6.2
> - tanstack/react-query 5.64.1
> - react-hook-form / yup
> - vitest / testing-library/react

🛠️ ## 사용 IDE
> - Intellij IDEA /
> - Visual Studio Code

🔨 ## 주요 기능

>💙 react-query를 활용한 게시판, 경기 일정,경기장 현황 데이터 캐싱

>🤎 WebSocket, stompjs를 활용한 채팅방 구현

>💙 상태 데이터 속성 및 사용 목적에 따라 jotai/zustand로 구분하여 구현

-> 다크 모드, 반응형 화면 햄버거 메뉴 on/off : jotai

-> 전역 모달, 로그인 정보(닉네임 / 로그인 여부 / 프로필 이미지 경로) : zustand

>🤎 경기 일정 페이지 테스트 코드 작성

>💙 반응형 디자인 구현 (break-point : 575px)

>🤎 페이지 마다 공통적으로 사용되는 컴포넌트 들은 compound components로 구현.

>(단, 로그인 및 회원가입 페이지의 별도의 유효성 메시지 표시를 위해 styles 폴더에 정의된 Input 컴포넌트를 사용)

>💙 yup/ react-hook-form을 활용하여 유효성 체크 구현

📲 ## 배포 사항

> ☝️ 현재 네이버 클라우드 http://118.67.143.164:4000/ 배포 (express + node로 배포)
