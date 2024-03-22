import { Skeleton } from '@/components/ui/skeleton'

const Info = () => {
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      TODO: INFO ABOUT THE BOARD
    </div>
  )
}

Info.Skeleton = function () {
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md h-12 flex items-center shadow-md w-[300px]'>
      <Skeleton className='size-full bg-gray-200 animate-pulse' />
    </div>
  )
}

export default Info
