export default {
  path: "/complaints",
  name: "complaints",
  component: () => import("../components/complaint/Layout"),
  redirect: { name: "ComplaintList" },
  children: [
    {
      name: "ComplaintList",
      path: "",
      component: () => import("../views/complaint/List"),
    },
    {
      name: "ComplaintCreate",
      path: "new",
      component: () => import("../views/complaint/Create"),
    },
    {
      name: "ComplaintUpdate",
      path: ":id/edit",
      component: () => import("../views/complaint/Update"),
    },
    {
      name: "ComplaintShow",
      path: ":id",
      component: () => import("../views/complaint/Show"),
    },
  ],
};
