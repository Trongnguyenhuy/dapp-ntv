import React, { useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';

const FarmingTable = ()=> {
  const data = useMemo(
    () => [
      { name: 'John', age: 25, country: 'USA' },
      { name: 'Alice', age: 32, country: 'Canada' },
      { name: 'Bob', age: 41, country: 'Australia' },
      // Thêm dữ liệu khác tại đây
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Age', accessor: 'age' },
      { Header: 'Country', accessor: 'country' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useFilters, useSortBy);

  return (
    <div className="container mx-auto">
      <table className="min-w-full bg-white border border-gray-300" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="py-2 px-4 border-b cursor-pointer"
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' ↓' : ' ↑') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td className="py-2 px-4 border-b" {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FarmingTable;
