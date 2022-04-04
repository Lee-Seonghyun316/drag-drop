import React from 'react';
import styled from 'styled-components';

const Header = ({ onClick, buttonActive }) => (
  <Wrap>
    <Button onClick={onClick} activate={buttonActive}>
      실행하기
    </Button>
  </Wrap>
);

export default React.memo(Header);

const Wrap = styled.header`
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
