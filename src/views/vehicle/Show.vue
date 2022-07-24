<template>
  <div>
    <Toolbar :handle-edit="editHandler" :handle-delete="del">
      <template slot="left">
        <v-toolbar-title v-if="item">{{
          `${$options.servicePrefix} ${item["@id"]}`
        }}</v-toolbar-title>
      </template>
    </Toolbar>

    <br />

    <div v-if="item" class="table-vehicle-show">
      <v-simple-table>
        <template slot="default">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>

              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Year</strong></td>
              <td>
                {{ $t(item["year"]) }}
              </td>

              <td><strong>Make</strong></td>
              <td>
                {{ item["make"] }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>Model</strong>
              </td>
              <td>
                {{ item["model"] }}
              </td>

              <td>
                <strong>Vin</strong>
              </td>
              <td>
                {{ item["vin"] }}
              </td>
            </tr>

            <tr>
              <td>
                <strong>Parts</strong>
              </td>
              <td>
                <ul>
                  <li v-for="_item in item['parts']" :key="_item['@id']">
                    {{ _item.name }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>

    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import Loading from "../../components/Loading";
import ShowMixin from "../../mixins/ShowMixin";
import Toolbar from "../../components/Toolbar";

const servicePrefix = "Vehicle";

export default {
  name: "VehicleShow",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
  },
  mixins: [ShowMixin],
  computed: {
    ...mapFields("vehicle", {
      isLoading: "isLoading",
    }),
    ...mapGetters("vehicle", ["find"]),
  },
  methods: {
    ...mapActions("vehicle", {
      deleteItem: "del",
      reset: "resetShow",
      retrieve: "load",
    }),
  },
};
</script>
