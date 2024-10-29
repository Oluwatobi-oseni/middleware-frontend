const header = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div>
      <h3 className='text-[18px] text-lg font-semibold'>{title}</h3>
      <p className='text-sm text-muted-foreground'>{desc}</p>
    </div>
  )
}

export default header
