import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-evenly bg-slate-700 text-white py-2'>
            <div className="logo">
                <span className='font-bold text-xl cursor-pointer'> Todo App</span>
            </div>
            <ul className="flex gap-8">
                <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all'>Your Task</li>
            </ul>
        </nav>
    )
}

export default Navbar
