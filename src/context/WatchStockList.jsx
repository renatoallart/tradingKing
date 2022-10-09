import { createContext, useContext, useState } from 'react'

const WatchListContext = createContext()

export function useWatchListContext() {
  return useContext(WatchListContext)
}

export function WatchStockList({ children }) {

  const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN'])

  function addStock(stock) {
    if (watchList.includes(stock)) return
    return setWatchList([...watchList, stock])
  }

  function deleteStock(stockSymbol) {
    setWatchList(oldStock =>
      oldStock.filter(symbol => symbol !== stockSymbol))
  }


  return (
    <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
      {children}
    </WatchListContext.Provider>
  )
}
