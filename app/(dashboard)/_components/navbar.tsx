import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import SearchInput from './search-input'
import InviteButton from './invite-button'

const Navbar = () => {
  return (
    <div className='flex items-center gap-x-4 p-5'>
      <div className='hidden lg:flex flex-1'>
        <SearchInput />
      </div>
      <div className='block flex-1 lg:hidden'>
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                maxWidth: '376px',
              },
              organizationSwitcherTrigger: {
                padding: '6px',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                justifyContent: 'space-between',
                backgroundColor: 'white',
              },
            },
          }}
        />
      </div>
      <InviteButton />
      <UserButton />
    </div>
  )
}

export default Navbar
