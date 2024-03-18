import Link from "next/link";
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

        var changeValue = e.target.value;
        changeValue = changeValue.replace(/\D/g, "");
        changeValue = changeValue.replace(/(\d+)(\d{2})$/, "$1,$2");
        changeValue = changeValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        e.target.value = "R$ " + changeValue;

        setValue(e.target.value)
    }

    const handleDate = (e) => {
        setDate(e.target.value)
    }

    async function onSubmit(event) {
        event.preventDefault()

        var newValue = value
        newValue = newValue.replace("R$", "")
        newValue = newValue.replace(".", "")
        newValue = newValue.replace(",", ".")
        newValue = parseFloat(newValue)


        const data = {
            description: description,
            value: newValue,
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
            <Link href={"./"}><button>Home</button></Link>    
            <h1>Adicionar dados</h1>
            <form onSubmit={onSubmit}>
                <input type="text" name="description" maxLength={50} onChange={handleDescription} placeholder="Description" value={description} required></input>
                <input type="text" maxLength={14} name="value" onChange={handleValue} placeholder="Value" value={value} required ></input>
                <input type="date" onChange={handleDate} name="dt_exp" value={date} required></input>
                <button type='submit'>Add</button>
                <div>{result}</div>
            </form>
            
        </div>

    )
}

export default Add;