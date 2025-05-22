import { useEffect, useState } from 'react';

/**
 * Extracts the `page` query parameter from the current URL.
 * Ensures the result is a valid positive integer, defaulting to `1` if missing or invalid.
 *
 * @returns {number} - The current page number from the URL, defaulting to 1.
 */
export const getPageFromURL = (): number => {
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('page') || '1', 10);
  return isNaN(page) || page < 1 ? 1 : page;
};

/**
 * Custom React hook to synchronize pagination state with the browser's query string.
 * It returns the current page and a setter function to update it.
 *
 * Features:
 * - Initializes from `?page=` in the URL.
 * - Updates URL using `pushState` to support browser back/forward.
 * - Listens to `popstate` events to reflect manual navigation.
 *
 * @returns {[number, (page: number) => void]} - A tuple with the current page and setter.
 *
 * @example
 * const [page, setPage] = usePaginatedQueryParam();
 */
export const usePaginatedQueryParam = (): [number, (page: number) => void] => {
  const [currentPage, setCurrentPage] = useState(getPageFromURL());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(currentPage));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  }, [currentPage]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromURL());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return [currentPage, setCurrentPage];
};
