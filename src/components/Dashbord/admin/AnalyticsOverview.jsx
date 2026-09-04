"use client";
import {
  BarChart3,
  BookOpen,
  DollarSign,
  ShoppingCart,
  Users,
  UserPen,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// -------------------------
// Demo Data
// Replace these with your API data later
// -------------------------

const monthlySales = [
  { month: "Jan", sales: 120 },
  { month: "Feb", sales: 180 },
  { month: "Mar", sales: 150 },
  { month: "Apr", sales: 230 },
  { month: "May", sales: 280 },
  { month: "Jun", sales: 250 },
  { month: "Jul", sales: 320 },
  { month: "Aug", sales: 380 },
  { month: "Sep", sales: 350 },
  { month: "Oct", sales: 420 },
  { month: "Nov", sales: 460 },
  { month: "Dec", sales: 520 },
];

const genreData = [
  { name: "Fiction", value: 35 },
  { name: "Technology", value: 25 },
  { name: "Business", value: 18 },
  { name: "Self Help", value: 12 },
  { name: "History", value: 10 },
];

// -------------------------
// Stat Card
// -------------------------

const StatCard = ({ title, value, icon: Icon, description }) => {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </h2>

          {description && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>

        <div className="rounded-xl bg-gray-100 p-3 dark:bg-gray-800">
          <Icon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </div>
      </div>
    </div>
  );
};

// -------------------------
// Main Component
// -------------------------

export default function AnalyticsOverview() {
  return (
    <section className="w-full space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          Analytics Overview
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track your ebook platform performance and sales.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="12,540"
          icon={Users}
          description="+12.5% from last month"
        />

        <StatCard
          title="Total Writers"
          value="486"
          icon={UserPen}
          description="+8.2% from last month"
        />

        <StatCard
          title="Ebooks Sold"
          value="8,924"
          icon={ShoppingCart}
          description="+15.8% from last month"
        />

        <StatCard
          title="Total Revenue"
          value="$42,580"
          icon={DollarSign}
          description="+18.4% from last month"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Monthly Sales */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm lg:col-span-2 dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
              <BarChart3 className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Monthly Sales
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ebooks sold per month
              </p>
            </div>
          </div>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySales}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="currentColor"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Genre Pie Chart */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
              <BookOpen className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Ebooks by Genre
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Distribution by category
              </p>
            </div>
          </div>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genreData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={95}
                  innerRadius={45}
                  paddingAngle={3}
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} />
                  ))}
                </Pie>

                <Tooltip />

                <Legend
                  verticalAlign="bottom"
                  height={40}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

