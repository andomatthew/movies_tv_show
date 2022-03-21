import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar';
import Search from './components/Search';
import Home from './containers/Home';
import Movie from './containers/Movie';
import TvShow from './containers/TvShow';
import MyList from './containers/MyList';

import fetchDataMovies from './utils/fetchMovies';
import fetchDataTvShow from './utils/fetchTvShow';

function App() {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [myList, setMyList] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [filteredTvShows, setFilteredTvShows] = useState([])
  //movies
  const [allMovies, setAllMovies] = useState([])
  const [popular, setPopular] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [topRated, setTopRated] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])
  //tvshows
  const [allTvShow, setAllTvShow] = useState([])
  const [popularTShow, setPopularTShow] = useState([])
  const [topRatedTShow, setTopRatedTShow] = useState([])
  const [onTheAir, setOnTheAir] = useState([])
  const [airingToday, setAiringToday] = useState([])

  
  async function fetchMovies() {
    
    try {
      setLoading(true)
      const result = await fetchDataMovies()

      if(!result.dataPopular.ok || !result.dataUpcoming.ok || !result.dataTopRated.ok || !result.dataNowPlaying.ok) {
        
        let errorMessage = result.jsonPopular.status_message || result.jsonUpcoming.status_message || result.jsonTopRated.status_message || result.jsonNowPlaying.status_message
        
        setError(errorMessage)
        setLoading(false)
      }else {
        const movies = result.jsonPopular.results.concat(result.jsonUpcoming.results, result.jsonTopRated.results, result.jsonNowPlaying.results) 

        setPopular(result.jsonPopular.results)
        setUpcoming(result.jsonUpcoming.results)
        setTopRated(result.jsonTopRated.results)
        setNowPlaying(result.jsonNowPlaying.results)
        setAllMovies(movies)
      } 
      setLoading(false)
    } catch(err) {
      setError(err.message)
    }
    
    const result = await fetchDataMovies()


  }

  async function fetchTvShows() {

    try {
      setLoading(true)
      
      const result = await fetchDataTvShow()

      if(!result.dataPopular.ok || !result.dataTopRated.ok || !result.dataOnTheAir.ok || !result.dataAiringToday.ok) {
      
        let errorMessage = result.jsonPopular.status_message || result.jsonTopRated.status_message || result.jsonOnTheAir.status_message || result.jsonAiringToday.status_message
      
        setError(errorMessage)
        setLoading(false)
      }else {

        setPopularTShow(result.jsonPopular.results)
        setTopRatedTShow(result.jsonTopRated.results)
        setOnTheAir(result.jsonOnTheAir.results)
        setAiringToday(result.jsonAiringToday.results)
        
        const tvShows = result.jsonPopular.results.concat(result.jsonTopRated.results, result.jsonOnTheAir.results, result.jsonAiringToday.results)
      
        setAllTvShow(tvShows)
      }
      setLoading(false)
    } catch(err) {
      setError(err.message)
    }

  }
  
  function addMyList(item) {

    setMyList([...myList, item])
  }

  function removeFromMyList(item) {

    setMyList(myList.filter(i => i.id !== item.id))

  }

  function setSearchTerm(e) {
    setSearch(e.target.value)
    searchTitle()
  }

  function searchTitle() {

    

    let uniqMovies = [... new Map(allMovies.map(item => [item.id, item])).values()]

    let uniqTvShows = [... new Map(allTvShow.map(item => [item.id, item])).values()]


    let filteredUniqMovies = uniqMovies.filter(value => {
      return value.title.toLowerCase().includes(search)
    })

    let filteredUniqTvShows = uniqTvShows.filter(value => {
      return value.name.toLowerCase().includes(search)
    })

    setFilteredMovies(filteredUniqMovies)
    setFilteredTvShows(filteredUniqTvShows)
}

  useEffect(() => {
    fetchMovies()
    fetchTvShows()
  },[])


  return (
    <div className="App">
      <Navbar search={search} setSearch={setSearch} searchTitle={setSearchTerm} />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              loading={loading}
              error={error}
              popular={popular}
              upcoming={upcoming}
              topRated={topRated}
              nowPlaying={nowPlaying}
              popularTShow={popularTShow}
              topRatedTShow={topRatedTShow}
              onTheAir={onTheAir}
              airingToday={airingToday}
              myList={myList} 
              addMyList={addMyList} 
              removeFromMyList={removeFromMyList} 
            />} 
        />
        <Route 
            path="/movies" 
            element={
              <Movie 
                loading={loading}
                error={error}
                popular={popular}
                upcoming={upcoming}
                topRated={topRated}
                nowPlaying={nowPlaying}
                myList={myList} 
                addMyList={addMyList} 
                removeFromMyList={removeFromMyList} 
              />} 
        />
        <Route 
          path="/tv-shows" 
          element={
            <TvShow
              loading={loading}
              error={error}
              popularTShow={popularTShow}
              topRatedTShow={topRatedTShow}
              onTheAir={onTheAir}
              airingToday={airingToday}
              myList={myList} 
              addMyList={addMyList} 
              removeFromMyList={removeFromMyList}
            />}
        />
        <Route 
          path="/my-list" 
          element={
            <MyList 
              myList={myList} 
              addMyList={addMyList} 
              removeFromMyList={removeFromMyList}
            />}
        />
        <Route 
          path="/search" 
          element={
            <Search 
              allMovies={filteredMovies}
              allTvShow={filteredTvShows}
              myList={myList} 
              search={search} 
              setSearch={setSearch} 
              addMyList={addMyList} 
              removeFromMyList={removeFromMyList}
            />}
        />
      </Routes>
    </div>
  );
}

export default App;
