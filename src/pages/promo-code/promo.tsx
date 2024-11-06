import { Separator } from '@/components/ui/separator'
import { CreateCodeDialog } from './promo-code-dialog'
// import { DataTable } from '@/components/table/data-table'
import { data } from './data'
// import { promoColumns } from './columns'
import { IconGift } from '@tabler/icons-react'
import { DataTable } from '@/components/table/data-table'
import { columns } from './columns'

const promo = () => {
  const hasPromoCodes = data.length > 0
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
      {hasPromoCodes ? (
        <DataTable
          columns={columns}
          data={data}
          inputPlaceHolder='Search Promo Codes'
          filterColumn='codeTitle'
          showButton
          buttonText='Search'
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

export default promo
