export const months = [
  { label: 'Январь', value: 0 },
  { label: 'Февраль', value: 1 },
  { label: 'Март', value: 2 },
  { label: 'Апрель', value: 3 },
  { label: 'Май', value: 4 },
  { label: 'Июнь', value: 5 },
  { label: 'Июль', value: 6 },
  { label: 'Август', value: 7 },
  { label: 'Сентябрь', value: 8 },
  { label: 'Октябрь', value: 9 },
  { label: 'Ноябрь', value: 10 },
  { label: 'Декабрь', value: 11 }
];

export const availableYears = () => {
  const validYear = new Date().getFullYear() - 16;
  const startYear = validYear - 100;
  const years = [];

  for (let i = startYear; i <= validYear; i++) {
    years.push({ value: i, label: i });
  }

  return years.reverse();
};


export const availableDays = (year: number, month: number) => {
  const count = 32 - new Date(year, month, 32).getDate();
  const days = [];

  for (let i = 1; i < count; i++) {
    days.push({ value: i, label: i });
  }

  return days;
};
