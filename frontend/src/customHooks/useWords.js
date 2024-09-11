import { useState } from "react"
import { oneWordRequest,wordRequest } from "../api.js"



export function useWords(){
    const [words,setWords] = useState([])

    const changeWords = (words)=>{
        setWords(words)
    }

    const resetWords = async()=>{
        
    // const newWords = await wordRequest()
        const newWords = Array(25).fill().map((_,i)=> i+1)
        setWords(newWords)
    }

    const changeOneWord = async(i,words)=>{
         // const word = await oneWordRequest() 
        const word = 'hola'
        setWords((prevArray)=>{
            const newArray = prevArray.map(e=> e)
            newArray.splice(i,1,word)    
            return newArray
        })
    }

    return {words,resetWords,changeWords,changeOneWord}
}
