import axios from "axios";
import React, { useState, useCallback } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({ foundUsers: [], usersDetails: [], error: "", loading: false });

  const setError = useCallback((error) => {
    setUserState((prevState) => ({ ...prevState, error }));
  }, []);

  const setLoading = useCallback(() => {
    setUserState((prevState) => ({ ...prevState, loading: true }));
  }, []);

  const searchUsers = (name) => {
    const foundUsers = name
      ? userState.usersDetails.filter((user) => user.name.toLowerCase().includes(name.toLowerCase()))
      : userState.usersDetails;
    setUserState((prevState) => ({ ...prevState, foundUsers }));
  };

  const getAllUsers = useCallback(async () => {
    setLoading();
    try {
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users`);
      setUserState((prevState) => ({ ...prevState, foundUsers: data, usersDetails: data, loading: false }));
    } catch (error) {
      setError(error.message);
    }
  }, [setError]);

  return (
    <UserContext.Provider value={{ ...userState, setError, getAllUsers, searchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
