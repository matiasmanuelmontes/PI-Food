import React from "react";
import {  useState, /* useSelector */ } from "react";
import '../styledComponents/progressBar.css';

export default function ProgressBar({done}) {

    const [style,setStyle] = useState({});
    /* var activeRecipes = useSelector((state) => state.filteredRecipes) */

    setTimeout(()=> {
        const newStyle = {
            opacity: 1,
            width: `${done}%`

        } 
        setStyle(newStyle);
    },1000)

    
    return (
        <div className="progress" >
			<div className="progress-done" style={style}>
                    Loading Content
                </div>   
        </div>
    )
}