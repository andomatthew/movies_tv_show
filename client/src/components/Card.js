import React from 'react'

import './Card.css'

const Card = ({ data, myList, removeFromMyList, addMyList}) => {
    
    const imageUrl = 'https://image.tmdb.org/t/p/w500'

    return (    
    <div className='col-xxl-2 col-lg-3 col-md-4 col-sm-6 card mb-3 p-0 mx-3'>
        <img src={`${imageUrl}/${data.poster_path}`} className='card-img-top' alt={`${data.title} poster`}/>
        <div className='card-body'>
            <h5 className='card-title'>{data.title || data.name}</h5>
            <p className='card-text'>{data.release_date || data.first_air_date}</p>
            <p className='card-text'>{data.id}</p>
            {
                myList.find((i) => i.id === data.id) ? 
                <button type='button' className='btn btn-danger' onClick={()=>(removeFromMyList(data))} >x</button>
                :
                <button type='button' className='btn btn-primary' onClick={() => (addMyList(data))} >+</button>    
            }
        </div>
    </div>
  )
}

export default Card