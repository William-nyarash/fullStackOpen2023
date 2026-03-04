const  Country =({country}) => {
    if(!country)  return <div>Not found..</div>

    const countryData  = country;

    const countryName = countryData.name.common;
    return (
        <div>
            <h2>
                {countryName}
            </h2>
            <div>
                Capital:  {countryData.capital}
            </div>
            <div>
                Population: {countryData.population} 
            </div>
            <img src={countryData.coatOfArms.png} height="120" alt={`Flag of ${countryName}`} />
        </div>
    )
}
export default Country;