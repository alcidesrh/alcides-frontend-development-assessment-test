export default {
  path: "/parts",
  name: "parts",
  component: () => import("../components/part/Layout"),
  redirect: { name: "PartList" },
  children: [
    {
      name: "PartList",
      path: "",
      component: () => import("../views/part/List"),
    },
    {
      name: "PartCreate",
      path: "new",
      component: () => import("../views/part/Create"),
    },
    {
      name: "PartUpdate",
      path: ":id/edit",
      component: () => import("../views/part/Update"),
    },
    {
      name: "PartShow",
      path: ":id",
      component: () => import("../views/part/Show"),
    },
  ],
};
