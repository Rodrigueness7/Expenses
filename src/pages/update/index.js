import React, { useEffect, useState } from "react";

function update() {

    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [date, setDate] = useState('')

    useEffect( async (id) => {
        const response = await fetch(`http://localhost:3001/find/:${id}`)
    })

   async function onSubmit(e) {
        e.preventDefault();

    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="description" onChange={updateDescription} value={description}></input>
                <input type="number" placeholder="value" onChange={updateValue} value={value}></input>
                <input type="date"  onChange={updateDate} value={date}></input>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    )
}

export default update;