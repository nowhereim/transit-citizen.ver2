### 프로젝트 기간 : 2023. 05. 01 ~ 2023. 06. 26 

## 1. 프로젝트 소개

- 환승시민.ver2 는 기존 <b>환승시민 프로젝트를 리펙터링 </b> 하여 더 나은 사용성을 제공하기위한 프로젝트 입니다.
- 기존 환승시민의 기획은 유지하면서 <b>작동하지않는 기능, 불필요한 기능들을 정리하고 향상된 사용성을 위한 기능추가 및 성능개선</b>에 초점을 맞추었습니다.

<br />

## 2. 개발 일정

**전체 개발 일정: 2023. 05. 01 ~ 2023. 06. 26**

1️⃣ 1차 개발: 2023.05.01 ~ 2023.06.10  
2️⃣ 1차 배포 및 유저피드백 기간 : 2023.06.11 ~ 2023.06.18  
3️⃣ 피드백 반영: 2023.06.18 ~ 2023.06.26  
4️⃣ 2차 배포: 2023.06.26

<br />

## 3. 개발 환경

### 기술

- BackEnd : nodejs, express , typescript , mysql , mongodb , redis ,socket.io

### 협업도구

- 협업 도구: [Figma](https://www.figma.com/file/7dw1O2FbYsMeAV5jq9dwd1/%ED%99%98%EC%8A%B9%EC%8B%9C%EB%AF%BC-Ver2-%ED%94%BC%EA%B7%B8%EB%A7%88?type=design&node-id=27%3A726&mode=design&t=veiFKJ6qJDUGM7nL-1), Notion, Gather , Slack

### 배포

- AWS EC2 , ROUTE 53 , RDS , Mongodb atlas


## 4. 팀 협업 방식

### 🏃🏻 스프린트 도입

스프린트 방식을 도입해 매주 스프린트 목표에 집중하여 개발할 수 있는 환경을 구축했습니다.


**[데일리 스크럼]**

- 매일 업무가 끝나기 전에 데일리 스크럼을 진행하여 각자의 진행 상황과 어려운 점을 공유했습니다.
- 공유된 이슈를 팀원들이 함께 해결하며 당일에 이슈를 해결해 **빠른 피드백과 개선**이 이루어졌습니다.
  
<br />

### 💬 피드백 공유

- 유저피드백 혹은 에러발생시 빠르게 공유할 수 있도록 [Notion](https://www.notion.so/99da47f1311e42738228082ebd2501e4?v=a7d45006876846359bc01e8d938b4c2e&pvs=4)을 통해 이슈내역을 실시간으로 공유하였습니다.
<br />


## 5. 페이지 소개


|    회원가입    |   로그인     |  프로필 등록 |
| :-------------------------: |  :-------------------------: | :-------------------------: | 
|![회원가입](https://github.com/wyswhsl21/team4-final-project/assets/108774881/8c8516c3-e8e0-4c76-9155-fc918a06ac6c)| ![로그인](https://github.com/wyswhsl21/team4-final-project/assets/108774881/d30ccbbe-6f22-4918-a7ca-7feca9e392b9)|![프로필등록](https://github.com/wyswhsl21/team4-final-project/assets/108774881/497d4970-afec-45a2-8c7a-882cf7cb48af)


|   소셜 로그인 |  공지사항   |  이용방법 |
| :-------------------------: |  :-------------------------: | :-------------------------: | 
|![소셜로그인](https://github.com/wyswhsl21/team4-final-project/assets/108774881/6de5a6f3-52da-46b1-b40f-a19735324731)| ![공지사항](https://github.com/wyswhsl21/team4-final-project/assets/108774881/55033f18-5e44-4e87-b376-30b0ac43e962)| ![이용방법](https://github.com/wyswhsl21/team4-final-project/assets/108774881/86623c61-b9ed-471d-87eb-211880659da2)


|   매칭 - 실패  |   매칭 성공   |  테스트 봇 매칭 |
| :-------------------------: |  :-------------------------: | :-------------------------: | 
| ![매칭 실패](https://github.com/wyswhsl21/team4-final-project/assets/108774881/cf7d24f5-9f40-4926-85ef-806bb2ee11a7)|![매칭성공](https://github.com/wyswhsl21/team4-final-project/assets/108774881/2c6362b5-eb28-4d6d-89af-6abf3f6069d4)|![테스트봇](https://github.com/wyswhsl21/team4-final-project/assets/108774881/cbb6e0b1-6678-424c-a2ed-7acad96d24d4)



|  상대방 나갈시    |  시간추가    |  회원탈퇴 |
| :-------------------------: |  :-------------------------: | :-------------------------: | 
| ![상대방 나갈시 팝업](https://github.com/wyswhsl21/team4-final-project/assets/108774881/0a2358bf-0c0b-44ed-85ab-36f589f10022)| ![시간추가](https://github.com/wyswhsl21/team4-final-project/assets/108774881/92eb1972-14c0-44e0-b2bf-9259f11cd678) | ![회원탈퇴](https://github.com/wyswhsl21/team4-final-project/assets/108774881/ddbe4647-3a14-40da-bd20-bd3ae7c82e39)


<br>

## 6. 기존 환승시민 이후 개선사항

### 기존 대비 시간복잡도를 최대 약 81.2% 까지 낮추었습니다. 

### 기존 Mongodb 하나로 모든 오퍼레이션이 이루어지는 모놀리식 아키텍쳐에서 MSA 아키텍쳐로 전환하여 유지보수성을 높이고 성능을 크게 개선시켰습니다.

### 아키텍쳐 간소화 및 재사용가능 코드 모듈화 등 전반적인 리펙터링으로 유지보수성을 크게 개선시켰습니다.

### 이외에 다양한 기능을 추가함으로써 사용성을 크게 향상시켰습니다.

-이외 자세한 내용은 링크를 이용해주세요


## 6. 환승 시민 프로젝트 구성원
 
|팀내 포지션|  이름 |
|:--------:|:-------:|
|BE| 안태환|
|FE| 김재우|
|DE| 박은지|
