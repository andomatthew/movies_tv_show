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
  const [myList, setMyList] = useState([])

  function addMyList(item) {

    setMyList([...myList, item])
  }

  function removeFromMyList(item) {

    setMyList(myList.filter(i => i.id !== item.id))

  }

  return (
    <div className="App">
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home myList={myList} addMyList={addMyList} removeFromMyList={removeFromMyList} />} />
        <Route path="/movies" element={<Movie myList={myList} addMyList={addMyList} removeFromMyList={removeFromMyList} />} />
        <Route path="/tv-shows" element={<TvShow myList={myList} addMyList={addMyList} removeFromMyList={removeFromMyList} />} />
        <Route path="/my-list" element={<MyList myList={myList} addMyList={addMyList} removeFromMyList={removeFromMyList} />} />
        <Route path="/search" element={<Search myList={myList} search={search} setSearch={setSearch} addMyList={addMyList} removeFromMyList={removeFromMyList} />} />
      </Routes>
    </div>
  );
}

export default App;
