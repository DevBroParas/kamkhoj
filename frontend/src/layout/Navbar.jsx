import React from 'react'
import {Button} from '../components/ui/button'
import { useAuth} from '../hooks/useAuth'

const Navbar = () => {
    const {logout, user} = useAuth()

    const handleLogout = async() => {
        await logout()
        window.location.reload()
    }

  return (
    <nav className='bg-primary-foreground h-12 flex items-center justify-between p-4'>
        <h1 className='[color:var(--fire)] p-4 text-2xl font-bold'>Kaam <span className='[color:var(--fire-foreground)]'>Khoj</span>.<span className='[color:var(--fire-foreground)]'>in</span></h1>
        <div className='flex items-center gap-4'>
            {user?.role === "recruiter" && <p className='text-fire-foreground font-bold active:text-fire cursor-pointer'>Post a job</p>}
            {user?.role === "student" && <p className='text-fire-foreground font-bold active:text-fire cursor-pointer'>Apply for a job</p>}
            <Button onClick={handleLogout} variant={'destructive'}>Logout</Button>
        </div>
    </nav>
  )
}

export default Navbar