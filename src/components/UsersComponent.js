import React from "react";

const UsersComponent = ({ usersArray }) => {
  return (
    <>
      <ol>
        {usersArray?.[0] ? (
          usersArray.map((user, index) => (
            <li key={index} className='py-1'>
              <span className='grey small'>{index + 1}. </span>
              <strong>{user.name} </strong>
              <span className='grey small'>@{user.username}</span>
            </li>
          ))
        ) : (
          <strong>No results for given search.</strong>
        )}
      </ol>
    </>
  );
};

export default UsersComponent;
