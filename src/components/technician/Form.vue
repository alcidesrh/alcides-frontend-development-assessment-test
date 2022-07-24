<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.firstName"
            :error-messages="firstNameErrors"
            :label="$t('firstName')"
            @input="$v.item.firstName.$touch()"
            @blur="$v.item.firstName.$touch()"
          />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.lastName"
            :error-messages="lastNameErrors"
            :label="$t('lastName')"
            @input="$v.item.lastName.$touch()"
            @blur="$v.item.lastName.$touch()"
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
  name: "TechnicianForm",
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
      firstName: null,
      lastName: null,
    };
  },
  computed: {
    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    },

    firstNameErrors() {
      const errors = [];

      if (!this.$v.item.firstName.$dirty) return errors;

      has(this.violations, "firstName") &&
        errors.push(this.violations.firstName);

      return errors;
    },
    lastNameErrors() {
      const errors = [];

      if (!this.$v.item.lastName.$dirty) return errors;

      has(this.violations, "lastName") && errors.push(this.violations.lastName);

      return errors;
    },

    violations() {
      return this.errors || {};
    },
  },
  methods: {},
  validations: {
    item: {
      firstName: {},
      lastName: {},
    },
  },
};
</script>
