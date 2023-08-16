import { render, fireEvent, screen } from "@testing-library/react";
import Search from "../src/app/page";
import { useRouter } from "next/navigation";
import { act } from "react-dom/test-utils";
import { create } from "react-test-renderer";

// Mocks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();
useRouter.mockReturnValue({ push: pushMock });

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ key: "value" }),
  })
);

describe("SearchComponent", () => {

  it("should redirect correctly when 'Search Flights' button is clicked", () => {
    const { getByText } = render(<Search searchParams={{from: undefined, to: undefined}} />);

    const button = getByText("Search Flights");
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith("/results?from=&to=&leave=&ret=&passengers=1");
  });

  it("should take in correct values from input fields for the results path", async () => {
    const testRenderer = create(<Search searchParams={{from: undefined, to: undefined}} />);
    const testInstance = testRenderer.root;

    // User changes the from textbox
    const fromAirport = testInstance.findByProps({ id: "fromAirport" });
    await act(async () =>
      fromAirport.props.onChange({
        target: { value: "London Heathrow Airport (LHR)" },
      })
    );

    // User changes the to textbox
    const toAiport = testInstance.findByProps({ id: "toAirport" });
    await act(async () =>
      toAiport.props.onChange({
        target: { value: "London Gatwick Airport (LGW)" },
      })
    );

    // User changes the from date
    const departDate = testInstance.findByProps({ id: "departDate" });
    await act(async () => departDate.props.onChange(new Date(2023, 9, 15)));

    // User changes the to date
    const returnDate = testInstance.findByProps({ id: "returnDate" });
    await act(async () => returnDate.props.onChange(new Date(2023, 9, 20)));

    const dropdown = testInstance.findByProps({ id: "passengers" })
    await act(async () => dropdown.props.onChange({ target: { value: "2" } }))

    // User presses the search button
    const button = testInstance.findByProps({ id: "searchButton" });
    await act(async () =>
      button.props.onClick(new Event("search button pressed"))
    );

    // Perform assertion
    expect(pushMock).toHaveBeenCalledWith(
      "/results?from=LHR&to=LGW&leave=2023-10-15&ret=2023-10-20&passengers=2"
    );


  });
});
