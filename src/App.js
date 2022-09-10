import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ChatWindow from './components/ChatWindow/index';
import NewUser from './components/EnterPage';
import ProtectiveRoute from "./components/ProtectiveRoute"

import SomethingNew from "./components/SomethingNew/index"

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route exact path="/login" element={<NewUser />}></Route>
        {/* <ProtectiveRoute exact path='/' element={<ChatWindow />}></ProtectiveRoute> */}
        <Route
          path="/"
          element={
            // Good! Do your composition here instead of wrapping <Route>.
            // This is really just inverting the wrapping, but it's a lot
            // more clear which components expect which props.
            <ProtectiveRoute redirectTo="/login">
              <ChatWindow />
            </ProtectiveRoute>
          }

        />
        <Route path='/something/new' element={<SomethingNew />}></Route>
        
      </Routes>

    </BrowserRouter>
  );
}

export default App;
