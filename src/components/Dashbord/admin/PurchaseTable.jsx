
"use client";

import { Button, Table } from "@heroui/react";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

// Dummy purchase data
const dummyPurchases = [
  {
    id: "purchase-001",
    userId: "6a96f153e4789c09032889cc",
    sessionId:
      "a12SUP6LDoico7bFamYMyC9rO2eHjqbNqhm4O2LoWmsDG3BIoLUWX1RlzZ",
    productId: "6a993aee635cd96334c24646",
    title: "To Kill a Mockingbird",
    price: 8.49,
  },
  {
    id: "purchase-002",
    userId: "6a96f153e4789c09032889cd",
    sessionId: "b82KLM7QWxyz123456789",
    productId: "6a993aee635cd96334c24647",
    title: "The Great Gatsby",
    price: 6.99,
  },
  {
    id: "purchase-003",
    userId: "7b87f264f5899d19043990dd",
    sessionId: "c93ABC8RTxyz987654321",
    productId: "6a993aee635cd96334c24648",
    title: "1984",
    price: 9.99,
  },
  {
    id: "purchase-004",
    userId: "8c98g375g690ae29054001ee",
    sessionId: "d74XYZ9LMabc456789012",
    productId: "6a993aee635cd96334c24649",
    title: "The Alchemist",
    price: 7.49,
  },
];

export function PurchaseTable({ products = [] }) {
  const [purchases, setPurchases] = useState(
    products.length > 0 ? products : dummyPurchases
  );

  // View purchase
  const handleView = (purchase) => {
    console.log("Purchase details:", purchase);

   toast.success(`${purchase.title}`)
  };

  // Delete purchase
  const handleDelete = (purchase) => {
    const confirmDelete = toast.success(`${purchase.title}`)

    if (!confirmDelete) return;

    setPurchases((previousPurchases) =>
      previousPurchases.filter(
        (item) => (item._id || item.id) !== (purchase._id || purchase.id)
      )
    );
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <Table className="w-full">
        <Table.ScrollContainer className="w-full overflow-x-auto">
          <Table.Content
            aria-label="Purchase table"
            className="min-w-[1100px] w-full"
          >
            {/* Header */}
            <Table.Header>
              <Table.Column isRowHeader>Ebook</Table.Column>
              <Table.Column>User ID</Table.Column>
              <Table.Column>Product ID</Table.Column>
              <Table.Column>Session ID</Table.Column>
              <Table.Column>Price</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>

            {/* Body */}
            <Table.Body>
              {purchases.length > 0 ? (
                purchases.map((purchase) => {
                  const purchaseId = purchase._id || purchase.id;

                  return (
                    <Table.Row key={purchaseId}>
                      {/* Ebook */}
                      <Table.Cell>
                        <div className="min-w-[180px]">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {purchase.title}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            Purchase ID: {purchaseId}
                          </p>
                        </div>
                      </Table.Cell>

                      {/* User ID */}
                      <Table.Cell>
                        <span className="whitespace-nowrap font-mono text-xs text-gray-600 dark:text-gray-400">
                          {purchase.userId}
                        </span>
                      </Table.Cell>

                      {/* Product ID */}
                      <Table.Cell>
                        <span className="whitespace-nowrap font-mono text-xs text-gray-600 dark:text-gray-400">
                          {purchase.productId}
                        </span>
                      </Table.Cell>

                      {/* Session ID */}
                      <Table.Cell>
                        <span className="block max-w-[250px] truncate font-mono text-xs text-gray-600 dark:text-gray-400">
                          {purchase.sessionId}
                        </span>
                      </Table.Cell>

                      {/* Price */}
                      <Table.Cell>
                        <span className="whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                          ${Number(purchase.price || 0).toFixed(2)}
                        </span>
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            aria-label={`View ${purchase.title}`}
                            onPress={() => handleView(purchase)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            variant="flat"
                            aria-label={`Delete ${purchase.title}`}
                            onPress={() => handleDelete(purchase)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row>
                  <Table.Cell
                    colSpan={6}
                    className="py-10 text-center text-gray-500"
                  >
                    No purchases found.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}

