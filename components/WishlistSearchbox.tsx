import React, { useEffect, useState, useRef, useCallback } from 'react';
import useWishlistStore from '@/stores/wishlistStore';
import { useDebounceCallback } from 'usehooks-ts';
import { useRouter } from 'next/router';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
type Props = {
    wishlistId: number;
};
type AutocompleteResult = {
    name: string;
    oracle_id: string;
  };
  
export default function WishlistSearchbox({wishlistId}: Props) {
  const { addCardInput, setAddCardInput, addCardToWishlist } =
    useWishlistStore();
  const autocompleteEndpoint =
    process.env.NEXT_PUBLIC_AUTOCOMPLETE_URL + '/cards_details?query=';
    const [autocompleteResults, setAutocompleteResults] = useState<AutocompleteResult[]>([]);
    const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedAutocompleteIndex, setSelectedAutocompleteIndex] =
    useState(-1);
  const searchRef = useRef<HTMLInputElement>(null);


  const fetchAutocompleteResults = useCallback(
    (value: string) => {
      fetch(autocompleteEndpoint + value)
        .then((response) => response.json())
        .then((data) => {
          setAutocompleteResults(data.data);
          setShowAutocomplete(true);
          setSelectedAutocompleteIndex(-1);
        })
        .catch((error) => {
          console.error('Error fetching autocomplete results: ', error);
        });
    },
    [autocompleteEndpoint]
  );

  const debouncedFetchResults = useDebounceCallback(
    fetchAutocompleteResults,
    500
  );
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAddCardInput(value);

    if (value.trim().length > 2) {
      debouncedFetchResults(value);
    } else {
      setAutocompleteResults([]);
      setShowAutocomplete(false);
      setSelectedAutocompleteIndex(-1);
    }
  };

  const handleAutocompleteItemClick = (item: AutocompleteResult) => {
    setAddCardInput(item.name);
    addCardToWishlist(wishlistId, item.oracle_id);
    setAutocompleteResults([]);
    setShowAutocomplete(false);
    setSelectedAutocompleteIndex(-1);
  };

  const handleAutocompleteKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const key = event.key;
      const totalResults = autocompleteResults.length;
      switch (key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedAutocompleteIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            return nextIndex < totalResults ? nextIndex : prevIndex;
          });
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedAutocompleteIndex((prevIndex) => {
            const nextIndex = prevIndex - 1;
            return nextIndex >= 0 ? nextIndex : -1;
          });
          break;
        case 'Enter':
          if (
            selectedAutocompleteIndex >= 0 &&
            selectedAutocompleteIndex < totalResults
          ) {
            const item = autocompleteResults[selectedAutocompleteIndex];
            item && handleAutocompleteItemClick(item);
            item && addCardToWishlist(wishlistId, item.oracle_id);          }
          break;

        case 'ArrowRight':
          if (
            selectedAutocompleteIndex >= 0 &&
            selectedAutocompleteIndex < totalResults
          ) {
            const item = autocompleteResults[selectedAutocompleteIndex];
            item && handleAutocompleteItemClick(item);
            item && addCardToWishlist(wishlistId, item.oracle_id);
          }
          break;

        case 'Escape':
          setShowAutocomplete(false);
          setSelectedAutocompleteIndex(-1);
          break;
        default:
          break;
      }
    },
    [
      autocompleteResults,
      selectedAutocompleteIndex,
      setAutocompleteResults,
      setShowAutocomplete,
      setSelectedAutocompleteIndex
    ]
  );

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowAutocomplete(false);
    if (addCardInput.trim().length > 0) {
      addCardToWishlist(wishlistId, addCardInput);
    }
  };

  return (
    <div className="mt-6 w-full">
      <div className="relative">
        {' '}
        {/* This div should remain relatively positioned */}
        <form onSubmit={handleFormSubmit} className="flex relative gap-4">
          {' '}
          {/* Add relative here */}
          <Input
            type="text"
            placeholder="Search"
            value={addCardInput}
            onChange={handleInputChange}
            spellCheck="false"
            ref={searchRef}
            onKeyDown={(e) => handleAutocompleteKeyDown(e)}
            className="flex-1"
          />
          <Button
            type="submit"
            className="cursor-pointer bg-pink-500 hover:bg-pink-600"
          >
            <Search size={16} />
          </Button>
          {showAutocomplete && (
            <div className="absolute z-50 top-full mt-1 text-left max-w-md w-full max-h-60 overflow-y-auto rounded-md border border-zinc-500 shadow-md bg-zinc-700">
              {autocompleteResults &&
                autocompleteResults.map((result, index) => (
                    <div
                    key={result.oracle_id} // key should be unique, so use oracle_id
                    className={`cursor-pointer px-4 py-2 mx-1 rounded ${
                      selectedAutocompleteIndex === index ? 'bg-zinc-800' : ''
                    } `}
                    onClick={() => handleAutocompleteItemClick(result)}
                  >
                    {result.name}
                  </div>
                ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
