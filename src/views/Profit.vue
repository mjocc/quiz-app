<template>
  <h1>Profit information</h1>
  <table class="table">
    <thead>
      <tr>
        <th style="width: 10%" scope="col">Category</th>
        <th style="width: 25%" scope="col">Field</th>
        <th style="width: 55%" scope="col">Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th
          rowspan="3"
          class="text-center align-middle border-bottom border-dark"
        >
          Airport details
        </th>
        <th scope="row">UK airport</th>
        <td v-if="flightplan.UKAirportCode === 'LPL'">
          Liverpool John Lennon Airport
        </td>
        <td v-else>Bournemouth International Airport</td>
      </tr>
      <tr>
        <th scope="row">Foreign airport</th>
        <td>{{ foreignAirport.name }}</td>
      </tr>
      <tr class="border-bottom border-dark">
        <th scope="row">Distance between them</th>
        <td>{{ formatNumber(distance) }}km</td>
      </tr>

      <tr>
        <th
          rowspan="3"
          class="text-center align-middle border-bottom border-dark"
        >
          Aircraft details
        </th>
        <th scope="row">Aircraft type</th>
        <td>{{ aircraft.type }}</td>
      </tr>
      <tr>
        <th scope="row">Number of first class seats</th>
        <td>{{ formatNumber(flightplan.numFirstClass) }}</td>
      </tr>
      <tr class="border-bottom border-dark">
        <th scope="row">Number of standard class seats</th>
        <td>{{ formatNumber(numStandardClass) }}</td>
      </tr>

      <tr>
        <th
          rowspan="5"
          class="text-center align-middle border-bottom border-dark"
        >
          Pricing details
        </th>
        <th scope="row">Standard class price</th>
        <td>{{ formatMoney(flightplan.standardClassPrice) }}</td>
      </tr>
      <tr>
        <th scope="row">First class price</th>
        <td>{{ formatMoney(flightplan.firstClassPrice) }}</td>
      </tr>
      <tr>
        <th scope="row">Running cost per seat</th>
        <td>{{ formatMoney(costPerSeat) }}</td>
      </tr>
      <tr>
        <th scope="row">Total running cost</th>
        <td>{{ formatMoney(runningCost) }}</td>
      </tr>
      <tr class="border-bottom border-dark">
        <th scope="row">Income</th>
        <td>{{ formatMoney(income) }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr
        :class="{
          'table-success': profit > 0,
          'table-warning': profit === 0,
          'table-danger': profit < 0,
        }"
      >
        <th class="text-center align-middle">Profit</th>
        <td colspan="2">{{ formatMoney(profit) }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('selected', [
      'flightplan',
      'foreignAirport',
      'aircraft',
      'distance',
      'numStandardClass',
      'costPerSeat',
      'runningCost',
      'income',
      'profit',
    ]),
  },
  methods: {
    formatMoney(num) {
      return (
        '£' +
        num.toLocaleString('en-GB', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    },
    formatNumber(num) {
      return num.toLocaleString('en-GB');
    },
  },
};
</script>
