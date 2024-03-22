import Canvas from './_components/canvas'

interface BoardPageProps {
  params: {
    boardId: string
  }
}

const BoardPage = ({ params }: BoardPageProps) => {
  return (
    <div>
      <Canvas boardId={params.boardId} />
    </div>
  )
}

export default BoardPage
