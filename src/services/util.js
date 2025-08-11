import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'e667637165c00ab2985ba55e8d109439';
const API_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

function fetchSearch(term, page = 1) {
  return fetch(`${API_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(term)}&page=${page}`)
    .then(res => res.json());
}

function fetchDetails(id) {
  return fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`)
    .then(res => res.json());
}
