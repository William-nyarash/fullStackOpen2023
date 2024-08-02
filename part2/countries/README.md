# countries
**using the provides APIs our main is to enable users select there prefered country and the app renders the selected county's information to the browser**

`The user is provided with an input field so that the user can enter the  desired country`

country | capital | area | flag
---| ---| ---| ---|
korea | Seoul | 100210 | 🇰🇷

> as seen in the example table above.
>The app can be modified to display so many other informations

## the hard part

***getting  the languages***
```jsx
{array.map((newArray)=>{
    return(
        <div>
    <h1>{newArray.name}</h1>
    {newArray.map((subArray)=>{
        return(
            <div key={index}>{subArray.language}</div>
        )
    })}
    </div>)
})}
```

*Will use axios to fetch the data*

<p style="color: red;">still under development</p>
