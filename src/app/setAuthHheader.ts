
import axios from 'axios';

const setAuthHheader = (token: any) => {
  if (token) {
    axios.defaults.headers.common = {
      'authorization':  token,
      'Content-Type': 'application/json'
    }
  } else {
    delete axios.defaults.headers.common.Authorization
  }
}
export default setAuthHheader