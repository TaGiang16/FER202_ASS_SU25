import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Fail() {
  // Lấy dữ liệu từ Checkout qua useLocation
  const navigate = useNavigate();

  return (
    <div
      id="SuccessPage"
      className="mt-12 max-w-[1200px] mx-auto px-2 min-h-[50vh]"
    >
      <div className="bg-white w-full p-6 min-h-[150px] flex flex-col items-center">
        {/* Thông báo thất bại */}
        <div className="flex items-center text-xl mb-6">
          <XCircle className="text-red-500 h-8 w-8" />
          <span className="pl-4 font-semibold">Payment Failed</span>
        </div>

        <div className="w-full max-w-[800px]">
          {/* Thông tin hóa đơn */}
          <div className="border-b pb-4 mb-6">
            <h2 className="text-lg font-semibold">Order Confirmation</h2>
            <p className="text-sm text-gray-600">
              Sorry! We haven't received your payment. Please try again!
            </p>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-center gap-4">
            <a
              href="/"
              className="bg-blue-600 text-sm font-semibold text-white p-3 rounded-full hover:bg-blue-700 px-6"
            >
              Back to Shop
            </a>
            <button
              onClick={() => navigate("/order-history")}
              className="bg-green-600 text-sm font-semibold text-white p-3 rounded-full hover:bg-green-700 px-6"
            >
              View Order History
            </button>
            <button
              onClick={() => window.print()}
              className="bg-gray-200 text-sm font-semibold text-gray-800 p-3 rounded-full hover:bg-gray-300 px-6"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
