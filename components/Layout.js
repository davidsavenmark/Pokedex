import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'

const Layout = ({title, children}) => {
    return(
        <div>
             <title>{title}</title>
            <div className='bg-white'>
                {children}
            </div>
        </div>
    )
}

export default Layout