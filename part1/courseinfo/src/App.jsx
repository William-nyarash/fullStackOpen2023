const App = () => {
const course ={
  name: 'Half Stack application development',
parts :[
    {
  name:'Fundamentals of React',
exercises: 10
},
  {
  name:'Using props to pass data',
  exercises: 7
},
  {
  name: 'State of a component',
  exercises: 14
},
]
}
  return (
    <div>
       <Header course={course}/>
       <Content  course={course} />
       <Total  course={course} />
    </div>
  )
}
const Header=({course})=>{
  return(
    <>
      <h1>{course.name}</h1>
    </>
  )
}
const Content =({course})=>{
  return(
    <>
       <Parts  name={course.parts[0].name} value={course.parts[0].exercises} />
       <Parts  name={course.parts[1].name} value={course.parts[1].exercises} />
       <Parts  name={course.parts[2].name} value={course.parts[2].exercises} />
    </>
  )
}
const Parts =({name,value})=>{
  return(
    <>
    <p>{name}{value}</p>
    </>
  )
}
const Total =({course})=>{
  return(
    <>
       <p>Number of exercises{course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
    </>
  )
}
export default App
