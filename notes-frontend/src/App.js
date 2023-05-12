import logo from './logo.svg';
import './App.css';
import NotesView from './components/NotesView';
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';
import AddView from './components/AddView'
import EditView from './components/EditView'
import { createContext } from 'react';

function App() {
  let dataContext = createContext([]);

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NotesView/>}/>
          <Route path='/add' element={<AddView/>}/>
          <Route path='/edit' element={<EditView/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
