"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ViewToggle from "../_components/ViewToggle";
//Router
import { useRouter } from "next/navigation";

export default function Results({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { from, to, leave, ret } = searchParams;

  const [flightsData, setFlightsData] = useState<any>([]);

  // nav router
  const router = useRouter();

  console.log(from, to, leave, ret);

  const getFlights = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8000/getFlights/${from}/${to}/${leave}/${ret}`
      );
      console.log(result.data);
      setFlightsData(result.data);
    } catch (error) {
      alert("Sorry, no flights found for your given locations and dates.");
      router.push("/");
      console.log(error);
    }
  };
  
  useEffect(() => {
    getFlights();
  }, []);

  return <ViewToggle flightsData={flightsData} />;
}
