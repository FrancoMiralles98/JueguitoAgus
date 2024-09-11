import { useState } from "react"

export const usePuntos = () => {
    const [puntos, setPuntos] = useState({ A: 0, R: 0 })

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

    return { puntos, resetPuntos,restarPuntos,aumentarPuntos }
}