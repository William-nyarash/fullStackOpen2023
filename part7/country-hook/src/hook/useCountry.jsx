import { useEffect, useState } from "react";
import axios from "axios";
export default  useCountry = (name) => {
    const [country , setCountry] = useState(null);

    const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`;

    useEffect (()=> {
        if(!name) return ;
        axios.get(baseUrl)
            .then((response) => {
                if(response.data && response.data.name ){
                    setCountry(response.data)
                }
                else {
                    setCountry(null)
                }
            }).catch((error) => {
                setCountry(null)
            })
    }, [name])
return country
}