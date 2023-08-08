import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateSelectorProps {
  onDateSelect: (formattedDate: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formattedDate, setFormattedDate] = useState("");

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    console.log("format date before setted: " + formatDate(date));
    setFormattedDate(formatDate(date));
    onDateSelect(formattedDate);
    console.log("on date select " + onDateSelect(formattedDate));
    console.log("format date after setted: " + formattedDate);
  };

  const formatDate = (date: any) => {
    if (date == null) {
      return date;
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
      isClearable
    />
  );
};

export default DateSelector;
