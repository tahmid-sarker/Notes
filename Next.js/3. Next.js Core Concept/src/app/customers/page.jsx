import { redirect } from 'next/navigation';
import React from 'react'

export default async function Customers() {
  const res = await fetch('http://localhost:3000/api/customers', {
    cache: 'force-cache'
  });
  const data = await res.json();

  // if(data.length > 503) { // just an example condition for redirect
  //   redirect('/')
  // }

  return (
    <div>
      {data.map(item => (
        <div key={item._id}>
          <h2>{item.name}</h2> 
        </div>
      ))}
    </div>
  )
}