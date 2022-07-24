<template>
  <div>
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm"></Toolbar>
    <OrderForm ref="createForm" :values="item" :errors="violations" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { createHelpers } from "vuex-map-fields";
import OrderForm from "../../components/order/Form";
import Loading from "../../components/Loading";
import Toolbar from "../../components/Toolbar";
import CreateMixin from "../../mixins/CreateMixin";

const servicePrefix = "Order";

const { mapFields } = createHelpers({
  getterType: "order/getField",
  mutationType: "order/updateField",
});

export default {
  name: "OrderCreate",
  servicePrefix,
  mixins: [CreateMixin],
  components: {
    Loading,
    Toolbar,
    OrderForm,
  },
  data() {
    return {
      item: {},
    };
  },
  computed: {
    ...mapFields(["error", "isLoading", "created", "violations"]),
  },
  methods: {
    ...mapActions("order", ["create", "reset"]),
  },
};
</script>
