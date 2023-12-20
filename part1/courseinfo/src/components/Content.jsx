const Content =({course})=>{
    return(
      <>
         <Parts  name={course.parts[0].name} value={course.parts[0].exercises} />
         <Parts  name={course.parts[1].name} value={course.parts[1].exercises} />
         <Parts  name={course.parts[2].name} value={course.parts[2].exercises} />
      </>
    )
  }
  export default Content