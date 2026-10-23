import React from "react";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  emptyMessage = "No records found.",
  className = "",
}: DataTableProps<T>): React.ReactElement {
  return (
    <div className={`w-full overflow-hidden rounded-xl border border-[#E7E3D8] bg-white shadow-xs ${className}`}>
      <div className="w-full overflow-x-auto [scrollbar-width:thin] [scrollbar-color:#D3CDC0_transparent]">
        <table className="w-full text-left text-xs text-[#0F2E24] border-collapse">
          <thead>
            <tr className="bg-[#FAF9F5] border-b border-[#E7E3D8] text-[11px] font-bold text-[#575249] uppercase tracking-wider">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={`px-4 py-3 ${
                    col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                  } ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F1E9]">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-[#787266]">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  className="hover:bg-[#FAF9F5] transition-colors duration-100"
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={`px-4 py-3.5 align-middle ${
                        col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                      } ${col.className || ""}`}
                    >
                      {col.cell
                        ? col.cell(item)
                        : col.accessorKey
                        ? String(item[col.accessorKey] ?? "")
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
