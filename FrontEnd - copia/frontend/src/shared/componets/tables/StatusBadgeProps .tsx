import React from 'react'

export interface IStausBadge {
  text: string
  color?: string
  bgcolor?: string
  className?: string
}

const StatusBadge: React.FC<IStausBadge> = ({ text, color = 'white', bgcolor = 'gray', className }) => {
  return (
    <span
      style={{ color, backgroundColor: bgcolor }}
      className={`inline-flex items-center justify-center px-4 py-1 rounded-full text-sm font-medium shadow-sm select-none whitespace-nowrap ${className || ''}`}
    >
      {text}
    </span>
  )
}

export default StatusBadge
