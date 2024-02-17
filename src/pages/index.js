import React, { useEffect, useState } from "react";


function Home() {

  const [data, setData] = useState([])
  const [total, setTotal] = useState('')

  useEffect(() =>{
     fetch('http://localhost:3001/')
    .then((res) => res.json())
    .then((itens) => {
      setData(itens)
    })
  }, [])

  const result = (e) => {
    e.preventDefault()
    data.filter(item => {
      console.log(item.value)
    })
    
  }

  return(
    <div className="card">
      <h1>Despesas</h1>
      <div className="title"><span>Conta</span><span>Valor</span><span>Vencimento</span></div>
      {data.map((itens) => <div className="itens"><span className="description"> {itens.description}</span><span className="value">R$: {itens.value}</span><span> {new Date(itens.dt_exp).toLocaleDateString('pt-BR')}</span></div> )}
    </div>
  )

}

export default Home;
