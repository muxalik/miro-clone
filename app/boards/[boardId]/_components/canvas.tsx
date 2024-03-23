'use client'

import { useState } from 'react'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import { CanvasMode, CanvasState } from '@/types/canvas'
import { useCanRedo, useCanUndo, useHistory } from '@/liveblocks.config'

interface CanvasProps {
  boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })

  const history = useHistory()
  const canRedo = useCanRedo()
  const canUndo = useCanUndo()

  return (
    <main className='w-full h-screen relative touch-none bg-neutral-100'>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  )
}

export default Canvas
