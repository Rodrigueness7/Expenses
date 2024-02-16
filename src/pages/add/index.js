import React, { useState } from "react";


function add() {

    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [date, setDate] = useState('')

    const handleDescription = (e) => {
        setDescription(e.target.value)
        console.log(description)
    }

    const handleValue = (e) => {
        setValue(e.target.value)
        console.log(value)
    }

    const handleDate = (e) => {
        setDate(e.target.value)
        console.log(date)
    }

    const add = (e) => {
        e.preventDefault()
        const body = {
            description: description,
            value: value, 
            date: date
        }

        console.log(body)
    }

    return(
       <div>
             <h1>Add itens</h1>
             <form>
                <input type="text" placeholder="Description" onChange={handleDescription} value={description}></input>
                <input type="number" placeholder="Value" onChange={handleValue} value={value}></input>
                <input type="date" onChange={handleDate} value={date}></input>
                <button onClick={add}>Add</button>
             </form>
       </div>
        
    )
}

export default add