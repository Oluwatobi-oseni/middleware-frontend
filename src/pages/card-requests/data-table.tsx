import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { CircleCheck, ListFilter, MoreHorizontal } from 'lucide-react'
// import {
//   CardRequestData,
//   useBulkApproveRequest,
//   useGetBranches,
// } from '@/resources/requests/functions'
// import { useUser } from '@/lib/auth/hooks'

import { CardRequestData } from './columns'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [dialogDisplay, setDialogDisplay] = useState(false)

  // const { role } = useUser()
  // const { data: branches } = useGetBranches(role)

  const role: string | "head_office" = 'hop'
  const branches = ["ebutte-metta", "ikeja"]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  const selectedIds = () => {
    const requests: CardRequestData[] = table
      .getSelectedRowModel()
      .rows?.map(({ original }) => original) as CardRequestData[]

    const pendingRequests = requests.filter(
      (request) => request.status === 'pending'
    )

    return pendingRequests.map((request) => request.id)
  }

  const selected = selectedIds()

  // const bulkApprove = useBulkApproveRequest()
  const approve = () => {
    if (selected.length === 0) {
      alert('You have no pending application(s) selected!')
      return
    }

    // bulkApprove.mutate({
    //   ids: selected,
    // })

    console.log('approved', selected)
  }

  return (
    <div>
      <div className="w-full flex items-center justify-between py-4 flex-1 flex-wrap">
        <Input
          placeholder="Search account number..."
          value={
            (table.getColumn('accountNumber')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('accountNumber')?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-white"
        />

        <div className="flex items-center gap-2 mt-6 lg:mt-0">
          <div className="flex items-center gap-1">
            {branches && (
              <Select
                onValueChange={(value) =>
                  value !== 'all'
                    ? table.getColumn('branch')?.setFilterValue(value)
                    : table.getColumn('branch')?.setFilterValue('')
                }
              >
                <SelectTrigger className="w-[180px] flex items-center bg-white">
                  <div className="flex items-center gap-1">
                    <ListFilter className="w-4" />
                    <SelectValue placeholder="Branch" className="" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>select</SelectLabel>
                    <SelectItem value="all">Branch</SelectItem>
                    {branches.map((branch, id) => (
                      <SelectItem
                        value={branch}
                        key={id}
                        className="capitalize"
                      >
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            <Select
              onValueChange={(value) =>
                value !== 'both'
                  ? table.getColumn('card_scheme')?.setFilterValue(value)
                  : table.getColumn('card_scheme')?.setFilterValue('')
              }
            >
              <SelectTrigger className="w-[180px] flex items-center bg-white">
                <div className="flex items-center gap-1">
                  <ListFilter className="w-4" />
                  <SelectValue placeholder="Scheme" className="" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectLabel>select</SelectLabel>
                  <SelectItem value="both">Scheme</SelectItem>
                  <SelectItem value="verve">Verve</SelectItem>
                  <SelectItem value="afrigo">Afrigo</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {role !== 'head_office' && (
              <Select
                onValueChange={(value) =>
                  value !== 'both'
                    ? table.getColumn('status')?.setFilterValue(value)
                    : table.getColumn('status')?.setFilterValue('')
                }
              >
                <SelectTrigger className="w-[180px] flex items-center bg-white">
                  <div className="flex items-center gap-1">
                    <ListFilter className="w-4" />
                    <SelectValue placeholder="Status" className="" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectLabel>select</SelectLabel>
                    <SelectItem value="both">Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table className="bg-white">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {columns && columns[0].id === 'select' && (
        <div className="flex flex-col gap-3">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>

          {table.getSelectedRowModel().rows.length > 0 && (
            <div className="flex items-center gap-3 text-xs">
              <div className="font-semibold">With Selected:</div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <div className="border p-1 rounded-md">
                      <MoreHorizontal className="w-5 h-5" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-blue-800 font-semibold flex items-center gap-1"
                    onClick={() => setDialogDisplay(true)}
                  >
                    <CircleCheck className="w-4" />
                    Approve
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialog open={dialogDisplay} onOpenChange={setDialogDisplay}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You are about to approve {selected.length} application(s).
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={approve}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
