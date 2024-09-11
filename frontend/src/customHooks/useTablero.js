import { useEffect, useState } from "react";


export const useTablero = ()=>{
    const [tablero,setTablero] = useState([])

    function tableroFunction(){
       const total = Array(25).fill('.')
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
   
           return total
   
   }

   const resetTablero = ()=>{
    setTablero(tableroFunction())
   }

    useEffect(()=>{
        setTablero(tableroFunction())
    },[])

    return {tablero,resetTablero}
}