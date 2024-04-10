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
  const [click, setClick] = useState(0)

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

  const orderDes = () => {
    let desc = []

    if (click === 0) {
      props.newData.map((itens) => {
        desc.push(itens)
        desc.sort((a, b) => {
          if (a.description < b.description) {
            return - 1
          } else {
            return true
          }
        })
        setNewUpdate(desc)
      })
      setClick(click + 1)
    } else {
      props.newData.map((itens) => {
        desc.push(itens)
        desc.sort((a, b) => {
          if (a.description > b.description) {
            return - 1
          } else {
            return true
          }
        })
        setNewUpdate(desc)
      })
      setClick(click * 0)

    }
  }

  const orderValue = () => {

    let values = []

    if (click === 0) {
      props.newData.map((itens) => {
        values.push(itens)
        values.sort((a, b) => {
          if (a.value < b.value) {
            return - 1
          } else {
            return true
          }
        })
        setNewUpdate(values)
      })
      setClick(click + 1)
    } else {
      props.newData.map((itens) => {
        values.push(itens)
        values.sort((a, b) => {
          if (a.value > b.value) {
            return - 1
          } else {
            return true
          }
        })
        setNewUpdate(values)
      })
      setClick(click * 0)

    }
  }

  const orderDate = () => {
    let dates = []

    if (click === 0) {
      props.newData.map((itens) => {
        dates.push(itens)
        dates.sort((a, b) => {
          if (a.dt_exp < b.dt_exp) {
            return - 1
          } else {
            return true
          }
        })
        setNewUpdate(dates)
      })
      setClick(click + 1)
    } else {
      props.newData.map((itens) => {
        dates.push(itens)
        dates.sort((a, b) => {
          if (a.dt_exp > b.dt_exp) {
            return - 1
          } else {
            return true
          }
        })
        setNewUpdate(dates)
      })
      setClick(click * 0)
    }


  }

  return (
    <div className="card">
      <Link className="adicionar" href={'/add'}><button>Adicionar</button></Link>
      <h1>Despesas mensais</h1>
      <form onSubmit={onsubmit} className="formPeriod">
        <label><span className="titleForm">Dt Inicial:</span>
          <input className="period" type="date" onChange={handleDateInit} value={dateInit}></input>
        </label>
        <label><span className="titleForm">Dt Final:</span>
          <input className="period" type="date" onChange={handleDateFinish} value={dateFinish}></input>
        </label>
        <button className="buttonSearch" type="submit">Buscar</button>
      </form>
      <div className="title"><span className="descriptName" onClick={orderDes}>Conta</span>
        <span className="descriptName" onClick={orderValue}>Valor</span>
        <span className="descriptName" onClick={orderDate}>Vencimento</span></div>
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


