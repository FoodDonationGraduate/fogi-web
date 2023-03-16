import React from 'react'

import TopBar from "../../layout/TopBar.jsx";
import Footer from '../../layout/Footer.jsx'
import SearchingBar from '../../layout/SearchBar.jsx';
import LocationBar from './components/LocationBar.jsx'
import Banner from './components/Banner.jsx'
import CategorySection from './components/CategorySection.jsx'
import ProductSection from './components/ProductSection.jsx'
import DonorSection from './components/DonorSection.jsx'
import 'assets/css/guest/home_pape/HomePage.css'
import 'assets/css/Common.css'

function HomePage(){
    return (
        <div className="home-page">
            <div className="page-header">
                <TopBar/>
                <SearchingBar/>
                <hr className='m-0'/>
                <LocationBar/>
            </div>
            <div className="page-body">
                <Banner/>
                <CategorySection/>
                <ProductSection/>
                <DonorSection/>
            </div>
            <div className="page-footer">
                <Footer/>
            </div>
        </div>
    )
}

export default HomePage