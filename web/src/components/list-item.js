import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = (props) => {
  return (
    <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
        <div className="pl3 flex-auto">
          <span className="f6 db black-70">{props.title}</span>
          <span className="f6 db black-70">{props.description}</span>
        </div>
        <div>
          <Link
            className="f6 link blue hover-dark-gray"
            to={props.linkUrl}>{props.linkDescription}</Link>
        </div>
    </li>
  )
}

ListItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
  linkUrl: React.PropTypes.string.isRequired,
  linkDescription: React.PropTypes.string.isRequired
}

export default ListItem
