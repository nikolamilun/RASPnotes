import logo from './logo.svg';
import './App.css';
import NotesView from './components/NotesView';
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';
import AddView from './components/AddView'
import EditView from './components/EditView'
import ContextProvider from './hooks/useStateContext';

function App() {
  return (
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<NotesView/>}/>
            <Route path='/add' element={<AddView/>}/>
            <Route path='/edit' element={<EditView/>}/>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
  );
}

export default App;
