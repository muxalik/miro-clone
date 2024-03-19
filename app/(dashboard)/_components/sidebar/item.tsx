'use client'

import Hint from '@/components/shared/hint'
import { cn } from '@/lib/utils'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import Image from 'next/image'

interface ItemProps {
  id: string
  name: string
  imageUrl: string
}

const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization()
  const { setActive } = useOrganizationList()

  const isActive = organization?.id === id

  const onClick = () => {
    if (!setActive) return

    setActive({ organization: id })
  }

  return (
    <Hint label={name} side='right' align='start' sideOffset={16}>
      <button className='w-full aspect-square relative'>
        <Image
          fill
          alt={name}
          src={imageUrl}
          onClick={onClick}
          className={cn(
            'rounded-md cursor-pointer opacity-75 hover:opacity-100 transition',
            isActive && 'opacity-100'
          )}
        />
      </button>
    </Hint>
  )
}

export default Item
