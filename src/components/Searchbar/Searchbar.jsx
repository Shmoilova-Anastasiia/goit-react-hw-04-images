import React, { useState } from "react";
import {
    Header,
    SearchForm,
    SearchFormButton,
    SearchFormInput
} from './Searchbar.styled'
import { HiSearch } from "react-icons/hi";
import { toast } from 'react-toastify';

export const Searchbar = ({onSubmit}) => {
    const [query, setQuery] = useState('');

    const handleChange = e=> {
        setQuery(e.currentTarget.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (query.trim() === '') {
           toast.warn('Please enter your request!');
            return;
        }onSubmit(query);
        setQuery('');
    }
    
        return (
            <Header>
                <SearchForm onSubmit={handleSubmit}>
                    <SearchFormButton
                        type="submit">
                        <HiSearch size="24" />
                    </SearchFormButton>
                    <SearchFormInput
                        type="text"
                        name='query'
                        value={query}
                        onChange={handleChange}
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos">
                    </SearchFormInput>
                </SearchForm>
            </Header>
        )
    }


