import React from "react";
import '../styledComponents/detailedRecipe.css';

export default function Paginated({ recipePerPage, recipes, paginated }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(recipes / recipePerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <h3>Pages</h3>
            <ul  className="paginated">
                {pageNumbers && pageNumbers.map(number => (
                    <li  className="number"  key={number}>
                        <a onClick={() => paginated(number)}  className="eachA" >{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}