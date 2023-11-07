import React, { useState } from 'react';
import { toast } from 'react-toastify';

import {
  Search,
  SearchForm,
  SubmitButton,
  InputBox,
  Icon,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.warn('УПС! 🫤 Введіть значення для пошуку ⌨️ ');
      return;
    }
    onSubmit(query);
    // setQuery('');
  };
  return (
    <Search>
      <SearchForm onSubmit={handleSubmit}>
        <SubmitButton type="submit">
          <span>
            <Icon />
          </span>
        </SubmitButton>
        <InputBox
          value={query}
          name="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </Search>
  );
}
