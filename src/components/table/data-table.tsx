import { useState } from 'react'
import { Button } from '../custom/button'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '../ui/input'
import { IconSearch } from '@tabler/icons-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  buttonIcon?: JSX.Element
  buttonText?: string
  showButton?: boolean
  showModalButton?: boolean
  onButtonClick?: () => void
  inputPlaceHolder?: string
  ModalComponent: React.FC
}

export function DataTable<TData, TValue>({
  columns,
  data,
  buttonIcon,
  buttonText,
  showButton = false,
  showModalButton = false,
  onButtonClick,
  inputPlaceHolder,
  ModalComponent,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <>
      <div className='flex items-center justify-between py-4'>
        {showButton && (
          <Button
            variant='outline'
            className='mr-2 px-4 py-4 text-xs'
            onClick={onButtonClick}
          >
            {buttonIcon} {/* Render the passed icon */}
            {buttonText} {/* Render the passed text */}
          </Button>
        )}
        {showModalButton && <ModalComponent />}
        <div className='mb-4 flex items-center rounded-lg border-gray-300 px-2'>
          <IconSearch className='mr-2 text-gray-500' />
          <Input
            placeholder={inputPlaceHolder}
            value={
              (table.getColumn('accountName')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('accountName')?.setFilterValue(event.target.value)
            }
            className='ml-auto w-full max-w-sm border-none text-xs outline-none placeholder:text-xs focus:border-transparent focus:outline-none focus:ring-0 focus-visible:outline-none'
          />
        </div>
      </div>
      {/* TABLE */}
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`px-2 py-3 text-xs uppercase  ${index > 1 ? 'text-center' : ''}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={`${index > 1 ? 'text-center' : ''}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* PAGINATION */}
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  )
}
