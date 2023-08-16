"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ListView from "./_components/_ListViewComponents/ListView";
import MapView from "./mapView/MapView";
import { useRouter } from "next/navigation";

export default function Results({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { from, to, leave, ret, passengers } = searchParams;

  const [flightsData, setFlightsData] = useState<any>([]);
  const [listViewSelected, setListViewSelected] = useState(true);
  const swapView = () => {
    setListViewSelected(!listViewSelected);
  };

  // nav router
  const router = useRouter();

  console.log(from, to, leave, ret);

  const getFlights = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8000/getFlights/${from}/${to}/${leave}/${ret}/${passengers}`
      );
      setFlightsData(result.data);
      console.log(result.data)
    } catch (error) {
      alert("Sorry, no flights found for your given locations and dates.");
      router.push("/");
      console.log(error);
    }
  };

  useEffect(() => {
    getFlights();
  }, []);

  return (
    <>
      <button
        onClick={() => swapView()}
        className="mx-2 bg-skyBlue text-offWhite rounded-md px-4 py-1 font-bold"
      >
        Toggle view
      </button>
      <div>
        {listViewSelected ? (
          <ListView flightsData={flightsData} />
        ) : (
          <MapView flightsData={flightsData} />
        )}
      </div>
    </>
  );
}
