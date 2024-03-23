import { Loader } from 'lucide-react'
import { InfoSkeleton } from './info'
import { ParticipantsSkeleton } from './participants'
import { ToolbarSkeleton } from './toolbar'

const Loading = () => {
  return (
    <main className='w-full h-screen relative touch-none bg-neutral-100 flex items-center justify-center'>
      <Loader className='h-6 w-6 text-muted-foreground animate-spin' />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  )
}

export default Loading
