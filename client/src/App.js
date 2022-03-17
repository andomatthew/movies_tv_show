import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar';
import Search from './components/Search';
import Home from './containers/Home';
import Movie from './containers/Movie';
import TvShow from './containers/TvShow';
import MyList from './containers/MyList';

function App() {

  const [search, setSearch] = useState('')

  return (
    <div className="App">
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/tv-shows" element={<TvShow />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/search" element={<Search search={search} setSearch={setSearch} />} />
      </Routes>
    </div>
  );
}

export default App;
