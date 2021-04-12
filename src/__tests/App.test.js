import { render, screen } from "@testing-library/react";
import App from "../App";

test("Renders component", () => {
  render(<App />);
  const linkElement = screen.getByText(/Users list/i);
  expect(linkElement).toBeInTheDocument();
});
