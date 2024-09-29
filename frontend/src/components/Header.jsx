import { useUser } from '@/hooks/useUser'
import { Link } from 'react-router-dom'

const Header = () => {
  const { user, logout } = useUser()
  return (
    <header className='w-full bg-gray-800 text-white p-4 flex justify-between items-center'>
        <div>
            <Link to = "/"> Logo</Link>
        </div>
        <nav>
            <ul className='flex space-x-4'>
              {user ? 
              <>
                <li> <Link to = "/">Home</Link></li>
                <li> <Link to = "/dashboard">Dashboard</Link></li>
                <li> <span className='font-bold'>Welcome {user?.username} 😊</span></li>
                <button onClick={logout}>Logout</button>

                </>
                :
                <>
                  <li> <Link to = "/register-user">Signup</Link></li>
                  <li> <Link to = "/login">Login</Link></li>
                </>
              }

            </ul>
        </nav>
    </header>
  )
}

export default Header