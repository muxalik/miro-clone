'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useOthers, useSelf } from '@/liveblocks.config'
import UserAvatar from './user-avatar'
import { defaultUserName } from '@/constants'
import { connectionIdToColor } from '@/lib/utils'

const MAX_SHOWN_USERS = 2

const Participants = () => {
  const users = useOthers()
  const currentUser = useSelf()
  const hasMoreUsers = users.length > MAX_SHOWN_USERS

  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
      <div className='flex gap-x-2'>
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
          <UserAvatar
            borderColor={connectionIdToColor(connectionId)}
            key={connectionId}
            src={info?.picture}
            name={info?.name}
            fallback={info?.name?.[0] || defaultUserName[0]}
          />
        ))}
        {!!currentUser && (
          <UserAvatar
            key='me'
            borderColor={connectionIdToColor(currentUser.connectionId)}
            src={currentUser.info?.picture}
            name={currentUser.info?.name}
            fallback={currentUser.info?.name?.[0]}
          />
        )}
        {hasMoreUsers && (
          <UserAvatar
            key='more'
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  )
}

export const ParticipantsSkeleton = () => {
  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md flex items-center shadow-md w-[100px]'>
      <Skeleton className='size-full bg-gray-200' />
    </div>
  )
}

export default Participants
