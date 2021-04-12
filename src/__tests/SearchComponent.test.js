import { render, fireEvent } from "@testing-library/react";
import SearchComponent from "../components/SearchComponent";

const onHandleChange = jest.fn();

test("Shows proper placeholder", () => {
  const { findByPlaceholderText } = render(<SearchComponent searchHandler={onHandleChange} />);
  expect(findByPlaceholderText("Search by user name...")).toBeTruthy();
});

test("Calls searchHandler on keyword change", () => {
  const { getByPlaceholderText } = render(<SearchComponent searchHandler={onHandleChange} />);
  const value = "X";
  const input = getByPlaceholderText("Search by user name...");
  const event = { target: { value } };

  fireEvent.change(input, event);
  expect(onHandleChange).toHaveBeenCalledTimes(1);
  expect(onHandleChange).toHaveBeenCalledWith(value);
});
