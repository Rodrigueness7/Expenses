import React, { useEffect, useRef } from "react";


const FormUpdate = () => {
    let  initialDescription = useRef();
    let initialValue = useRef();
    let initialDt_exp = useRef();
    

    useEffect(() => {
        fetch('http://localhost:3001/find/34')
        .then((res) => res.json())
        .then((data) => {
            initialDescription.current = data[0].description
            initialValue.current = data[0].value
            initialDt_exp.current = data[0].dt_exp
            
        })
    },[])


    return(
        <div>
            <h2>Edite o item</h2>
            <form>
                <input type="text" placeholder={initialDescription.current}></input>
                <input type="number" placeholder={initialValue.current}></input>
                <input type="date" placeholder={initialDt_exp.current}></input>
            </form>
        </div>
    )
}


export default FormUpdate