import Hint from '@/components/shared/hint'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { defaultUserName } from '@/constants'

interface UserAvatarProps {
  src?: string
  name?: string
  fallback?: string
  borderColor?: string
}

const UserAvatar = ({ src, name, fallback, borderColor }: UserAvatarProps) => {
  return (
    <Hint label={name || defaultUserName} side='bottom' sideOffset={18}>
      <Avatar className='h-8 w-8 border-2' style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className='text-xs font-semibold'>
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  )
}

export default UserAvatar
