import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { searchPlays } from '../store/actions/playActions';

const SearchStyles = styled.div`
  margin: 5rem;
  input {
    width: 50rem;
    padding: 0.7rem;
    border-radius: 5px 0 0 5px;
    border: 1px solid #000;
  }
  button {
    padding: 0.8rem;
    border-radius: 0 5px 5px 0;
  }
`;

export const Search = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(searchPlays(search));
  };
  return (
    <SearchStyles>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='button' onClick={searchHandler}>
        Buscar
      </button>
    </SearchStyles>
  );
};
