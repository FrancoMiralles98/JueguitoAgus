import { useEffect, useState } from "react"

export const Card = ({isGuia,ganadorLength,reset,aumentarPuntos,color,restarPuntos,palabra,turno,changeTurno,index,changeOneWord}) =>{

    let inicioBackground = isGuia === true? `card ${color}`:`card`
    let inicioPalabra = isGuia === true? palabra : ''
    const [background,setBackground]=useState(inicioBackground)
    const [selectPalabra,setSelectPalabra] = useState(inicioPalabra)


    useEffect(()=>{
        if(isGuia === false){
        setBackground('card')
        setSelectPalabra('')}
        if(isGuia === true){
            const colorSaved = JSON.parse(window.localStorage.getItem('tablero'))[index]
            setBackground(`card ${colorSaved}`)
        }
    },[reset])


    const pintar = async()=>{
        const colorSaved = JSON.parse(window.localStorage.getItem('tablero'))[index]
        const wordSaved = JSON.parse(window.localStorage.getItem('words'))[index]
        
        if(ganadorLength.length > 0) return
        if(background.length > 4 && colorSaved !== 'W'){
            const newTurno = turno === 'azul' ? 'rojo' : 'azul'
            changeTurno()
            setSelectPalabra('')
            setBackground('card')
            restarPuntos(newTurno)  
            return
        }
        if(background.length > 4 && colorSaved === 'W'){
            changeTurno()
            setSelectPalabra(wordSaved)
            setBackground('card')  
            return
        }

        if(colorSaved === 'R'){
            aumentarPuntos('rojo',1)
            setBackground('card R')
            setSelectPalabra(wordSaved)
            changeTurno()
            return
        }
        if(colorSaved === 'A'){
            aumentarPuntos('azul',1)
            setBackground('card A')
            setSelectPalabra(wordSaved)
            changeTurno()
            return
        }
        if(colorSaved === 'W'){
            setBackground('card W')
            setSelectPalabra(wordSaved)
            changeTurno()
            return
        }
        setBackground('card Z')
        const ganador = turno === 'azul'? 'rojo' : 'azul'
        setSelectPalabra(wordSaved)
        aumentarPuntos(ganador,8)
        return
        
    }

    const change = async()=>{
        if(ganadorLength.length > 0) return
        await changeOneWord(index)
    }

    if(isGuia === false){
        return (
            <>
                <section className={background}>
                    <div className="card-i">
                        <button className="card-i-b"><i className="material-icons card-i-b-t">i</i></button>    
                    </div>
                    <div className="card-t" onClick={pintar}>
                    <h5>{palabra}</h5>
                    </div>
                </section>
            </>
        )
    }

    return (
        <>
         <section className={background}>
                    <div className="card-i">
                        <button className="card-i-b" onClick={change}><i className="material-icons card-i-b-t">autorenew</i></button>    
                    </div>
                    <div className="card-t">
                    <h5>{palabra}</h5>
                    </div>
                </section>
        </>
    )

    
}