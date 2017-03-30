import fetch from 'isomorphic-fetch'

const url = process.env.REACT_APP_API || 'http://localhost:5000'

const post = (buzzword) => fetch(`${url}/widgets`, {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'post',
  body: JSON.stringify(buzzword)
}).then(res => res.json())


const all = () => fetch(`${url}/widgets`).then(res => res.json())

export { post, all }
