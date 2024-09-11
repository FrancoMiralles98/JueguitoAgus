import { useEffect, useState } from "react"
import { Card } from "../components/Card.jsx"
import { useWords } from "../customHooks/useWords.js"
import { useTurnos } from "../customHooks/useTurnos.js"
import { useTablero } from "../customHooks/useTablero.js"
import { usePuntos } from "../customHooks/usePuntos.js"
import { Modal } from "../components/Modal.jsx"

export const MainPage = () => {
    const { words, resetWords,changeOneWord } = useWords()
    const { turno, changeTurno,resetTurno } = useTurnos()
    const [loading,setLoading] = useState(true)
    const {tablero,resetTablero} = useTablero()
    const {puntos,aumentarPuntos,resetPuntos,restarPuntos} = usePuntos()
    const [ganador,setGanador] = useState('')
    const [reset,setReset] = useState(0)
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    
    const reiniciar = async()=>{
        await resetWords()
        closeModal()
        resetPuntos()
        resetTurno()
        setGanador('')
        resetTablero()
        setReset(i=>  i+1)
    }


    useEffect(() => {
            const wordsFunction = async () => {
                await resetWords()
                setLoading(false)
            }
            wordsFunction()
            return
    }, [])

    useEffect(()=>{
        console.log(puntos);
        
        if(puntos.A >= 8){
            setGanador('GANO EL EQUIPO AZUUUL')
            openModal()
            return
        }
        if(puntos.R >= 8){
            setGanador('GANO EL EQUIPO ROOOJOO')
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
                    </div>
                       
                </header>
                <section className="main-body">
                    {
                        words.map((e, i) => (
                            <Card palabra={e}
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