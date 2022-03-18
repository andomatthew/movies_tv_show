import React, { useState, useEffect, useReducer } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar';
import Search from './components/Search';
import Home from './containers/Home';
import Movie from './containers/Movie';
import TvShow from './containers/TvShow';
import MyList from './containers/MyList';

import fetchDataMovies from './utils/fetchMovies';
import fetchDataTvShow from './utils/fetchTvShow';


const initialState = {
  loading: false,
  error: null,
  search: '',
  movies: {
    popular: [],
    upcoming: [],
    topRated: [],
    nowPlaying: []
  },
  tvShows: {
    popular: [],
    topRated: [],
    onTheAir: [],
    airingToday: []
  },
  myList: [],
  searchedData: {
    filteredMovies: [],
    filteredTvShows: []
  }
}

function reducer(state, action) {
  switch(action.type) {
    case 'loading':
      return { ...state, loading: action.payload }
    case 'error':
      return { ...state, error: action.payload }
    case 'fetchMovies':
      return { ...state, movies: action.payload }
    case 'fetchTvShows':
      return { ...state, tvShows: action.payload }
    default:
      return { ...state }
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  async function fetchMovies() {
    try {
      dispatch({ type: 'loading', payload: true })
      const result = await fetchDataMovies()
      if(!result.dataPopular.ok || !result.dataUpcoming.ok || !result.dataTopRated.ok || !result.dataNowPlaying.ok) {
        let errorMessage = result.jsonPopular.status_message || result.jsonUpcoming.status_message || result.jsonTopRated.status_message || result.jsonNowPlaying.status_message
        dispatch({ type: 'error', payload: errorMessage })
      }else {
        const movies = {
          popular: result.jsonPopular.results,
          upcoming: result.jsonUpcoming.results,
          topRated: result.jsonTopRated.results,
          nowPlaying: result.jsonNowPlaying.results
        }
        dispatch({ type: 'fetchMovies', payload: movies })
      } 
      dispatch({ type: 'loading', payload: false })
    } catch(err) {
      dispatch({ type: 'error', payload: err.message })
      dispatch({ type: 'loading', payload: false })
    }
  }

  async function fetchTvShows() {

    try {
      dispatch({ type: 'loading', payload: true })
      const result = await fetchDataTvShow()
      if(!result.dataPopular.ok || !result.dataTopRated.ok || !result.dataOnTheAir.ok || !result.dataAiringToday.ok) {
        let errorMessage = result.jsonPopular.status_message || result.jsonTopRated.status_message || result.jsonOnTheAir.status_message || result.jsonAiringToday.status_message
        dispatch({ type: 'error', payload: errorMessage })
      }else {
        const tvShows = {
          popular: result.jsonPopular.results,
          topRated: result.jsonTopRated.results,
          onTheAir: result.jsonOnTheAir.results,
          airingToday: result.jsonAiringToday.results
        }
        dispatch({ type: 'fetchTvShows', payload: tvShows })
      }
      dispatch({ type: 'loading', payload: false })
    } catch(err) {
      dispatch({ type: 'error', payload: err.message })
      dispatch({ type: 'loading', payload: false })
    }
  }
  
//   function addMyList(item) {

//     setMyList([...myList, item])
//   }

//   function removeFromMyList(item) {

//     setMyList(myList.filter(i => i.id !== item.id))

//   }

//   function setSearchTerm(e) {
//     setSearch(e.target.value)
//     searchTitle()
//   }

//   function searchTitle() {
//     let uniqMovies = [... new Map(allMovies.map(item => [item.id, item])).values()]

//     let uniqTvShows = [... new Map(allTvShow.map(item => [item.id, item])).values()]


//     let filteredUniqMovies = uniqMovies.filter(value => {
//       return value.title.toLowerCase().includes(search)
//     })

//     let filteredUniqTvShows = uniqTvShows.filter(value => {
//       return value.name.toLowerCase().includes(search)
//     })

//     setFilteredMovies(filteredUniqMovies)
//     setFilteredTvShows(filteredUniqTvShows)
// }

  useEffect(() => {
    fetchMovies()
    fetchTvShows()
  },[])


  return (
    <div className="App">
      <Navbar 
        search={state.search} 
        // setSearch={setSearch} 
        // searchTitle={setSearchTerm} 
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              loading={state.loading}
              error={state.error}
              movies={state.movies}
              tvShows={state.tvShows}
              myList={state.myList} 
              // addMyList={addMyList} 
              // removeFromMyList={removeFromMyList} 
            />} 
        />
        <Route 
            path="/movies" 
            element={
              <Movie 
                loading={state.loading}
                error={state.error}
                movies={state.movies}
                myList={state.myList} 
                // addMyList={addMyList} 
                // removeFromMyList={removeFromMyList} 
              />} 
        />
        <Route 
          path="/tv-shows" 
          element={
            <TvShow
              loading={state.loading}
              error={state.error}
              tvShows={state.tvShows}
              myList={state.myList} 
              // addMyList={addMyList} 
              // removeFromMyList={removeFromMyList}
            />}
        />
        <Route 
          path="/my-list" 
          element={
            <MyList 
              myList={state.myList} 
              // addMyList={addMyList} 
              // removeFromMyList={removeFromMyList}
            />}
        />
        <Route 
          path="/search" 
          element={
            <Search 
              searchedData={state.searchedData}
              myList={state.myList} 
              search={state.search} 
              // addMyList={addMyList} 
              // removeFromMyList={removeFromMyList}
            />}
        />
      </Routes>
    </div>
  );
}

export default App;
