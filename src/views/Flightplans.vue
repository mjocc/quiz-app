<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th style="width: 65%" scope="col">Save name</th>
        <th style="width: 30%" scope="col">Created</th>
        <th style="width: 5%" scope="col">Complete</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="noFlightplans">
        <tr>
          <td colspan="3" class="text-muted fw-light text-center fst-italic">
            No flightplans exist
          </td>
        </tr>
      </template>
      <template v-else>
        <fp-row
          v-for="plan in orderedFlightPlans"
          :key="plan.name"
          :name="plan.name"
          :created="plan.date"
          :complete="flightPlanComplete(plan)"
          @update:clickedRow="updateClickedRow"
          @update:selectedRow="updateSelectedRow"
        />
      </template>
    </tbody>
  </table>

  <button
    class="btn btn-dark mb-2"
    id="create-button"
    data-bs-toggle="modal"
    data-bs-target="#create-modal"
  >
    Create
  </button>
  <button
    class="btn btn-danger float-end ms-1 mb-2"
    id="delete-button"
    data-bs-toggle="modal"
    data-bs-target="#delete-modal"
    :disabled="disableFpButtons"
  >
    Delete
  </button>
  <button
    class="btn btn-dark float-end ms-1 mb-2"
    id="edit-button"
    data-bs-toggle="modal"
    data-bs-target="#edit-modal"
    :disabled="disableFpButtons"
  >
    Edit
  </button>
  <button
    class="btn btn-dark float-end mb-2"
    id="select-button"
    :disabled="disableFpButtons"
    @click="handleSelectButtonClick"
  >
    Select
  </button>

  <teleport to="body">
    <div class="modal" tabindex="-1" id="create-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create flight plan</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="submitCreateForm">
            <div class="modal-body">
              <div class="input-group">
                <span class="input-group-text">Save name</span>
                <input
                  type="text"
                  name="save-name"
                  maxlength="100"
                  class="form-control"
                  id="create-save-name"
                  required
                  @input="removeIsInvalid"
                />
              </div>
            </div>
            <div class="modal-footer">
              <input type="submit" class="btn btn-dark" value="Create" />
              <button
                type="button"
                class="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal" tabindex="-1" id="edit-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit flight plan</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="submitEditForm">
            <div class="modal-body">
              <div class="input-group">
                <span class="input-group-text">Save name</span>
                <input
                  type="text"
                  name="save-name"
                  maxlength="100"
                  class="form-control"
                  id="edit-save-name"
                  required
                  :value="clickedRow"
                  @input="removeIsInvalid"
                />
              </div>
            </div>
            <div class="modal-footer">
              <input type="submit" class="btn btn-dark" value="Update" />
              <button
                type="button"
                class="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal" tabindex="-1" id="delete-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete flight plan</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="submitDeleteForm">
            <div class="modal-body">
              This will irreversibly delete the selected flight plan. Are you
              sure?
            </div>
            <div class="modal-footer">
              <input
                type="submit"
                class="btn btn-danger"
                value="Continue"
                id="confirm-delete"
              />
              <button
                type="button"
                class="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import _ from 'lodash';
import $ from 'jquery';
import toastr from 'toastr';
import { mapState, mapActions } from 'vuex';

import {
  airportDetailsExist,
  aircraftDetailsExist,
  pricingDetailsExist,
} from '../store/modules/selected.js';

import FlightPlanTableRow from '../components/FlightPlanTableRow.vue';

export default {
  data() {
    return {
      clickedRow: null,
    };
  },
  methods: {
    ...mapActions('flightplans', ['create', 'update', 'delete']),
    ...mapActions('selected', [
      'updateSelectedFlightPlan',
      'clearSelectedFlightPlan',
    ]),
    flightPlanComplete(flightplan) {
      return (
        airportDetailsExist(flightplan) &&
        aircraftDetailsExist(flightplan) &&
        pricingDetailsExist(flightplan)
      );
    },
    updateClickedRow(name) {
      this.clickedRow = name;
    },
    updateSelectedRow(name) {
      this.updateSelectedFlightPlan(name);
      this.$router.push({ name: 'HomePage' });
    },
    handleSelectButtonClick() {
      this.updateSelectedRow(this.clickedRow);
    },
    removeIsInvalid(event) {
      $(event.target).removeClass('is-invalid');
    },
    async submitCreateForm(submitEvent) {
      let [success, message] = await this.create(
        submitEvent.target.elements['create-save-name'].value
      );
      if (success) {
        $('#create-modal button[class="btn-close"]').click();
        $('#create-save-name').val('');
        toastr.success(message);
      } else {
        $('#create-save-name').addClass('is-invalid');
        toastr.error(message);
      }
    },
    async submitEditForm(submitEvent) {
      let [success, message] = await this.update({
        oldName: this.clickedRow,
        newName: submitEvent.target.elements['edit-save-name'].value,
      });
      if (success) {
        $('#edit-modal button[class="btn-close"]').click();
        this.clickedRow = null;
        toastr.success(message);
      } else {
        $('#edit-save-name').addClass('is-invalid');
        toastr.error(message);
      }
    },
    async submitDeleteForm() {
      let [success, message] = await this.delete(this.clickedRow);
      this.clearSelectedFlightPlan();
      if (success) {
        $('#delete-modal button[class="btn-close"]').click();
        toastr.success(message);
      } else {
        toastr.error(message);
      }
    },
  },
  computed: {
    ...mapState(['flightplans']),
    orderedFlightPlans() {
      return _.orderBy(this.flightplans, ['date', 'name'], ['desc', 'asc']);
    },
    noFlightplans() {
      return _.isEmpty(this.flightplans);
    },
    disableFpButtons() {
      return this.clickedRow === null;
    },
  },
  components: {
    'fp-row': FlightPlanTableRow,
  },
};
</script>
