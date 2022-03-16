import React, { useState, useEffect } from 'react'


const Movie = () => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [popular, setPopular] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [topRated, setTopRated] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])

  const api_key = '9ecb3f6a4566a585475ef747621c1482'
  const url = 'https://api.themoviedb.org/3/movie'
  const categories = ['popular', 'upcoming', 'top_rated', 'now_playing']

  async function fetchMovies(url, categories, api_key) {

    setLoading(true)

    try {
      const dataPopular = await fetch(`${url}/${categories[0]}?api_key=${api_key}`, { method: 'GET' })
      const dataUpcoming = await fetch(`${url}/${categories[1]}?api_key=${api_key}`, { method: 'GET' })
      const dataTopRated = await fetch(`${url}/${categories[2]}?api_key=${api_key}`, { method: 'GET' })
      const dataNowPlaying = await fetch(`${url}/${categories[3]}?api_key=${api_key}`, { method: 'GET' }) 
      
      const jsonPopular = await dataPopular.json()
      const jsonUpcoming = await dataUpcoming.json()
      const jsonTopRated = await dataTopRated.json()
      const jsonNowPlaying = await dataNowPlaying.json()
      
      if(!dataPopular.ok || !dataUpcoming.ok || !dataTopRated.ok || !dataNowPlaying.ok) {
        
        let errorMessage = jsonPopular.status_message || jsonUpcoming.status_message || jsonTopRated.status_message || jsonNowPlaying.status_message
        
        setError(errorMessage)
        setLoading(false)
      }else {
        setPopular(jsonPopular.results)
        setUpcoming(jsonUpcoming.results)
        setTopRated(jsonTopRated.results)
        setNowPlaying(jsonNowPlaying.results)
        setLoading(false)
      } 


    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    let isMounted = true
    fetchMovies(url, categories, api_key)
  
    return function cleanup() {
      isMounted = false
    }
  }, [])


  if (error) {
    return <div>Error: {error}</div>
  } 
  
  if(loading) {
    return <div>Loading...</div>
  } 
  return (
    <div>
      <div className='row'>
        <div className='col-3'>
          <h1>Upcoming Movies</h1>
          <ul>
            { upcoming.map(item => (
              <li key={item.id}>
              { `${item.id} ${item.title} ${item.release_date}`}
              </li>
              ))
            }
          </ul>
        </div>
        <div className='col-3'>
          <h1>Popular Movies</h1>
          <ul>
              { popular.map(item => (
                  <li key={item.id}>{`${item.id} ${item.title} ${item.release_date}` }</li>
                ))
              }
          </ul>
        </div>
        <div className='col-3'>
            <h1>Top Rated Movies</h1>
            <ul>
              { topRated.map(item => (
                  <li key={item.id}>{`${item.id} ${item.title} ${item.release_date}`}</li>
                ))
              }
            </ul>
        </div>
        <div className='col-3'>
            <h1>Now Playing Movies</h1>
            <ul>
              { nowPlaying.map(item => (
                  <li key={item.id}>{`${item.id} ${item.title} ${item.release_date}`}</li>
                ))
              }
            </ul>
        </div>
      </div>
    </div>
  )


  
}

export default Movie