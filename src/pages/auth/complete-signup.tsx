import { QRCodeSVG } from 'qrcode.react'
import { Button } from '@/components/custom/button'
import { Card } from '@/components/ui/card'
import { SelectSeparator } from '@/components/ui/select'

import SetupKeyInput from './components/setup-key'
import { useOtpAuth } from '@/lib/invites/hook'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function CompleteRegistration() {
  const onboardingToken = sessionStorage.getItem('onboardingToken')
  const { data, isLoading } = useOtpAuth(onboardingToken as string)

  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
  }, [])
  const handleContinue = () => {
    navigate('/sign-in')
  }

  if (!onboardingToken || (!isLoading && !data)) {
    navigate('/sign-in')
    return null
  }

  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
          <div className='mb-4 flex items-center justify-center'>
            <img
              src='https://alertmfb.com.ng/Logo.svg'
              alt='AlertLogo'
              className='h-20 w-20'
            />
          </div>
          <Card className='mx-auto mt-4 max-w-md  p-6'>
            <h2 className='mb-2 text-center text-lg font-bold'>
              Complete 2FA Signup
            </h2>

            <p className='mb-4 text-center text-sm'>
              To enable authentication, scan the QR code below with your
              authenticator app.
            </p>
            {/* <div className='mb-4 flex items-center justify-center'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <IconInfoCircleFilled className='ml-1 h-6 w-6 cursor-pointer' />
                  </TooltipTrigger>
                  <TooltipContent side='top' className='w-50 p-2'>
                    <img
                      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABPlBMVEX///8ac+jqQzU0qFP7vAQYXbcVoUHz+fXy9v0AZ+YAX73eRUDrQzP7uQD7uAAXp1YAbefvug0AZubpNSTpOyvpMBzpOSkYXLgXWroGbuf97+774d/4ysfsWk/+7sfL3fn+8tX62tjtZ13wgXn50tDrTUD//fX+677B1vj7vxQmeumnxPWHr/Fjme794J3/+uzb6PuYuvP8x0Hs8/3U4/oZZ84Za9U8hOs1q0233cBGr2G1zvZxvoTk8ufK59H1rqnyk4zvdGvzoJr2ubXoKBD81Xf8xkP924v8zFg5gur94qn81XH80GBroO9Pjuyfv/R7kafUqzZOb5y0nFYvZauSjHThsClvfIpcle3LpkKFh3kAVL6VzaJct3MAbqMslHMoh4QkfJQvm2ghdpocaagqjX0mgY0ul26XzqPsVEgH01anAAAIMUlEQVR4nO2beVfbRhTFkZFiO5VdBS/ghWAImwkBEpLihizGhEI20iZpuqSkbbrm+3+ByouILc28mdGM0KPn/c7JHznHVubypHffuyJTUwRBEARBEARBEARBEARBEARBEARBEARBEARBJMHqdmttrbWtdY3dnfX1u7uGDmSY1tEdu+hjf3McV+TO7VMr71Pb27xr9GwmaJ0UCvaIgn0UR2Nu0/Jq1hDPu7Vj/IxabNnn+gYa29eVL7Gw4Vlj1Go3EzhnbI6KdojCmuIl1vNWiPxmImeNxXFEoG0X1aq4MBMW6Eu8ndB5lbnOEOhXcVXhEjkvKtCyZhYSO7MabZZAu/BC4RK3aiyF1kZiZ1Ziq8BUaBfk79OFyEM4aqk4ug27hD53pC+xxy6hZT1N8NzStDgl9Iv4TPISN5lPYZ8aBld8xlVot+WMP7fBE4jjNn3OV1g4krrCJreEVg2DJ57wFdp2S+ICO3yBVu1W0seX4AQQWDiRuADHKfAofAHVsCge3qLj2rjClxegQMQxpNC+Jvz+HiDQ8jAMbmugwuKW4Os3oRJa3vqFaIDZhgT6wONpDngI+6BY98EH0S48B7/8EmikSB5Df6hhrhaf79MW8N0d8B618hhGmilREcHx9BS8SZGU0H8SYYXAeLoP3qOWh+Ip7AMbht3mNZvcU1ggBqsYsspdoIZFPOZ87zZcQiT774A1uNnY7B1jF9Rn5TF44Tng+M1zDIFT/HjBGmD4a/BQYovxnbuwU3jIYu8jdceAncLDsBmOsw03m2LUMfbhEm6gcYoAXuIWEHEMfnQxKOGrNETAXIOfxLBjANFFHxQhWwh4i7KLk46xKxhIUTlFgMAxJgMNKLpA5xQB27DtT0TgvJB7xAy6NjNE4BjjgQY35B6AzikCVkGBduFzoMEPuYekKALmGXyfnkfgQMjdJ48h6OZwBy5iEIHDTlE7TVUDzHWB7bcGn9qB0ycPy3tRJoJUaugYAqfAEl2wacE1HETgYMjtgyR94iEKNPyPCKILrE4RIAg0iltTrwQ7RS5tCSKAF6YDsoJ4bT9tAWJgx7C/vbxOEQBH4N/NgW6fRxZdsAEd4/WcA5UQt1MEQBH4mznH+QooIfo2M4TvGO23s44zy28zeEJuAVzH+N4voePc4ynEFHLD8CLwd85sXyHvScQZXbDhBBo/DErIKyLS6IINOwL/aSSQ02xql8IpApiBxutzhVdZbQb7QDoJKwJ/895xgCLiC7lhohF4e9RmHHazwRhyw7TDEn+eGxMYbTZ7aR94SFaetWuTvHvvTBBuM/s5eZIR9/CXs+krKnw5QefD7KTCcLPx8tLMzFinxv9TzaOzK51pDTq/zjkhgPFUTM3Ln5qcD7IPrujI6/N2NqyQ5RhKIvPmFpHsmVb9+iX8LVJCzSL28fYMGUz2TLeA0/edSAn546lCGffMNJ0HuhWc7vzOKCGwY8hX0civEH+t/QxOf2QKNFBEK28guMre1xY4HXYKU83G56n+fapfQoZTGGs2Jor4QL+EUacI4Acasuj/Mn9WWx/TKcw1G0v3Nn2ofZPeBwQaaDbav0b8SFdh5w9QoXYRtcMdbYU8pzDVbFJX2PmT22aG6DpGXveNseZz2PlLUELtImo/h7q9lO8UAbqOoW35Wn7Y+VtYQs1mY+A/t2nNNB+ZO0UYHYUGZhqduVTgFCaKaGAu1Shi5x8pgTrNxsRuobMfipwiILZjmNkPY+/4Ek6hWURTO37snEaqzQyJV0FTOU3MrI0TXbCJ0WxMZm1TsfJS0UCqVUTTeWmfh/8qZt4f5q4qcM+bGcTZY3+4f00k8x6h8N5i+QslVpqpv7dQZb7sqlD+lPaBVXlcyqhRepz2kdWor7iKCt1MPe1DK9GtKgrMZKrdtA+twqK6QF/iYtrHVuCgHENh+SDtY8vTrMQQmMlUmmkfXBrlNjPEvTSO0VN1ioBSL+2jy1GPd4/2qVwOx7gRp80MKd9I+/AyLMYvoV/Ey+AYS2AJ3QzYhcpLaR9fzCHcZqoNeBgoHaYtQMgnsEb+fA3P5PgdA3aKwfkFPwPkjtEog8cfTC3wxOOWG2mLAIGdYjR5wlMrbsdYhtvMqDwN2DBLyymrgICd4nwDhLdHzI5xCD9hK8FMJkgAKngdwxU5RQBsmq6bogYQ+OZz58c+Og/+LLAGGvUn0KknG4igJT3BuWMITOAg/oeR0ITLElr9BEtkCWOgAT9akWFMMN7NM/+NVBEM1JnIF+A1Cl8Erm5xsuaJhRhjiuQAhISGoM2wwglB3FHCFWjAzb/KXhcEdUflGIKVj/NaqQ43G1QReMy1XSIQQELs6EUY6iChDrcZYD4RzEElLI4hiC6ghRZ2DCyBRgPu+hUoWdL57sUBl1Dg3ALHQFHEOrjZu1X4WaqXwG+7GJ5EuFsI+yHch1FsUT3oPpPYgsCtq4ohAQcfQ4m5BJyHUDyI0EgqdUDwAhiGU+iAVZluD71vQ6Gwy1coueN1+c2mLHeFZOGnu7J7OpAPoHhhyr/JpI/H/yFJ3eaJw2v3Cm9YeOMpksiNVwGFt2S8CBzFTTrF+yUvJStjm6q7ktiZ1VhmvbBwlZY79nj6BM270h5jLFE8HeunVMEwso3oVUIlcJVjpGb0Et0kjhqXw/L4g+RWV9Tvr+WV6rjGchlJlwloHJRGB3TdktuNs9bVu27wNLrV0gEKJ5xgsTtfrZQqFXepF3dtrfeW3Ip/jep8F1fgfU59sdls6G3l9UazuYhhsScIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiCI/yX/AQSZDonGuylrAAAAAElFTkSuQmCC'
                      alt='Authenticator'
                      className='mx-auto my-2 h-8'
                    />
                  </TooltipContent>
                </Tooltip>
              </div> */}

            {/* <div
              className='mb-4 flex flex-col items-center justify-center gap-6 rounded-md border p-4 shadow-md'
              style={{
                filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
              }}
            > */}
            <div className='flex flex-col items-center justify-center gap-4'>
              {data && data.otpauth && (
                <QRCodeSVG
                  size={180}
                  value={data.otpauth}
                  // value={'34'}
                  // fgColor='#000000'
                  // bgColor='#ffffff'
                />
              )}

              <Button
                className='mx-auto w-[180px]'
                onClick={handleContinue}
                loading={isLoading}
              >
                Continue
              </Button>
            </div>
            {/* </div> */}

            <div className='mt-4 flex items-center'>
              {/* <hr className='flex-grow' />
              <span className='text-xs'>OR Enter setup key manually</span>
              <hr className='flex-grow' /> */}
            </div>
            <div className='mt-2 text-center text-sm'>
              {/* <div className='mx-auto my-2 flex w-full max-w-sm'> */}
              {data && <SetupKeyInput setupKey={data.setupKey as string} />}
              <SelectSeparator />

              <p className='rounded-md border-l-4 border-blue-500 bg-muted p-2 text-sm font-medium '>
                Use the setup key to manually onboard your account in an
                authenticator app if you encounter issues scanning the QR code.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
