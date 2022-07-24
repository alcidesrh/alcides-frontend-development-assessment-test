export default {
  path: "/vehicles",
  name: "vehicles",
  component: () => import("../components/vehicle/Layout"),
  redirect: { name: "VehicleList" },
  children: [
    {
      name: "VehicleList",
      path: "",
      component: () => import("../views/vehicle/List"),
    },
    {
      name: "VehicleCreate",
      path: "new",
      component: () => import("../views/vehicle/Create"),
    },
    {
      name: "VehicleUpdate",
      path: ":id/edit",
      component: () => import("../views/vehicle/Update"),
    },
    {
      name: "VehicleShow",
      path: ":id",
      component: () => import("../views/vehicle/Show"),
    },
  ],
};
