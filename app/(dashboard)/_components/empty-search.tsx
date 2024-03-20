import Image from 'next/image'

const EmptySearch = () => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <Image src='/empty-search.svg' width={140} height={140} alt='Empty' />
      <h2 className='text-2xl font-semibold mt-6'>No results found!</h2>
      <p className='mt-2 text-muted-foreground text-sm'>
        Try search for something else
      </p>
    </div>
  )
}

export default EmptySearch
