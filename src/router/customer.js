export default {
  path: "/customers",
  name: "customers",
  component: () => import("../components/customer/Layout"),
  redirect: { name: "CustomerList" },
  children: [
    {
      name: "CustomerList",
      path: "",
      component: () => import("../views/customer/List"),
    },
    {
      name: "CustomerCreate",
      path: "new",
      component: () => import("../views/customer/Create"),
    },
    {
      name: "CustomerUpdate",
      path: ":id/edit",
      component: () => import("../views/customer/Update"),
    },
    {
      name: "CustomerShow",
      path: ":id",
      component: () => import("../views/customer/Show"),
    },
  ],
};
