import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem } from '../components'
import { map } from 'ramda'

import { connect } from 'react-redux'

import { all } from '../model'

class Buzzwords extends React.Component {
  componentDidMount () {
     this.props.getBuzzwords()
  }
  render() {
    const props = this.props
    const li = buzzword => {
      return (
        <ListItem key={buzzword.id}
          title={buzzword.name}
          linkUrl={`/buzzwords/${buzzword.id}` }
          linkDescription="Details"
        ></ListItem>
      )
    }
    return (
      <div>
        <div className="cf">
        <Link to="/buzzwords/new" className="link pa2 ma2 ba br2 fr">New Buzzword</Link>
        </div>
        <ul className="list">
         { map(li, props.buzzwords) }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => state
const mapActionsToProps = (dispatch) => {
  return {
    getBuzzwords: () => all().then(buzzwords => {
      dispatch({type:'SET_BUZZWORDS', payload: buzzwords})
    })
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Buzzwords)
