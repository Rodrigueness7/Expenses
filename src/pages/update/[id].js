import { redirect } from "next/dist/server/api-utils"
import Link from "next/link"
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
    const [updateValue, setUpdateValue] = useState(new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(data[0].value))
    const [updateDate, setUpdateDate] = useState(new Date(data[0].dt_exp).toLocaleDateString('pt-br').split('/').reverse().join('-'))
    const [updateResult, setUpdateResult] = useState('')
    const [updateDtLaunch, setUpdateDtLaunch] = useState(new Date(data[0].dt_launch).toLocaleDateString('pt-br').split('/').reverse().join('-'))
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

        var changeValueUpdate = e.target.value;
        changeValueUpdate = changeValueUpdate.replace(/\D/g, "");
        changeValueUpdate = changeValueUpdate.replace(/(\d+)(\d{2})$/, "$1,$2");
        changeValueUpdate = changeValueUpdate.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        e.target.value = "R$ " + changeValueUpdate;

        setUpdateValue(e.target.value)
    }

    const handleDtExp = (e) => {
        setUpdateDate(e.target.value)

    }

    const handleDtLaunch = (e) => {
        setUpdateDtLaunch(e.target.value)
    }

    const handlePayment = (e) => {

        setUpdatePaid(e.target.value)

    }

    const onSubmit = async (e) => {


        if (updateDtLaunch > updateDate && updateDtLaunch !== "") {
            return alert('Data de pagamento não pode ser inferior a data de lançamento')
        }

        e.preventDefault()

        var newUpdateValue = updateValue
        newUpdateValue = newUpdateValue.replace("R$", "")
        newUpdateValue = newUpdateValue.replace(".", "")
        newUpdateValue = newUpdateValue.replace(",", ".")
        newUpdateValue = parseFloat(newUpdateValue)


        const payment = () => {

            if (updatePaid == '') {
                return null
            } else if (updatePaid >= updateDate) {
                return updatePaid
            }
            return null
        }


        const updateData = {
            id: routeId.query.id,
            description: updateDescription,
            value: newUpdateValue,
            dt_exp: updateDate,
            dt_paid: payment(),
            dt_launch: updateDtLaunch
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

        window.location.replace('../')
    }

    return (
        <div className="cardMain">
            <Link href={'../'}><button>Home</button></Link>
            <h1>Atualizar dados</h1>
            <div className="cardForm">
                <form onSubmit={onSubmit} className="form">
                    <label> Descrição:
                        <input className="input" type="text" maxLength={50} onChange={handleDescription} value={updateDescription} placeholder="Description"></input>
                    </label>
                    <label>Valor:
                        <input className="input" type="text" maxLength={14} onChange={handleValue} value={updateValue} placeholder="Value"></input>
                    </label>
                    <label>Lançamento:
                        <input className="input" type="date" onChange={handleDtLaunch} value={updateDtLaunch} required></input>
                    </label>
                    <label>Vencimento:
                        <input className="input" type="date" onChange={handleDtExp} value={updateDate} required ></input>
                    </label>
                    <label> Pagamento:
                        <input className="input" type="date" onChange={handlePayment} value={updatePaid}></input>
                    </label>
                    <button className="buttonUpdate" type="submit">Atualizar</button>
                </form>
                <button className="buttonRemover" onClick={remove}>Deletar</button>
                <span className="resultUpdate">{removeItem}</span>
                <span className="resultUpdate">{updateResult}</span>
            </div>
        </div>
    )

}

export default FormUpdate