import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import uuid from 'react-uuid';
import { dataBlocks, dropRegionData, functionBlocks } from '../data';
import Header from './Header';
import Message from './Message';
import Blocks from './Blocks';
import Cards from './Cards';

const Home = () => {
  const [dropRegions, setDropRegions] = useState({ ...dropRegionData });
  const { dataSlot, functionSlot, resultSlot } = dropRegions;
  const [data, setData] = useState([...dataBlocks]);
  const [functions, setFunctions] = useState([...functionBlocks]);
  const makeUpperCase = (item) => {
    return item.toUpperCase();
  };
  const deriveWordNum = (item) => {
    return item.split(' ').length;
  };
  const makeReverse = (item) => {
    return item.split('').reverse().join('');
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
        resultSlot: { ...dropRegionData['resultSlot'] },
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
          <Blocks data={data} title="Data Blocks" id="dataBlocks" />
          <Blocks data={functions} title="Function Blocks" id="functionBlocks" />
        </BlocksContainer>
        <CardsContainer>
          <Cards data={dropRegions} onClickDelete={handleClickDelete} />
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
const CardsContainer = styled.main`
  width: 80%;
  ${({ theme }) => theme.common.flexCenter};
`;
