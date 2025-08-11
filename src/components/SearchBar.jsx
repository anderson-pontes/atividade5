import React from 'react';

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pesquisar filmes..."
        className="flex-1 p-3 rounded shadow-sm border"
      />
      <button type="submit" className="px-4 py-2 rounded-lg font-semibold text-slate-200 bg-slate-700 hover:bg-slate-600 transition-colors">Buscar</button>
    </form>
  );
}