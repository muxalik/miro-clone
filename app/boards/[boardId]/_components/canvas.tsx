'use client'

import { useSelf } from '@/liveblocks.config'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'

interface CanvasProps {
  boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf((me) => me.info)

  console.log(info)

  return (
    <main className='w-full h-screen relative touch-none bg-neutral-100'>
      <Info />
      <Participants />
      <Toolbar />
    </main>
  )
}

export default Canvas
