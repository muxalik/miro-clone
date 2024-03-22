'use client'

import { defaultBoardTitle } from '@/constants'
import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import { useMutation } from 'convex/react'
import { Plus } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

interface NewBoardButtonProps {
  orgId: string
  disabled?: boolean
}

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const create = useMutation(api.board.create)
  const [isPending, startTransition] = useTransition()

  const onClick = () => {
    startTransition(() => {
      create({
        title: defaultBoardTitle,
        orgId,
      })
        .then(() => toast.success('Board created'))
        .catch(() => toast.error('Failed to create board'))
    })
  }

  return (
    <button
      disabled={isPending || disabled}
      onClick={onClick}
      className={cn(
        'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6 transition-colors',
        (isPending || disabled) && 'opacity-75 hover:bg-blue-600 cursor-not-allowed'
      )}
    >
      <div />
      <Plus className='h-12 w-12 text-white stroke-1' />
      <p className='text-sm text-white font-light'>New Board</p>
    </button>
  )
}

export default NewBoardButton
