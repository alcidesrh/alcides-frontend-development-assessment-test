<template>
  <div class="vehicle-list">
    <Toolbar :handle-add="addHandler" />

    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h1>Vehicle List</h1>
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
            <template slot="item.year" slot-scope="{ item }">
              {{ $t(item["year"]) }}
            </template>
            <template slot="item.parts" slot-scope="{ item }">
              <v-chip class="ma-2" color="primary">
                {{ item.parts.length }}
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
import Toolbar from "../../components/Toolbar";

export default {
  name: "VehicleList",
  servicePrefix: "Vehicle",
  mixins: [ListMixin],
  components: {
    Toolbar,
    ActionCell,
  },
  data() {
    return {
      headers: [
        { text: "Model", value: "model" },
        { text: "Year", value: "year" },
        { text: "Make", value: "make" },
        { text: "Vin", value: "vin" },
        { text: "Parts", value: "parts" },
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
    ...mapGetters("vehicle", {
      items: "list",
    }),
    ...mapFields("vehicle", {
      deletedItem: "deleted",
      error: "error",
      isLoading: "isLoading",
      resetList: "resetList",
      totalItems: "totalItems",
      view: "view",
    }),
  },
  methods: {
    ...mapActions("vehicle", {
      getPage: "fetchAll",
      deleteItem: "del",
    }),
  },
};
</script>
