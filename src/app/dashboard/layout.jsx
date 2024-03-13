import React from 'react'
import {Navbar} from './_components/navbar'

const DashboardLayout = ({children}) => {
    return (
        <div className='flex min-w-screen min-h-screen bg-black items-center justify-center p-4'>
            <Navbar/>
            {children}
        </div>
    )
}

export default DashboardLayout
