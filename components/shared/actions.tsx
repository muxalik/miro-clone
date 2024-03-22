'use client'

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import { ReactNode, useState, useTransition } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Link2, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import ConfirmModal from './confirm-modal'
import useRenameModal from '@/store/use-rename-modal'

interface ActionsProps {
  children: ReactNode
  side?: DropdownMenuContentProps['side']
  sideOffset?: DropdownMenuContentProps['sideOffset']
  id: string
  title: string
}

const Actions = ({ children, side, sideOffset, id, title }: ActionsProps) => {
  const remove = useMutation(api.board.remove)
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const { onOpen } = useRenameModal()

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/boards/${id}`)
      .then(() => toast.success('Link copied'))
      .catch(() => toast.error('Failed to copy link'))
  }

  const onRename = () => {
    onOpen(id, title)
  }

  const onDelete = () => {
    setOpen(false)

    startTransition(() => {
      remove({ id: id as Id<'boards'> })
        .then(() => toast.success('Board deleted'))
        .catch(() => toast.error('Failed to delete board'))
    })
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-60'
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
      >
        <DropdownMenuItem
          className='px-3 py-2 cursor-pointer'
          onSelect={onCopyLink}
        >
          <Link2 className='w-4 h-4 mr-2' />
          <span>Copy board link</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='px-3 py-2 cursor-pointer'
          onSelect={onRename}
        >
          <Pencil className='w-4 h-4 mr-2' />
          <span>Rename</span>
        </DropdownMenuItem>
        <ConfirmModal
          header='Delete board?'
          description='This will permanently delete the board and all of its contents.'
          disabled={isPending}
          onConfirm={onDelete}
        >
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className='px-3 py-2 cursor-pointer'
          >
            <Trash2 className='w-4 h-4 mr-2' />
            <span>Delete</span>
          </DropdownMenuItem>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Actions
