import { useEffect, useState } from "react"
import { Card } from "../components/Card.jsx"
import { useTableroContext } from "../context/TableroContext.jsx"
import { usePlayerContext } from "../context/PlayerContext.jsx"


export const GuiaPage = () =>{

    const isGuia = true

    const {puntos,
        resetPuntos,
        restarPuntos,
        aumentarPuntos,
        turno,
        resetTurno,
        changeTurno,
        ganador,
        winner} = usePlayerContext()

    const {tablero
        ,words
        ,resetWords
        ,changeOneWord
        ,createTablero
        ,reset
        ,resetAll} = useTableroContext()

    const [loading,setLoading] = useState(true)
    
    
    const reiniciar = async()=>{
        await resetWords()
        resetPuntos()
        resetTurno()
        createTablero()
        winner('')
        resetAll()
    }



    useEffect(() => {
        if(!window.localStorage.getItem('tablero') || !window.localStorage.getItem('words')){   
            const wordsFunction = async () => {
                await resetWords()
                createTablero()
                setLoading(false)
            }
            wordsFunction()
            return}
            setLoading(false)
            return
    }, [])

    useEffect(()=>{ 
        if(puntos.A >= 8){
            winner('GANO EL EQUIPO AZUUUL')
            return
        }
        if(puntos.R >= 8){
            winner('GANO EL EQUIPO ROOOJOO')
            return
        }
    },[puntos])

    if(loading){
        return (
            <>
                <div>Cargando..</div>
            </>
        )
    }

    return (
        <>
            <main>
                <header className='head'>
                    <div>
                        <h2 className="titulo">Jueguito de Agus</h2>
                    </div>
                    <div className="hud">
                        <h4>{ganador.length > 0?
                            ganador
                        : 
                        ``}
                        </h4>
                        <button onClick={reiniciar}>Reiniciar</button>
                    </div>
                       
                </header>
                <section className="main-body">
                    {
                        words.map((e, i) => (
                            <Card palabra={e}
                            isGuia ={isGuia}
                            ganadorLength={ganador}
                            color={tablero[i]} 
                            key={i}
                            reset={reset}  
                            turno={turno} 
                            changeTurno={changeTurno} 
                            index={i} 
                            changeOneWord={changeOneWord}
                            tablero={tablero}
                            aumentarPuntos={aumentarPuntos}
                            restarPuntos={restarPuntos}
                             />
                        ))
                    }
                </section>
            </main>
        </>
    )

}