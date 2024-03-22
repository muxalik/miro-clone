import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import { MouseEvent } from 'react'

interface FooterProps {
  title: string
  authorLabel: string
  createdAtLabel: string
  isFavorite: boolean
  onClick: () => void
  disabled: boolean
}

const Footer = ({
  title,
  authorLabel,
  createdAtLabel,
  isFavorite,
  onClick,
  disabled,
}: FooterProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    onClick()
  }

  return (
    <div className='relative bg-white p-3'>
      <p className='text-[13px] truncate max-w-[calc(100%-20px)] font-medium'>{title}</p>
      <p className='text-[11px] text-muted-foreground truncate transition-opacity opacity-0 group-hover:opacity-100'>{`${authorLabel}, ${createdAtLabel}`}</p>
      <button
        className={cn(
          'opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3 text-muted-foreground hover:text-blue-600',
          disabled && 'cursor-not-allowed opacity-75'
        )}
        disabled={disabled}
        onClick={handleClick}
      >
        <Star
          className={cn('h-4 w-4', isFavorite && 'fill-blue-600 text-blue-600')}
        />
      </button>
    </div>
  )
}

export default Footer
