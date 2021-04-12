import React, { useState } from "react";

const SearchComponent = ({ searchHandler }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <form onSubmit={(e) => e.preventDefault()} className='py-1'>
      <input
        className='width-full'
        type='text'
        placeholder='Search by user name...'
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          searchHandler(e.target.value);
        }}
      />
    </form>
  );
};

export default SearchComponent;
