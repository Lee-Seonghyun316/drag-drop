import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Message from './Message';
import styled from 'styled-components';

const Blocks = ({ data, title, id }) => {
  const handleDropAnimation = (style, snapshot) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: `0.01s`,
    };
  };

  return (
    <div>
      <Title>{title}</Title>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <BlockContainer {...provided.droppableProps} ref={provided.innerRef}>
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
            {snapshot.isUsingPlaceholder ? <Message text={id} /> : null}
          </BlockContainer>
        )}
      </Droppable>
    </div>
  );
};

export default React.memo(Blocks);

const Title = styled.h1`
  margin: 0.5rem;
`;
const BlockContainer = styled.ul`
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
