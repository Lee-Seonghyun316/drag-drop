const deviceSizes = {
  mobile: '500px',
  tablet: '768px',
  laptop: '1024px',
};
const device = {
  mobile: `all and (min-width:330px) and (max-width:${deviceSizes.mobile})`,
  tablet: `all and (min-width:${deviceSizes.mobile}) and (max-width:${deviceSizes.tablet})`,
  laptop: `all and (min-width:${deviceSizes.tablet})`,
  smallerThanLaptop: `all and (max-width:${deviceSizes.tablet})`,
};
const pixelToRem = (size) => `${size / 16}rem`;
const fontSize = {
  big: pixelToRem(35),
  middle: pixelToRem(30),
  small: pixelToRem(25),
  xSmall: pixelToRem(15),
  xxSmall: pixelToRem(12),
};
const color = {
  black: '#000',
  white: '#FFFFFF',
  lightGrey: '#cfcfcf',
  grey: '#9e9e9e',
  purple: '#663399',
};
const borderRadius = '0.3rem';
const common = {
  flexColumn: `
    display: flex;
    flex-direction: column;
  `,
  flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  hideScrollBar: `
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  `,
};
const space = {
  narrow: '0.5rem',
  commonly: '1rem',
  widely: '1rem',
};
const theme = {
  device,
  deviceSizes,
  fontSize,
  color,
  borderRadius,
  common,
  space,
};

export default theme;
