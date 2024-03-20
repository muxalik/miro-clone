import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CreateOrganization } from '@clerk/nextjs'
import Image from 'next/image'

const EmptyOrg = () => {
  return (
    <div className='h-full w-full flex items-center flex-col justify-center'>
      <Image
        src='/elements.svg'
        width={200}
        height={200}
        alt='No organization'
      />
      <h2 className='font-semibold text-2xl mt-6'>Welcome to Dashboard</h2>
      <p className='mt-2 text-muted-foreground text-sm'>
        Create an organization to get started
      </p>
      <div className='mt-6'>
        <Dialog>
          <DialogTrigger asChild>
            <Button size='lg'>Create organization</Button>
          </DialogTrigger>
          <DialogContent className='p-0 bg-transparent border-none max-w-[480px]'>
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default EmptyOrg
