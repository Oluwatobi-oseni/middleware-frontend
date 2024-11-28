function WalletCard({
  balance,
  isActive,
}: {
  balance: number
  isActive: boolean
}) {
  return (
    <div className='w-80 rounded-lg border border-muted bg-muted-foreground/5 p-4 shadow-lg'>
      {/* Header: Country and Status */}
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img
            src='https://flagcdn.com/w20/ng.png'
            alt='Nigerian flag'
            className='h-8 w-8 rounded-full' // Circular flag
          />
          <span className='text-lg font-semibold text-muted-foreground'>
            NGN
          </span>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Balance and Fund Badge */}
      <div className='flex items-center justify-between'>
        <div>
          <span className='text-xs font-medium text-muted-foreground'>
            Balance
          </span>
          <p className='text-xl font-bold text-muted-foreground/90'>
            {new Intl.NumberFormat('en-NG', {
              style: 'currency',
              currency: 'NGN',
            }).format(balance)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function WalletCards() {
  const wallets = [{ balance: 250000, isActive: true }]

  return (
    <section className='mt-8'>
      {/* General Header */}
      <h2 className='mt-8 text-xl font-semibold text-muted-foreground'>
        Wallet
      </h2>
      <p className='mb-4 text-sm text-muted-foreground/90'>
        Wallet for Business account
      </p>

      {/* Wallet Cards Grid */}
      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
        {wallets.map((wallet, index) => (
          <WalletCard
            key={index}
            balance={wallet.balance}
            isActive={wallet.isActive}
          />
        ))}
      </div>
    </section>
  )
}
