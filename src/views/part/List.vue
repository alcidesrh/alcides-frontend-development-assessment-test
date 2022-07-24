<template>
  <div class="part-list">
    <Toolbar :handle-add="addHandler" />

    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h1>Part List</h1>
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
            <template slot="item.price" slot-scope="{ item }">
              {{ $t(item["price"]) }}
            </template>
            <template slot="item.description" slot-scope="{ item }">
              <div class="tw-truncate tw-max-w-sm">
                {{ $t(item["description"]) }}
              </div>
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
  name: "PartList",
  servicePrefix: "Part",
  mixins: [ListMixin],
  components: {
    Toolbar,
    ActionCell,
  },
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Price", value: "price" },
        { text: "Description", value: "description" },
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
    ...mapGetters("part", {
      items: "list",
    }),
    ...mapFields("part", {
      deletedItem: "deleted",
      error: "error",
      isLoading: "isLoading",
      resetList: "resetList",
      totalItems: "totalItems",
      view: "view",
    }),
  },
  methods: {
    ...mapActions("part", {
      getPage: "fetchAll",
      deleteItem: "del",
    }),
  },
};
</script>
