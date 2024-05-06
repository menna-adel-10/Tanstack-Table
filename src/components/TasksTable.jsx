import { useState } from "react"
import DATA from "../data"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Box } from "@chakra-ui/react"

const columns = [
    {
        accessorKey: 'task',
        header: 'Task',
        cell: (props) => <p>(props.getValue())</p>
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: (props) => <p>(props.getValue()?.name)</p>
    },
    {
        accessorKey: 'due',
        header: 'Due',
        cell: (props) => <p>(props.getValue()?.toLocaleTimeString())</p>
    },
    {
        accessorKey: 'notes',
        header: 'Notes',
        cell: (props) => <p>(props.getValue())</p>
    },
]

export default function TasksTable() {
    const [data, setData] = useState(DATA)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: "onChange"
    });

  return (
      <Box>
          <Box className="table" w={table.getTotalSize()}>
              {table.getHeaderGroups().map((headerGroup) => (
                  <Box className="tr" key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                          <Box className="th" w={header.getSize()} key={header.id}>
                              {header.column.columnDef.header}
                              <Box
                                  onMouseDown={header.getResizeHandler()}
                                  onTouchStart={header.getResizeHandler()}
                                  className={`resizer ${
                                  header.column.getIsResizing() ? "isResizing" : ""
                                  }`}
                              />  
                          </Box>
                      ))}
                  </Box>
              ))}
              {table.getRowModel().rows.map((row) => (
                  <Box className="tr" key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                          <Box className="td" w={cell.column.getSize()} key={cell.id}>
                              {flexRender(cell.column.columnDef.cell,
                                  cell.getContext()
                              )}
                          </Box>
                      ))}
                  </Box>
              ))}
          </Box>
    </Box>
  )
}
