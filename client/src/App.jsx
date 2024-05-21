

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Main from './Components/Main/Main'
import { Toaster } from 'react-hot-toast'
import SavedPassword from "./Components/Main/SavedPassword"
import PrivateRoute from "./Components/PrivateRoute"

function App() {

  return (

    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="" element={<PrivateRoute/>}>
          <Route path="/savedPasswords" element={<SavedPassword />} />
        </Route>

      </Routes>
    </Router>

  )
}

export default App
