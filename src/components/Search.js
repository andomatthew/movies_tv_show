import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import fetchDataMovies from '../utils/fetchMovies'
import fetchDataTvShow from '../utils/fetchTvShow'

import Card from './Card'

const Search = ({ search, setSearch,myList, setMyList, addMyList, removeFromMyList, allMovies, allTvShow }) => {

    const navigate = useNavigate()

    useEffect(() => {
        if(search.length === 0) {
            navigate('/')
        }
    }, [search])

    return (
    <div className='container-fluid mt-5'>
        <h1>Searched Data Movies</h1>
        <div className='row justify-content-center'>
            { allMovies.map(item => (
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
            { allTvShow.map(item => (
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

export default Search