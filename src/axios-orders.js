import axios from 'axios'

const instance=axios.create({
    baseURL:'https://burger-362fd-default-rtdb.firebaseio.com/'
})
export default instance