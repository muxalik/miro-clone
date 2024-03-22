import Room from '@/components/shared/room'
import Canvas from './_components/canvas'
import Loading from './_components/loading'

interface BoardPageProps {
  params: {
    boardId: string
  }
}

const BoardPage = ({ params }: BoardPageProps) => {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  )
}

export default BoardPage
