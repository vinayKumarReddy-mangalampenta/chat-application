import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ChatWindow from './components/ChatWindow/index';
import Login from './components/Login/index';
import ProtectiveRoute from "./components/ProtectiveRoute"
import HomePage  from './components/Homepage';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route exact path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <ProtectiveRoute redirectTo="/login">
              <HomePage />
            </ProtectiveRoute>
          }

        />
          <Route
          path="/group"
          element={
            <ProtectiveRoute redirectTo="/login">
              <ChatWindow />
            </ProtectiveRoute>
          }

        />
        {/* <Route exact path="/realtime/chat" element={<Messenger />}></Route> */}

      </Routes>

    </BrowserRouter>
  );
}

export default App;
