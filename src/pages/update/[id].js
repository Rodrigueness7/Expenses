import { useRouter } from "next/router";
import React, { useState } from "react";

var initialDescription
var initialValue
var initialDate

fetch('http://localhost:3001/find/59')
    .then((res) => res.json())
    .then((data) => {
        initialDescription = data[0].description
        initialValue = data[0].value
        initialDate = new Date(data[0].dt_exp).toLocaleDateString('pt-br').split('/').reverse().join( '-' )
    })

const FormUpdate = () => {
   
    const [description, setDescription] = useState(initialDescription)
    const [value, setValue] = useState(initialValue)
    const [date, setDate] = useState(initialDate)
   
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleValue = (e) => {
        setValue(e.target.value)
    }

    const hanldeDate = (e) => {
        setDate(e.target.value)
        console.log(e.target.value)
    }
    
    
    return (
        <div>
            <h2>Atualizar dados</h2>
            <form>
                <input type="text" onChange={handleDescription} value={description} placeholder="Description"></input>
                <input type="number" onChange={handleValue} value={value} placeholder="Value"></input>
                <input type="date" onChange={hanldeDate} value={date}></input>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    )

}

export default FormUpdate