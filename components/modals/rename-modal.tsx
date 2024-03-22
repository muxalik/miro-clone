'use client'

import useRenameModal from '@/store/use-rename-modal'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { SyntheticEvent, useEffect, useState, useTransition } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { toast } from 'sonner'

const RenameModal = () => {
  const { isOpen, onClose, initialValues } = useRenameModal()
  const [title, setTitle] = useState(initialValues.title)
  const rename = useMutation(api.board.update)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues.title])

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    startTransition(() => {
      rename({
        id: initialValues.id as Id<'boards'>,
        title,
      })
        .then(() => {
          toast.success('Board renamed')
          onClose()
        })
        .catch(() => toast.error('Failed to rename board'))
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title</DialogDescription>
        <form onSubmit={onSubmit} className='space-y-4'>
          <Input
            disabled={isPending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Board title'
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' disabled={isPending} variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type='submit'>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RenameModal
