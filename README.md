## Description
drag & drop 기능이 포함된 Interative Web Application을 반응형으로 구현하였습니다. 

## Usage
1. git clone
```
git clone https://github.com/Lee-Seonghyun316/drag-drop.git
```
2. 폴더를 인터프린터나 컴파일러로 열기 
3. 필요한 라이브러리 설치 
```
npm install
```
4. 실행
```
npm run start
```

**<자세한 실행 방법>**
1. Block 드래그<br/>
Data Blocks 또는 Function Blocks 의 요소를 드래그 하면 이동할 슬롯에 대한 정보가 오른쪽 하단에 피드백으로 제공됩니다. 
이때, 드롭 가능한 슬롯은 보라색 점선으로 테두리가 생기며, 드롭 불가능한 슬롯은 빨간색으로 테두리가 생깁니다. 
<img width="1428" alt="스크린샷 2022-04-04 오후 2 46 45" src="https://user-images.githubusercontent.com/70502670/161481394-9dc1e23c-91be-48f0-a98e-ba3bf0ee159a.png">
<img width="1427" alt="스크린샷 2022-04-04 오후 3 37 29" src="https://user-images.githubusercontent.com/70502670/161487454-a1245bbc-ab68-488b-8307-85c19e6097a5.png">
<img width="1422" alt="스크린샷 2022-04-04 오후 3 37 17" src="https://user-images.githubusercontent.com/70502670/161487461-e6638acb-e4bf-4d8f-8dfd-57a1c8a3ba97.png">

2. Drop, 실행 버튼 활성화, X 버튼 활성화<br/>
drag & drop으로 데이터 슬롯과 함수 슬롯이 채워지면 실행 버튼이 활성화됩니다. Block들은 X 버튼을 눌러 다시 Blocks 카테고리로 이동시킬 수 있습니다. 
<img width="1429" alt="스크린샷 2022-04-04 오후 2 39 05" src="https://user-images.githubusercontent.com/70502670/161481198-2a33425f-0319-41e3-87c8-0433e0c15084.png">

3. 실행<br/>
실행하기 버튼을 누르면 실행 내용에 대한 정보가 오른쪽 하단에 피드백으로 제공되면 결과슬롯에 결과가 나타납니다. 
<img width="1431" alt="스크린샷 2022-04-04 오후 2 52 39" src="https://user-images.githubusercontent.com/70502670/161482006-23c64fe2-12bb-499d-9188-f9830aa9f5ef.png">

## 기술스택
- Javascript
- React
- CSS: styled-component
- drag & drop : react-beautiful-dnd
- prop-types

## 해결방법
- SOLUTION.md 참고
- https://github.com/Lee-Seonghyun316/drag-drop/blob/main/SOLUTION.md

