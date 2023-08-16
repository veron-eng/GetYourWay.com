import React from 'react'

interface DropdownProps {
  label: string;
  forId: string;
  value: string;
  setValue: any;
  relativePosition: string;
}

function Dropdown({ label, forId, value, setValue, relativePosition }: DropdownProps) {
  const numberOptions = Array.from({ length: 9 }, (_, index) => (index + 1).toString());

  const handleChange = (event: any) => {
    setValue(event.target.value);
  }

  return (
    <div className="flex flex-col">
      <label
				htmlFor={forId}
				className="mb-1 text-white font-semibold"
			>
				{label}
			</label>
      <select
        id={forId}
				value={value}
				onChange={handleChange}
        className={relativePosition}
      >
        {numberOptions.map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
