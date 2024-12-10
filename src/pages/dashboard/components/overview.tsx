import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
  { month: 'July', desktop: 60 },
  { month: 'August', desktop: 180 },
  { month: 'September', desktop: 200 },
  { month: 'October', desktop: 276 },
  { month: 'November', desktop: 310 },
  { month: 'December', desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function Overview() {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <defs>
          <linearGradient id='colorDesktop' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#0040DD' stopOpacity={0.4} />
            <stop offset='100%' stopColor='#0040DD' stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='month'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator='line' />}
        />
        <Area
          dataKey='desktop'
          type='natural'
          fill='url(#colorDesktop)'
          stroke='#0040DD'
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  )
}
