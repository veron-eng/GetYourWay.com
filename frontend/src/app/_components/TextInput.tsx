import React, { RefObject, useRef, useState, useEffect } from 'react'
import { shapeClass } from '@/utils/style';
import { getMockAirports } from '@/utils/mockData';

interface TextInputProps {
	forId: string;
	label: string;
	placeholder: string;
	value: string;
	setValue: (newValue: string) => void;
	relativePosition: string;
}

function TextInput({
	forId,
	label,
	placeholder,
	value,
	setValue,
	relativePosition
}: TextInputProps) {
	const [suggestedOptions, setSuggestedOptions] = useState([])
	const prevValue = useRef("");
	const inputRef = useRef<HTMLInputElement>(null);
	const suggestionRef = useRef<HTMLDivElement>(null);

	const handleChange = async (event: any) => {
		try {
			const value = event.target.value;
			setValue(value);

			if (!value.trim()) {
				setSuggestedOptions([]);
				return;
			}

			// Exit the function early if backspace was pressed
			if (value.length < prevValue.current.length) {
				prevValue.current = value;
				return;
			}

			if (value.length > 2) {
				const data = getMockAirports();
				// TODO: uncomment this for production
				// const res = await fetch(
				//   `https://airlabs.co/api/v9/suggest?q=${value}&api_key=${process.env.NEXT_PUBLIC_AIRLABS_API_KEY}`
				// );
				// const data = await res.json();
				if (data.error) throw new Error(data.error.message)
				else if (data && data.response && data.response.airports) {
					setSuggestedOptions(data.response.airports);
				}
			} else {
				// Clear suggestions for short input values
				setSuggestedOptions([]);
			}

			prevValue.current = value;
		} catch (error) {
			console.error("Error handling the change:", error);
			// Handle the error accordingly, e.g., by setting an error state, showing an alert, etc.
		}
	};

	// Close autosuggestions when the user clicks outside the input
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target as Node) &&
				suggestionRef.current &&
				!suggestionRef.current.contains(event.target as Node)
			) setSuggestedOptions([]);
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative flex-1 flex flex-col">
			<label
				htmlFor={forId}
				className="mb-1 text-white font-semibold"
			>
				{label}
			</label>
			<input
				id={forId}
				placeholder={placeholder}
				className={shapeClass[relativePosition]}
				type="text"
				value={value}
				onChange={handleChange}
				ref={inputRef}
			/>
			<div
				ref={suggestionRef}
				className="absolute top-full w-full bg-white rounded shadow-lg divide-y z-10"
			>
				{suggestedOptions.length > 0 && (
					<div className="absolute mt-2 w-full bg-white border rounded shadow-lg divide-y z-10">
					{suggestedOptions
						.filter((airport: any) => airport.iata_code)
						.map((airport: any, index) => (
							<div
								key={index}
								className="cursor-pointer hover:bg-gray-200 p-2"
								onClick={() => {
									setValue(`${airport.name} (${airport.iata_code})`);
									setSuggestedOptions([]);
								}}
							>
								{airport.name} ({airport.iata_code})
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default TextInput
