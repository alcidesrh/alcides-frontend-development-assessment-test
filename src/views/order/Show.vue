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

    <div v-if="item" class="table-order-show">
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
              <td><strong>Customer</strong></td>
              <td>
                {{ item["customer"] && item["customer"].name }}
              </td>

              <td><strong>Vehicle</strong></td>
              <td>
                {{ item["vehicle"] && item["vehicle"].vin }}
              </td>
            </tr>

            <tr>
              <td><strong>Technician</strong></td>
              <td>
                {{ item["technician"] && item["technician"].firstName }}
              </td>

              <td>
                <strong>Parts</strong>
              </td>
              <td>
                <span v-for="(_item, i) in item['parts']" :key="_item['@id']"
                  >{{ _item.name
                  }}<span v-if="i < item.parts.length - 1">, </span></span
                >
              </td>
            </tr>

            <tr>
              <td>
                <strong>Complaints</strong>
              </td>
              <td>
                <ul>
                  <li v-for="_item in item['complaints']" :key="_item['@id']">
                    {{ _item["@id"] }}
                  </li>
                </ul>
              </td>

              <td></td>
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

const servicePrefix = "Order";

export default {
  name: "OrderShow",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
  },
  mixins: [ShowMixin],
  computed: {
    ...mapFields("order", {
      isLoading: "isLoading",
    }),
    ...mapGetters("order", ["find"]),
  },
  methods: {
    ...mapActions("order", {
      deleteItem: "del",
      reset: "resetShow",
      retrieve: "load",
    }),
  },
};
</script>
