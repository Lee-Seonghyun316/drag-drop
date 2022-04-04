import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { dataBlocks, functionBlocks } from '../data';

const Cards = ({ data, onClickDelete }) => {
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

  return (
    <CardContainer className="cards">
      {Object.entries(data).map(([id, dropRegion], index) => (
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
                <Delete className="delete" onClick={(e) => onClickDelete(e, id)}>
                  X
                </Delete>
              ) : null}
              <CardText>{dropRegion.items ? dropRegion.items.name : dropRegion.name}</CardText>
              {provided.placeholder}
            </Card>
          )}
        </Droppable>
      ))}
    </CardContainer>
  );
};

export default Cards;
const CardContainer = styled.div`
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
