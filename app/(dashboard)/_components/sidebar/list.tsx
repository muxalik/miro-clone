'use client'

import { useOrganizationList } from '@clerk/nextjs'
import Item from './item'

const List = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  if (!userMemberships.data?.length) {
    return null
  }

  return (
    <ul className='space-y-4'>
      {userMemberships.data.map((item) => (
        <li key={item.organization.id}>
          <Item {...item.organization} />
        </li>
      ))}
    </ul>
  )
}

export default List
