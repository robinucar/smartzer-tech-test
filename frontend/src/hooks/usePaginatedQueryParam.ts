import { useEffect, useState } from 'react';

export const getPageFromURL = (): number => {
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('page') || '1', 10);
  return isNaN(page) || page < 1 ? 1 : page;
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
