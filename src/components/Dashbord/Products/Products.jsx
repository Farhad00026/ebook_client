import { Table } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export function Products({ products }) {
  const { result, total_product, total_pages, limit, page, skip } = products;

  return (
    <div className="flex flex-col gap-4">
      <Table aria-label="Products table" className="w-full">
        <Table.ScrollContainer>
          <Table.Content className="min-w-[900px]">
            <Table.Header>
              <Table.Column isRowHeader>Product</Table.Column>
              <Table.Column>Description</Table.Column>
              <Table.Column>Price</Table.Column>
              <Table.Column>Quantity</Table.Column>
              <Table.Column>User ID</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {result?.map((product) => (
                <Table.Row key={product._id}>
                  {/* Product */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {product.title}
                        </p>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Description */}
                  <Table.Cell>
                    <p className="max-w-xs truncate text-sm text-gray-600">
                      {product.description}
                    </p>
                  </Table.Cell>

                  {/* Price */}
                  <Table.Cell>
                    <span className="font-semibold">
                      ৳{Number(product.price ?? 0).toLocaleString()}
                    </span>
                  </Table.Cell>

                  {/* Quantity */}
                  <Table.Cell>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        product.quantity > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.quantity}
                    </span>
                  </Table.Cell>

                  {/* User ID */}
                  <Table.Cell>
                    <span className="text-xs text-gray-500">
                      {product.userId}
                    </span>
                  </Table.Cell>

                  {/* Actions */}
                  <Table.Cell>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      <Pagination page={page} totalPages={total_pages} limit={limit} totalProducts={total_product} />
    </div>
  );
}

function Pagination({ page, totalPages, limit, totalProducts }) {
  if (!totalPages || totalPages <= 1) return null;

  const currentPage = Number(page);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const from = (currentPage - 1) * limit + 1;
  const to = Math.min(currentPage * limit, totalProducts);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-4 sm:flex-row">
      <p className="text-sm text-gray-500">
        Showing <span className="font-medium text-gray-900">{from}</span>–
        <span className="font-medium text-gray-900">{to}</span> of{" "}
        <span className="font-medium text-gray-900">{totalProducts}</span> products
      </p>

      <div className="flex items-center gap-1">
        <PageLink
          page={currentPage - 1}
          limit={limit}
          disabled={!hasPrev}
          aria-label="Previous page"
        >
          Prev
        </PageLink>

        {pageNumbers.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-sm text-gray-400">
              …
            </span>
          ) : (
            <PageLink key={p} page={p} limit={limit} active={p === currentPage}>
              {p}
            </PageLink>
          )
        )}

        <PageLink
          page={currentPage + 1}
          limit={limit}
          disabled={!hasNext}
          aria-label="Next page"
        >
          Next
        </PageLink>
      </div>
    </div>
  );
}

function PageLink({ page, limit, active, disabled, children, ...rest }) {
  const base =
    "min-w-9 rounded-lg px-3 py-2 text-center text-sm font-medium transition-colors";

  if (disabled) {
    return (
      <span className={`${base} cursor-not-allowed text-gray-300`} {...rest}>
        {children}
      </span>
    );
  }

  if (active) {
    return (
      <span className={`${base} bg-blue-600 text-white`} {...rest}>
        {children}
      </span>
    );
  }

  return (
    <Link
      href={`?page=${page}&limit=${limit}`}
      className={`${base} text-gray-700 hover:bg-gray-100`}
      {...rest}
    >
      {children}
    </Link>
  );
}

function getPageNumbers(current, total) {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let last;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
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