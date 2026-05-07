import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Summary from './pages/Summary/Summary'
import History from './pages/History/History'
import AddTransaction from './pages/AddTransaction/AddTransaction'
import Sidebar from './components/Sidebar/Sidebar'

const App = () => {

  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path='/history' element={<History />} />
        <Route path='/addTransaction' element={<AddTransaction />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
