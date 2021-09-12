import React,{useState} from 'react'
import TopBanner from './TopBanner';import Footer from './footer';
import HometItems from './HomeItems';


const MainHome=()=>{

    return (
        <React.Fragment>

            <TopBanner/>
            <HometItems/>
            <Footer/>

        </React.Fragment>
    )
}

export default MainHome;