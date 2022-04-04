## 해결방법

### drag & drop
- react-beautiful-dnd 라이브러리를 사용하여 구현. 
- Data Blocks, Function Blocks 의 Block 에서 드래그가 가능하고 해당하는 슬롯에 Drop 이 가능하도록 구현.

### 실행
- 함수에 따라서 적절한 결과가 결과 슬롯에 나타나도록 구현, 실행 함수에 따라 적절한 피드백 제공

### 렌더링 최적화
- React.memo 와 useCallback을 이용하여 랜더링 최적화

### Props 타입 지정
- proto-types 라이브러리를 사용하여 각 컴포넌트 props의 propTypes과 defaultProps 작성.

### 디자인
- styled component 를 이용하여 구현했으며, theme에서 자주 사용하는 값 변수에 할당.
- GlobalStyle.jsx에 필요한 reset css 설정을 해주었으며, 뷰포트에 따른 글자 크기 지정.
- 반응형은 미디어 쿼리와 상대단위를 사용하여 구현.

## 파일별 자세한 설명

**src/components/Cards.jsx**
- data 에 따라 Blocks를 구성하는 컴포넌트
- matchBelong 함수에서 Block 요소 name을 받으면 data와 function 중 소속을 return.
- handleDropError 함수에서 matchBelong의 결과에 따라 각 슬롯에 바르게 드롭되었는지 검사후 boolen 값 return. 
- handleDropError 결과는 각 슬롯의 테두리 변경.<br/>
틀린 슬롯이면 빨간색 테두리<br/>
옳은 슬롯이면 보라색 점선 테두리
- 슬롯에 옳은 내용이 드롭으로 삽입되었을 때, 삭제 버튼 X 가 활성화.<br/>
- onClickDelete props는 슬롯 내용을 삭제하는 함수. 결과 슬롯까지 채워져있을 때, 데이터나 함수 슬롯 내용이 삭제되면 결과 슬롯 내용도 같이 삭제.

**src/components/Blocks.jsx**
- 슬롯을 구성하는 컴포넌트
- snapshot으로 현재 드래그 중인 요소의 소속(data, function)을 구해서 어떤 슬롯으로 이동해야 하는지 피드백 제공.
- drop 영역에 이르지 않고 드래그가 중지되면 처음 상태로 해당 Blocks를 초기화
-drop animation이  과하다고 생각되어서 handleDropAnimation 함수에서 react-beautiful-dnd 라이브러리 애니메이션 시간 변경.

**src/components/Header.jsx**
- 실행하기 버튼이 포함된 상단 영역
- 버튼은 모든 슬롯이 채워졌을 때만 활성화되며, props로 받아온 onClick 함수가 실행.

**src/components/Home.jsx**
- 모든 컴포넌트를 병합하여 페이지로 만든 메인 컴포넌트.
- makeUpperCase, deriveWordNum, makeReverse 은 함수 슬롯 내용에 따라 실행될 함수.
- dropRegions은 슬롯, data는 데이터 블록, functions은 함수 블럭 상태이며 모두 data.js에서 초기상태를 받아옴.
- handleDragEnd는 drag가 끝나는 시점에 실행될 함수로, 해당하는 블럭과 슬롯의 상태를 변경.
- handleClickDelete은 슬롯의 삭제 버튼을 클릭하면 실행되는 함수로 Cards컴포넌트에 전달.
- handleClickExecution은 실행 버튼을 클릭하면 실행되는 함수로 Header에 전달.

**src/components/Message.jsx**
- 사용자의 상호작용에 따라 적절한 피드백을 제공하는 컴포넌트
