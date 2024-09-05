import React from 'react'
//import Navbar from '../components/dashboard/navbar/navbar'
import Sidebar from '../components/dashboard/sidebar/sidebar'
import Styles from './dashboard.module.css'
import Footer from '../components/dashboard/footer/footer'


export default function layout({children}) {
    return (
        <div>
        <div className={Styles.container}>
            <div className={Styles.sidebar}>
            <Sidebar />
            </div>
            <div className={Styles.content}>
                {children}
            </div>
        </div>
        <Footer/>
        </div>
    )
}