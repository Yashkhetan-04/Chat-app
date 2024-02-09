import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './components/Chat'
import SignUp from './components/SignUp'
import Login from './components/Login'
import SetAvatar from './components/SetAvatar'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<Chat/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/setAvatar' element={<SetAvatar/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
