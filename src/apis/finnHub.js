import axios from 'axios'



export  const finnHub = axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params:{
        token: 'cd0oguqad3ibhpvq2aj0cd0oguqad3ibhpvq2ajg'
    }
})


