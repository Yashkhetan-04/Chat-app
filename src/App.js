import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { lazy } from 'react';
import { Suspense } from 'react';

const Chat = lazy(()=> import("./components/Chat"));
const SignUp = lazy(()=> import("./components/SignUp"));
const Login = lazy(()=> import("./components/Login"));
const SetAvatar = lazy(()=> import("./components/SetAvatar"));
function App() {
  return (
    <div>
      <BrowserRouter>
      <Suspense fallback={<></>}>
          <Routes>
            <Route path='/' element={<Chat/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/setAvatar' element={<SetAvatar/>} />
          </Routes>
      </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
