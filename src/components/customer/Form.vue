<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.name"
            :error-messages="nameErrors"
            :label="$t('name')"
            @input="$v.item.name.$touch()"
            @blur="$v.item.name.$touch()"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import has from "lodash/has";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  name: "CustomerForm",
  mixins: [validationMixin],
  props: {
    values: {
      type: Object,
      required: true,
    },

    errors: {
      type: Object,
      default: () => {},
    },

    initialValues: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.ordersGetSelectItems();
  },
  data() {
    return {
      name: null,
      orders: null,
    };
  },
  computed: {
    ...mapFields("order", {
      ordersSelectItems: "selectItems",
    }),

    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    },

    nameErrors() {
      const errors = [];

      if (!this.$v.item.name.$dirty) return errors;

      has(this.violations, "name") && errors.push(this.violations.name);

      return errors;
    },
    ordersErrors() {
      const errors = [];

      if (!this.$v.item.orders.$dirty) return errors;

      has(this.violations, "orders") && errors.push(this.violations.orders);

      return errors;
    },

    violations() {
      return this.errors || {};
    },
  },
  methods: {
    ...mapActions({
      ordersGetSelectItems: "order/fetchSelectItems",
    }),
  },
  validations: {
    item: {
      name: {},
      orders: {},
    },
  },
};
</script>
