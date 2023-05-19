import React, { useMemo } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table';
import { BsFilter } from "react-icons/bs";
import { BsSortAlphaDown} from "react-icons/bs";
import { BsSortAlphaUpAlt} from "react-icons/bs";
import SearchBar from '../Search/SearchBar';


const FarmingTable = () => {
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
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useFilters, useSortBy);
  const { globalFilter } = state;
  return (
    <div className="container mx-auto">
      <SearchBar globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <table className="min-w-full border border-gray-800" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="py-2 px-4 border border-gray-800 cursor-pointer"
                >
                  <div className='flex flex-row justify-between'>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? (<BsSortAlphaUpAlt className='text-2xl'/>) : (<BsSortAlphaDown className='text-2xl'/> )) : (<BsFilter className='text-2xl'/>)}
                  </span>
                  </div>
                  
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
                  <td className="py-2 px-4 border border-gray-800" {...cell.getCellProps()}>
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
