import React from 'react'

const User = ({notes}) => {
  console.log(notes)
  return (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
  )
}

export default User