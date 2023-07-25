import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import '../../properties/style.css';
import AddressForm from './components/AddressForm';
import FeaturesForm from './components/FeaturesForm';
import RulesForm from './components/RulesForm';
import Summary from '../components/Summary';
import TitleForm from './components/TitleForm';
import ImageSelection from '../components/ImagesSelection';

const UpdateListing = () => {

    const section = useParams().section

  return (
    <>
        <Navbar></Navbar>
            {
                section === "address"?
                <>
                    <AddressForm></AddressForm>
                </>:
                section === "title"?
                <>
                    <TitleForm></TitleForm>
                </>:
                section === "features"?
                <>
                    <FeaturesForm></FeaturesForm>
                </>:
                section === "rules"?
                <>
                    <RulesForm></RulesForm>
                </>:
                section === "images"?
                <>
                    <ImageSelection></ImageSelection>
                </>:
                <>
                    <Summary></Summary>
                </>
                
            }
    </>
  )
}

export default UpdateListing