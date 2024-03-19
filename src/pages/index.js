import Link from "next/link";
import React, { useEffect, useState } from "react";

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3001/')
  const dataFetch = await res.json()
  var newData = []
  var sum = []
  var total = 0;
  for( let i = 0; i < (dataFetch.length/ dataFetch.length) * 4; i++) {
    newData.push(dataFetch[i])
    sum.push(dataFetch[i].value)
  }
  for(let i = 0; i < sum.length; i++) {
      total += parseFloat(sum[i])
       
  }
  
  return {props: {newData, total}}
}

function Home(props) {

  const [sum, setSum] = useState([])

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
      {props.newData.map((itens) =>
        <div className="itens" 
          key={itens.id}><span className="description"> {itens.description}</span>
          <span className="value">{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(itens.value)}</span>
          <span className="date"> {new Date(itens.dt_exp).toLocaleDateString('pt-BR')}</span>
          <Link className="update" href={`/update/${itens.id}`}><button className="button">...</button></Link>
        </div>
        )}
      <div>
        {sum.map(sum =>
          <p className="" key={0}>Total: {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(props.total)}</p>)}
      </div>
    
    </div>
  )

}

export default Home;


