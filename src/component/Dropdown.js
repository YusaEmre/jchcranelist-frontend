import React from 'react';

const DropDown = ({ month, setMonth }) => {
  let months = [
    { value: 'January' },
    { value: 'February' },
    { value: 'March' },
    { value: 'April' },
    { value: 'May' },
    { value: 'June' },
    { value: 'July' },
    { value: 'August' },
    { value: 'September' },
    { value: 'October' },
    { value: 'November' },
    { value: 'December' },
  ];
  let handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 30 }}
    >
      <select value={month} onChange={handleMonthChange}>
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
