import { useState, useEffect } from 'react';

interface UserSearchBarProps {
  onSearch: (query: string) => void;
}

export const UserSearchBar = ({ onSearch }: UserSearchBarProps) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(input.trim());
    }, 300);

    return () => clearTimeout(timeout);
  }, [input, onSearch]);

  return (
    <div className="mb-6 w-full max-w-md mx-auto">
      <label htmlFor="search" className="sr-only">
        Search users
      </label>
      <input
        id="search"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search by name or email..."
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
