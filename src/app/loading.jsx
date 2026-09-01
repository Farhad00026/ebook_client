export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="mt-4 text-lg font-semibold text-base-content">
        Loading, please wait...
      </p>
    </div>
  );
}