import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { cards, dataBlocks } from '../data';
import uuid from 'react-uuid';

const dropRegionData = {
  [uuid()]: {
    name: '데이터 슬롯',
    items: [],
  },
  [uuid()]: {
    name: '함수 슬롯',
    items: [],
  },
  [uuid()]: {
    name: '결과 슬롯',
    items: [],
  },
};

const onDragEnd = (result, dropRegions, setDropRegions, data, setData) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const dataItems = [...data];
    const destColumn = dropRegions[destination.droppableId];
    //
    const removed = dataItems.splice(source.index, 1);
    const destItems = [...removed];
    console.log(destItems);
    setDropRegions({
      ...dropRegions,
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
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

const Home = () => {
  const [dropRegions, setDropRegions] = useState(dropRegionData);
  const [data, setData] = useState(dataBlocks);
  const handleClickDelete = (e, id, dropRegion) => {
    if (e.target.className.includes('delete')) {
      setDropRegions((dropRegions) => ({ ...dropRegions, [id]: { ...dropRegion, items: [] } }));
    }
  };
  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, dropRegions, setDropRegions, data, setData)}>
      <Header>
        <Button>실행하기</Button>
      </Header>
      <Contents>
        <BlocksContainer>
          <Title>data</Title>
          <div>
            <Title>Data Blocks</Title>
            <Droppable droppableId="dataBlocks">
              {(provided) => (
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
                </Blocks>
              )}
            </Droppable>
          </div>
          <div>
            <Title>Function Blocks</Title>
            <Blocks>
              <Block>toUpperCase</Block>
              <Block>wordNum</Block>
              <Block>reverse</Block>
            </Blocks>
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
                  >
                    {dropRegion.items.length > 0 ? (
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
  padding: 0.5rem 2rem;
  margin: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.color.lightGrey};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.color.white};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.xSmall};
`;

const BlocksContainer = styled.section`
  ${({ theme }) => theme.common.flexColumn};
  width: 20%;
  max-width: 10rem;
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
  width: 30%;
  height: 10rem;
  list-style: none;
  background-color: ${({ isData, theme }) => (isData ? theme.color.white : theme.color.lightGrey)};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: ${({ isData, isDraggedOver, theme }) =>
    isDraggedOver ? `2px dashed ${theme.color.grey}` : isData ? `1px solid ${theme.color.black}` : 'none'};
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
