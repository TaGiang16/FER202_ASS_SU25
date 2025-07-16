import { useEffect } from "react";
import CryptoJS from "crypto-js";

export default function VNPay({ amount, user }) {
  async function convertUSDToVND(usdAmount) {
    const apiUrl =
      "https://v6.exchangerate-api.com/v6/bb51eab10c94fe7894d98446/latest/USD";

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const vndRate = data.conversion_rates.VND;

      if (!vndRate) {
        throw new Error("VND rate not found in API response.");
      }

      const vndAmount = usdAmount * vndRate;
      return vndAmount;
    } catch (error) {
      console.error("Conversion failed:", error.message);
      return null;
    }
  }

  const getCurrentDateTimeInGMT7 = (plusMinutes = 0) => {
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60000 * -1;
    const gmt7 = new Date(
      now.getTime() + 7 * 3600000 + offsetMs + plusMinutes * 60000
    );
    const fmt = (n) => String(n).padStart(2, "0");
    return (
      gmt7.getFullYear() +
      fmt(gmt7.getMonth() + 1) +
      fmt(gmt7.getDate()) +
      fmt(gmt7.getHours()) +
      fmt(gmt7.getMinutes()) +
      fmt(gmt7.getSeconds())
    );
  };

  useEffect(() => {
    const initPayment = async () => {
      const vndAmountFloat = await convertUSDToVND(amount);
      if (!vndAmountFloat) return;

      const vnpAmount = Math.round(vndAmountFloat/100);

      const tmnCode = "DPUIEA08";
      const secretKey = "RY6M089DOCMIKW5M2N6GB5H6GMTWSLYR";
      const vnpBaseUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
      const returnUrl = "http://localhost:3000/checkout";

      const createDate = getCurrentDateTimeInGMT7();
      const expireDate = getCurrentDateTimeInGMT7(30);
      const orderId = `${user}` + createDate;
      const orderInfo = encodeURIComponent(
        `Nguoi dung ${user} thanh toan don hang ${orderId}`
      );

      const vnp_Params = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: tmnCode,
        vnp_Locale: "vn",
        vnp_CurrCode: "VND",
        vnp_TxnRef: orderId,
        vnp_OrderInfo: orderInfo,
        vnp_OrderType: "other",
        vnp_Amount: (vnpAmount*100).toString(),
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: "127.0.0.1",
        vnp_CreateDate: createDate,
        vnp_ExpireDate: expireDate,
      };

      const sortedKeys = Object.keys(vnp_Params).sort();
      const signData = sortedKeys
        .map((key) => `${key}=${encodeURIComponent(vnp_Params[key])}`)
        .join("&");

      const secureHash = CryptoJS.HmacSHA512(signData, secretKey).toString(
        CryptoJS.enc.Hex
      );

      const query = `${signData}&vnp_SecureHash=${secureHash}`;
      window.location.href = `${vnpBaseUrl}?${query}`;
    };

    initPayment();
  }, [amount, user]);

  return (
    <div>
      <h3>Redirecting to VNPay...</h3>
    </div>
  );
}
