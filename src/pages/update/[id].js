import { useRouter } from "next/router"
import { useState } from "react"

export async function getServerSideProps(context) {

    const id = context.params.id
    const res = await fetch(`http://localhost:3001/find/${id}`)
    const data = await res.json()

    return { props: { data } }

}

const FormUpdate = ({ data }) => {

    const routeId = useRouter()

    const [updateDescription, setUpdateDescription] = useState(data[0].description)
    const [updateValue, setUpdateValue] = useState(data[0].value)
    const [updateDate, setUpdateDate] = useState(new Date(data[0].dt_exp).toLocaleDateString('pt-br').split('/').reverse().join('-'))
    const [updateResult, setUpdateResult] = useState('')
    const [removeItem, setRemoveItem] = useState('')
    const [updatePaid, setUpdatePaid] = useState(() => {
        if (data[0].dt_paid == null) {
            return null
        }
        return new Date(data[0].dt_paid).toLocaleDateString('pt-br').split('/').reverse().join('-')
    })


    const handleDescription = (e) => {
        setUpdateDescription(e.target.value)
    }

    const handleValue = (e) => {
        setUpdateValue(e.target.value)
    }

    const handleDate = (e) => {
        setUpdateDate(e.target.value)

    }

    const handlePayment = (e) => {
        setUpdatePaid(e.target.value)

    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const payment = () => {
            if (updatePaid == '') {
                return null
            }
            return updatePaid
        }

        const updateData = {
            id: routeId.query.id,
            description: updateDescription,
            value: JSON.parse(updateValue),
            dt_exp: updateDate,
            dt_paid: payment()
        }

        const res = await fetch(`http://localhost:3001/update/${routeId.query.id}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
            headers: {
                'content-type': 'application/json'
            }
        });


        await fetch(`http://localhost:3001/updatePaid/${routeId.query.id}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
            headers: {
                'content-type': 'application/json'
            }
        })


        const result = await res.json()
        setUpdateResult(result.data)
        setTimeout(() => {
            setUpdateResult()
        }, 3000)

    }

    const remove = async (e) => {
        const res = await fetch(`http://localhost:3001/remove/${routeId.query.id}`, {
            method: 'DELETE'
        })
        const remove = await res.json()
        setRemoveItem(remove.data)

        setTimeout(() => {
            setRemoveItem()
        }, 3000)


    }

    return (
        <div>
            <h2>Atualizar dados</h2>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={handleDescription} value={updateDescription} placeholder="Description"></input>
                <input type="number" onChange={handleValue} value={updateValue} placeholder="Value"></input>
                <input type="date" onChange={handleDate} value={updateDate}></input>
                <input type="date" onChange={handlePayment} value={updatePaid}></input>
                <button type="submit">Atualizar</button>
                <div>{updateResult}</div>
            </form>
            <button onClick={remove}>Deletar</button>
            <div>{removeItem}</div>
        </div>
    )

}

export default FormUpdate