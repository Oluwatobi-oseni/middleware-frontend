import { Separator } from '@/components/ui/separator'
import { AddTeamMemberDialog } from '@/pages/adminstration/AddMemberModal'

interface ContentSectionProps {
  title: string
  desc: string
  children: JSX.Element
  showMemberDialog?: boolean
}

export default function ContentSection({
  title,
  desc,
  children,
  showMemberDialog = false,
}: ContentSectionProps) {
  return (
    <div className='flex flex-1 flex-col overflow-y-auto'>
      <div className='flex flex-none flex-row items-center justify-between'>
        <div>
          <h3 className='text-[18px] text-lg font-semibold'>{title}</h3>
          <p className='text-sm text-muted-foreground'>{desc}</p>
        </div>
        {showMemberDialog && <AddTeamMemberDialog />}
      </div>
      <Separator className='my-4 flex-none' />
      <div className='faded-bottom -mx-4 flex-1 overflow-auto scroll-smooth px-4 md:pb-16'>
        <div className='w-full'>{children}</div>
      </div>
    </div>
  )
}
