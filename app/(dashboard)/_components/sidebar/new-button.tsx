'use client'

import Hint from '@/components/shared/hint'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CreateOrganization } from '@clerk/nextjs'
import { Plus } from 'lucide-react'

const NewButton = () => {
  return (
    <Dialog>
      <div className='aspect-square'>
        <DialogTrigger asChild>
          <Hint
            label='Create organization'
            side='right'
            align='start'
            sideOffset={16}
          >
            <button className='bg-white/25 size-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition'>
              <Plus className='text-white' />
            </button>
          </Hint>
        </DialogTrigger>
        <DialogContent className='p-0 bg-transparent border-none max-w-[480px]'>
          <CreateOrganization />
        </DialogContent>
      </div>
    </Dialog>
  )
}

export default NewButton
