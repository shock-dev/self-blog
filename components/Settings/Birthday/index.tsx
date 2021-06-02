import React, { useState } from 'react';
import Select from '../../Select';
import { availableDays, availableYears, months } from '../../../resources/birthday';
import styles from './Birthday.module.scss';

const Birthday = () => {
  const allYears = availableYears();
  const [yearOption, setYearOption] = useState(allYears.find((i) => i.value === 2000));
  const [monthOption, setMonthOption] = useState(months[0]);
  const days = availableDays(yearOption.value, monthOption.value);
  const [daysOption, setDaysOption] = useState(days[0]);

  const handleChangeDay = (selectedOption) => {
    setDaysOption(selectedOption);
  };

  const handleChangeMonth = (selectedOption) => {
    setMonthOption(selectedOption);
  };

  const handleChangeYear = (selectedOption) => {
    setYearOption(selectedOption);
  };

  const miniSelectStyle = {
    width: '180px'
  };

  return (
    <div>
      <span className={styles.title}>
        День рождения:
      </span>
      <div className={styles.selectors}>
        <Select
          id="day"
          selectedOption={daysOption}
          handleChange={handleChangeDay}
          options={days}
          styles={{ marginRight: '15px', ...miniSelectStyle }}
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
          styles={{ ...miniSelectStyle }}
        />
      </div>
    </div>
  );
};

export default Birthday;
