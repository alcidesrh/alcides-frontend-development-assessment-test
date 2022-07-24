<template>
  <div class="order-list">
    <Toolbar :handle-add="addHandler" />

    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h1 class="tw-text-red">Order Repair List</h1>
        </v-flex>
        <v-flex lg12>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :items-per-page.sync="options.itemsPerPage"
            :loading="isLoading"
            :loading-text="$t('Loading...')"
            :options.sync="options"
            :server-items-length="totalItems"
            class="elevation-1"
            item-key="@id"
            @update:options="onUpdateOptions"
          >
            <template slot="item.customer" slot-scope="{ item }">
              {{ item.customer.name }}
            </template>
            <template slot="item.vehicle" slot-scope="{ item }">
              {{ item.vehicle.vin }}
            </template>
            <template slot="item.technician" slot-scope="{ item }">
              {{ item.technician.firstName }}
            </template>
            <template slot="item.parts" slot-scope="{ item }">
              <v-chip class="ma-2" color="primary">
                {{ item.parts.length }}
              </v-chip>
            </template>
            <template slot="item.complaints" slot-scope="{ item }">
              <v-chip class="ma-2" color="teal">
                <span class="tw-text-white">{{ item.complaints.length }}</span>
              </v-chip>
            </template>

            <ActionCell
              slot="item.action"
              slot-scope="props"
              :handle-show="() => showHandler(props.item)"
              :handle-edit="() => editHandler(props.item)"
              :handle-delete="() => deleteHandler(props.item)"
            ></ActionCell>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import ListMixin from "../../mixins/ListMixin";
import ActionCell from "../../components/ActionCell";
import OrderFilterForm from "../../components/order/Filter";
import DataFilter from "../../components/DataFilter";
import Toolbar from "../../components/Toolbar";

export default {
  name: "OrderList",
  servicePrefix: "Order",
  mixins: [ListMixin],
  components: {
    Toolbar,
    ActionCell,
  },
  data() {
    return {
      headers: [
        { text: "Customer", value: "customer" },
        { text: "Vehicle", value: "vehicle" },
        { text: "Technician", value: "technician" },
        { text: "Parts", value: "parts" },
        { text: "Complaints", value: "complaints" },
        {
          text: "Actions",
          value: "action",
          sortable: false,
        },
      ],
      selected: [],
    };
  },
  computed: {
    ...mapGetters("order", {
      items: "list",
    }),
    ...mapFields("order", {
      deletedItem: "deleted",
      error: "error",
      isLoading: "isLoading",
      resetList: "resetList",
      totalItems: "totalItems",
      view: "view",
    }),
  },
  methods: {
    ...mapActions("order", {
      getPage: "fetchAll",
      deleteItem: "del",
    }),
  },
};
</script>
