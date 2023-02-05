import { useMemo } from "react";
import { useTable, usePagination } from "react-table";

const Table = ({ DATA, COLUMNS }) => {
  const data = useMemo(() => DATA, [DATA]);
  const columns = useMemo(() => COLUMNS, [COLUMNS]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      usePagination
    );
  return (
    <table {...getTableProps()} className="table-auto">
      <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {headerGroups.map((headerGroup, headerGroupIDX) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIDX}>
            {headerGroup.headers.map((column, headerColumnIDX) => (
              <th
                {...column.getHeaderProps()}
                key={headerColumnIDX}
                className="text-center"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIDX) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              key={rowIDX}
              className={
                rowIDX % 2 == 0
                  ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
              }
            >
              {row.cells.map((cell, cellIDX) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    key={`${rowIDX}-${cellIDX}`}
                    className="text-center"
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
