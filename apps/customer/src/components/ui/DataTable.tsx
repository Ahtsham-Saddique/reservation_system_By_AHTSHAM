"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortable?: boolean;
  loading?: boolean;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  sortable = false,
  loading = false,
  onSort,
  sortKey,
  sortDirection,
  emptyMessage = "No data found",
  emptyIcon,
  className,
}: DataTableProps<T>) {
  const getSortIcon = (key: string) => {
    if (!sortable || sortKey !== key) {
      return "↑↓";
    }
    return sortDirection === "asc" ? "↑" : "↓";
  };

  const handleSort = (key: string) => {
    if (!sortable || !onSort || !columns.find((c) => c.key === key)?.sortable) return;
    const direction =
      sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    onSort(key, direction);
  };

  if (loading) {
    return (
      <div className={cn("overflow-x-auto", className)}>
        <table className="w-full text-left">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="pb-3 text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-t border-gray-100 dark:border-[#1f332b]">
                {columns.map((col) => (
                  <td key={col.key} className="py-4">
                    <div className="h-4 bg-gray-200 dark:bg-[#274238] rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={cn("text-center py-16", className)}>
        {emptyIcon && <div className="text-5xl mb-4">{emptyIcon}</div>}
        <p className="text-gray-500 dark:text-gray-400 font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-left">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "pb-3 text-xs font-black uppercase tracking-wider",
                  "text-gray-500 dark:text-gray-400",
                  col.sortable && sortable && "cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors",
                  col.className
                )}
                onClick={() => handleSort(col.key)}
              >
                <div className="flex items-center gap-1.5">
                  {col.header}
                  {col.sortable && sortable && (
                    <span className="text-xs">{getSortIcon(col.key)}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row._id || row.id || i}
              className="border-t border-gray-100 dark:border-[#1f332b] hover:bg-gray-50/50 dark:hover:bg-[#162620]/40 transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "py-4 text-sm font-medium text-gray-700 dark:text-gray-300",
                    col.className
                  )}
                >
                  {col.render
                    ? col.render(row)
                    : row[col.key]?.toString() ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
