
"use client";

import { Table } from "@heroui/react";
import { CalendarDays, DollarSign } from "lucide-react";

const dummySales = [
  {
    id: "sale-001",
    ebookTitle: "The Great Gatsby",
    buyerName: "John Doe",
    purchaseDate: "2026-09-01",
    amount: 7.99,
  },
  {
    id: "sale-002",
    ebookTitle: "To Kill a Mockingbird",
    buyerName: "Sarah Wilson",
    purchaseDate: "2026-09-01",
    amount: 8.49,
  },
  {
    id: "sale-003",
    ebookTitle: "1984",
    buyerName: "Michael Brown",
    purchaseDate: "2026-09-02",
    amount: 6.99,
  },
  {
    id: "sale-004",
    ebookTitle: "Pride and Prejudice",
    buyerName: "Emily Davis",
    purchaseDate: "2026-09-02",
    amount: 9.99,
  },
  {
    id: "sale-005",
    ebookTitle: "The Alchemist",
    buyerName: "David Miller",
    purchaseDate: "2026-09-03",
    amount: 7.49,
  },
  {
    id: "sale-006",
    ebookTitle: "Harry Potter and the Philosopher's Stone",
    buyerName: "Jessica Smith",
    purchaseDate: "2026-09-03",
    amount: 12.99,
  },
  {
    id: "sale-007",
    ebookTitle: "Atomic Habits",
    buyerName: "Robert Johnson",
    purchaseDate: "2026-09-04",
    amount: 10.99,
  },
];

export default function SalesHistory() {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Sales History
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View recent ebook purchases and sales.
        </p>
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <Table aria-label="Sales history table" className="w-full">
          <Table.ScrollContainer className="w-full overflow-x-auto">
            <Table.Content className="min-w-[750px]">
              <Table.Header>
                <Table.Column isRowHeader>
                  Ebook Title
                </Table.Column>

                <Table.Column>
                  Buyer Name
                </Table.Column>

                <Table.Column>
                  Purchase Date
                </Table.Column>

                <Table.Column>
                  Amount
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {dummySales.map((sale) => (
                  <Table.Row key={sale.id}>
                    {/* Ebook Title */}
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                          📚
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-[260px] truncate font-semibold text-gray-900 dark:text-white">
                            {sale.ebookTitle}
                          </p>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* Buyer */}
                    <Table.Cell>
                      <span className="whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {sale.buyerName}
                      </span>
                    </Table.Cell>

                    {/* Purchase Date */}
                    <Table.Cell>
                      <div className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        <CalendarDays className="h-4 w-4" />

                        <span>
                          {sale.purchaseDate}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Amount */}
                    <Table.Cell>
                      <div className="flex items-center gap-1 whitespace-nowrap font-semibold text-green-600 dark:text-green-400">
                        <DollarSign className="h-4 w-4" />

                        <span>
                          {sale.amount.toFixed(2)}
                        </span>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* Summary */}
      <div className="mt-4 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-900">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Sales
          </p>

          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
            {dummySales.length}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Revenue
          </p>

          <p className="mt-1 text-lg font-bold text-green-600 dark:text-green-400">
            $
            {dummySales
              .reduce((total, sale) => total + sale.amount, 0)
              .toFixed(2)}
          </p>
        </div>
      </div>
    </section>
  );
}

