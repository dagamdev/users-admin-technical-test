import UserRow from './user-row'
import type { User, StateFunction, SortedBy } from '../types'

export default function UsersList ({ users, setUsers, colorRow, setSortBy }: {
  users: User[]
  setUsers: StateFunction<User[]>
  colorRow: boolean
  setSortBy: StateFunction<SortedBy | undefined>
}) {
  const handleClick = (sortedType: SortedBy) => {
    setSortBy(st => st === sortedType ? undefined : sortedType)
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Foto</th>
          <th className='pointer' onClick={() => { handleClick('name') }}>Nombre</th>
          <th className='pointer' onClick={() => { handleClick('last_name') }}>Apellido</th>
          <th className='pointer' onClick={() => { handleClick('country') }}>País</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {
          users.map((u, i) => <UserRow key={u.login.uuid} user={u} index={i} colorRow={colorRow} setUsers={setUsers} />)
        }
      </tbody>
    </table>
  )
}
