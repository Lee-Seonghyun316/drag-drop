import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'react-uuid';
import { dataBlocks, dropRegionData, functionBlocks } from '../data';
import Header from './Header';
import Message from './Message';

const Home = () => {
  const [dropRegions, setDropRegions] = useState({ ...dropRegionData });
  const { dataSlot, functionSlot, resultSlot } = dropRegions;
  const [data, setData] = useState([...dataBlocks]);
  const [functions, setFunctions] = useState([...functionBlocks]);
  const matchBelong = (id) => {
    const data = dataBlocks.map(({ name }) => name);
    if (data.includes(id)) {
      return 'dataBlocks';
    }
    const functions = functionBlocks.map(({ name }) => name);
    if (functions.includes(id)) {
      return 'functionBlocks';
    }
  };
  const handleDropError = (draggedId, droppedId) => {
    const belong = matchBelong(draggedId);
    if (belong === 'dataBlocks' && droppedId === 'dataSlot') {
      return true;
    }
    if (belong === 'functionBlocks' && droppedId === 'functionSlot') {
      return true;
    }
    return false;
  };
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;
    const changeDropRegion = () => {
      const destColumn = dropRegions[destination.droppableId];
      setDropRegions({
        ...dropRegions,
        [destination.droppableId]: {
          ...destColumn,
          items: { id: uuid(), name: result.draggableId },
        },
        resultSlot: resultSlot,
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
  const handleClickDelete = (e, id) => {
    if (e.target.className.includes('delete')) {
      setDropRegions({
        ...dropRegions,
        [id]: { ...dropRegionData[id] },
        resultSlot: { ...dropRegionData['resultSlot'] },
      });
      if (id === 'dataSlot') {
        setData([...dataBlocks]);
      }
      if (id === 'functionSlot') {
        setFunctions([...functionBlocks]);
      }
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
    if (dataSlot.items === null || functionSlot.items === null) {
      return;
    }
    const functionName = functionSlot.items.name;
    let result;
    if (functionName === 'toUpperCase') {
      result = makeUpperCase(dataSlot.items.name);
    }
    if (functionName === 'wordNum') {
      result = deriveWordNum(dataSlot.items.name);
    }
    if (functionName === 'reverse') {
      result = makeReverse(dataSlot.items.name);
    }
    setDropRegions({
      ...dropRegions,
      resultSlot: { ...resultSlot, items: { id: uuid(), name: result } },
    });
  };

  return (
    <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
      <Header onClick={handleClickExecution} buttonActive={dataSlot.items && functionSlot.items} />
      <Contents>
        {resultSlot.items ? <Message text={functionSlot.items.name} /> : null}
        <BlocksContainer>
          <div>
            <Title>Data Blocks</Title>
            <Droppable droppableId="dataBlocks">
              {(provided, snapshot) => (
                <Blocks {...provided.droppableProps} ref={provided.innerRef}>
                  {data.map(({ id, name }, index) => (
                    <Draggable key={id} draggableId={name} index={index}>
                      {(provided, snapshot) => (
                        <Block
                          key={id}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          style={handleDropAnimation(provided.draggableProps.style, snapshot)}
                        >
                          {name}
                          {provided.placeholder}
                        </Block>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {snapshot.isUsingPlaceholder ? <Message text="dataBlocks" /> : null}
                </Blocks>
              )}
            </Droppable>
          </div>
          <div>
            <Title>Function Blocks</Title>
            <Droppable droppableId="functionBlocks">
              {(provided, snapshot) => (
                <Blocks {...provided.droppableProps} ref={provided.innerRef}>
                  {functions.map(({ id, name }, index) => (
                    <Draggable key={id} draggableId={name} index={index}>
                      {(provided, snapshot) => (
                        <Block
                          key={id}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          style={handleDropAnimation(provided.draggableProps.style, snapshot)}
                        >
                          {name}
                          {provided.placeholder}
                        </Block>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {snapshot.isUsingPlaceholder ? <Message text="functionBlocks" /> : null}
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
                    isData={dropRegion.items}
                    isMatching={handleDropError(snapshot.draggingOverWith, id)}
                  >
                    {id === 'resultSlot' ? null : dropRegion.items ? (
                      <Delete className="delete" onClick={(e) => handleClickDelete(e, id)}>
                        X
                      </Delete>
                    ) : null}
                    <CardText>{dropRegion.items ? dropRegion.items.name : dropRegion.name}</CardText>
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
