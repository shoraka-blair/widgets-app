import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import BuzzwordForm from './pages/form'
import BuzzwordShow from './pages/show'

import Buzzwords from './pages/index'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <header className="pa4 bg-red white-80">
            <h1>Techno Buzz Words</h1>
          </header>
          <main>
            <Switch>
              <Route path="/buzzwords/new" component={BuzzwordForm} />
              <Route path="/buzzwords/:id/edit" component={BuzzwordForm} />
              <Route path="/buzzwords/:id" component={BuzzwordShow} />
            </Switch>

            <Route exact path="/" component={function (routerProps) {
              return <Buzzwords {...routerProps} />
            }} />
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
