import { DataTable } from '@/components/table/data-table'
import { columns as POSColumns } from './POS/columns'
import { data as POSData } from './POS/data'
import { AssignPOS } from './POS/assign-pos-modal'
// import { IconWashMachine } from '@tabler/icons-react'
import { Lock, CreditCard, DollarSign, ShoppingCart } from 'lucide-react'

const POSOptions = [
  { name: 'Alert POS', link: '/pos/alert', icon: Lock, disabled: true },
  {
    name: 'ErrandPay',
    link: '/products/pos/errandpay',
    icon: CreditCard,
    disabled: false,
  },
  {
    name: 'Pay Cliq',
    link: '/products/pos/paycliq',
    icon: DollarSign,
    disabled: false,
  },
  {
    name: 'Grupp',
    link: '/products/pos/grupp',
    icon: ShoppingCart,
    disabled: false,
  },
]

function StatCard({
  icon: Icon,
  label,
  link,
  disabled,
}: {
  icon: React.ComponentType
  label: string
  link?: string
  disabled?: boolean
}) {
  return (
    <a
      href={disabled ? undefined : link}
      className={`flex flex-col justify-center rounded-lg border border-l-0 border-t-0 px-4 py-6 transition ${
        disabled
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer hover:bg-gray-100'
      }`}
    >
      <div className='flex flex-row items-center justify-start space-x-4'>
        <div className='flex items-center justify-center rounded-full bg-muted p-4'>
          <Icon />
        </div>
        <div>
          <div className='font-geist-mono text-2xl font-bold sm:text-lg'>
            {label}
          </div>
          <p className='text-xs text-muted-foreground'>POS Terminal</p>
        </div>
      </div>
    </a>
  )
}

export default function PosPage() {
  return (
    <div className='h-auto w-full overflow-y-auto hide-scrollbar'>
      <div className='flex justify-end'>
        <AssignPOS />
      </div>

      {/* Statistics Grid */}
      <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {POSOptions.map((pos) => (
          <StatCard
            key={pos.name}
            icon={pos.icon}
            label={pos.name}
            link={pos.link}
            disabled={pos.disabled}
          />
        ))}
      </div>

      {/* POS Data Table */}
      <DataTable
        columns={POSColumns}
        data={POSData}
        inputPlaceHolder='Search...'
        filterColumn='posName'
        showButton
        buttonText='Export'
        showDateRangePicker={true}
      />
    </div>
  )
}
