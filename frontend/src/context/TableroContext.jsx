import { createContext,useContext, useEffect, useState } from "react";
import { oneWordRequest,wordRequest } from "../api.js"


const TableroContext = createContext()

export const useTableroContext = ()=>{
    const context = useContext(TableroContext)
    if(!context){
        throw new Error('error al crear el contexto, necesita un provedor')
    }
    return context
}


export const TableroProvider = ({children})=>{
    const tableroSaved = window.localStorage.getItem('tablero') ? JSON.parse(window.localStorage.getItem('tablero')) : []
    const wordsSaved = window.localStorage.getItem('words') ? JSON.parse(window.localStorage.getItem('words')) : []

    const [tablero,setTablero] = useState(tableroSaved)
    const [words,setWords] = useState(wordsSaved)
    const [reset,setReset] = useState(0)

    const createTablero = ()=>{
        const total = Array(25).fill('W')
        const validos = Array(25).fill().map((_,i)=> i)
        
        
            for (let index = 0; index < 1; index++) {
                for (let index = 0; index < 8; index++) {
                    let randomNumberRed = Math.floor(Math.random() * validos.length)
                    total[validos[randomNumberRed]] = 'R'
                    validos.splice(randomNumberRed,1)
                }
                for (let index = 0; index < 8; index++) {
                    let randomNumberAzul = Math.floor(Math.random() * validos.length)
                    total[validos[randomNumberAzul]] = 'A'
                    validos.splice(randomNumberAzul,1)
                }
                let randomNumberNegro = Math.floor(Math.random() * validos.length)
                    total[validos[randomNumberNegro]] = 'Z'          
            }
            setTablero(total)

    }

    const catchWord = ()=>{
        const words = JSON.parse(window.localStorage.getItem('words'))
        setWords(words)
    }

    const resetWords = async()=>{
    const newWords = await wordRequest()
        setWords(newWords)
    }

    const changeOneWord = async(i)=>{
        const word = await oneWordRequest() 
        const newArray = words.map(e=> e)
        newArray.splice(i,1,word)  
        setWords(newArray)
    }

    const resetAll = ()=>{
        setReset(i => i+1)
    }

    useEffect(()=>{
        window.localStorage.setItem('tablero',JSON.stringify(tablero))
    },[tablero])

    useEffect(()=>{
        window.localStorage.setItem('words',JSON.stringify(words))
    },[words])
    
return (
    <TableroContext.Provider value={{
        tablero
        ,catchWord
        ,words
        ,resetWords
        ,resetWords
        ,changeOneWord
        ,createTablero
        ,reset
        ,resetAll
        }}>
        {children}
    </TableroContext.Provider>
)
}