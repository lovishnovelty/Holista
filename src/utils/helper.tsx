import normalizer from 'react-native-normalize';

export const normalize = (value: number) => {
  return normalizer(value);
};

export const greet = () => {
  let date: any = new Date().getHours();
  return date >= 0 && date < 12
    ? 'Good Morning,'
    : date >= 12 && date < 17
    ? 'Good Afternoon,'
    : 'Good Evening,';
};
