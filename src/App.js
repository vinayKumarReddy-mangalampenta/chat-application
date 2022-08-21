import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ChatWindow from './components/ChatWindow/index';
import NewUser from './components/EnterPage';




function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<NewUser  />}></Route>
        <Route path='/chat' element={<ChatWindow  />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
