import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { integrations } from './data'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from '@tabler/icons-react'

export default function ProductList() {
  const [sort, setSort] = useState('ascending')
  // const [productType, setProductType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const filteredIntegrations = integrations
    .sort((a, b) =>
      sort === 'ascending'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((integration) =>
      integration.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  return (
    <>
      <p className='text-muted-foreground'>
        Seamless Integrations to Elevate Your Bank’s Efficiency
      </p>
      <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
        <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
          <Input
            placeholder='Filter integrations...'
            className='h-9 w-40 lg:w-[250px]'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <Select value={productType} onValueChange={setProductType}>
              <SelectTrigger className='w-36'>
                <SelectValue>{productText.get(productType)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Products</SelectItem>
                <SelectItem value='connected'>Signed In</SelectItem>
                <SelectItem value='notConnected'>Not Signed In</SelectItem>
              </SelectContent>
            </Select> */}
        </div>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className='w-16'>
            <SelectValue>
              <IconAdjustmentsHorizontal size={18} />
            </SelectValue>
          </SelectTrigger>
          <SelectContent align='end'>
            <SelectItem value='ascending'>
              <div className='flex items-center gap-4'>
                <IconSortAscendingLetters size={16} />
                <span>Ascending</span>
              </div>
            </SelectItem>
            <SelectItem value='descending'>
              <div className='flex items-center gap-4'>
                <IconSortDescendingLetters size={16} />
                <span>Descending</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Separator className='shadow' />
      <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3'>
        {filteredIntegrations.map((integration) => (
          <a
            href={integration.path}
            target={
              // integration.path === '/integrations/card-request'
              //   ? '_self'
              //   : '_blank'
              returnTarget(integration.path)
            }
            rel={
              // integration.path === '/integrations/card-request'
              //   ? ''
              //   : 'noopener noreferrer'
              returnRel(integration.path)
            }
            key={integration.id}
            className='cursor-pointer rounded-lg border p-4 hover:shadow-md'
          >
            <div className='mb-8 flex items-center justify-between'>
              <div
                className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
              >
                {integration.logo}
              </div>
            </div>
            <div>
              <h2 className='mb-1 font-semibold'>{integration.name}</h2>
              <p className='line-clamp-2 text-xs text-gray-500'>
                {integration.desc}
              </p>
            </div>
          </a>
        ))}
      </ul>
    </>
  )
}

const returnTarget = (path: string): string => {
  switch (path) {
    case '/integrations/card-request':
    case '/integrations/e-cam':
    case '/integrations/workspace':
    case '/integrations/agile':
    case '/integrations/support':
      return '_self'
    default:
      return '_blank'
  }
}

const returnRel = (path: string): string => {
  switch (path) {
    case '/integrations/card-request':
    case '/integrations/e-cam':
    case '/integrations/workspace':
    case '/integrations/agile':
    case '/integrations/support':
      return ''
    default:
      return 'noopener noreferrer'
  }
}
