import tailwind from 'twrnc';

export const tw = tailwind;

export const twGetTextColor = (textClass: string) => {
  const textColor = tw`${textClass}`;
  return textColor.color + '';
};
