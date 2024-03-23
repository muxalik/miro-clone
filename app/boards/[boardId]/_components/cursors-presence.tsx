'use client'

import { useOthersConnectionIds } from '@/liveblocks.config'
import { memo } from 'react'
import Cursor from './cursor'

const Cursors = () => {
  const ids = useOthersConnectionIds()

  return (
    <>
      {ids.map((id) => (
        <Cursor key={id} connectionId={id} />
      ))}
    </>
  )
}

const CursorsPresence = memo(() => {
  return (
    <>
      <Cursors />
    </>
  )
})

export default CursorsPresence
