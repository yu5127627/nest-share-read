import service from './config'

const request = ({ method, url, data, headers }) => {
  headers = headers || {
    'Content-Type': 'application/json'
  }
  method = method.toLocaleLowerCase() || 'GET'
  return service({
    method,
    url,
    data,
    headers
  })
}

export default request
