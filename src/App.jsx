import './App.css'
import Form from './components/form'
import Navbar from './components/navbar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Responses from './components/responses';

function App() {
  

  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Form/>} />
          <Route path="/responses" element={<Responses/>} />
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
