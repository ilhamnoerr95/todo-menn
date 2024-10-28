import React from 'react'

const sum = () => {

    const sum = (a:number, b:number) => {
        return a + b;
    }

  return (
    <button type="submit" data-testid="sum-button" disabled onClick={()=> sum(1, 2)}>sum</button>
  )
}

export default sum