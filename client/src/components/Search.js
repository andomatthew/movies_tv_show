import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'

import fetchDataMovies from '../utils/fetchMovies'
import fetchDataTvShow from '../utils/fetchTvShow'

import Card from './Card'

const Search = ({ search, myList, addMyList, removeFromMyList, searchedData, pathName, setFirstSearch }) => {

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        let isMounted = true
        if(search.length === 0) {
            setFirstSearch(true)
            navigate(`${pathName}`)
        }
        return () => isMounted = false
    }, [search])

    return (
    <div className='container-fluid mt-5'>
        <h1>Searched Data</h1>
        <div className='row justify-content-center'>
            { searchedData.filteredMovies.map(item => (
                <Card 
                key={item.id}
                data={item}
                myList={myList}
                removeFromMyList={removeFromMyList}
                addMyList={addMyList}
                />
            ))
            }
        </div>
        <div className='row justify-content-center'>
            { searchedData.filteredTvShows.map(item => (
                <Card 
                key={item.id}
                data={item}
                myList={myList}
                removeFromMyList={removeFromMyList}
                addMyList={addMyList}
                />
            ))
            }
        </div>
    </div>
  )
}

export default Search