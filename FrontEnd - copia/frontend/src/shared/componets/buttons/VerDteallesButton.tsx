import { Icon } from '@iconify/react'

interface ViewDetailButtonProps {
  onClick: () => void
  size?: number
  color?: string
}

const ViewDetailButton: React.FC<ViewDetailButtonProps> = ({
  onClick,
  size = 20,
  color = '#1976D2', // azul
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
    >
      <Icon icon="mdi:eye-outline" width={size} height={size} style={{ color }} />
    </div>
  )
}

export default ViewDetailButton
