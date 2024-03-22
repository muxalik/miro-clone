'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import qs from 'query-string'
import { useRouter } from 'next/navigation'
import { useDebounceValue } from 'usehooks-ts'

const SearchInput = () => {
  const router = useRouter()
  const [value, setValue] = useState('')
  const [debouncedValue] = useDebounceValue(value, 500)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: {
          search: debouncedValue,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    )

    router.push(url)
  }, [router, debouncedValue])

  return (
    <div className='w-full relative'>
      <Search className='absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
      <Input
        placeholder='Search boards'
        className='w-full max-w-[516px] pl-9'
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default SearchInput
