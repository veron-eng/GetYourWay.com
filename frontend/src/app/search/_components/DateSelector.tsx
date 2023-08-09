import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/dateSelector.css";

interface DateSelectorProps {
  onDateSelect: (formattedDate: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  var formattedDate = "NA";

  const handleDateChange = (date: Date | null) => {
    if (date == null) {
      console.log(formattedDate);
    } else {
      const fdate = formatDate(date);
      setSelectedDate(date);
      formattedDate = formatDate(date);
      onDateSelect(fdate);
    }
  };

  const formatDate = (date: any) => {
    if (date == null) {
      return String(date);
    } else {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}/${month}/${day}`;
    }
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="dd/MM/yyyy"
      className="my-custom-datepicker"
    />
  );
};

export default DateSelector;
