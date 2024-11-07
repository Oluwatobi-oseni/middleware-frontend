function WalletCard({
  currency,
  amount,
  isActive,
}: {
  currency: string
  amount: number
  isActive: boolean
}) {
  return (
    <div className='w-64 rounded-lg border border-muted bg-white p-4 text-center shadow-md'>
      {/* Country and Status */}
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <img
            src='https://flagcdn.com/w20/ng.png'
            alt='Nigerian flag'
            className='h-3 w-5'
          />
          <span className='text-xs font-medium text-gray-600'>Nigeria</span>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
        >
          {isActive ? 'ACTIVE' : 'INACTIVE'}
        </span>
      </div>

      {/* Currency and Amount */}
      <div className='text-left'>
        <span className='text-sm font-medium text-gray-500'>{currency}</span>
        <p className='text-xl font-bold text-gray-900'>
          {new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
          }).format(amount)}
        </p>
      </div>
    </div>
  )
}

// Main component with general header for wallet cards section
export default function WalletCards() {
  const wallets = [
    { currency: 'Nigerian Naira', amount: 250000, isActive: true },
    { currency: 'Nigerian Naira', amount: 150000, isActive: true },
    { currency: 'Nigerian Naira', amount: 50000, isActive: false },
  ]

  return (
    <section className='mt-8'>
      {/* General Header */}
      <h2 className='mb-4 mt-8 border-b-2 border-muted pb-2 text-xl text-muted-foreground'>
        Wallet Details
      </h2>

      {/* Wallet Cards Grid */}
      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {wallets.map((wallet, index) => (
          <WalletCard
            key={index}
            currency={wallet.currency}
            amount={wallet.amount}
            isActive={wallet.isActive}
          />
        ))}
      </div>
    </section>
  )
}
