import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Message = ({ text }) => {
  const makeMessage = (text) => {
    if (text === 'dataBlocks') {
      return '데이터 슬롯으로 이동:)';
    }
    if (text === 'functionBlocks') {
      return '함수 슬롯으로 이동:)';
    }
    if (text === 'toUpperCase') {
      return '대문자로 변경:)';
    }
    if (text === 'wordNum') {
      return '단어수:)';
    }
    if (text === 'reverse') {
      return '글자 뒤집기';
    }
  };
  return (
    <Wrap>
      <FontAwesomeIcon icon={faUser} /> {makeMessage(text)}
    </Wrap>
  );
};

Message.propTypes = {
  text: PropTypes.string,
};

Message.defaultProps = {
  text: PropTypes.string,
};

export default React.memo(Message);

const Wrap = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 0rem;
  ${({ theme }) => `
  padding: ${theme.space.narrow} ${theme.space.commonly}; 
  `};
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.color.purple};
  color: ${({ theme }) => theme.color.white};
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
