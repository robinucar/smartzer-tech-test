import { useEffect, useState } from 'react';

const DEFAULT_PAGE = 1;

export const getPageFromURL = (): number => {
  if (typeof window === 'undefined') return DEFAULT_PAGE;

  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('page') || String(DEFAULT_PAGE), 10);
  return isNaN(page) || page < 1 ? DEFAULT_PAGE : page;
};

export const usePaginatedQueryParam = (): [
  number,
  (page: number | ((prev: number) => number)) => void,
] => {
  const [currentPage, setCurrentPage] = useState(getPageFromURL());

  const updatePage = (page: number | ((prev: number) => number)) => {
    setCurrentPage((prev) => {
      const next = typeof page === 'function' ? page(prev) : page;

      if (next === prev) return prev;

      const params = new URLSearchParams(window.location.search);
      params.set('page', String(next));
      const newUrl = `${window.location.pathname}?${params.toString()}`;

      if (window.location.search !== `?${params.toString()}`) {
        window.history.pushState({}, '', newUrl);
      }

      return next;
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      const urlPage = getPageFromURL();
      if (urlPage !== currentPage) {
        setCurrentPage(urlPage);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage]);

  return [currentPage, updatePage];
};
