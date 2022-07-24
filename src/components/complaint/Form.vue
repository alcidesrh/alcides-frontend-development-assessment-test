<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.subject"
            :error-messages="subjectErrors"
            :label="$t('subject')"
            @input="$v.item.subject.$touch()"
            @blur="$v.item.subject.$touch()"
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
          <v-combobox
            v-model="item.orderRepair"
            :items="orderRepairSelectItems"
            :error-messages="orderRepairErrors"
            :no-data-text="$t('No results')"
            :label="$t('orderRepair')"
            item-text="name"
            item-value="@id"
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
  name: "ComplaintForm",
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
    this.orderRepairGetSelectItems();
  },
  data() {
    return {
      subject: null,
      description: null,
      orderRepair: null,
    };
  },
  computed: {
    ...mapFields("order", {
      orderRepairSelectItems: "selectItems",
    }),

    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    },

    subjectErrors() {
      const errors = [];

      if (!this.$v.item.subject.$dirty) return errors;

      has(this.violations, "subject") && errors.push(this.violations.subject);

      return errors;
    },
    descriptionErrors() {
      const errors = [];

      if (!this.$v.item.description.$dirty) return errors;

      has(this.violations, "description") &&
        errors.push(this.violations.description);

      return errors;
    },
    orderRepairErrors() {
      const errors = [];

      if (!this.$v.item.orderRepair.$dirty) return errors;

      has(this.violations, "orderRepair") &&
        errors.push(this.violations.orderRepair);

      return errors;
    },

    violations() {
      return this.errors || {};
    },
  },
  methods: {
    ...mapActions({
      orderRepairGetSelectItems: "order/fetchSelectItems",
    }),
  },
  validations: {
    item: {
      subject: {},
      description: {},
      orderRepair: {},
    },
  },
};
</script>
