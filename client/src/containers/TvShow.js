import React, { useState, useEffect } from 'react'

import fetchDataTvShow from '../utils/fetchTvShow'

const TvShow = () => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])
  const [onTheAir, setOnTheAir] = useState([])
  const [airingToday, setAiringToday] = useState([])
  const [tvShowSearched, setTvShowSearched] = useState([])

  async function fetchTvShows(url, categories, api_key) {

    setLoading(true)

    try {

      const result = await fetchDataTvShow()

      if(!result.dataPopular.ok || !result.dataTopRated.ok || !result.dataOnTheAir.ok || !result.dataAiringToday.ok) {
      
        let errorMessage = result.jsonPopular.status_message || result.jsonTopRated.status_message || result.jsonOnTheAir.status_message || result.jsonAiringToday.status_message
      
        setError(errorMessage)
      }else {

        setPopular(result.jsonPopular.results)
        setTopRated(result.jsonTopRated.results)
        setOnTheAir(result.jsonOnTheAir.results)
        setAiringToday(result.jsonAiringToday.results)
        
        // if(search !== undefined && search.length > 0) {
        //   searchAll()
        // }

        // if(search !== undefined && search.length === 0) {
        //   setTvShowSearched([])
        // }

        setLoading(false)
      }

    } catch(err) {
      console.log(err)
    }

  }

  // function searchAll() {
  //   let test = []
  //   let results = [] 
    
  //   test.push(popular.filter(item => item.name.toLowerCase().includes(search)))
  //   test.push(onTheAir.filter(item => item.name.toLowerCase().includes(search)))
  //   test.push(topRated.filter(item => item.name.toLowerCase().includes(search)))
  //   test.push(airingToday.filter(item => item.name.toLowerCase().includes(search)))

  //   test.forEach(items => items.forEach(item => results.push(item)))

  //   setTvShowSearched(results)
  // }

  useEffect(() => {
    let isMounted = true
    fetchTvShows()

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