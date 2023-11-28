const Header =({heading})=>{
    return(
      <div>
        <h2>{heading.name}</h2>
      </div>
    )
  }
  const Content =({parts})=>{
  
    return(
      <div>
        {parts.map( part =>
        <Part key={part.id} part={part}/>)
        }
      </div>
    )
  }
  const Part =({part})=>{
    return(
      <div>
          <p >{part.name}{part.exercises}</p>
      </div>
    )
  }
  const Total =({parts})=>{
    const totalExercises = parts.reduce((initialValue,accumilatedValue) => initialValue + accumilatedValue.exercises,0)
  return(
  <>
  <p><b> total of {totalExercises} exercises</b></p>
  </>
  )
  }
  const Courses =({courses})=>{
    return(
    <>
       <h1>Web development curriculum</h1>
         {courses.map( course =>
      <div key={course.id}>
        <Header heading={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    )}
    </>
    )
  }
  export default Courses