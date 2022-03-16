import React, { useState, useEffect } from 'react'

const TvShow = () => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])
  const [onTheAir, setOnTheAir] = useState([])
  const [airingToday, setAiringToday] = useState([])

  const api_key = '9ecb3f6a4566a585475ef747621c1482'
  const url = 'https://api.themoviedb.org/3/tv'
  const categories = ['popular', 'top_rated', 'on_the_air', 'airing_today']

  async function fetchTvShows(url, categories, api_key) {

    setLoading(true)

    try {
      const dataPopular = await fetch(`${url}/${categories[0]}?api_key=${api_key}`, { method: 'GET' })
      const dataTopRated = await fetch(`${url}/${categories[1]}?api_key=${api_key}`, { method: 'GET' })
      const dataOnTheAir = await fetch(`${url}/${categories[2]}?api_key=${api_key}`, { method: 'GET' })
      const dataAiringToday = await fetch(`${url}/${categories[3]}?api_key=${api_key}`, { method: 'GET' })
    
      const jsonPopular = await dataPopular.json()
      const jsonTopRated = await dataTopRated.json()
      const jsonOnTheAir = await dataOnTheAir.json()
      const jsonAiringToday = await dataAiringToday.json()

    if(!dataPopular.ok || !dataTopRated.ok || !dataOnTheAir.ok || !dataAiringToday.ok) {
      
      let errorMessage = jsonPopular.status_message || jsonTopRated.status_message || jsonOnTheAir.status_message || jsonAiringToday.status_message
      
      setError(errorMessage)
    }else {
      
      setPopular(jsonPopular.results)
      setTopRated(jsonTopRated.results)
      setOnTheAir(jsonOnTheAir.results)
      setAiringToday(jsonAiringToday.results)
    }
    
    setLoading(false)
    }catch(err) {
      console.log(err)
    }

  }

  useEffect(() => {
    let isMounted = true
    fetchTvShows(url, categories, api_key)

    return function cleanup() {
      isMounted = false
    }
  }, [])


  if(error) {
    return <div>Error: ${error}</div>
  }
  if(loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className='row'>
        <div className='col-3'>
          <h1>Popular Tv Show</h1>
          <ul>
            { popular.map(item => (
              <li key={item.id}>{`${item.id} ${item.name} ${item.first_air_date}`}</li>
              ))
            }
          </ul>
        </div>
        <div className='col-3'>
          <h1>Top Rated Tv Show</h1>
          <ul>
            { topRated.map(item => (
              <li key={item.id}>{`${item.id} ${item.name} ${item.first_air_date}`}</li>
              ))
            }
          </ul>
        </div>
        <div className='col-3'>
          <h1>On The Air Tv Show</h1>
          <ul>
            { onTheAir.map(item => (
              <li key={item.id}>{`${item.id} ${item.name} ${item.first_air_date}`}</li>
              ))
            }
          </ul>
        </div>
        <div className='col-3'>
          <h1>Airing Today Tv Show</h1>
          <ul>
            { airingToday.map(item => (
              <li key={item.id}>{`${item.id} ${item.name} ${item.first_air_date}`}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TvShow