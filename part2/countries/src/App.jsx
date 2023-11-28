import { useState, useEffect} from 'react'
import axios from 'axios'
import Input from './components/Input'
import Filter from'./components/Filter'

 const App =()=>{
        const[country, setCountry] = useState([])
        const[selectedCountry,setSelectedCountry] = useState('')
        const[weather,setWeather] =useState({})
        const[capitalCity,setCapitalCity] = useState('nairobi')

        const spesificCountry = country.filter(country=>country.name.common.toLowerCase().includes(selectedCountry.toLowerCase()))
        const setcapital = spesificCountry.filter((city)=>city.capital)
        const capitalIs = Object.values(setcapital.map((city)=>city.capital[0]))
        useEffect(()=>{
          axios
                  .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
                  .then( (response)=>
                                  setCountry(response.data))
                                  .catch(()=>{
                    alert(" the said api is not working, retrying....");
                  })
        },[]);   
        console.log("kenya",capitalIs)  
        const api_key = import.meta.env.VITE_SOME_KEY
     if(capitalCity){useEffect(()=>{
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&units=imperial&APPID=${api_key}`)
                .then((result)=>setWeather(result.data))
            
      },[capitalCity]) }
      
         const handleChange =(event)=> {
          setSelectedCountry(event.target.value)
         }
    
        return(
          <div>
                    <Input  
                            value={selectedCountry}
                            handleChange={handleChange}
                            text ={"find countries"}
                            />
                    <br />
                    <button value={"clicked"} onClick={()=>setCapitalCity(capitalIs)} >weather</button>
                    <br />

                   <Filter   
                        spesificCountry={spesificCountry}
                        selectedCountry={setSelectedCountry} 
                        weather={weather}
                      /> 
          </div>
        )
 }

export default App
       