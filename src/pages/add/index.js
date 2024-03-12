import React, { useState } from "react";


function Add() {
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [date, setDate] = useState('')
    const [result, setResult] = useState('')

    const handleDescription = (e) => {
         setDescription(e.target.value)
      
    }

    const handleValue = (e) => {
        
        setValue(e.target.value.toLocaleString('pt-BR'))
        
    }

    const handleDate = (e) => {
        setDate(e.target.value)
    }

    async function onSubmit(event) {
        event.preventDefault()

        const data = {
            description: description,
            value: JSON.parse(value),
            dt_exp: date
        }

        const response = await fetch('http://localhost:3001/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        });

        const result = await response.json();
        setResult(result.data)
        setTimeout(() => {
            setResult()
        }, 3000)
        setDescription('')
        setValue('')
        setDate('')
    }

    return (
        <div>
            <h1>Adicionar dados</h1>
            <form onSubmit={onSubmit}>
                <input type="text" name="description" maxLength={50} onChange={handleDescription} placeholder="Description" value={description} required></input>
                <input type="number" min={0} max={999000000} step='0.01' name="value" onChange={handleValue} placeholder="Value" value={value} required ></input>
                <input type="date" onChange={handleDate} name="dt_exp" value={date} required></input>
                <button type='submit'>Add</button>
                <div>{result}</div>
            </form>
        </div>

    )
}

export default Add;