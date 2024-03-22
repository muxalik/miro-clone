'use client'

import { Button } from '@/components/ui/button'
import Icons from '@/components/ui/icons'
import { defaultBoardTitle } from '@/constants'
import { api } from '@/convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

const EmptyBoards = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const create = useMutation(api.board.create)
  const { organization } = useOrganization()

  const onClick = () => {
    if (!organization) return null

    startTransition(() => {
      create({
        title: defaultBoardTitle,
        orgId: organization.id,
      })
        .then((id) => {
          toast.success('Board created')
          router.push(`/boards/${id}`)
        })
        .catch(() => toast.error('Failed to create board'))
    })
  }

  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <Image src='/note.svg' width={110} height={110} alt='Empty' />
      <h2 className='text-2xl font-semibold mt-6'>Create a new board!</h2>
      <p className='mt-2 text-muted-foreground text-sm'>
        Start by creating a board for your organization
      </p>
      <div className='mt-6'>
        <Button onClick={onClick} size='lg' disabled={isPending}>
          {isPending && <Icons.spinner className='animate-spin mr-2 h-6 w-6' />}
          <span>{isPending ? 'Creating...' : 'Create board'}</span>
        </Button>
      </div>
    </div>
  )
}

export default EmptyBoards
