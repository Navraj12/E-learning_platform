import KhaltiCheckout from "khalti-checkout-web";

const initializeKhaltiCheckout = (amount, productName, orderId, onSuccess, onError) => {
    const config = {
        publicKey: import.meta.env.VITE_KHALTI_PUBLIC_KEY,
        productIdentity: orderId,
        productName: productName,
        productUrl: window.location.href,
        eventHandler: {
            onSuccess(payload) {
                console.log('payment successful:', payload);
                onSuccess(payload);
            },
            onError(error) {
                console.log('Payment Error:', error);
                onError(error);
            },
            onclose() {
                console.log('Payment window closed');
            }
        }
    }
    const checkout = new KhaltiCheckout(config);
    checkout.show({ amount: amount * 100 });
};


export { initializeKhaltiCheckout };