import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Summary from './pages/Summary/Summary'
import History from './pages/History/History'
import AddTransaction from './pages/AddTransaction/AddTransaction'
import ProtectedLayout from './components/ProtectedLayout/ProtectedLayout'
import Login from './components/Login/Login'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Summary />} />
          <Route path='/history' element={<History />} />
          <Route path='/addTransaction' element={<AddTransaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
