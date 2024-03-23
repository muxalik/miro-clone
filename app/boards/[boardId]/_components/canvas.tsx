'use client'

import { PointerEvent, WheelEvent, useCallback, useState } from 'react'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import { Camera, CanvasMode, CanvasState } from '@/types/canvas'
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
} from '@/liveblocks.config'
import CursorsPresence from './cursors-presence'
import { pointerEventToCanvasPoint } from '@/lib/utils'

interface CanvasProps {
  boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })
  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
  })

  const history = useHistory()
  const canRedo = useCanRedo()
  const canUndo = useCanUndo()

  const onWheel = useCallback((e: WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }))
  }, [])

  const onPointerMove = useMutation(({ setMyPresence }, e: PointerEvent) => {
    e.preventDefault()

    const current = pointerEventToCanvasPoint(e, camera)

    setMyPresence({ cursor: current })
  }, [])

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

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
      <svg
        onPointerMove={onPointerMove}
        onWheel={onWheel}
        onPointerLeave={onPointerLeave}
        className='h-screen w-screen'
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}

export default Canvas
