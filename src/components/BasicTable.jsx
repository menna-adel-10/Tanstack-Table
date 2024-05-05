import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { useMemo } from "react"
import mData from '../data.json'
import {DateTime} from 'luxon'

export default function BasicTable() {

    const data = useMemo(() => mData, [])

    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
            footer: 'ID'
        },
        {
            header: 'Name',
            accessorFn: row => `${row.first_name} ${row.last_name}`,
        },
        // {
        //     header: 'First name',
        //     accessorKey: 'first_name',
        //     footer: 'first name'
        // },
        // {
        //     header: 'Last name',
        //     accessorKey: 'last_name',
        //     footer: 'last name'
        // },
        {
            header: 'Gender',
            accessorKey: 'gender',
            footer: 'Gender'
        },
        {
            header: 'Date of Birth',
            accessorKey: 'dob',
            footer: 'Date of Birth',
            cell: info =>
                DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
                
        },
    ]

    const table = useReactTable({data, columns, getCoreRowModel: getCoreRowModel(),})
  return (
      <div className="w3-container">
          <table className="w3-table-all">
              <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                          <th key={header.id}>
                              {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                              )}
                          </th>
                      ))}
                      
                  </tr>
              ))}
              
              </thead>
              <tbody>
                  {table.getRowModel().rows.map(row => (
                      <tr key={row.id}>
                          {row.getVisibleCells().map(cell => (
                              <td key={cell.id}>
                                  {flexRender(cell.column.columnDef.cell,
                                      cell.getContext()
                                  )}
                              </td>
                          ))}
                      </tr>
                  ))}
                  
              </tbody>
          </table>
    </div>
  )
}
