import uuid from 'react-uuid';

export const dataBlocks = [
  { id: uuid(), name: '모두를 위한 AI' },
  { id: uuid(), name: 'Smarter alone, Smartest togetherI' },
  { id: uuid(), name: 'Make AI work for the rest of us' },
];

export const functionBlocks = [
  { id: uuid(), name: 'toUpperCase' },
  { id: uuid(), name: 'wordNum' },
  { id: uuid(), name: 'reverse' },
];

export const dropRegionData = {
  dataSlot: {
    name: '데이터 슬롯',
    items: [],
  },
  functionSlot: {
    name: '함수 슬롯',
    items: [],
  },
  resultSlot: {
    name: '결과 슬롯',
    items: [],
  },
};
