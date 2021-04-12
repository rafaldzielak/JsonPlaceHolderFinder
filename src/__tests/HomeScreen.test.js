import { render, fireEvent } from "@testing-library/react";
import HomeScreen from "../screens/HomeScreen";

import UserContext from "../context/UserContext";

const getAllUsers = jest.fn();

const contextValue = {
  foundUsers: [{ name: "Jan", username: "@dzban" }],
  usersDetails: [],
  error: "Some error",
  getAllUsers,
};

const renderHomescreenWithProvider = (
  <UserContext.Provider value={contextValue}>
    <HomeScreen />
  </UserContext.Provider>
);

test("Home screen renders properly", () => {
  const { getByText } = render(renderHomescreenWithProvider);
  expect(getByText("Users list")).toBeTruthy();
});

test("Home screen shows error message", () => {
  const { getByText } = render(renderHomescreenWithProvider);
  expect(getByText("Some error")).toBeTruthy();
});

test("getAllUsers method is called at the start once", () => {
  render(renderHomescreenWithProvider);
  expect(getAllUsers).toBeCalledTimes(1);
});
