import { Button } from '@/components/ui/button'
import Image from 'next/image'

const EmptyBoards = () => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <Image src='/note.svg' width={110} height={110} alt='Empty' />
      <h2 className='text-2xl font-semibold mt-6'>Create a new board!</h2>
      <p className='mt-2 text-muted-foreground text-sm'>
        Start by creating a board for your organization
      </p>
      <div className='mt-6'>
        <Button size='lg'>Create board</Button>
      </div>
    </div>
  )
}

export default EmptyBoards
