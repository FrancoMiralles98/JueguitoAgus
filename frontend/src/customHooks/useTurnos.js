import { useState } from "react";

export function useTurnos(){
    const [turno,setTurno] = useState('azul')

    const resetTurno=()=>{
        setTurno('azul')
    }

    const changeTurno = ()=>{
        setTurno(turno=>{
            if(turno === 'azul') return 'rojo'
            return 'azul'
        })
    }

    return {turno,resetTurno,changeTurno}
}