import { Navigate } from 'react-router-dom'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Layout } from '@/components/custom/layout'
import { Separator } from '@/components/ui/separator'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useAuth } from '@/lib/auth/hook'
import { IconAlertTriangleFilled } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectSeparator } from '@/components/ui/select'

type CardProps = React.ComponentProps<typeof Card>

const controlCenterItems = [
  {
    name: 'Alert Savings',
    description: 'Control whether users can access alert savings.',
  },
  {
    name: 'Business Banking',
    description: 'Control whether users can access business banking.',
  },
  {
    name: 'Consumer Banking',
    description: 'Control whether users can access consumer banking.',
  },
  {
    name: 'Card Withdrawal',
    description: 'Control whether users can access card wothdrawal.',
  },
  {
    name: 'POS Features',
    description: 'Control whether users can access POS features.',
  },
  {
    name: 'E-cam',
    description: 'Control whether users can access E-cam features.',
  },
]

// Create a schema dynamically for each control item
const FormSchema = z.object(
  controlCenterItems.reduce(
    (schema, item) => {
      schema[item.name] = z.boolean().default(false)
      return schema
    },
    {} as Record<string, z.ZodDefault<z.ZodBoolean>>
  )
)

export function SwitchForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: controlCenterItems.reduce(
      (defaults, item) => {
        defaults[item.name] = false // Set the default value for each control item
        return defaults
      },
      {} as Record<string, boolean>
    ),
  })

  // Handle form submission
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log('Submitted data:', data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <CardContent className='grid max-h-[55vh] gap-2 overflow-y-auto'>
          {controlCenterItems.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem className='flex items-center space-x-4 rounded-md border p-4'>
                  <div className='flex-1 space-y-1'>
                    <FormLabel className='text-base font-bold'>
                      {item.name}
                    </FormLabel>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </CardContent>
        <CardFooter className='flex gap-4'>
          <Button type='submit'>Submit Changes</Button>
        </CardFooter>
      </form>
    </Form>
  )
}

export default function ControlCenter({ className, ...props }: CardProps) {
  const { isSignedIn } = useAuth()

  // Define the form methods at the top level
  // const formMethods = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: controlCenterItems.reduce(
  //     (defaults, item) => {
  //       defaults[item.name] = false
  //       return defaults
  //     },
  //     {} as Record<string, boolean>
  //   ),
  // })

  // Function to disable all switches and log the result
  // const handleDisableAll = () => {
  //   console.log('Current values before disabling:', formMethods.getValues())

  //   // Reset all switches to false
  //   formMethods.reset(
  //     controlCenterItems.reduce(
  //       (acc, item) => {
  //         acc[item.name] = false
  //         return acc
  //       },
  //       {} as Record<string, boolean>
  //     )
  //   )

  //   console.log('Values after disabling all:', formMethods.getValues())
  // }

  // Early return based on authentication
  if (!isSignedIn) {
    return <Navigate to={'/sign-in'} replace={true} />
  }

  return (
    <Layout fixed>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <h1 className='text-2xl font-bold tracking-tight'>Control Center</h1>
        <div className='ml-auto hidden items-center space-x-4 md:flex'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='flex flex-col'>
        <div className='space-y-0.5'>
          <p className='text-muted-foreground'>
            Use the toggles below to activate or deactivate access to specific
            features.
          </p>
        </div>
        <Separator className='my-4' />

        {/* Switch Form Integration */}
        <div className='flex flex-1 flex-col space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0'>
          <Card className={cn('w-full', className)} {...props}>
            <CardHeader className=''>
              <div className='flex items-center space-x-4'>
                {/* Icon with a subtle background for better prominence */}
                <div className='flex items-center justify-center rounded-full bg-red-100 p-2'>
                  <IconAlertTriangleFilled size={32} color='red' />
                </div>

                {/* Text Content */}
                <div className='space-y-1'>
                  <CardTitle className='text-lg font-semibold text-muted-foreground'>
                    All Controls
                  </CardTitle>
                  <CardDescription className='text-sm text-muted-foreground'>
                    Manage every Product control.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <SelectSeparator />

            {/* Render the SwitchForm */}
            <SwitchForm />
          </Card>
        </div>
      </Layout.Body>
    </Layout>
  )
}
