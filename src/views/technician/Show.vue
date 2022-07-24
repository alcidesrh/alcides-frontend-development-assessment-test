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

    <div v-if="item" class="table-technician-show">
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
              <td><strong>First Name</strong></td>
              <td>
                {{ item["firstName"] }}
              </td>

              <td><strong>Last Name</strong></td>
              <td>
                {{ item["lastName"] }}
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

const servicePrefix = "Technician";

export default {
  name: "TechnicianShow",
  servicePrefix,
  components: {
    Loading,
    Toolbar,
  },
  mixins: [ShowMixin],
  computed: {
    ...mapFields("technician", {
      isLoading: "isLoading",
    }),
    ...mapGetters("technician", ["find"]),
  },
  methods: {
    ...mapActions("technician", {
      deleteItem: "del",
      reset: "resetShow",
      retrieve: "load",
    }),
  },
};
</script>
