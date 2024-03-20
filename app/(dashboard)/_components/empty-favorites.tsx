import Image from 'next/image'

const EmptyFavorites = () => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <Image src='/empty-favorites.svg' width={140} height={140} alt='Empty' />
      <h2 className='text-2xl font-semibold mt-6'>No favorite boards!</h2>
      <p className='mt-2 text-muted-foreground text-sm'>
        Try favoriting a board
      </p>
    </div>
  )
}

export default EmptyFavorites
