import Button from "./Button"
import WeatherApp from './WeatherApp'
import React from "react"

const Filter =({spesificCountry,selectedCountry,handleCapitalCity,weather})=>{

    if (spesificCountry.length === 1) {   
            const capitalCity = spesificCountry.map((capital)=>capital.capital)
        return(
        <div>
            {spesificCountry.map((country)=>{
                 return(
                        <div key={country.name.common}>
                             <h1>{country.name.common}</h1> 
                             <p>Capital {country.capital}</p>
                             <p>area {country.area}</p>
                             <p><b>languages:</b></p>  
                             <ul>
                                   {Object.values(country.languages).map(name=>{
                                              return(
                                                    <div key={name}>
                                                       {name}
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                </ul>
                             <div>  
                                     <img    
                                         src={country.flags.svg}    
                                         width={320}    
                                         alt={`The flag of ${country.name.common}`} 
                                         height={'auto'}
                                      />
                             </div>
                        </div>
                    )
                })
            }
            <div>
                <h1>weather in {capitalCity}</h1>
                   <WeatherApp  weather={weather} />
            </div>
        </div>)
        }
    else if(spesificCountry.length <= 10){
                return(
        <>
            {spesificCountry.map((country) =>
                 <div key={country.name.common} >
                  {country.name.common} 
                   <Button  
                            handleClick={() =>selectedCountry(country.name.common)}     
                            text='show'
                            />
                    </div>
               )}
           </>
                      )
        }
    else if(spesificCountry.length > 10){
                return<div>Too many matches, specify another filter</div>
            }
    return(
        <div></div>
    )
  }
  
export default Filter


