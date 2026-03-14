import { useSelector } from "react-redux";

function MyAccount() {
  const userData = useSelector((state) => state.auth.userData);

  return (
    <div className="min-h-screen bg-slate-950 text-gray-50 flex justify-center items-start px-6 py-10">
      <div className="w-full max-w-md bg-slate-900 rounded-lg border border-slate-800 p-8">
        <h1 className="text-2xl font-bold mb-6">My Account</h1>
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Full Name</p>
            <p className="text-gray-100">{userData?.fullName || "—"}</p>
          </div>
          <div className="border-t border-slate-800" />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
            <p className="text-gray-100">{userData?.email || "—"}</p>
          </div>
          <div className="border-t border-slate-800" />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Phone</p>
            <p className="text-gray-100">{userData?.phone || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
