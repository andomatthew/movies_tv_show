import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import fetchDataMovies from '../utils/fetchMovies'
import fetchDataTvShow from '../utils/fetchTvShow'

const Search = ({ search, setSearch }) => {
    

    const [movies, setMovies] = useState([])
    const [tvShows, setTvShows] = useState([])

    const navigate = useNavigate()

    async function fetchAllData() {

        let moviesResult = []
        let tvShowResult = []

        try {
            const dataMovies = await fetchDataMovies()
            const dataTvShow = await fetchDataTvShow()

            const allMovies = [
                dataMovies.jsonPopular,
                dataMovies.jsonTopRated, 
                dataMovies.jsonUpcoming,
                dataMovies.jsonUpcoming 
            ]

            const allTvShows = [
                dataTvShow.jsonPopular,
                dataTvShow.jsonTopRated,
                dataTvShow.jsonOnTheAir,
                dataTvShow.jsonAiringToday
            ]

            for(let i = 0; i < allMovies.length; i++) {
                allMovies[i].results.forEach(movie => {
                    moviesResult.push(movie)
                })
            }

            for(let i = 0; i < allTvShows.length; i++) {
                allTvShows[i].results.forEach(tvShow => {
                    tvShowResult.push(tvShow)
                })
            }

            let uniqMoviesResult = moviesResult.filter((value, index, array) => {
                return array.indexOf(value) === index
            })

            let uniqTvShowResult = tvShowResult.filter((value, index, array) => {
                return value === array.find(item => item.id === value.id)
            })

            let finalResultMovies = []
            let finalResultTvShows = []

            for(let i = 0; i < uniqMoviesResult.length; i++) {
                if(uniqMoviesResult[i].title.toLowerCase().includes(search)) {
                    finalResultMovies.push(uniqMoviesResult[i])
                }
            }

            for(let i = 0; i < uniqTvShowResult.length; i++) {
                if(uniqTvShowResult[i].name.toLowerCase().includes(search)) {
                    finalResultTvShows.push(uniqTvShowResult[i])
                }
            }


            setMovies(finalResultMovies)
            setTvShows(finalResultTvShows)
        } catch(err) {
            console.log(err)
        }



    }

    useEffect(() => {
        fetchAllData()

        if(search.length === 0) {
            navigate('/')
        }

    }, [search])

    return (
    <div>
        <h1>Searched Data Movies</h1>
        <div className='row'>
            <div className='col-6'>
                <ul>
                    { movies.map(movie => (
                            <li key={movie.id}>{`${movie.id} ${movie.title} ${movie.release_date}`}</li>    
                        ))
                    }
                </ul>
            </div>
            <div className='col-6'>
                    <ul>
                        { tvShows.map(tvShow => (
                            <li key={tvShow.id}>{`${tvShow.id} ${tvShow.name} ${tvShow.first_air_date}`}</li>
                            ))
                        }
                    </ul>
            </div>
        </div>
    </div>
  )
}

export default Search