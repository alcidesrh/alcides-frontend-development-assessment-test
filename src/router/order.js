export default {
  path: "/",
  name: "orders",
  component: () => import("../components/order/Layout"),
  redirect: { name: "OrderList" },
  children: [
    {
      name: "OrderList",
      path: "orders",
      component: () => import("../views/order/List"),
    },
    {
      name: "OrderCreate",
      path: "new",
      component: () => import("../views/order/Create"),
    },
    {
      name: "OrderUpdate",
      path: ":id/edit",
      component: () => import("../views/order/Update"),
    },
    {
      name: "OrderShow",
      path: ":id",
      component: () => import("../views/order/Show"),
    },
  ],
};
