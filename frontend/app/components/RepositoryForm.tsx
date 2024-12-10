'use client';
import { useState } from 'react';

interface Props {
  onAddRepository: (url: string) => void;
}

export default function RepositoryForm({ onAddRepository }: Props) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      onAddRepository(url);
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="url"
        placeholder="GitHub Repository URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border rounded-md px-3 py-2 flex-1 text-black"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add
      </button>
    </form>
  );
}
