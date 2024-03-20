import Link from "next/link";


export async function getServerSideProps() {
  const res = await fetch('http://localhost:3001/')
  const dataFetch = await res.json()
  var newData = []
  var total = 0
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth()).toLocaleDateString('en-CA').slice(0, 10)
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleString('en-CA').slice(0, 10)

  dataFetch.map((itens) => {
    if (itens.dt_exp >= firstDay || itens.dt_expd <= lastDay) {
      newData.push(itens)
      total += parseFloat(itens.value)
    }
  })

  return { props: { newData, total } }
}

function Home(props) {

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
        <p className="" key={0}>Total: {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(props.total)}</p>
      </div>
    </div>
  )

}

export default Home;


