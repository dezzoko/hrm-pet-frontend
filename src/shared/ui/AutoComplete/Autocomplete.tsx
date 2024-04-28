import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useOutsideClick } from '@/shared/lib';

interface AutocompleteProps {
    onSelect: (value: any) => void;
    searchResults: any[];
    search:(value:string)=>void;
    selectedValue?:any;
    placeholder?: string;
}

interface SearchResult {
    id: number;
    name: string;
}

const AutocompleteContainer = styled.div`
  width:100%;
  position: relative;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  width:100%;
  border-radius: 5px;
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>((props, ref) => {
    const {
        onSelect, searchResults, search, placeholder, selectedValue,
    } = props;
    const [query, setQuery] = useState<string>(selectedValue?.name || '');
    const [isShow, setIsShow] = useState<boolean>(true);
    const autocompleteRef = useRef<HTMLDivElement>(null);
    useOutsideClick(autocompleteRef, () => setIsShow(false));

    const onClickSelect = (e: React.MouseEvent<HTMLInputElement>) => {
        setIsShow(true);
        search(e.currentTarget.value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsShow(true);
        const { value } = e.target;
        setQuery(value);
        if (value.length > 2) {
            search(value);
        }
    };

    const handleSelect = (value: SearchResult) => {
        onSelect(value);
        setIsShow(false);
        setQuery(value.name);
    };

    return (
        <AutocompleteContainer ref={autocompleteRef}>
            <Input
                ref={ref}
                onClick={onClickSelect}
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={placeholder || ''}
            />
            { isShow && (
                <SuggestionsList>
                    {searchResults.map((result: SearchResult) => (
                        <SuggestionItem key={result.id} onClick={() => handleSelect(result)}>
                            {result.name}
                        </SuggestionItem>
                    ))}
                </SuggestionsList>
            )}
        </AutocompleteContainer>
    );
});
