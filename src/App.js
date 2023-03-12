
import FilmList from './film/FilmList';
import ActorList from './film/ActorList';
import Menu from './Menu';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilmDetails from './film/FilmDetails';
import SearchFilm from './film/SearchFilm';
import Rental from './film/Rental';
import GuessGame from './games/GuessGame';
import Login from './Login';
import { useState } from 'react';
import InvestmentCalculator from './games/InvestmentCalculator';

function App() {

  let [loggedin, setLoggedin] = useState(false);
  let [role, setRole] = useState('user');

  if(! loggedin){
    return <Login doAuth={setLoggedin} doRole={setRole}/>
  }

  return (
    <Router>
      <Menu logout={setLoggedin} role={role}/>
      <Routes>
        <Route path='/investment' element={<InvestmentCalculator/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<FilmList/>}></Route>
        <Route path='/actors/list' element={<ActorList/>}></Route>
        <Route path='/films/details/:id' element={<FilmDetails/>}></Route>
        <Route path='/films/search' element={<SearchFilm/>}></Route>

        {
          role === 'ADMIN' && (
            <>
            <Route path='/rental/search' element={<Rental/>}></Route>
            <Route path='/guess/game' element={<GuessGame/>}></Route>
            </>
          )
        }
        
      </Routes>
    </Router>
  );
}

export default App;
