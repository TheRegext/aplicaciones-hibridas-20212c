/// Componentes funcionales
import { useState, useEffect } from "react"

function Button(props) {
    // constructor del componente
    const [contador, setContador] = useState(0)
    const [contador2, setContador2] = useState(0)

    console.log("Button::Constructor")

    // cunado se ejecuta la primera vez
    useEffect(() => {
        console.log("Button::Primera Vez")

        // ejecuta esta funcion cuando desmonte el componente
        return () => {
            console.log('Button::Desmontar');
        }
    }, [])

    // cunado cambie el contador
    useEffect(() => {
        console.log("Button::contador")
    }, [contador])

    // cuando cambie el contador2
    useEffect(() => {
        console.log("Button::contador2")
    }, [contador2])

    // render
    return (
        <div>
            <button onClick={() => setContador(contador + 1)}>{contador}</button>
            <button onClick={() => setContador2(contador2 + 1)}>{contador2}</button>
        </div>

    )
}

export default Button