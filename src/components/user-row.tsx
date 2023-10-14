import type { User, StateFunction } from '../types'

export default function UserRow ({ user, index, setUsers, colorRow }: {
  user: User
  index: number
  setUsers: StateFunction<User[]>
  colorRow: boolean
}) {
  const deleteUser = () => {
    setUsers(us => us.filter(f => f.login.uuid !== user.login.uuid))
  }

  return (
    <tr style={{ backgroundColor: colorRow ? index % 2 === 0 ? '#4e4e4e' : '#333333' : undefined }}>
      <td>
        <img style={{ borderRadius: '10px', border: '1px solid gray' }}
          src={user.picture.medium} alt={`User ${user.name.title} avatar`}
        />
      </td>
      <td>{user.name.first}</td>
      <td>{user.name.last}</td>
      <td>{user.location.country}</td>
      <td>
        <button onClick={deleteUser}>Eliminar</button>
      </td>
    </tr>
  )
}
