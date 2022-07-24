<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-select
            v-model="item.customer"
            :items="customerSelectItems"
            :error-messages="customerErrors"
            :no-data-text="$t('No results')"
            :label="$t('customer')"
            item-text="name"
            item-value="@id"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-select
            v-model="item.vehicle"
            :items="vehicleSelectItems"
            :error-messages="vehicleErrors"
            :no-data-text="$t('No results')"
            :label="$t('vehicle')"
            item-text="vin"
            item-value="@id"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-select
            v-model="item.technician"
            :items="technicianSelectItems"
            :error-messages="technicianErrors"
            :no-data-text="$t('No results')"
            :label="$t('technician')"
            item-text="firstName"
            item-value="@id"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-select
            v-model="item.parts"
            :items="partsSelectItems"
            :error-messages="partsErrors"
            :no-data-text="$t('No results')"
            :label="$t('parts')"
            multiple
            item-text="name"
            item-value="@id"
            chips
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-select
            v-model="item.complaints"
            :items="complaintsSelectItems"
            :error-messages="complaintsErrors"
            :no-data-text="$t('No results')"
            :label="$t('complaints')"
            multiple
            item-text="subject"
            item-value="@id"
            chips
          />
        </v-col>

        <v-col cols="12"></v-col>
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
  name: "OrderForm",
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
    this.customerGetSelectItems();
    this.vehicleGetSelectItems();
    this.technicianGetSelectItems();
    this.partsGetSelectItems();
    this.complaintsGetSelectItems();
  },
  data() {
    return {
      customer: null,
      vehicle: null,
      technician: null,
      parts: null,
      complaints: null,
    };
  },
  computed: {
    ...mapFields("customer", {
      customerSelectItems: "selectItems",
    }),
    ...mapFields("vehicle", {
      vehicleSelectItems: "selectItems",
    }),
    ...mapFields("technician", {
      technicianSelectItems: "selectItems",
    }),
    ...mapFields("part", {
      partsSelectItems: "selectItems",
    }),
    ...mapFields("complaint", {
      complaintsSelectItems: "selectItems",
    }),

    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    },

    customerErrors() {
      const errors = [];

      if (!this.$v.item.customer.$dirty) return errors;

      has(this.violations, "customer") && errors.push(this.violations.customer);

      return errors;
    },
    vehicleErrors() {
      const errors = [];

      if (!this.$v.item.vehicle.$dirty) return errors;

      has(this.violations, "vehicle") && errors.push(this.violations.vehicle);

      return errors;
    },
    technicianErrors() {
      const errors = [];

      if (!this.$v.item.technician.$dirty) return errors;

      has(this.violations, "technician") &&
        errors.push(this.violations.technician);

      return errors;
    },
    partsErrors() {
      const errors = [];

      if (!this.$v.item.parts.$dirty) return errors;

      has(this.violations, "parts") && errors.push(this.violations.parts);

      return errors;
    },
    complaintsErrors() {
      const errors = [];

      if (!this.$v.item.complaints.$dirty) return errors;

      has(this.violations, "complaints") &&
        errors.push(this.violations.complaints);

      return errors;
    },

    violations() {
      return this.errors || {};
    },
  },
  methods: {
    ...mapActions({
      customerGetSelectItems: "customer/fetchSelectItems",
    }),
    ...mapActions({
      vehicleGetSelectItems: "vehicle/fetchSelectItems",
    }),
    ...mapActions({
      technicianGetSelectItems: "technician/fetchSelectItems",
    }),
    ...mapActions({
      partsGetSelectItems: "part/fetchSelectItems",
    }),
    ...mapActions({
      complaintsGetSelectItems: "complaint/fetchSelectItems",
    }),
  },
  validations: {
    item: {
      customer: {},
      vehicle: {},
      technician: {},
      parts: {},
      complaints: {},
    },
  },
};
</script>
