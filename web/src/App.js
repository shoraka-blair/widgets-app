import React, { Component } from 'react';

import WidgetForm from './pages/form'

class App extends Component {
  render() {
    return (
      <div>
        <header className="pa4 bg-blue white-60">
          <h1>Boat Parts Shop</h1>
        </header>
        <main className="pa4">
          <WidgetForm />
        </main>
      </div>
    );
  }
}

export default App;
