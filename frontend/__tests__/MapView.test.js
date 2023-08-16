import React from "react"
import { create } from "react-test-renderer"
import MapView from "../src/app/results/_components/_MapViewComponents/MapView"
import mockResponse from "../public/mockResponse.json"

describe("Map View tests", () => {
  test("Weather data should be rendered", () => {
    const testRenderer = create(<MapView flightsData={mockResponse} />)
    const testInstance = testRenderer.root

    const weatherInstance = testInstance.findByProps({id: "weatherItems"});

    const weatherItems = weatherInstance.findAllByType('li');

    // max temperature
    expect(weatherItems[0].children).toContain("34.2");

    // min temperature
    expect(weatherItems[1].children).toContain("24.4");

    // avg temperature
    expect(weatherItems[2].children).toContain("29.2");

    // max wind
    expect(weatherItems[3].children).toContain("6.5");

    // avg humidity
    expect(weatherItems[4].children).toContain("67.0");
  })
})
