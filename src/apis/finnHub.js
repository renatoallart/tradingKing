import axios from "axios"

export const finnHub = axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: import.meta.env.VITE_FINNHUB_TOKEN,
  },
})
