export default {
  path: "/technicians",
  name: "technicians",
  component: () => import("../components/technician/Layout"),
  redirect: { name: "TechnicianList" },
  children: [
    {
      name: "TechnicianList",
      path: "",
      component: () => import("../views/technician/List"),
    },
    {
      name: "TechnicianCreate",
      path: "new",
      component: () => import("../views/technician/Create"),
    },
    {
      name: "TechnicianUpdate",
      path: ":id/edit",
      component: () => import("../views/technician/Update"),
    },
    {
      name: "TechnicianShow",
      path: ":id",
      component: () => import("../views/technician/Show"),
    },
  ],
};
