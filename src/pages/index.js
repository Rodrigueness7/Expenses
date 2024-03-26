import Link from "next/link";
import { useState } from "react";

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3001/')
  const dataFetch = await res.json()
  var newData = []
  var total = 0
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth()).toLocaleDateString('en-CA').slice(0, 10)
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleString('en-CA').slice(0, 10)

  dataFetch.map((itens) => {
    if (itens.dt_exp.slice(0, 10) >= firstDay && itens.dt_exp.slice(0, 10) <= lastDay) {
      newData.push(itens)
      total += parseFloat(itens.value)
    }
  })

  return { props: { newData, total, firstDay, lastDay } }
}

function Home(props) {

  const [newUpdate, setNewUpdate] = useState(props.newData)
  const [newTotal, setTotal] = useState(props.total)
  const [dateInit, setDateInit] = useState('')
  const [dateFinish, setDateFinish] = useState('')

  const handleDateInit = (e) => {
    setDateInit(e.target.value)
  }
  const handleDateFinish = (e) => {
    setDateFinish(e.target.value)
  }

  async function onsubmit(e) {
    e.preventDefault()

    const res = await fetch(`http://localhost:3001/findByDate/${dateInit}/${dateFinish}`)
    const resData = await res.json()
    var newValue = 0

    if (resData == ![]) {
      return alert('Não há dados nesse período')
    }

    resData.map((updateData) => {
      newValue += parseFloat(updateData.value)
      setTotal(newValue)
    })

    setNewUpdate(resData)
  }

  return (
    <div className="card">
      <Link className="adicionar" href={'/add'}><button>Adicionar</button></Link>
      <h1>Despesas</h1>
      <form onSubmit={onsubmit}>
        <input type="date" onChange={handleDateInit} value={dateInit}></input>
        <input type="date" onChange={handleDateFinish} value={dateFinish}></input>
        <button type="submit">Buscar</button>
      </form>
      <div className="title"><span>Conta</span><span>Valor</span><span>Vencimento</span></div>
      {newUpdate.map((itens) =>
        <div className="itens"
          key={itens.id}><span className="description"> {itens.description}</span>
          <span className="value">{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(itens.value)}</span>
          <span className="date"> {new Date(itens.dt_exp).toLocaleDateString('pt-BR')}</span>
          <Link className="update" href={`/update/${itens.id}`}><button className="button">...</button></Link>
        </div>
      )}
      {<div>
        <p key={0}>Total: {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(newTotal)}</p>
      </div>}
    </div>
  )

}

export default Home;


