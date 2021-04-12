import React, { useContext, useEffect } from "react";
import SearchComponent from "../components/SearchComponent";
import UserComponent from "../components/UsersComponent";
import userContext from "../context/UserContext";

const HomeScreen = () => {
  const { getAllUsers, foundUsers, searchUsers, error, loading } = useContext(userContext);
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <>
      <header>
        <h1>Users list</h1>
        <SearchComponent searchHandler={searchUsers}></SearchComponent>
      </header>
      <main>
        {error && <strong>{error}</strong>}
        {foundUsers && !loading && <UserComponent usersArray={foundUsers}></UserComponent>}
      </main>
    </>
  );
};

export default HomeScreen;
