import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { dataBlocks, dropRegionData, functionBlocks } from '../data';
import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [dropRegions, setDropRegions] = useState(dropRegionData);
  const [data, setData] = useState(dataBlocks);
  const [functions, setFunctions] = useState(functionBlocks);
  const searchBelong = (id) => {
    const data = dataBlocks.map((item) => item.name);
    if (data.includes(id)) {
      return 'dataBlocks';
    }
    const functions = functionBlocks.map((item) => item.name);
    if (functions.includes(id)) {
      return 'functionBlocks';
    }
  };
  const handleDropError = (draggedId, droppedId) => {
    const belong = searchBelong(draggedId);
    if (belong === 'dataBlocks' && droppedId === 'dataSlot') {
      return true;
    }
    if (belong === 'functionBlocks' && droppedId === 'functionSlot') {
      return true;
    }
    return false;
  };
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) return;
    const changeDropRegion = () => {
      const destColumn = dropRegions[destination.droppableId];
      setDropRegions({
        ...dropRegions,
        [destination.droppableId]: {
          ...destColumn,
          items: [{ id: uuid(), name: result.draggableId }],
        },
        resultSlot: dropRegionData.resultSlot,
      });
    };
    if (source.droppableId === 'dataBlocks' && destination.droppableId === 'dataSlot') {
      setData(dataBlocks.filter((item) => item.name !== result.draggableId));
      changeDropRegion();
    }
    if (source.droppableId === 'functionBlocks' && destination.droppableId === 'functionSlot') {
      setFunctions(functionBlocks.filter((item) => item.name !== result.draggableId));
      changeDropRegion();
    }
  };
  const handleDropAnimation = (style, snapshot) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: `0.01s`,
    };
  };
  const handleClickDelete = (e, id, dropRegion) => {
    if (e.target.className.includes('delete')) {
      setDropRegions({
        ...dropRegions,
        [id]: { ...dropRegion, items: [] },
        resultSlot: dropRegionData.resultSlot,
      });
      setData(dataBlocks);
      setFunctions(functionBlocks);
    }
  };
  const makeUpperCase = (item) => {
    return item.toUpperCase();
  };
  const deriveWordNum = (item) => {
    return item.split(' ').length;
  };
  const makeReverse = (item) => {
    return item.split('').reverse().join('');
  };
  const handleClickExecution = () => {
    if (dropRegions.dataSlot.items.length === 0 || dropRegions.functionSlot.items.length === 0) {
      return;
    }
    const functionName = dropRegions.functionSlot.items[0].name;
    let result;
    if (functionName === 'toUpperCase') {
      result = makeUpperCase(dropRegions.dataSlot.items[0].name);
    }
    if (functionName === 'wordNum') {
      result = deriveWordNum(dropRegions.dataSlot.items[0].name);
    }
    if (functionName === 'reverse') {
      result = makeReverse(dropRegions.dataSlot.items[0].name);
    }
    setDropRegions({
      ...dropRegions,
      resultSlot: { ...dropRegions.resultSlot, items: [{ id: uuid(), name: result }] },
    });
  };
  const makeMessage = (belong) => {
    if (belong === 'dataBlocks') {
      return '데이터 슬롯으로 이동:)';
    }
    if (belong === 'functionBlocks') {
      return '함수 슬롯으로 이동:)';
    }
  };
  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Header>
        <Button
          onClick={handleClickExecution}
          activate={dropRegions.dataSlot.items.length > 0 && dropRegions.functionSlot.items.length > 0}
        >
          실행하기
        </Button>
      </Header>
      <Contents>
        <BlocksContainer>
          <div>
            <Title>Data Blocks</Title>
            <Droppable droppableId="dataBlocks">
              {(provided, snapshot) => (
                <Blocks {...provided.droppableProps} ref={provided.innerRef}>
                  {data.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.name} index={index}>
                      {(provided, snapshot) => (
                        <Block
                          key={item.id}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          style={handleDropAnimation(provided.draggableProps.style, snapshot)}
                        >
                          {item.name}
                          {provided.placeholder}
                        </Block>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {snapshot.isUsingPlaceholder ? (
                    <Message>
                      <FontAwesomeIcon icon={faUser} /> {makeMessage('dataBlocks')}
                    </Message>
                  ) : null}
                </Blocks>
              )}
            </Droppable>
          </div>
          <div>
            <Title>Function Blocks</Title>
            <Droppable droppableId="functionBlocks">
              {(provided, snapshot) => (
                <Blocks {...provided.droppableProps} ref={provided.innerRef}>
                  {functions.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.name} index={index}>
                      {(provided, snapshot) => (
                        <Block
                          key={item.id}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          style={handleDropAnimation(provided.draggableProps.style, snapshot)}
                        >
                          {item.name}
                          {provided.placeholder}
                        </Block>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {snapshot.isUsingPlaceholder ? (
                    <Message>
                      <FontAwesomeIcon icon={faUser} /> {makeMessage('functionBlocks')}
                    </Message>
                  ) : null}
                </Blocks>
              )}
            </Droppable>
          </div>
        </BlocksContainer>
        <CardsContainer>
          <Cards className="cards">
            {Object.entries(dropRegions).map(([id, dropRegion], index) => (
              <Droppable droppableId={id} key={id}>
                {(provided, snapshot) => (
                  <Card
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    isDraggedOver={snapshot.isDraggingOver}
                    isData={dropRegion.items.length > 0}
                    isMatching={handleDropError(snapshot.draggingOverWith, id)}
                  >
                    {id === 'resultSlot' ? null : dropRegion.items.length > 0 ? (
                      <Delete className="delete" onClick={(e) => handleClickDelete(e, id, dropRegion)}>
                        X
                      </Delete>
                    ) : null}
                    <CardText>{dropRegion.items.length > 0 ? dropRegion.items[0].name : dropRegion.name}</CardText>
                    {provided.placeholder}
                  </Card>
                )}
              </Droppable>
            ))}
          </Cards>
        </CardsContainer>
      </Contents>
    </DragDropContext>
  );
};

export default Home;

const Contents = styled.div`
  position: relative;
  ${({ theme }) => theme.common.flexCenter};
  height: 100vh;
  font-size: ${({ theme }) => theme.fontSize.xSmall};
  @media all and (max-width: ${({ theme }) => theme.deviceSizes.laptop}) {
    font-size: ${({ theme }) => theme.fontSize.xxSmall};
  }
`;
const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGrey};
  display: flex;
  justify-content: flex-end;
`;
const Button = styled.button`
  z-index: 10;
  padding: 0.5rem 2rem;
  margin: 0.5rem 1rem;
  background-color: ${({ theme, activate }) => (activate ? 'rebeccapurple' : theme.color.lightGrey)};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.color.white};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.xSmall};
  ${({ activate }) => activate && `cursor: pointer`}
