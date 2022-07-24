<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model.number="item.year"
            :error-messages="yearErrors"
            :label="$t('year')"
            @input="$v.item.year.$touch()"
            @blur="$v.item.year.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.make"
            :error-messages="makeErrors"
            :label="$t('make')"
            @input="$v.item.make.$touch()"
            @blur="$v.item.make.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.model"
            :error-messages="modelErrors"
            :label="$t('model')"
            @input="$v.item.model.$touch()"
            @blur="$v.item.model.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.vin"
            :error-messages="vinErrors"
            :label="$t('vin')"
            @input="$v.item.vin.$touch()"
            @blur="$v.item.vin.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
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
  name: "VehicleForm",
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
    this.partsGetSelectItems();
    this.ordersGetSelectItems();
  },
  data() {
    return {
      year: null,
      make: null,
      model: null,
      vin: null,
      parts: null,
      orders: null,
    };
  },
  computed: {
    ...mapFields("part", {
      partsSelectItems: "selectItems",
    }),
    ...mapFields("order", {
      ordersSelectItems: "selectItems",
    }),

    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    },

    yearErrors() {
      const errors = [];

      if (!this.$v.item.year.$dirty) return errors;

      has(this.violations, "year") && errors.push(this.violations.year);

      return errors;
    },
    makeErrors() {
      const errors = [];

      if (!this.$v.item.make.$dirty) return errors;

      has(this.violations, "make") && errors.push(this.violations.make);

      return errors;
    },
    modelErrors() {
      const errors = [];

      if (!this.$v.item.model.$dirty) return errors;

      has(this.violations, "model") && errors.push(this.violations.model);

      return errors;
    },
    vinErrors() {
      const errors = [];

      if (!this.$v.item.vin.$dirty) return errors;

      has(this.violations, "vin") && errors.push(this.violations.vin);

      return errors;
    },
    partsErrors() {
      const errors = [];

      if (!this.$v.item.parts.$dirty) return errors;

      has(this.violations, "parts") && errors.push(this.violations.parts);

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
      partsGetSelectItems: "part/fetchSelectItems",
    }),
    ...mapActions({
      ordersGetSelectItems: "order/fetchSelectItems",
    }),
  },
  validations: {
    item: {
      year: {},
      make: {},
      model: {},
      vin: {},
      parts: {},
      orders: {},
    },
  },
};
</script>
