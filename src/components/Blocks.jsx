import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Message from './Message';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { dataBlocks } from '../data';

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

Blocks.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  id: PropTypes.string,
};

Blocks.defaultProps = {
  data: dataBlocks,
  title: '',
  id: '',
};

export default React.memo(Blocks);

const Title = styled.h1`
  margin: ${({ theme }) => theme.space.narrow};
`;
const BlockContainer = styled.ul`
  ${({ theme }) => theme.common.flexColumn};
  gap: ${({ theme }) => theme.space.commonly};
  margin-bottom: ${({ theme }) => theme.space.commonly};
`;
const Block = styled.li`
  padding: ${({ theme }) => theme.space.narrow};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0px 5px 11px 5px #e0e0e0;
  background-color: ${({ theme }) => theme.color.white};
`;
