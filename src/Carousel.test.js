import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";


it('should render', () => {
  render(<Carousel />);
})

it('should match snapshot', () => {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the last
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the last image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();
});

it('hides the left arrow on the first picture', () => {
  const { queryByTestId } = render(<Carousel />);

  // expect left arrow to be hidden when the page loads
  expect(queryByTestId('left-arrow')).toHaveClass('hidden');

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect left arrow to be visible on the next picture
  expect(queryByTestId('left-arrow')).not.toHaveClass('hidden');
})

it('hides the right arrow on the last picture', () => {
  const { queryByTestId } = render(<Carousel />);

  // expect right arrow to be visible when the page loads
  expect(queryByTestId('right-arrow')).not.toHaveClass('hidden');

  // move forward twice
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect right arrow to be hidden on last picture
  expect(queryByTestId('right-arrow')).toHaveClass('hidden');
})
