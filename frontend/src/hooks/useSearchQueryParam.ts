import { useState, useEffect } from 'react';
import { getSearchQueryFromURL } from '../utils/getSearchQueryFromUrl';
export const useSearchQueryParam = (): [string, (query: string) => void] => {
  const [searchQuery, setSearchQuery] = useState(getSearchQueryFromURL());

  const updateSearch = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams(window.location.search);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  };

  useEffect(() => {
    const handlePopState = () => {
      setSearchQuery(getSearchQueryFromURL());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return [searchQuery, updateSearch];
};
