import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentVerification() {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'fail'
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const vnpResponseCode = queryParams.get("vnp_ResponseCode");
    const vnpSecureHash = queryParams.get("vnp_SecureHash");
    const storedSecureHash = localStorage.getItem("vnp_SecureHash");

    if (
      vnpResponseCode === "00" &&
      storedSecureHash &&
      storedSecureHash === vnpSecureHash
    ) {
      navigate("/success");
    } else {
      navigate("/fail");
    }
  }, [location]);

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Xử lí thanh toán đơn hàng...</h1>
    </div>
  );
}
