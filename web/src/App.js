import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Widgets from './pages/index'
import WidgetForm from './pages/form'
import WidgetShow from './pages/show'

import { connect } from 'react-redux'
import { path } from 'ramda'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <header className="pa4 bg-blue white-60">
            <h1>Boat Parts Shop - {this.props.count || null}</h1>
            <nav>
              <Link className="white" to="/">Widgets</Link>
              |
              <Link className="white" to="/new">New Widget</Link>
            </nav>
          </header>
          <main className="pa4">
            <Route exact path="/" component={Widgets} />
            <Route path="/new" component={WidgetForm} />
            <Route path="/widgets/:id" component={WidgetShow} />

          </main>
        </div>
      </BrowserRouter>
    );
  }
}

const connector = connect(state => {
  return {
    count: path(['widgets','length'], state)
  }
})

export default connector(App)
