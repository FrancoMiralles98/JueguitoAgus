import { createContext,useContext,useState } from "react";


const ContextPlayerProvider = createContext()

export const usePlayerContext = () =>{
    const context = useContext(ContextPlayerProvider)
    if(!context){
        throw new Error('error al crear el contexto, se necesita un provider')
    }
    return context
}

export const PlayerProvider = ({children}) =>{

    const [turno,setTurno] = useState('azul')
    const [puntos, setPuntos] = useState({ A: 0, R: 0 })
    const [ganador,setGanador] = useState('')

    const resetTurno=()=>{
        setTurno('azul')
    }

    const changeTurno = ()=>{
        setTurno(turno=>{
            if(turno === 'azul') return 'rojo'
            return 'azul'
        })
    }

    const resetPuntos = ()=>{
        setPuntos({
            A:0,
            R:0
        })
    }

    const restarPuntos = (turno) => {
        if (turno === 'azul') {
            setPuntos(p => {
                return {
                    A: p.A - 1,
                    R: p.R
                }
            })
            return
        }
        setPuntos(p => {
            return {
                A: p.A,
                R: p.R - 1
            }
        })
        return
    }

    const aumentarPuntos = (turno,puntos) => {
        if (turno === 'azul') {
            setPuntos(p => {
                return {
                    A: p.A + puntos,
                    R: p.R
                }
            })
            return
        }
        setPuntos(p => {
            return {
                A: p.A,
                R: p.R + puntos
            }
        })
        return
    }

    const winner = (player) =>{
        setGanador(player)
    }

    return(
        <>
        <ContextPlayerProvider.Provider value={{ 
            puntos,
            resetPuntos,
            restarPuntos,
            aumentarPuntos,
            turno,
            resetTurno,
            changeTurno,
            ganador,
            winner
            }}>
            {children}
        </ContextPlayerProvider.Provider>
        </>
    )
}