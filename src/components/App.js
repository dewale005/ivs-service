// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from "react";
import { Route, Routes, Link } from "react-router-dom";

import Chat from "./chat/Chat";
import Emoggy from "./chat/Emoggy";
import Quiz from "./chat/Quiz";

function App() {
  return (
    <div className="App full-width full-height">
      <ul class="nav">
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
      </ul>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/emoggy" element={<Emoggy />} />
      </Routes>
    </div>
  );
}

export default App;
