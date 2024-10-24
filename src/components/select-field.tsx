import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select' // Adjust import path as needed
import {
  IconCalendar,
  IconClock,
  IconCalendarWeek,
  IconCalendarMonth,
  IconCalendarTime,
} from '@tabler/icons-react'

interface DateRangeSelectProps {
  dateRange: string
  setDateRange: (value: string) => void
}

const DateRangeSelect: React.FC<DateRangeSelectProps> = ({
  dateRange,
  setDateRange,
}) => {
  return (
    <Select value={dateRange} onValueChange={setDateRange}>
      <SelectTrigger className='w-48'>
        <SelectValue>
          <div className='flex items-center gap-2'>
            <IconCalendar size={18} />
            <span>{dateRangeLabel(dateRange)}</span>{' '}
            {/* Display selected range */}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent align='end'>
        <SelectItem value='last_day'>
          <div className='flex items-center gap-4'>
            <IconClock size={16} />
            <span>Last Day</span>
          </div>
        </SelectItem>
        <SelectItem value='last_week'>
          <div className='flex items-center gap-4'>
            <IconCalendarWeek size={16} />
            <span>Last Week</span>
          </div>
        </SelectItem>
        <SelectItem value='last_month'>
          <div className='flex items-center gap-4'>
            <IconCalendarMonth size={16} />
            <span>Last Month</span>
          </div>
        </SelectItem>
        <SelectItem value='last_year'>
          <div className='flex items-center gap-4'>
            <IconCalendarTime size={16} />
            <span>Last Year</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

// Utility function to display the label based on the selected value
const dateRangeLabel = (value: string) => {
  switch (value) {
    case 'last_day':
      return 'Last Day'
    case 'last_week':
      return 'Last Week'
    case 'last_month':
      return 'Last Month'
    case 'last_year':
      return 'Last Year'
    default:
      return 'Select Range'
  }
}

export default DateRangeSelect
