interface CourseNameProps {
  name: string
}

interface CoursePartsBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartWithDescription extends CoursePartsBase {
  description:string;
}
interface CoursePartsBasic extends CoursePartWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartsBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartsBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background"
}
interface  CoursePartSpecial extends CoursePartWithDescription {
  requirements:string [ ];
  kind:"special"
}

type  CoursePart = CoursePartsBasic | CoursePartGroup |  CoursePartsBackground | CoursePartSpecial
interface totalExercisesProps {
  totalExercise: number
}
interface ContentSectionProps {
  parts: CoursePart;
}
const HeaderSection =(props : CourseNameProps) => {
  return <h1> {props.name}</h1>
}
const ContentSection =({parts}:ContentSectionProps) => {
  switch(parts.kind) {
    case "basic":
      return (
        <div>
          <p > <strong>{parts.name} {parts.exerciseCount}</strong><br/>
          {parts.description}
          </p>
        </div>
      )
      case "group":
        return (
          <div>
            <p> <strong>{parts.name} {parts.exerciseCount}</strong><br/>
            <i>group project count {parts.groupProjectCount}</i>
            </p>
          </div>
        )

        case "background":
          return (
            <div>
              <strong>{parts.name} {parts.exerciseCount}</strong><br/>
              {parts.description}<br/>
              Submit to  {parts.backgroundMaterial}
            </div>
          )
        case "special":
          return (
            <div>
              <strong>{parts.name} {parts.exerciseCount}</strong><br/>
              <i>{parts.description}</i><br/>required skills: {parts.requirements}
            </div>
          )
        default : 
        return null
  }
}


const TotalExercise =(props: totalExercisesProps) => {
  return  <p> Number of exercises {props.totalExercise} </p>
}
const App = () => {
  const courseName = "Half Stack application development";
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
  name: "Backend development",
  exerciseCount: 21,
  description: "Typing the backend",
  requirements: ["nodejs", "jest"],
  kind: "special"
},
];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
     <HeaderSection name={courseName}/>
     {courseParts.map((part , index) => (
        <ContentSection key={index} parts={part} />
      ))
     }
        <TotalExercise totalExercise={totalExercises} />
    </div>
  );
};

export default App;