const firebaseConfig = {
  apiKey: "AIzaSyBOyM8y-oJqTh9MdgVsJXJ1XKxovgRVI4Q",
  authDomain: "thallajatak.firebaseapp.com",
  databaseURL: "https://thallajatak-default-rtdb.firebaseio.com",
  projectId: "thallajatak",
  storageBucket: "thallajatak.firebasestorage.app",
  messagingSenderId: "945237491301",
  appId: "1:945237491301:web:ed22d05c7c73b22f99908c",
  measurementId: "G-6W27VM70ZE"
};

// تشغيل الفايربيس
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

const DB = {
  // حفظ الطلب
  saveOrder: function(orderData) {
    const newOrderRef = database.ref('orders').push();
    return newOrderRef.set({
      ...orderData,
      status: 'قيد الانتظار',
      timestamp: Date.now()
    });
  },
  // استلام الطلبات للأدمن
  listenOrders: function(callback) {
    database.ref('orders').on('value', (snapshot) => {
      const data = snapshot.val();
      const ordersArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      callback(ordersArray);
    });
  },
  // تحديث حالة الطلب
  updateOrderStatus: function(orderId, newStatus) {
    return database.ref('orders/' + orderId).update({ status: newStatus });
  }
};
