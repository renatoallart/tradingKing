import { useState, useEffect } from "react"
import { finnHub } from "../apis/finnHub"
import { useWatchListContext } from "../context/WatchStockList"

export function Search() {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])
  const { addStock } = useWatchListContext()

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        })
        if (isMounted) setResults(response.data.result)
      } catch (error) {
        console.log(error)
      }
    }

    if (search.length > 0) fetchData()
    setResults([])
    return () => (isMounted = false)
  }, [search])

  function handleSearch(event) {
    const { value } = event.target
    setSearch(value)
  }

  function renderDropdownMenu() {
    const isShowDropdown = search ? "show" : null

    return (
      <ul
        style={{
          height: "500px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
        className={`dropdown-menu ${isShowDropdown}`}
      >
        {results.map((result) => (
          <li
            onClick={() => {
              addStock(result.symbol, setSearch(""))
            }}
            className="dropdown-item"
            key={result.symbol}
          >
            {result.description} {result.symbol}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          onChange={(event) => handleSearch(event)}
          autoComplete="off"
          className="form-control"
          id="search"
          type="text"
          name="search"
          value={search}
          placeholder="Search"
          style={{ backgroundColor: "rgba(145,158,171,0.04)" }}
        />
        <label htmlFor="search">Search</label>
        {renderDropdownMenu()}
      </div>
    </div>
  )
}
