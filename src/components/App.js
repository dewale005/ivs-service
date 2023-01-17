// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";

import LOGO from '../assets/Dizplai-PRIMARY-Black.png';

import Chat from "./chat/Chat";
import Emoggy from "./chat/Emoggy";
import Quiz from "./chat/Quiz";

function App() {
  return (
    <div className="App full-width full-height">
      <div class="topnav">
      <Link className="nav-link" to="/">
          <img src={LOGO} className="logo" alt="logo" />
        </Link>
        <Link className="nav-link split" to="/chat">
          Chat
        </Link>
        <Link className="nav-link split" to="/quiz">
          Quiz
        </Link>
        <Link className="nav-link split" to="/emoggy">
          Emoggy
        </Link>
      </div>
      {/* <ul class="nav">
        <li class="nav-item">
          <Link className="nav-link active" to="/chat">
            Chat
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/quiz">
            Quiz
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/emoggy">
            Emoggy
          </Link>
        </li>
      </ul> */}
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/emoggy" element={<Emoggy />} />
      </Routes>
    </div>
  );
}

export default App;
