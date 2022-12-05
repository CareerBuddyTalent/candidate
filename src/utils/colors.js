const sectionBgBase = 'bg-gradient-to-tr';
export const sectionBgLogin = `${sectionBgBase} from-purple-400 via-pink-500 to-red-500`;
export const sectionBgLoginDark = `${sectionBgBase} from-purple-900 via-pink-900 to-red-900`;
export const sectionBgError = `${sectionBgBase} from-pink-400 via-red-500 to-yellow-500`;
export const sectionBgErrorDark = `${sectionBgBase} from-pink-900 via-red-900 to-yellow-900`;

export const colorsBg = {
  white: 'bg-white text-brand-black',
  black: 'bg-black text-white',
  blackOpacity: 'bg-black text-white bg-opacity-40',
  info: 'bg-brand-sky text-white',
  primary: 'bg-brand-primary text-white',
  primaryOpacity: 'bg-brand-primary text-brand-primary bg-opacity-10',
  danger: 'bg-red-600 text-white',
  secondary: 'bg-brand-button text-white',
  chat: 'bg-[#6D2E5D] text-white',
  transparent: 'bg-transparent border-0',
  success: 'bg-brand-green text-white',
};

export const colorsBgHover = {
  white: 'hover:bg-white',
  black: 'hover:bg-black',
  info: 'hover:bg-brand-sky',
  primary: 'hover:bg-brand-primary',
  success: 'hover:bg-brand-green',
  danger: 'hover:bg-red-700',
  secondary: 'hover:bg-brand-button',
};

export const colorsBorders = {
  white: 'border-white',
  black: 'border-black',
  info: 'border-brand-sky',
  primary: 'border-brand-primary',
  success: 'border-brand-green',
  danger: 'border-red-700',
  secondary: 'border-brand-button',
};

export const colorsText = {
  white: 'text-white',
  black: 'text-black',
  info: 'text-white',
  primary: 'text-brand-primary',
  success: 'text-emerald-600',
  danger: 'text-red-600',
  secondary: 'text-brand-button',
};

export const colorsOutline = {
  white: [colorsText.white, colorsBorders.white],
  black: [colorsText.black, colorsBorders.white],
  info: [colorsText.info, colorsBorders.info],
  primary: [colorsText.primary, colorsBorders.primary],
  success: [colorsText.success, colorsBorders.success],
  danger: [colorsText.danger, colorsBorders.danger],
  secondary: [colorsText.secondary, colorsBorders.secondary],
};

export const colorsOutlineHover = {
  white: 'hover:bg-white hover:text-brand-black',
  black: 'hover:bg-black hover:text-white',
  success: 'hover:bg-brand-green hover:text-white',
  // primary: 'hover:bg-brand-primary hover:text-white',
  danger: 'hover:bg-red-700 hover:text-white',
  secondary: 'hover:bg-brand-green hover:text-white hover:border-brand-green',
  info: 'hover:bg-brand-primary hover:text-white',
};

export const getButtonColor = (color, isOutlined, hasHover) => {
  const base = [isOutlined ? colorsText[color] : colorsBg[color], colorsBorders[color]];

  if (hasHover) {
    base.push(isOutlined ? colorsOutlineHover[color] : colorsBgHover[color]);
  }

  return base;
};
