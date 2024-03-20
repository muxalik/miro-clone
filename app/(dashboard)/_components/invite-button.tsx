'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { OrganizationProfile, useOrganization } from '@clerk/nextjs'
import { Plus } from 'lucide-react'

const InviteButton = () => {
  const organization = useOrganization()

  if (!organization) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Plus className='h-4 w-4 mr-2' />
          Invite member
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-transparent border-none p-0 max-w-[900px]'>
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  )
}

export default InviteButton
