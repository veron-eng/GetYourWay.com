import React from "react"
import { create } from "react-test-renderer"
import MapView from "../src/app/results/_components/_MapViewComponents/MapView"
import mockResponse from "../public/mockResponse.json"

describe("Map View tests", () => {
  test("Weather data should be rendered", () => {
    const testRenderer = create(<MapView flightsData={mockResponse} />)
    const testInstance = testRenderer.root

    const weatherInstance = testInstance.findByProps({id: "weatherData"});

    // const children = weatherInstance.children;
  })
})
