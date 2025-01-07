import { Separator } from '@/components/ui/separator'
import { CreateCodeDialog } from './promo-code-dialog'
// import { DataTable } from '@/components/table/data-table'
import { usePromoCodeData } from './data'
// import { promoColumns } from './columns'
import { IconGift } from '@tabler/icons-react'
import { DataTable } from '@/components/table/data-table'
import { columns } from './columns'
import { CodeResponse } from '@/lib/promo-code/type'

const Promo = () => {
  const { data, error, isLoading } = usePromoCodeData()

  const sortedData = data
    ? data.sort((a: CodeResponse, b: CodeResponse) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateB.getTime() - dateA.getTime()
      })
    : []
  const hasPromoCodes = data && data.length > 0

  return (
    <>
      <div>
        <p className='text-muted-foreground'>
          Create and manage promo codes for discounts and offers
        </p>
      </div>
      <div className='my-4 flex justify-end'>
        <CreateCodeDialog />
      </div>
      <Separator className='shadow' />
      {isLoading ? (
        <div className='flex flex-grow flex-col items-center justify-center text-center'>
          <p className='text-xl font-semibold'>Loading promo codes...</p>
        </div>
      ) : error ? (
        <div className='flex flex-grow flex-col items-center justify-center text-center'>
          <p className='text-xl font-semibold'>Failed to load promo codes</p>
          <p className='text-muted-foreground'>Please try again later.</p>
        </div>
      ) : hasPromoCodes ? (
        <DataTable
          columns={columns}
          data={sortedData}
          inputPlaceHolder='Search Promo Codes'
          filterColumn='codeTitle'
          showButton
          buttonText='Search'
          showDateRangePicker={false}
        />
      ) : (
        <div className='flex flex-grow flex-col items-center justify-center text-center'>
          <IconGift size={80} className='mb-4 text-muted-foreground' />
          <p className='text-xl font-semibold'>No promo codes yet</p>
          <p className='text-muted-foreground'>
            Promo codes created for users and businesses will appear here.
          </p>
        </div>
      )}
    </>
  )
}

export default Promo
