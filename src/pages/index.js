import Link from "next/link";
import React, { useEffect, useState } from "react";


function Home() {

  const [data, setData] = useState([])
  const [sum, setSum] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then((res) => res.json())
      .then((itens) => {
        setData(itens)
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:3001/sum')
      .then((res) => res.json())
      .then((total) => {
        setSum(total)
      })
  }, [])

  return (
    <div className="card">
      <Link className="adicionar" href={'/add'}><button>Adicionar</button></Link>
      <h1>Despesas</h1>
      <div className="title"><span>Conta</span><span>Valor</span><span>Vencimento</span></div>
      {data.map((itens) =>
        <div className="itens"
          key={itens.id}><span className="description"> {itens.description}</span>
          <span className="value">{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(itens.value)}</span>
          <span className="date"> {new Date(itens.dt_exp).toLocaleDateString('pt-BR')}</span>
          <Link className="update" href={`/update/${itens.id}`}><button className="button">{"<<"}</button></Link>
        </div>)}
      <div>
        {sum.map(sum =>
          <p key={0}>Total: {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(sum['SUM(value)'])}</p>)}
      </div>
    </div>
  )

}

export default Home;


