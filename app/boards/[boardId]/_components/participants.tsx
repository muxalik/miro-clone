import { Skeleton } from "@/components/ui/skeleton"

const Participants = () => {
  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
      Participants
    </div>
  )
}

Participants.Skeleton = function () {
  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md flex items-center shadow-md w-[100px]'>
      <Skeleton className="size-full bg-gray-200" />
    </div>
  )
}

export default Participants
