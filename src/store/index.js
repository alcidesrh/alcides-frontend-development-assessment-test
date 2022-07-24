import Vue from "vue";
import Vuex from "vuex";
import makeCrudModule from "./modules/crud";
import notifications from "./modules/notifications";
import complaint from "../services/complaint";
import customer from "../services/customer";
import order from "../services/order";
import part from "../services/part";
import technician from "../services/technician";
import vehicle from "../services/vehicle";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    notifications,
    complaint: makeCrudModule({
      service: complaint,
    }),
    customer: makeCrudModule({
      service: customer,
    }),
    order: makeCrudModule({
      service: order,
    }),
    part: makeCrudModule({
      service: part,
    }),
    technician: makeCrudModule({
      service: technician,
    }),
    vehicle: makeCrudModule({
      service: vehicle,
    }),
  },
  strict: process.env.NODE_ENV !== "production",
});

export default store;
