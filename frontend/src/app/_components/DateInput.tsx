import React from "react"
import DatePicker from "react-datepicker"
import { shapeClass } from "@/utils/style";

interface DateInputProps {
	label: string;
	forId: string;
	placeholder: string;
	value: Date | null | undefined;
	setValue: any;
	relativePosition: string;
}

function DateInput({
	label,
	forId,
	placeholder,
	value,
	setValue,
	relativePosition
}: DateInputProps) {
	// const boxClass = shapeClass[relativePosition];
	// console.log(boxClass);

	return (
		<div className="flex flex-col justify-between">
			<label
				htmlFor={forId}
				className="mb-1 text-white font-semibold"
			>
				{label}
			</label>
			<DatePicker
				id={forId}
				selected={value}
				className={relativePosition}
				onChange={ (date) => setValue(date) }
				dateFormat="dd/MM/yyyy"
				placeholderText={placeholder}
				isClearable
			/>
		</div>
	)
}

export default DateInput
