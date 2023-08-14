import { render, fireEvent, screen } from "@testing-library/react";
import Search from "../src/app/page";
import { useRouter } from 'next/navigation'
import { act } from 'react-dom/test-utils';
import { create } from 'react-test-renderer'

// Mocks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

const pushMock = jest.fn();
useRouter.mockReturnValue({ push: pushMock });

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ key: 'value' }),
    })
);

describe("SearchComponent", () => {
  it("should redirect correctly when 'Search Flights' button is clicked", () => {
    const { getByText } = render(<Search />);

    const button = getByText("Search Flights");
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith('/results?from=&to=&leave=&ret=')
  });

  it("should take in correct values from input fields for the results path", async () => {
    const testRenderer = create(<Search />)
    const testInstance = testRenderer.root

    const fromAirport = testInstance.findByProps({id: 'fromAirport'})
    await act(async () => fromAirport.props.onChange({target: {value: 'London Heathrow Airport (LHR)'}}))

    const toAiport = testInstance.findByProps({id: 'toAirport'})
    await act(async () => toAiport.props.onChange({target: {value: 'London Gatwick Airport (LGW)'}}))

    const departDate = testInstance.findByProps({id: 'departDate'})
    await act(async () => departDate.props.onChange(new Date(2023, 9, 15)))

    const returnDate = testInstance.findByProps({id: 'returnDate'})
    await act(async () => returnDate.props.onChange(new Date(2023, 9, 20)))

    const button = testInstance.findByProps({ id: 'searchButton' })
    await act(async () => button.props.onClick(new Event('search button pressed')))

    expect(pushMock).toHaveBeenCalledWith('/results?from=LHR&to=LGW&leave=2023-10-15&ret=2023-10-20')
  });
});
