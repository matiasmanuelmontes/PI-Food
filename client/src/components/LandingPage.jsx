import React from "react";
import { Link } from 'react-router-dom';
import '../styledComponents/landingPage.css';

export default function LandingPage() {
    return (
        <div className="landingBackGround">
            <h1 className="landingTitlePincipal"> Welcome to the Recipes Finder Page </h1>
            <p className="landingDescription">In this website you can find the recipe you want, press the get in button and redirect to our home page! </p>
            <Link to='/recipes/'>
                <button className="slide-in-elliptic-bottom-fwd">Get In</button>
            </Link>
            
        </div>
    )
}