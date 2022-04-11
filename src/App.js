import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/Login'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import SearchMovies from './components/SearchMovies'



function App() {

  return (
<div>
 <Router>
    <Routes>
      
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/search" element={<SearchMovies />}/>
    </Routes>
  </Router>


    </div>
  );
}

export default App;
