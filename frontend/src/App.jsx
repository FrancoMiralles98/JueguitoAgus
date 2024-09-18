import { MainPage } from './page/MainPage.jsx'
import { GuiaPage } from './page/GuiaPage.jsx'
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import { TableroProvider } from './context/TableroContext.jsx'
import { PlayerProvider } from './context/PlayerContext.jsx'

function App() {

  return (
    <>
    <TableroProvider>
      <PlayerProvider>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<MainPage/>}/>
    <Route path='/guia' element={<GuiaPage/>}/>
    </Routes>
    </BrowserRouter>
    </PlayerProvider>
    </TableroProvider>
    </>
  )
}

export default App
