import React from 'react'
import { Navbar } from '../dashboard/_components/navbar'

const HistoryPage = () => {
    return (
        <div className='flex min-w-screen min-h-screen bg-black items-center justify-center p-4'>
        <Navbar/>
        <div>
            <p className="text-2xl">
                History
            </p>
        </div>
    </div>
    )
}

export default HistoryPage
