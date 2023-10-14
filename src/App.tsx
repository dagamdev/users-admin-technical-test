import './App.css'
import { useRef, useMemo, useState, useEffect, type ChangeEvent } from 'react'
import UsersList from './components/users-list'
import { customApiFetch } from './utils/services'
import type { APIResults, SortedBy, User } from './types'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [colorRow, setColorRow] = useState(false)
  const [sortBy, setSortBy] = useState<SortedBy>()
  const originalUsers = useRef<User[]>([])

  useEffect(() => {
    customApiFetch<APIResults>('?results=40').then(data => {
      if (typeof data.results === 'object') {
        setUsers(data.results)
        originalUsers.current = data.results
      }
    }).catch(e => { console.error(e) })
  }, [])

  const sortedUsers = useMemo(() => {
    return sortBy !== undefined
      ? users.toSorted((a, b) => {
        return sortBy === 'name'
          ? a.name.first.localeCompare(b.name.first)
          : sortBy === 'country'
            ? a.location.country.localeCompare(b.location.country)
            : a.name.last.localeCompare(b.name.last)
      })
      : users
  }, [users, sortBy])

  const toggleColor = () => {
    setColorRow(cr => !cr)
  }

  const toggleSortByCountry = () => {
    setSortBy(st => st === undefined ? 'country' : undefined)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setUsers(originalUsers.current.filter(f => f.location.country.toLowerCase().includes(value.toLowerCase())))
  }

  return (
    <>
      <h1>Lista de usuarios</h1>
      <header>
        <button onClick={toggleColor}>Pintar filas</button>
        <button onClick={toggleSortByCountry}>{sortBy === 'country' ? 'Desordenar' : 'Ordenar por país'}</button>
        <button onClick={handleReset}>Resateblecer usuarios</button>
        <input onChange={handleChange} type='search' placeholder='Buscar por país' />
      </header>
      <UsersList users={sortedUsers} setUsers={setUsers} colorRow={colorRow} setSortBy={setSortBy} />
    </>
  )
}

export default App
