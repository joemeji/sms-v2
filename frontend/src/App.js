import React from 'react';
import './App.css';
import Header from 'layouts/Header';
import Plan from 'pages/plan';
import Student from 'pages/student';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid p-0">
        <Header />
        <main className="container px-3 py-5">
        <Switch>
          <Route path="/plan" component={Plan} />
          <Route path="/student" component={Student} />
        </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
