import React from 'react';
import styled from 'styled-components';
const Home = () => (
  <div>
    <Header>
      <Button>실행하기</Button>
    </Header>
    <Contents>
      <BlocksContainer>
        <Title>data</Title>
        <div>
          <Title>Data Blocks</Title>
          <Blocks>
            <Block>data Blocks</Block>
            <Block>
              Smarter alone, <br />
              Smartest together
            </Block>
            <Block>
              Make Al work for the <br />
              rest of us
            </Block>
          </Blocks>
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
        <Cards>
          <Card>데이터 슬롯</Card>
          <Card>함수 슬롯</Card>
          <Card>결과 슬롯</Card>
        </Cards>
      </CardsContainer>
    </Contents>
  </div>
);

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
`;
const CardsContainer = styled.main`
  width: 80%;
  ${({ theme }) => theme.common.flexCenter};
`;
const Cards = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  border-bottom: 3px solid ${({ theme }) => theme.color.grey};
`;
const Card = styled.div`
  transform: translateY(1rem);
  padding: 15% 5%;
  text-align: center;
  min-width: 15%;
  background-color: ${({ theme }) => theme.color.lightGrey};
  border-radius: ${({ theme }) => theme.borderRadius};
  @media ${({ theme }) => theme.device.mobile} {
    padding: 15% 0;
  }
`;
