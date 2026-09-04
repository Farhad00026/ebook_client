"use client";
import { Table } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

export function Tableadmin({
  products = [],
  page = 1,
  totalPages = 1,
  limit = 10,
  totalProducts = 0,
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Table Wrapper */}
      <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <Table
          aria-label="Products table"
          className="w-full"
        >
          <Table.ScrollContainer className="w-full overflow-x-auto">
            <Table.Content className="min-w-[950px]">
              {/* Header */}
              <Table.Header>
                <Table.Column isRowHeader>
                  Product
                </Table.Column>

                <Table.Column>
                  Writer
                </Table.Column>

                <Table.Column>
                  Genre
                </Table.Column>

                <Table.Column>
                  Description
                </Table.Column>

                <Table.Column>
                  Price
                </Table.Column>

                <Table.Column>
                  Status
                </Table.Column>

                <Table.Column>
                  Actions
                </Table.Column>
              </Table.Header>

              {/* Body */}
              <Table.Body>
                {products.length > 0 ? (
                  products.map((product) => (
                    <Table.Row key={product._id}>
                      {/* Product */}
                      <Table.Cell>
                        <div className="flex min-w-[220px] items-center gap-3">
                          <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-md bg-gray-100">
                            {product.coverImage ? (
                              <Image
                                src={product.coverImage}
                                alt={product.title || "Ebook cover"}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                N/A
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-semibold text-gray-900 dark:text-white">
                              {product.title || "Untitled"}
                            </p>

                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              ID: {product._id}
                            </p>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* Writer */}
                      <Table.Cell>
                        <span className="whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {product.writerName || "Unknown"}
                        </span>
                      </Table.Cell>

                      {/* Genre */}
                      <Table.Cell>
                        <span className="inline-flex whitespace-nowrap rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                          {product.genre || "Uncategorized"}
                        </span>
                      </Table.Cell>

                      {/* Description */}
                      <Table.Cell>
                        <p
                          className="max-w-[250px] truncate text-sm text-gray-600 dark:text-gray-400"
                          title={product.description || ""}
                        >
                          {product.description || "No description"}
                        </p>
                      </Table.Cell>

                      {/* Price */}
                      <Table.Cell>
                        <span className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                          ৳
                          {Number(product.price ?? 0).toLocaleString(
                            "en-BD",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </span>
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell>
                        <span
                          className={`inline-flex whitespace-nowrap items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                            product.status === "Available"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              product.status === "Available"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          />

                          {product.status || "Unknown"}
                        </span>
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => onEdit?.(product)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                          >
                            <Pencil className="h-4 w-4" />
                            <span>Edit</span>
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => onDelete?.(product)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell
                      colSpan={7}
                      className="py-12 text-center"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          No ebooks found
                        </p>

                        <p className="text-sm text-gray-500">
                          There are no products available on this page.
                        </p>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        limit={limit}
        totalProducts={totalProducts}
      />
    </div>
  );
}

/* --------------------------------
   Pagination
-------------------------------- */

function Pagination({
  page,
  totalPages,
  limit,
  totalProducts,
}) {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const currentPage = Number(page) || 1;
  const currentLimit = Number(limit) || 10;
  const total = Number(totalProducts) || 0;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const pageNumbers = getPageNumbers(
    currentPage,
    totalPages
  );

  const from =
    total === 0
      ? 0
      : (currentPage - 1) * currentLimit + 1;

  const to = Math.min(
    currentPage * currentLimit,
    total
  );

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-800 sm:flex-row">
      {/* Results */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing{" "}
        <span className="font-medium text-gray-900 dark:text-white">
          {from}
        </span>
        {" – "}
        <span className="font-medium text-gray-900 dark:text-white">
          {to}
        </span>{" "}
        of{" "}
        <span className="font-medium text-gray-900 dark:text-white">
          {total}
        </span>{" "}
        ebooks
      </p>

      {/* Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-1">
        <PageLink
          page={currentPage - 1}
          limit={currentLimit}
          disabled={!hasPrev}
          aria-label="Previous page"
        >
          Prev
        </PageLink>

        {pageNumbers.map((p, index) =>
          p === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-sm text-gray-400"
            >
              …
            </span>
          ) : (
            <PageLink
              key={p}
              page={p}
              limit={currentLimit}
              active={p === currentPage}
            >
              {p}
            </PageLink>
          )
        )}

        <PageLink
          page={currentPage + 1}
          limit={currentLimit}
          disabled={!hasNext}
          aria-label="Next page"
        >
          Next
        </PageLink>
      </div>
    </div>
  );
}

/* --------------------------------
   Page Link
-------------------------------- */

function PageLink({
  page,
  limit,
  active,
  disabled,
  children,
  ...rest
}) {
  const base =
    "min-w-9 rounded-lg px-3 py-2 text-center text-sm font-medium transition-colors";

  if (disabled) {
    return (
      <span
        className={`${base} cursor-not-allowed text-gray-300 dark:text-gray-700`}
        {...rest}
      >
        {children}
      </span>
    );
  }

  if (active) {
    return (
      <span
        className={`${base} bg-blue-600 text-white`}
        {...rest}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={`?page=${page}&limit=${limit}`}
      className={`${base} text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800`}
      {...rest}
    >
      {children}
    </Link>
  );
}

/* --------------------------------
   Generate Page Numbers
-------------------------------- */

function getPageNumbers(current, total) {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];

  let last;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta &&
        i <= current + delta)
    ) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (last) {
      if (i - last === 2) {
        rangeWithDots.push(last + 1);
      } else if (i - last > 2) {
        rangeWithDots.push("...");
      }
    }

    rangeWithDots.push(i);
    last = i;
  }

  return rangeWithDots;
}

