import { useEffect, useState } from "react"

export const Card = ({reset,aumentarPuntos,color,restarPuntos,palabra,turno,changeTurno,index,changeOneWord}) =>{

    const [background,setBackground]=useState('card')

    useEffect(()=>{
        setBackground('card')
    },[reset])

    const pintar = async()=>{ 
        if(background.length > 4 && color !== '.'){
            const newTurno = turno === 'azul' ? 'rojo' : 'azul'
            changeTurno()
            setBackground('card')
            restarPuntos(newTurno)  
            return
        }
        if(background.length > 4 && color === '.'){
            changeTurno()
            setBackground('card')  
            return
        }

        if(color === 'R'){
            aumentarPuntos('rojo',1)
            setBackground('card r')
            changeTurno()
            return
        }
        if(color === 'A'){
            aumentarPuntos('azul',1)
            setBackground('card b')
            changeTurno()
            return
        }
        if(color === '.'){
            setBackground('card w')
            changeTurno()
            return
        }
        setBackground('card z')
        const ganador = turno === 'azul'? 'rojo' : 'azul'
        aumentarPuntos(ganador,8)
        return
        
    }

    const change = async()=>{
        await changeOneWord(index)
    }

    return (
        <>
            <section className={background}>
                <div className="card-i">
                    <button className="card-i-b" onClick={change}><i className="material-icons card-i-b-t">autorenew</i></button>    
                </div>
                <div className="card-t" onClick={pintar}>
                <h5>{palabra}</h5>
                </div>
            </section>
        </>
    )
}