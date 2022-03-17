import React, { useState, useEffect } from 'react'

import fetchDataTvShow from '../utils/fetchTvShow'

import Card from '../components/Card'

const TvShow = ({ myList, setMyList, addMyList, removeFromMyList }) => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])
  const [onTheAir, setOnTheAir] = useState([])
  const [airingToday, setAiringToday] = useState([])

  async function fetchTvShows() {

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
        
        setLoading(false)
      }

    } catch(err) {
      console.log(err)
    }

  }

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
    <div className='container-fluid mt-5'>
      <h1>Tv Shows</h1>
      <div className='row justify-content-center'>
        <h1 className='text-center'>Popular Tv Show</h1>
          { popular.map(item => (
              <Card 
                key={item.id}
                data={item}
                myList={myList}
                setMyList={setMyList}
                removeFromMyList={removeFromMyList}
                addMyList={addMyList}
            />
            ))
          }
      </div>
      <div className='row justify-content-center'>
        <h1 className='text-center'>Top Rated</h1>
        { topRated.map(item => (
            <Card 
              key={item.id}
              data={item}
              myList={myList}
              setMyList={setMyList}
              removeFromMyList={removeFromMyList}
              addMyList={addMyList}
          />
          ))
        }
      </div>
      <div className='row justify-content-center'>
        <h1 className='text-center'>On The Air</h1>
        { onTheAir.map(item => (
            <Card 
              key={item.id}
              data={item}
              myList={myList}
              setMyList={setMyList}
              removeFromMyList={removeFromMyList}
              addMyList={addMyList}
          />
          ))
        }
      </div>
      <div className='row justify-content-center'>
        <h1 className='text-center'>Airing Today</h1>
        { airingToday.map(item => (
            <Card 
              key={item.id}
              data={item}
              myList={myList}
              setMyList={setMyList}
              removeFromMyList={removeFromMyList}
              addMyList={addMyList}
          />
          ))
        }
      </div>
    </div>
  )
}

export default TvShow