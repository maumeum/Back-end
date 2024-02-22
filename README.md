# 엘리스 SW 엔지니어 트랙 4기 2차 프로젝트 "마음이음"

[![logo](https://github.com/maumeum/Front-end/assets/119808319/69a624d8-6bb0-43bd-a3e0-b3e85d13e132)](http://kdt-sw-4-team01.elicecoding.com/)
<br>
[프론트엔드 리포지토리](https://github.com/maumeum/Front-end)
<br>
[백엔드 리포지토리](https://github.com/maumeum/Back-end)

<br>

## 1. 프로젝트 소개

### 고객 페르소나
<p align="center">
  <img src="https://github.com/maumeum/Front-end/assets/119808319/8e516425-a2bb-4b5d-a027-6123730a3be7/image.png">
</p>

### 서비스 개요
마음이음은 봉사활동을 알아가고 싶은 모든 사람들을 위한 봉사자 커뮤니티 플랫폼 입니다. 

- 봉사활동을 등록하고 신청하는 간편한 시스템 제공
- 마음이음만의 ‘봉사처 인증 시스템’ & 실제 참여자가 작성하는 ‘후기 시스템’
- 캐주얼하게 봉사 동행을 구할 수 있는 커뮤니티 마련
- 봉사 전문가들에게 배우는 봉사활동 꿀팁 공유의 장

### 개발 기획
[기능명세서](https://www.notion.so/elice/f1f4634e99324282832d2874eedf3d48?v=0cf7225ab41e4f08807d27e7965aeb1f&pvs=4)
- 페이지 별 상세 기능 명세
- 기능 별 담당자 및 구현 상태 표시
- 고도화 항목 명세

[API 명세서](https://www.notion.so/elice/API-822b6d5c88954489941d46cb869828cd?pvs=4)
- 주요 기능의 Method 및 URI 명세
- request 데이터 및 response 데이터 명세
- 기능 별 권한 표시

[DB 스키마](https://www.notion.so/elice/DB-72abf389b6cc491da002fb3f9286d9b1?pvs=4)
- 각 Schema 별 field 명세
- field type 및 required 여부 표시
- field 상세 설명 명세

<br>

## 2. 기술 스택

### Language
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>

### Backend
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white"/>

### Frontend
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white"/>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/ESbuild-FFCF00?style=flat-square&logo=esbuild&logoColor=white"/>
<img src="https://img.shields.io/badge/StyledComponents-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/>
<img src="https://img.shields.io/badge/🐻Zustand-FFCA28?style=flat-square&logo=zustand&logoColor=white"/>
<img src="https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=storybook&logoColor=white"/>

### Infrastructure
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=pm2&logoColor=white"/>
<img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=nginx&logoColor=white"/>

<br>

## 3. 아키텍쳐 설계

<p align="center">
  <img src="https://github.com/maumeum/Front-end/assets/119808319/ddfd81c8-4b7c-4ca0-a1c7-d14c0ca14aee/image-arch.png">
</p>

<br>

## 4. 역할 분담

### Backend
[류한나](https://github.com/hanna-ryu) : 팀장 / 백엔드 
- User JWT인증 방식 로그인, 회원가입, 유저 관련 CRUD 기능 구현
- Review 조건별 / 기능별 CRUD 기능 구현 , scheduler 모듈 활용 일정시점 db 자동변경 구현  
- 팀 단체 인증 CRUD 기능 구현, , nodemailer 인증 시스템 구현, 
- winston 활용 logger 시스템 적용
- asyncHandler , errorHandler, 응답 형식 구분
- multer 활용 이미지 업로드 기능 구현

[이해인](https://github.com/LHI0915)
- Volunteer 조건별/기능별 CRUD 구현
- Volunteer Comment, Post Comment 조건별/기능별 CRUD 구현
- 봉사활동 신청 및 재고처리 기능 구현, 신청 및 완료한 봉사 조회 기능 구현
- Query Builder를 활용한 페이징 처리
- 봉사활동·커뮤니티 게시글, 댓글 신고 기능 구현 / 5회 이상 신고 승인 시 유저 블락 처리 적용
- 신고된 게시글 및 댓글 확인 후 승인/거부 기능 구현

[탁경진](https://github.com/Takkyou)

### Frontend
[김마리나](https://github.com/marinarinarina)
- 컴포넌트 스토리북 작성
- 같이봉사해요 페이지 구현
  - 등록한 봉사활동 전체보기
  - 봉사활동 글쓰기

[류이서](https://github.com/ryuiseo)
- 커뮤니티 페이지 구현
  - 게시글 작성, 수정, 삭제
  - 댓글 작성, 수정, 삭제
- 리뷰 페이지 구현
  - 리뷰 수정, 삭제
- 홈페이지 UI 디자인

[정혜린](https://github.com/02rynn)

[최윤재](https://github.com/uniqueeest)
- 메인페이지 구현
- 회원가입, 로그인 페이지 구현
- 검색 페이지 구현
- 팀 단체 인증
- 관리자 페이지
   - 신고된 게시글, 댓글 확인 후 승인/거부
   - 팀 단체 승인/거부
   - 신고된 유저 관리
 

<br>


## 5. 소스코드 폴더 구조
```
src
├─ main.tsx
├─ App.tsx
├─ api
├─ assets
├─ components
├─ pages
├─ store
├─ styles
├─ types
└─ utils
```

|Directory|Description|
|------|---|
|main.tsx|초기설정 및 실행 파일|
|App.tsx|라우터 연결 파일|
|api|api 요청 관련 함수 모음|
|assets|폰트, 아이콘, 기본이미지|
|components|컴포넌트 정의|
|pages|페이지 정의|
|store|전역 상태를 관리하기 위한 스토어 정의|
|styles|전역 스타일 정의|
|types|interface 및 enum 정의|
|utils|자주 사용하는 기능들을 모듈화한 함수 모음|

<br>

## 6. 커밋 컨벤션

|메시지|설명|
|------|---|
|feat|새로운 기능 추가|
|fix|버그 수정|
|docs|문서 추가 및 변경|
|design|css 작업|
|style|코드 포맷팅|
|refact|코드 리팩토링|
|test|테스트 추가|
|chore|빌드 및 패키지 수정|
|rename|파일 수정 또는 위치 이동|
|remove|파일 삭제|

<br>

## 7. 구현 기능

### 메인화면
[메인화면 시연영상](https://drive.google.com/file/d/15WWAaeJppI5eu00tD9d-Kzh9-qp0j1AR/view?resourcekey)
- 홈페이지 소개 글
- 사용자 리뷰 랜덤 확인
- 커뮤니티 최신 글 확인
- 봉사 모집 최신 글 확인

### 유저 기능
[회원가입 및 로그인 시연영상](https://drive.google.com/file/d/1dJOpfed6PR148irofCl17DVvQYMsfYA9/view)

1. 회원가입
- 이메일 중복 방지 기능
- 이메일, 닉네임, 패스워드, 핸드폰 번호 입력 후 회원가입
2. 로그인
- 올바르지 않은 계정(블랙리스트 계정, 가입되지 않은 계정, 정보가 틀린 계정)으로 로그인 시도 시 각종 에러처리
- 이메일 및 패스워드 입력 후 로그인

[회원정보 수정 및 프로필정보 수정 시연영상](https://drive.google.com/file/d/14EV6kHsUbfsxn8A5OAWQjVzKir1haBf2/view?resourcekey)

3. 회원정보 수정
- 비밀번호 입력을 통한 사용자 본인확인
- 닉네임, 핸드폰 번호, 비밀번호 수정 기능
4. 프로필정보 수정
- 프로필 이미지 선택 및 저장 기능
- 선택한 프로필 이미지 취소 기능
- 기본 프로필로 되돌리기 기능
- 내 소개 작성 및 수정 기능

[회원 탈퇴 시연영상](https://drive.google.com/file/d/1UBP3oqPUAO0B9WdpHQoJWM3WBxNJifMD/view?resourcekey)

5. 회원 탈퇴
- 회원 탈퇴 요청 전, 이메일&비밀번호 재확인
- 재확인 얼럿
- 메인 화면으로 리다이렉트
- 로그인 불가

### 같이 봉사해요 게시판
[같이 봉사해요 게시판 시연영상](https://drive.google.com/file/d/1Z9YAkwMb7l-h850Kr8P3F-UFulQmGCew/view?resourcekey)
1. 같이 봉사해요 페이지
- 모집 중인 활동 / 모집 종료 활동 전체 정보 확인(무한 스크롤)
- 특정 키워드로 봉사활동 검색
- 특정 봉사활동 상세 정보 확인
봉사활동 모집 글 작성
2. 봉사활동 상세 페이지
- 활동소개, 팀소개, 댓글 정보 확인
- 봉사활동 관련 댓글 작성 
- 선택한 봉사활동 신청

### 커뮤니티 게시판  
[커뮤니티 게시판 시연영상](https://drive.google.com/file/d/1aF-VgvAFlhnMcYSOaO31Ha5H6wJYk4vG/view?resourcekey)
1. 커뮤니티 게시글
- 동행구해요, 궁금해요 전체 게시글 조회(무한 스크롤)
- 특정 게시글 검색
- 게시글 글쓰기( 제목, 타이틀, 이미지 첨부 가능 )
2. 커뮤니티 게시글 상세 페이지
- 게시글 내용 조회 기능
- 내가 작성한 게시글 수정 및 삭제 기능
- 댓글 작성 기능
- 내가 작성한 댓글 수정 및 삭제 기능

### 마이페이지
[내가 쓴 리뷰, 나의 커뮤니티 활동 메뉴 시연영상](https://drive.google.com/file/d/1caJXkmTTfxDOc_tB2XzPdcveQki0Z5Xi/view?resourcekey)

1. 내가 쓴 리뷰 메뉴
- 더보기 닫기 클릭하여 리뷰 전체 내용 확인
- 내가 작성한 전체 리뷰 조회·수정·삭제 기능
2. 나의 커뮤니티 활동 메뉴
- 내가 작성한 게시글 전체 조회·수정·삭제 기능
- 내가 댓글단 게시글 전체 조회 가능

[나의 봉사활동 내역 메뉴 시연영상](https://drive.google.com/file/d/1WL-j8V3JdOiZ4-pGAR9FWc5889p6UiVy/view?resourcekeyy)

3. 나의 봉사활동 내역 메뉴
- 신청한 봉사 / 완료한 봉사로 구분
- 신청한 봉사중, 봉사 마치는 날짜를 지난 봉사활동은 ‘참여완료'처리 가능
- 봉사 마치는 날짜를 지나지 않은 봉사활동은 경고 alert
- 페이지네이션
- 상세페이지 이동
4. 나의 봉사활동 내역 > 리뷰 작성
- 완료한 봉사에서 ‘리뷰 작성'버튼을 눌러 리뷰 작성,
- 이미 작성한 리뷰는 재작성이 불가하며 버튼 비활성화
- 봉사 마치는 날짜가 7일 지난 봉사활동들은 매일밤 자정 자동으로 ‘참여완료'처리됨

[내가 등록한 봉사 메뉴 시연영상](https://drive.google.com/file/d/1Rh441vsZjFW_UrN4NY79990stM3vgQrW/view?resourcekey)

6. 내가 등록한 봉사 메뉴
- 내가 등록한 봉사들의 전체 목록을 확인
- 내가 등록한 봉사활동의 상태를(모집중 / 모집완료 / 모집중단 )로 변경가능
- 내가 등록한 봉사활동을 눌러 상세 페이지로 이동

### 팀 인증 (Team Authorization)
[팀 인증 시연영상](https://drive.google.com/file/d/1ieGm6ztyE4x9Ie2ke3IYxwYFDhag01G2/view?resourcekey)

1. 팀 인증 페이지
- 마이페이지 - 팀 인증을 통해 팀 인증 제출
2. 관리자 승인 페이지
- 팀 인증 요청이 들어온 목록 확인
- 인증 요청 상세 내용 확인
- 인증 승인 및 거부
3. 메일 알림
- 인증 수락하면 계정 이메일로 메일이 보내짐.

### 봉사 및 커뮤니티 게시글 검색 기능
[봉사 및 커뮤니티 게시글 검색 시연영상](https://drive.google.com/file/d/1n6rKBwfo-Rg5ciunop1S6XBC0Z6MHw0u/view?resourcekey)

- 주제별, 대상별 키워드 확인
- 특정 키워드로 검색 시 키워드가 포함된 봉사활동 게시글 및 커뮤니티 게시글 검색
- 무한스크롤

### 관리자 기능
[관리자 기능 시연영상](https://drive.google.com/file/d/1gPqycQ6hPK4LuFB7m17gaRCJV-thTCY7/view?resourcekey)

- 팀 인증 수락 또는 거부
- 리뷰, 커뮤니티, 봉사활동, 댓글 신고 내역 승인 또는 반려
- block 처리된 유저 관리


<br>
