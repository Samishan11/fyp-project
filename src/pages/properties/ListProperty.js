import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { ListingContext } from '../../context/listingContext';
import '../properties/style.css';
import AddressForm from './components/AddressForm';
import CategorySelection from './components/CategorySelection';
import FeaturesForm from './components/FeaturesForm';
import ImageSelection from './components/ImagesSelection';
import RulesForm from './components/RulesForm';
import Summary from './components/Summary';
import TitleForm from './components/TitleForm';

const ListProperty = () => {

    const section = useParams().section
    const data = useLocation()?.state?.data
    console.log(data !== "land")
    console.log(data)
    const [listingData, setListingData] = useContext(ListingContext)

    return (
        <>
            <Navbar></Navbar>
            {
                section === "category" ?
                    <>
                        <CategorySelection data={data}></CategorySelection>
                    </> :
                    section === "address" ?
                        <>
                            <AddressForm data={data}></AddressForm>
                        </> :
                        section === "title" ?
                            <>
                                <TitleForm ></TitleForm>
                            </> :
                          
                                section === "features" ?
                                <>
                                    <FeaturesForm data={data}></FeaturesForm>
                                </> :
                              
                                    section === "rules" ?
                                    <>
                                        <RulesForm></RulesForm>
                                    </> :
                                    section === "images" ?
                                        <>
                                            <ImageSelection></ImageSelection>
                                        </> :
                                        <>
                                            <Summary></Summary>
                                        </>

            }
        </>
    )
}

export default ListProperty;