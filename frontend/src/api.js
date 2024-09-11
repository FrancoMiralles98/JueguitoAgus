export const wordRequest = async()=>{
    try {
        const peticion = await fetch('https://random-word-api.herokuapp.com/word?lang=es&number=25&length=6',{
            method:'GET'
        })
        const word = await peticion.json()
        return word
    } catch (error) {
        console.log('error de fetching de datos');
        
    }
}

export const oneWordRequest = async()=>{
    try {
        const peticion = await fetch('https://random-word-api.herokuapp.com/word?lang=es&number=1&length=6',{
            method:'GET'
        })
        const word = await peticion.json()
        return word
    } catch (error) {
        console.log('error de fetching de datos');
        
    }
}