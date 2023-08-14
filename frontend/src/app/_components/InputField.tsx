import React, { RefObject } from 'react'

interface InputFieldProps {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (event: any) => Promise<void>;
    inputRef: RefObject<HTMLInputElement>;
    suggestionRef: RefObject<HTMLDivElement>;
    suggestedOptions: Array<any>;
    setValue: (newValue: string) => void;
    setSuggestedOptions: any;
}

function InputField({
    id,
    label,
    placeholder,
    value,
    onChange,
    inputRef,
    suggestionRef,
    suggestedOptions,
    setValue,
    setSuggestedOptions
}: InputFieldProps) {
  return (
    <div className="relative flex-1 flex flex-col">
        <label
            htmlFor={id}
            className="mb-1 text-white font-semibold"
        >
            {label}
        </label>
        <input
            id={id}
            placeholder={placeholder}
            className="border px-2 h-16 rounded-l-xl md:rounded-xl w-full"
            type="text"
            value={value}
            onChange={onChange}
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

export default InputField