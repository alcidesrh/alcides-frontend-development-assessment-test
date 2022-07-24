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

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.description"
            :error-messages="descriptionErrors"
            :label="$t('description')"
            @input="$v.item.description.$touch()"
            @blur="$v.item.description.$touch()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model.number="item.price"
            :error-messages="priceErrors"
            :label="$t('price')"
            step="0.1"
            @input="$v.item.price.$touch()"
            @blur="$v.item.price.$touch()"
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
  name: "PartForm",
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
  mounted() {},
  data() {
    return {
      name: null,
      description: null,
      price: null,
    };
  },
  computed: {
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
    descriptionErrors() {
      const errors = [];

      if (!this.$v.item.description.$dirty) return errors;

      has(this.violations, "description") &&
        errors.push(this.violations.description);

      return errors;
    },
    priceErrors() {
      const errors = [];

      if (!this.$v.item.price.$dirty) return errors;

      has(this.violations, "price") && errors.push(this.violations.price);

      return errors;
    },

    violations() {
      return this.errors || {};
    },
  },
  methods: {},
  validations: {
    item: {
      name: {},
      description: {},
      price: {},
    },
  },
};
</script>
