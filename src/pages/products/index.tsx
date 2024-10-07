import { useState } from 'react'
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from '@tabler/icons-react'
import { Layout } from '@/components/custom/layout'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import { products } from './data'
import POSModal from './POSModal' // Import the POS modal component

const productText = new Map<string, string>([
  ['all', 'All Products'],
  ['signedIn', 'Signed In'],
  ['notSignedIn', 'Not Signed In'],
])

export default function Apps() {
  const [sort, setSort] = useState('ascending')
  const [productType, setProductType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showPOSModal, setShowPOSModal] = useState(false)

  const filteredProducts = products
    .sort((a, b) =>
      sort === 'ascending'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((product) =>
      productType === 'connected'
        ? product.signedIn
        : productType === 'notConnected'
          ? !product.signedIn
          : true
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <Layout fixed>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <div className='flex w-full items-center justify-between'>
          <Search />
          <div className='flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
      </Layout.Header>

      {/* ===== Content ===== */}
      <Layout.Body className='flex flex-col'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Products Integrations
          </h1>
          <p className='text-muted-foreground'>
            Here&apos;s a list of your products for the integration!
          </p>
        </div>
        <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
          <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
            <Input
              placeholder='Filter products...'
              className='h-9 w-40 lg:w-[250px]'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={productType} onValueChange={setProductType}>
              <SelectTrigger className='w-36'>
                <SelectValue>{productText.get(productType)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Products</SelectItem>
                <SelectItem value='connected'>Signed In</SelectItem>
                <SelectItem value='notConnected'>Not Signed In</SelectItem>
              </SelectContent>
            </Select>
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
          {filteredProducts.map((product) => (
            <li
              key={product.name}
              className='rounded-lg border p-4 hover:shadow-md'
            >
              <div className='mb-8 flex items-center justify-between'>
                <div
                  className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
                >
                  {product.logo}
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    if (product.name === 'POS') {
                      setShowPOSModal(true)
                    } else {
                      // handleSignInOut(app); // Sign in/out logic
                    }
                  }}
                  className={`${product.signedIn ? 'border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900' : ''}`}
                >
                  {product.name === 'POS'
                    ? 'View POS'
                    : product.signedIn
                      ? 'Sign Out'
                      : 'Sign In'}
                </Button>
              </div>
              <div>
                <h2 className='mb-1 font-semibold'>{product.name}</h2>
                <p className='line-clamp-2 text-gray-500'>{product.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </Layout.Body>

      {/* POS Modal  */}
      {showPOSModal && <POSModal onClose={() => setShowPOSModal(false)} />}
    </Layout>
  )
}
