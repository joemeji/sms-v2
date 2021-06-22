import React from 'react';
import './App.css';
import Header from 'layouts/Header';
import Plan from 'pages/plan';

function App() {
  return (
    <div className="container-fluid p-0">
      <Header />
      <main className="container px-3 py-5">
        <Plan />
      </main>
    </div>
  );
}

export default App;
