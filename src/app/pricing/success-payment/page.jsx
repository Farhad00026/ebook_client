
import { payment } from "@/lib/actions/payment";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error(
      "Please provide a valid session_id (`cs_test_...`)"
    );
  }

  const {
    status,
    metadata,
    customer_details,
    amount_total,
    currency,
    payment_status,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const customerEmail = customer_details?.email;

  if (status === "open") {
    redirect("/");
  }

  if (status === "complete") {
    const paymentresult = await payment({
      ...metadata,
      sessionId: session_id,
    });

    console.log("Payment Result:", paymentresult);

    const formattedAmount =
      amount_total && currency
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency.toUpperCase(),
          }).format(amount_total / 100)
        : null;

    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center">
          <div className="w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">

            {/* Top Success Area */}
            <div className="px-6 pb-10 pt-12 text-center sm:px-10">

              {/* Success Icon */}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="h-9 w-9 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12l4 4L19 6"
                    />
                  </svg>
                </div>
              </div>

              {/* Heading */}
              <h1 className="mt-7 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Payment Successful!
              </h1>

              <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-600">
                Thank you for your purchase. Your payment has been
                successfully processed.
              </p>

              {/* Status Badge */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Payment Completed
              </div>
            </div>

            {/* Payment Details */}
            <div className="border-y border-gray-100 bg-gray-50 px-6 py-8 sm:px-10">

              <h2 className="mb-5 text-lg font-bold text-gray-900">
                Payment Details
              </h2>

              <div className="space-y-4">

                {/* Email */}
                {customerEmail && (
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm text-gray-500">
                      Customer Email
                    </span>

                    <span className="break-all text-right text-sm font-medium text-gray-900">
                      {customerEmail}
                    </span>
                  </div>
                )}

                {/* Amount */}
                {formattedAmount && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Amount Paid
                    </span>

                    <span className="text-lg font-bold text-gray-900">
                      {formattedAmount}
                    </span>
                  </div>
                )}

                {/* Payment Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Payment Status
                  </span>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
                    {payment_status || "Paid"}
                  </span>
                </div>

                {/* Session ID */}
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-gray-500">
                    Transaction ID
                  </span>

                  <span className="max-w-[230px] break-all text-right font-mono text-xs text-gray-500">
                    {session_id}
                  </span>
                </div>
              </div>
            </div>

            {/* Thank You Message */}
            <div className="px-6 py-8 text-center sm:px-10">

              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-semibold text-gray-900">
                  Thank you for choosing us! 🎉
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  A confirmation email will be sent to your email
                  address. You can now continue using your account.
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">

                <Link
                  href="/dashboard"
                  className="rounded-xl bg-gray-900 px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-gray-800"
                >
                  Go to Dashboard
                </Link>

                <Link
                  href="/products"
                  className="rounded-xl border border-gray-300 bg-white px-7 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Support */}
              <p className="mt-6 text-xs text-gray-400">
                Need help? Contact our support team.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
          <span className="text-2xl">!</span>
        </div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900">
          Payment Processing
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Your payment is still being processed. Please wait a
          moment and check your account again.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
