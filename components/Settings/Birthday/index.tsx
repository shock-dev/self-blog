import React, { useEffect, useState } from 'react';
import Select from '../../Select';
import { availableDays, availableYears, months } from '../../../resources/birthday';
import styles from './Birthday.module.scss';
import { AdditionInfoStepFormInputs } from '../../../pages/register';

interface BirthdayProps {
  day: number
  month: number
  year: number
  onChange: (date: AdditionInfoStepFormInputs['birthday']) => any
}

const Birthday = ({
  day,
  month,
  year,
  onChange
}: BirthdayProps) => {
  const allYears = availableYears();
  const [yearOption, setYearOption] = useState({ label: year, value: year });
  const [monthOption, setMonthOption] = useState({
    label: months.find((i) => i.value === month).label,
    value: month
  });
  const days = availableDays(yearOption.value, monthOption.value);
  const [daysOption, setDaysOption] = useState({ label: day, value: day });

  const handleChangeDay = (selectedOption) => {
    setDaysOption(selectedOption);
  };

  const handleChangeMonth = (selectedOption) => {
    setMonthOption(selectedOption);
  };

  const handleChangeYear = (selectedOption) => {
    setYearOption(selectedOption);
  };

  const generateWidth = (w: number) => ({
    width: `${w}px`
  });

  useEffect(() => {
    onChange({
      year: yearOption.value,
      month: monthOption.value,
      day: daysOption.value
    });
  }, [yearOption, monthOption, daysOption]);

  return (
    <div>
      <span className={styles.title}>
        Дата рождения:
      </span>
      <div className={styles.selectors}>
        <Select
          id="day"
          selectedOption={daysOption}
          handleChange={handleChangeDay}
          options={days}
          styles={{ marginRight: '15px', ...generateWidth(165) }}
        />
        <Select
          id="month"
          selectedOption={monthOption}
          handleChange={handleChangeMonth}
          options={months}
          styles={{ marginRight: '15px' }}
        />
        <Select
          id="year"
          selectedOption={yearOption}
          handleChange={handleChangeYear}
          options={allYears}
          styles={{ ...generateWidth(205) }}
        />
      </div>
    </div>
  );
};

export default Birthday;
