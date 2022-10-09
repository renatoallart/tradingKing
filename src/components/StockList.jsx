import { useEffect, useState } from 'react'
import { finnHub } from '../apis/finnHub'
import { BsFillCaretDownFill} from 'react-icons/bs'
import { BsFillCaretUpFill} from 'react-icons/bs'
import { useWatchListContext } from '../context/WatchStockList'

export function StockList() {
    const [stock, setStock] = useState([])
    const {watchList} = useWatchListContext()


    useEffect(() => {
        let isMounted = true
        async function fetchStock() {
            try {
                const response = await Promise.all(watchList.map(stock => {
                    return finnHub.get(`/quote`, {
                        params: { symbol: stock }
                    })
                }))
                const data = response.map(resp => {
                    return {
                        data: resp.data,
                        symbol: resp.config.params.symbol
                    }
                })
                console.log(data)
                if (isMounted) setStock(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchStock()
        return () => {
            isMounted = false
        }

    }, [watchList])

    function changeColorAndIcon(change, icon){
        if (icon) return change > 0  ? <BsFillCaretUpFill/> : <BsFillCaretDownFill/>
        return change > 0  ? 'success ' : 'danger'
    }

    return (
        <div>
            <table className='table hover mt-5'>
                <thead style={{color:'rgb(79,89,102)'}}>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Last</th>
                        <th scope='col'>Chg</th>
                        <th scope='col'>Chg%</th>
                        <th scope='col'>High</th>
                        <th scope='col'>Low</th>
                        <th scope='col'>Open</th>
                        <th scope='col'>Pclose</th>
                    </tr>
                </thead>
                <tbody>
                    { stock.map(stockData => {
                        return <tr className='table-row' key={stockData.symbol}>
                            <th>{stockData.symbol}</th>
                            <th>{stockData.data.c}</th>
                            <th className={`text-${changeColorAndIcon(stockData.data.d)}`}>{stockData.data.d} {changeColorAndIcon(stockData.data.d,true)} </th>
                            <th className={`text-${changeColorAndIcon(stockData.data.dp)}`}>{stockData.data.dp} {changeColorAndIcon(stockData.data.dp,true)}</th>
                            <th>{stockData.data.h}</th>
                            <th>{stockData.data.l}</th>
                            <th>{stockData.data.o}</th>
                            <th>{stockData.data.pc}</th>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}
