import React from 'react';

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  // A lógica para gerar as páginas pode ser mantida
  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  // Classes base para evitar repetição
  const baseButtonClasses = "px-4 py-2 rounded-lg font-semibold transition-colors disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed";
  const defaultButtonClasses = "bg-slate-700 text-slate-200 hover:bg-slate-600";
  const activeButtonClasses = "bg-sky-600 text-white cursor-default";

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 mt-8">
      {/* Botões de navegação com o novo estilo */}
      <button 
        onClick={() => onPageChange(1)} 
        disabled={currentPage === 1} 
        className={`${baseButtonClasses} ${defaultButtonClasses}`}
      >
        Primeira
      </button>
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        className={`${baseButtonClasses} ${defaultButtonClasses}`}
      >
        ‹
      </button>

      {/* Mapeamento dos números de página */}
      {pages.map(p => (
        <button 
          key={p} 
          onClick={() => onPageChange(p)} 
          className={`${baseButtonClasses} ${
            p === currentPage ? activeButtonClasses : defaultButtonClasses
          }`}
        >
          {p}
        </button>
      ))}

      {/* Botões de navegação com o novo estilo */}
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        className={`${baseButtonClasses} ${defaultButtonClasses}`}
      >
        ›
      </button>
      <button 
        onClick={() => onPageChange(totalPages)} 
        disabled={currentPage === totalPages} 
        className={`${baseButtonClasses} ${defaultButtonClasses}`}
      >
        Última
      </button>
    </div>
  );
}