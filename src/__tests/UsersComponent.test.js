import { render, screen } from "@testing-library/react";
import UsersComponent from "../components/UsersComponent";

test("Shows name & username on the screen", () => {
  const { getByText } = render(
    <UsersComponent usersArray={[{ name: "Rafal Dzielak", username: "rafdzi" }]} />
  );
  expect(getByText("Rafal Dzielak")).toBeTruthy();
  expect(getByText("@rafdzi")).toBeTruthy();
});

test("Handles multiple users", () => {
  const { getByText, queryByText } = render(
    <UsersComponent
      usersArray={[
        { name: "Rafal Dzielak", username: "rafdzi" },
        { name: "Jan Kowalski", username: "jankow" },
      ]}
    />
  );
  expect(getByText("Jan Kowalski")).toBeTruthy();
  expect(getByText("@jankow")).toBeTruthy();
  expect(getByText("2.")).toBeTruthy();
  expect(queryByText("3.")).toBeFalsy();
});

test("Handles empty data", () => {
  const { getByText } = render(<UsersComponent usersArray={[]} />);
  expect(getByText("No results for given search.")).toBeTruthy();
});

test("Handles wrong data", () => {
  const { getByText } = render(<UsersComponent usersArray={false} />);
  expect(getByText("No results for given search.")).toBeTruthy();
});
