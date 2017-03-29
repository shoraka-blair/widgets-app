import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Widgets from './pages/index'
import WidgetForm from './pages/form'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <header className="pa4 bg-blue white-60">
            <h1>Boat Parts Shop</h1>
            <nav>
              <Link className="white" to="/">Widgets</Link>
              |
              <Link className="white" to="/new">New Widget</Link>
            </nav>
          </header>
          <main className="pa4">
            <Route exact path="/" component={Widgets} />
            <Route path="/new" component={WidgetForm} />

          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
