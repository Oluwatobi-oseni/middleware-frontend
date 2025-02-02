import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'

interface UptimeOverviewProps {
  provider: string
  chartData: { name: string; value: number; fill: string }[]
  chartConfig: ChartConfig
}

export function UptimeOverview({
  provider,
  chartData,
  chartConfig,
}: UptimeOverviewProps) {
  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className='col-span-1 h-full gap-0 p-4 lg:col-span-4'>
      <CardContent className='px-4'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto flex h-[300px] w-full max-w-[400px] items-center justify-center'
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
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 16}
                          className='font-geist-mono fill-muted-foreground text-sm'
                        >
                          {provider}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey='value'
              // nameKey='name'
              cornerRadius={5}
              // barSize={15}
              isAnimationActive
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <div className='-mt-8 flex w-full flex-col items-center justify-center gap-2 px-12 text-sm'>
        <div className='flex w-full flex-col items-center justify-center gap-2'>
          <div className='flex w-full justify-between'>
            <div className='flex items-center gap-2'>
              <span
                className='h-2 w-2 rounded-full'
                style={{ backgroundColor: chartConfig.uptime.color }}
              ></span>
              <span className='text-muted-foreground'>{chartData[0].name}</span>
            </div>
            <span className='font-geist-mono'>{chartData[0].value}</span>
          </div>
          <Separator />
          <div className='flex w-full justify-between'>
            <div className='flex items-center gap-2'>
              <span
                className='h-2 w-2 rounded-full'
                style={{ backgroundColor: chartConfig.downtime.color }}
              ></span>
              <span className='text-muted-foreground'>{chartData[1].name}</span>
            </div>
            <span className='font-geist-mono'>{chartData[1].value}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
