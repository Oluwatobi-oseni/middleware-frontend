import { useNavigate } from 'react-router-dom'

export const RowLink = ({ path, name }: { path: string; name: string }) => {
  const navigate = useNavigate()
  return (
    <span
      onClick={() => navigate(path)} // Navigate to the user's profile
      className='cursor-pointer text-blue-600 hover:underline'
    >
      {name}
    </span>
  )
}
