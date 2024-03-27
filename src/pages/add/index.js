import Link from "next/link";
import React, { useState } from "react";


function Add() {
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [date, setDate] = useState('')
    const [date_launch, setDateLaunch] = useState(new Date().toLocaleDateString('en-CA'))
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

    const handleDateLaunch = (e) => {
        setDateLaunch(e.target.value)
    }

    async function onSubmit(event) {
        event.preventDefault()

        if(date < date_launch) {    
          return alert('Data lançamento não pode ser inferior a data vencimento')
        }

        var newValue = value
        newValue = newValue.replace("R$", "")
        newValue = newValue.replace(".", "")
        newValue = newValue.replace(",", ".")
        newValue = parseFloat(newValue)


        const data = {
            description: description,
            value: newValue,
            dt_exp: date,
            dt_launch: date_launch
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
        <div className="cardMain">
            <Link href={"./"}><button>Home</button></Link>
            <h1>Adicionar dados</h1>
            <div className="form">
                <form onSubmit={onSubmit} >
                    <label>Descrição
                        <input className="input" type="text" name="description" maxLength={50} onChange={handleDescription} placeholder="Description" value={description} required></input>
                    </label>
                    <label>Valor:
                        <input className="input" type="text" maxLength={14} name="value" onChange={handleValue} placeholder="Value" value={value} required ></input>
                    </label>
                    <label>Dt Lançamento:
                        <input className="input" type="date" onChange={handleDateLaunch} name="dt_launch" value={date_launch} required></input>
                    </label>
                    <label>Dt Vencimento
                        <input className="input" type="date" onChange={handleDate} name="dt_exp" value={date} required></input>
                    </label>
                    <button type='submit'>Enviar</button>
                    <div>{result}</div>
                </form>
            </div>
        </div>

    )
}

export default Add;