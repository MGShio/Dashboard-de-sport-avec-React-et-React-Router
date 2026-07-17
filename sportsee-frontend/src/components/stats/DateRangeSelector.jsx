import React from 'react';
import './DateRangeSelector.css';

/**
 * Date Range Selector Component
 * Allows selecting a date range for charts
 * @param {Object} props - Component props
 * @param {string} props.selectedRange - Currently selected range
 * @param {Function} props.onChange - Callback when range changes
 */
function DateRangeSelector({ selectedRange = '28 mai - 25 juin', onChange }) {
  const dateRanges = [
    { label: '28 mai - 25 juin', value: '2025-05-28_to_2025-06-25' },
    { label: '21 mai - 28 mai', value: '2025-05-21_to_2025-05-28' },
    { label: '14 mai - 21 mai', value: '2025-05-14_to_2025-05-21' },
  ];

  return (
    <div className="date-range-selector">
      {dateRanges.map((range, index) => (
        <button
          key={range.value}
          className={`range-button ${selectedRange === range.label ? 'active' : ''}`}
          onClick={() => onChange?.(range.value, range.label)}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}

export default DateRangeSelector;
