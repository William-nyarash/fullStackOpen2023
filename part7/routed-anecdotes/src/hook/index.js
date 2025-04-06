import { useState } from "react";

export default function useField  (type) {
    const [value , setValue] = useState('')

    const onChange = (event) =>{
        setValue( event.target.value)
    }

    const reset =() => {
        setValue(' ')
    }
    return {
        type,
        value,
        reset,
        onChange
    }
}
