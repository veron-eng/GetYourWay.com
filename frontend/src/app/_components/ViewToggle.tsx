import React, { useState } from "react";
import ListView from "./ListView";
import MapView from "./MapView";

export default function ViewToggle({ flightsData }: { flightsData: any }) {
  const [listViewSelected, setListViewSelected] = useState(true);
  const swapView = () => {
    setListViewSelected(!listViewSelected);
  };
  return (
    <div>
      <button
        onClick={() => swapView()}
        className="mx-2 bg-skyBlue text-offWhite rounded-md px-4 py-1 font-bold"
      >
        Toggle view
      </button>
      <div>{listViewSelected ? <ListView flightsData={flightsData} /> : <MapView />}</div>
    </div>
  );
}
