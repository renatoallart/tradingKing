import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Detail } from './pages/Detail'
import { Stock } from './pages/Stock'

export function App() {
  return (
    <main className='container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Stock />} />
          <Route path='/detail/:symbol' element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}
