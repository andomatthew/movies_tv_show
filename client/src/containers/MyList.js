import React, { useEffect } from 'react'

import Card from '../components/Card'

const MyList = ({ myList, removeFromMyList, addMyList }) => {
  

  if(myList.length === 0) {
    return <div><h1>Your list still empty</h1></div>
  }

  return (
    <div>
      <div className='container-fluid mt-5'>
        <div className='row'>
          { myList.map((item) => (
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
    </div>
  )
}

export default MyList