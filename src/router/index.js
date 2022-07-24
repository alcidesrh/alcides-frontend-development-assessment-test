import Vue from "vue";
import VueRouter from "vue-router";
import complaint from "./complaint";
import customer from "./customer";
import order from "./order";
import part from "./part";
import technician from "./technician";
import vehicle from "./vehicle";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [complaint, customer, part, technician, vehicle, order],
});
