const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_SrIH6Gs6BvTmUN";
const BACKEND_URL = "/api";

async function createOrder(amount, currency = "INR") {
  const response = await fetch(`${BACKEND_URL}/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: Math.round(amount), currency }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server error: ${response.status}`);
  }

  return response.json();
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function initiatePayment(details) {
  try {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      return { success: false, error: "Failed to load Razorpay SDK. Please check your internet connection." };
    }

    console.log("🔄 Creating Razorpay order...");
    const order = await createOrder(details.amount, details.currency || "INR");
    console.log(`✅ Order created: ${order.id}`);

    const prefill = {
      name: details.prefill?.name || "Demo User",
      email: details.prefill?.email || "demo@ferrybooking.in",
      contact: details.prefill?.contact || "9876543210",
    };

    if (details.method) {
      prefill.method = details.method;
    }

    return new Promise((resolve) => {
      const razorpay = new window.Razorpay({
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: details.name,
        description: details.description,
        image: details.image || "/favicon.svg",
        order_id: order.id,
        prefill,
        theme: {
          color: details.themeColor || "#14b8a6",
        },
        handler: (response) => {
          resolve({
            success: true,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });
        },
        modal: {
          ondismiss: () => {
            resolve({ success: false, error: "Payment cancelled by user" });
          },
        },
      });

      razorpay.open();
    });
  } catch (error) {
    console.error("❌ Razorpay payment error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Payment processing failed. Please try again.",
    };
  }
}

export async function verifyPaymentSignature(orderId, paymentId, signature) {
  try {
    const response = await fetch(`${BACKEND_URL}/verify-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, paymentId, signature }),
    });
    const data = await response.json();
    return data.valid;
  } catch {
    return false;
  }
}