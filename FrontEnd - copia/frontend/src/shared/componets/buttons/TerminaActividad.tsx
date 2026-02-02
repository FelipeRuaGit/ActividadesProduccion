import { Icon } from '@iconify/react'

interface FinishTaskButtonProps {
  onClick: () => void
  size?: number
  color?: string
}

const FinishTaskButton: React.FC<FinishTaskButtonProps> = ({
  onClick,
  size = 20,
  color = '#4CAF50', // verde
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
    >
      <Icon icon="mdi:check-circle-outline" width={size} height={size} style={{ color }} />
    </div>
  )
}

export default FinishTaskButton
