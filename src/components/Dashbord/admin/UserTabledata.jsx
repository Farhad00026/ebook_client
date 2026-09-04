
"use client";

import { Avatar, Button, Table } from "@heroui/react";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const dummyUsers = [
  {
    id: "admin-001",
    name: "Admin",
    email: "admin@fable.com",
    emailVerified: true,
    image: "",
    createdAt: "2026-09-01T10:00:00.000Z",
    role: "admin",
  },
  {
    id: "user-002",
    name: "John Doe",
    email: "john@example.com",
    emailVerified: true,
    image: "",
    createdAt: "2026-08-25T10:30:00.000Z",
    role: "user",
  },
  {
    id: "user-003",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    emailVerified: true,
    image: "",
    createdAt: "2026-08-20T14:15:00.000Z",
    role: "writer",
  },
  {
    id: "user-004",
    name: "Michael Brown",
    email: "michael@example.com",
    emailVerified: true,
    image: "",
    createdAt: "2026-08-15T09:45:00.000Z",
    role: "user",
  },
];

export function UserTabledata({ products = [] }) {
  const [users, setUsers] = useState(
    products.length > 0 ? products : dummyUsers
  );

  // Edit handler
  const handleEdit = (user) => {
    console.log("Edit user:", user);

    // Later you can open an edit modal here
    toast.success(`Edit user: ${user.name}`);
  };

  // Delete handler
  const handleDelete = (user) => {
    const confirmDelete = toast.success(`Delete user: ${user.name}`);

    if (!confirmDelete) return;

    setUsers((previousUsers) =>
      previousUsers.filter(
        (item) => (item._id || item.id) !== (user._id || user.id)
      )
    );
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <Table className="w-full">
        <Table.ScrollContainer className="w-full overflow-x-auto">
          <Table.Content
            aria-label="Users table"
            className="min-w-[1000px] w-full"
          >
            {/* Header */}
            <Table.Header>
              <Table.Column isRowHeader>User</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Joined</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>

            {/* Body */}
            <Table.Body>
              {users.length > 0 ? (
                users.map((user) => {
                  const userId = user._id || user.id;

                  return (
                    <Table.Row key={userId}>
                      {/* User */}
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={user.image || undefined}
                            name={user.name || "User"}
                            alt={user.name || "User"}
                            className="h-10 w-10 shrink-0"
                          />

                          <div className="min-w-0">
                            <p className="truncate font-semibold text-gray-900 dark:text-white">
                              {user.name || "Unknown User"}
                            </p>

                            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                              ID: {userId}
                            </p>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* Email */}
                      <Table.Cell>
                        <span className="whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {user.email || "No email"}
                        </span>
                      </Table.Cell>

                      {/* Role */}
                      <Table.Cell>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                              : user.role === "writer"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {user.role || "user"}
                        </span>
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell>
                        {user.emailVerified ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            Unverified
                          </span>
                        )}
                      </Table.Cell>

                      {/* Created At */}
                      <Table.Cell>
                        <span className="whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          {user.createdAt
                            ? new Date(
                                user.createdAt
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "N/A"}
                        </span>
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            aria-label={`Edit ${user.name}`}
                            onPress={() => handleEdit(user)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            variant="flat"
                            aria-label={`Delete ${user.name}`}
                            onPress={() => handleDelete(user)}
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
                    No users found.
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

