import {useState} from 'react'
const App=()=> {
   const [good ,setGood] = useState(0)
   const [bad ,setBad] = useState(0)
   const [neutral ,setNeutral] = useState(0)
 if (good== 0 && bad ==0 && neutral == 0){
  return(
    <>
     <Header  text={"give feedback"}/>
     <Button handleClick={()=>setGood(good + 1)} value="good"/>
     <Button handleClick={()=>setBad(bad + 1)} value="bad"/>
     <Button handleClick={()=>setNeutral(neutral + 1)} value="neutral"/>
     <h1>statistic</h1>
     <p>no feedback given</p>
    </>
  )
 }
  return (
    <>
     <Header  text={"give feedback"}/>
     <Button handleClick={()=>setGood(good + 1)} value="good"/>
     <Button handleClick={()=>setBad(bad + 1)} value="bad"/>
     <Button handleClick={()=>setNeutral(neutral + 1)} value="neutral"/>
     <Statistics  good={good} bad={bad} neutral={neutral} symbol={"%"}/>
    </>
  )
}
const Header =({text})=>{
  return(
    <>
      <h1>{text}</h1>
    </>
  )
}
const Button =({value,handleClick})=>{
  return(
    <>
      <button onClick={handleClick}>{value}</button>
    </>
  )
}
const Statistics =({good,bad,neutral,symbol})=>{
return(
  <>
     <Title name="statistics" />
      <table>
          <tbody>
              <StatisticLine text="good" value={good}/>
              <StatisticLine text="bad" value={bad}/>
              <StatisticLine text="neutral" value={neutral}/>
              <StatisticLine text="all" value={good + neutral + bad}/>
              <StatisticLine text="average" value={(good + neutral + bad) / 16.2}/>
              <StatisticLine text="positive" value={((good)/(good + neutral + bad))*100} symbol={symbol}/>
          </tbody>
      </table>
  </>
)
}
const Title =({name})=>{
  return(
    <>
      <h1>{name}</h1>
    </>
  )
}
const StatisticLine =({text ,value,symbol})=>{
  return(
    <>
      <tr>
        <td>{text}</td>
        <td>{value}{symbol}</td>
        </tr>     
    </>
  )
}
export default App
