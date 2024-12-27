import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import {
  Card,
  CardContent,
  //   CardDescription,
  //   CardFooter,
} from '@/components/ui/card'

// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'

const chartData = [{ month: 'January', uptime: 90, downtime: 10 }]

const chartConfig = {
  uptime: {
    label: 'Uptime',
    color: '#4299E1', // Blue for Uptime
  },
  downtime: {
    label: 'Downtime',
    color: '#E53E3E', // Red for Downtime
  },
} satisfies ChartConfig

export function UptimeOverview({ kycProvider }: { kycProvider: string }) {
  //   const totalPercentage = chartData[0].uptime + chartData[0].downtime

  return (
    <Card className='col-span-1 h-96 gap-0 p-0 pb-0 lg:col-span-4'>
      <CardContent className='px-4 pt-8'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto flex aspect-square h-64 w-full max-w-[400px] items-center justify-center'
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius={120}
            outerRadius={140}
            width={600}
            height={300}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle'>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className='font-geist-mono fill-foreground text-3xl font-extrabold'
                        >
                          {chartData[0].uptime}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 16}
                          className='font-geist-mono fill-muted-foreground text-sm'
                        >
                          {kycProvider} Uptime
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey='uptime'
              stackId='a'
              cornerRadius={5}
              fill={chartConfig.uptime.color}
              className='stroke-transparent stroke-2'
            />
            <RadialBar
              dataKey='downtime'
              fill={chartConfig.downtime.color}
              stackId='a'
              cornerRadius={5}
              className='stroke-transparent stroke-2'
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <div className='flex w-full flex-col items-center justify-center gap-2 p-12 py-0 text-sm'>
        <div className='flex w-full flex-col items-center justify-center gap-2'>
          <div className='flex w-full justify-between'>
            <div className='flex items-center gap-2'>
              <span
                className='h-2 w-2 rounded-full'
                style={{ backgroundColor: chartConfig.uptime.color }}
              ></span>
              <span className='text-muted-foreground'>Uptime</span>
            </div>
            <span className='font-geist-mono'>{chartData[0].uptime}%</span>
          </div>
          {/* <span className='text-muted-foreground'>|</span> */}
          <Separator />
          <div className='flex w-full justify-between'>
            <div className='flex items-center gap-2'>
              <span
                className='h-2 w-2 rounded-full'
                style={{ backgroundColor: chartConfig.downtime.color }}
              ></span>
              <span className='text-muted-foreground'>Downtime</span>
            </div>
            <span className='font-geist-mono'>{chartData[0].downtime}%</span>
          </div>
          {/* <Separator /> */}
        </div>
      </div>
      {/* <CardFooter className='flex flex-col items-center justify-center gap-2 py-0 text-sm outline'>
      </CardFooter> */}
      {/* <CardDescription className='outline'>Hi</CardDescription> */}
    </Card>
  )
}
