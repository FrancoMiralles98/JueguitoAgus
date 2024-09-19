import { useEffect, useState } from "react"
import { Card } from "../components/Card.jsx"
import { Modal } from "../components/Modal.jsx"
import { usePlayerContext } from "../context/PlayerContext.jsx"
import { useTableroContext } from "../context/TableroContext.jsx"
import {Link} from 'react-router-dom'


export const MainPage = () => {

    const isGuia = false
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
        ,catchWord
        ,words
        ,resetWords
        ,changeOneWord
        ,createTablero
        ,reset
        ,resetAll} = useTableroContext()

    const [isOpen,setIsOpen] = useState(false)
    const [loading,setLoading] = useState(true)
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    
    const reiniciar = async()=>{
        await resetWords()
        closeModal()
        resetPuntos()
        resetTurno()
        winner('')
        createTablero()
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
            openModal()
            return
        }
        if(puntos.R >= 8){
            winner('GANO EL EQUIPO ROOOJOO')
            openModal()
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
                        `Ahora es el turno del equipo ${turno.toUpperCase()}`}
                        </h4>
                        <button onClick={changeTurno}>Siguiente Turno</button>
                        <button onClick={reiniciar}>Reiniciar</button>
                        <Link to='/guia' target="_blank"><button>Guia</button></Link>
                    </div>
                       
                </header>
                <section className="main-body">
                    {
                       words.map((e, i) => (
                            <Card palabra={e}
                            isGuia={isGuia}
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

                {isOpen && (
        <Modal closeModal={closeModal}>
          <h2>{ganador}</h2>
          <div className="button-modal">
          <button onClick={closeModal}>Cerrar</button>
          <button onClick={reiniciar}>Reiniciar</button>
          </div>
        </Modal>
      )}
            </main>
        </>
    )
}