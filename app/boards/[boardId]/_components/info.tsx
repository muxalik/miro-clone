'use client'

import Actions from '@/components/shared/actions'
import Hint from '@/components/shared/hint'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import useRenameModal from '@/store/use-rename-modal'
import { useQuery } from 'convex/react'
import { Menu } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

interface InfoProps {
  boardId: string
}

const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal()

  const data = useQuery(api.board.get, {
    id: boardId as Id<'boards'>,
  })

  if (!data) {
    return <InfoSkeleton />
  }

  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      <Hint label='Go to boards' side='bottom' sideOffset={10}>
        <Button asChild variant='board' className='px-2'>
          <Link href='/'>
            <Image src='/logo.svg' alt='Board logo' height={40} width={40} />
            <span
              className={cn(
                'font-semibold text-xl ml-2 text-black',
                poppins.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label='Edit title' side='bottom' sideOffset={10}>
        <Button
          variant='board'
          className='text-base font-medium px-2'
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data._id} title={data.title} side='bottom' sideOffset={10}>
        <div>
          <Hint label='Board actions' side='bottom' sideOffset={10}>
            <Button variant='board' size='icon'>
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  )
}

const TabSeparator = () => {
  return <div className='text-neutral-300 px-1.5'>|</div>
}

export const InfoSkeleton = () => {
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md h-12 flex items-center shadow-md w-[300px]'>
      <Skeleton className='size-full bg-gray-200 animate-pulse' />
    </div>
  )
}

export default Info
