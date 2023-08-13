import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface FlightFilterProps {
  outboundTime: number[];
  returnTime: number[];
  setOutboundTime: (time: number[]) => void;
  setReturnTime: (time: number[]) => void;
  setLoading: (loading: boolean) => void;
}

export default function FlightFilter({
  outboundTime,
  returnTime,
  setOutboundTime,
  setReturnTime,
  setLoading,
}: FlightFilterProps) {
  return (
    <div className="flex justify-end my-4 space-x-6">
      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700">
          Outbound Time
        </label>
        <Slider
          range
          min={0}
          max={24}
          allowCross={false}
          value={outboundTime}
          onChange={(value: number | number[]) => {
            if (Array.isArray(value)) {
              setOutboundTime(value);
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }
          }}
        />
        <span>{`${outboundTime[0]}:00 - ${outboundTime[1]}:00`}</span>
      </div>

      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700">
          Return Time
        </label>
        <Slider
          range
          min={0}
          max={24}
          allowCross={false}
          value={returnTime}
          onChange={(value: number | number[]) => {
            if (Array.isArray(value)) {
              setReturnTime(value);
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }
          }}
        />
        <span>{`${returnTime[0]}:00 - ${returnTime[1]}:00`}</span>
      </div>
    </div>
  );
}
