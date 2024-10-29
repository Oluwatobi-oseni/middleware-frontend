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
import { DatePickerWithRange } from '../date-range-picker'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  filterColumn?: string
  data: TData[]
  buttonIcon?: JSX.Element
  buttonText?: string
  showButton?: boolean
  showDateRangePicker?: boolean
  showModalComponent?: boolean
  ModalComponent?: JSX.Element
  onRowClick?: (row: TData) => void
  onButtonClick?: () => void
  inputPlaceHolder?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  buttonIcon,
  buttonText,
  showButton = false,
  showModalComponent = false,
  showDateRangePicker = true,
  onRowClick,
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
        {/* {showModalButton && <ModalComponent />} */}
        {/* sm:w-[50%] md:w-[40%] lg:w-[30%] */}
        <div className='relative w-full max-w-sm'>
          <span className='absolute left-3 top-1/2 -translate-y-1/2 transform'>
            <IconSearch size={16} />
          </span>
          <Input
            type='email'
            placeholder={inputPlaceHolder}
            value={
              (table
                .getColumn(filterColumn || 'name')
                ?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table
                .getColumn(filterColumn || 'name')
                ?.setFilterValue(event.target.value)
            }
            className='w-full pl-8' // padding-left to accommodate icon
          />
        </div>
        <div className='flex items-center space-x-4'>
          {showDateRangePicker && <DatePickerWithRange />}
          {showButton && (
            <Button
              // variant='outline'
              className='px-4 py-2 text-xs'
              onClick={onButtonClick}
            >
              {buttonIcon} {buttonText}
            </Button>
          )}
          {showModalComponent && ModalComponent}
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
                  onClick={() => onRowClick && onRowClick(row.original)}
                  className='cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={`p-4 ${index > 1 ? 'text-center' : ''}`}
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
