import React, { useEffect, useState } from "react";


function Home() {

  const [data, setData] = useState([])

  useEffect(() =>{
     fetch('http://localhost:3001/')
    .then((res) => res.json())
    .then((itens) => {
      setData(itens)
    })
  }, [])

  return(
    <div className="card">
      <h1>Despesas</h1>
      {data.map((itens) => <div className="itens"><span className="des">Conta: {itens.description}</span><span className="va">R$: {itens.value}</span></div> )}
    </div>
  )

}

export default Home;
