import { act, render, screen, waitFor } from "@testing-library/react";
import UserContext from "../context/UserContext";
import UserProvider from "../context/UserProvider";
import React, { useContext, useEffect } from "react";
import axios from "axios";

jest.mock("axios");

const TestComponent = ({ searchKeyword = "" }) => {
  const { getAllUsers, error, foundUsers, searchUsers, usersDetails } = useContext(UserContext);
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    if (searchKeyword) searchUsers(searchKeyword);
  }, [usersDetails]);
  return (
    <>
      <div>Test Component</div>
      {error && error}
      {foundUsers?.[0] && foundUsers[0].name}
    </>
  );
};

beforeEach(() => {
  axios.get.mockResolvedValue({ data: [{ name: "Jan" }] });
});

const renderTestComponentWithUserProvider = (searchKeyword = "") =>
  render(
    <UserProvider>
      <TestComponent searchKeyword={searchKeyword} />
    </UserProvider>
  );

test("getAllUsers method fetches the data and stores in foundUsers", async () => {
  // axios.get.mockResolvedValue({ data: [{ name: "Jan" }] });
  await act(async () => renderTestComponentWithUserProvider());
  screen.getByText("Test Component");
  await screen.findByText(/Jan/i);
});

test("Correctly handle error while ", async () => {
  axios.get.mockRejectedValue(new Error("Error while fetching data"));
  await act(async () => renderTestComponentWithUserProvider());
  await screen.findByText(/Error while fetching data/i);
});

test("Correctly search for users ", async () => {
  axios.get.mockResolvedValue({ data: [{ name: "Jan" }] });
  await act(async () => renderTestComponentWithUserProvider("Ja"));
  expect(await screen.findByText(/Jan/i)).toBeTruthy();
});

test("Do not show user when query is different", async () => {
  axios.get.mockResolvedValue({ data: [{ name: "Jan" }] });
  await act(async () => renderTestComponentWithUserProvider("Jam"));
  screen.getByText("Test Component");
  expect(await waitFor(() => screen.queryByText(/Jan/i))).toBeFalsy();
});
