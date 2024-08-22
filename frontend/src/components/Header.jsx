import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='w-full bg-gray-800 text-white p-4 flex justify-between items-center'>
        <div>
            <Link to = "/"> Logo</Link>
        </div>
        <nav>
            <ul className='flex space-x-4'>
                <li> <Link to = "/">Home</Link></li>
                <li> <Link to = "/dashboard">Dashboard</Link></li>
                <li> <Link to = "/signup">Signup</Link></li>
                <li> <Link to = "/login">Login</Link></li>

            </ul>
        </nav>
    </header>
  )
}

export default Header