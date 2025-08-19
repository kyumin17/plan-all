import { colorList } from '../styles/color';

export const getRandom = (min: number, max: number) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

export const getRandomColor = () => {
  return colorList[getRandom(1, colorList.length)];
}