`;

const BlocksContainer = styled.section`
  ${({ theme }) => theme.common.flexColumn};
  width: 20%;
  max-width: 10rem;
  padding-top: 3rem;
  text-align: center;
  gap: 2rem;
`;
const Title = styled.h1`
  margin: 0.5rem;
`;
const Blocks = styled.ul`
  ${({ theme }) => theme.common.flexColumn};
  gap: 1rem;
  margin-bottom: 1rem;
`;
const Block = styled.li`
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0px 5px 11px 5px #e0e0e0;
  background-color: ${({ theme }) => theme.color.white};
`;
const CardsContainer = styled.main`
  width: 80%;
  ${({ theme }) => theme.common.flexCenter};
`;
const Cards = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  border-bottom: 3px solid ${({ theme }) => theme.color.grey};
`;
const Card = styled.div`
  transform: translateY(1rem);
  position: relative;
  max-width: 12rem;
  width: 30%;
  height: 15rem;
  list-style: none;
  background-color: ${({ isData, theme }) => (isData ? theme.color.white : theme.color.lightGrey)};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: ${({ isData, isDraggedOver, isMatching, theme }) =>
    isDraggedOver
      ? isMatching
        ? `2px dashed ${theme.color.grey}`
        : `2px solid red`
      : isData
      ? `1px solid ${theme.color.black}`
      : 'none'};
`;
const CardText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  text-align: center;
`;
const Delete = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
`;
const Message = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 0rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  background-color: rebeccapurple;
  color: white;
  opacity: 0;
  animation: slide 1.5s linear;
  @keyframes slide {
    0% {
      opacity: 0;
    }
    30%,
    60% {
      opacity: 1;
      transform: translateX(-2rem);
    }
    100% {
      opacity: 0;
    }
  }
`;
