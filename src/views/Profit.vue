<template>
  <h1>Profit</h1>
  <table class="table">
        <thead>
            <tr>
                <th style="width: 10%;" scope="col">Category</th>
                <th style="width: 25%;" scope="col">Field</th>
                <th style="width: 55%;" scope="col">Value</th>
            </tr>
        </thead>
        <tbody>

            <tr>
                <th rowspan="3" class="text-center align-middle border-bottom border-dark">Airport details</th>
                <th scope="row">UK airport</th>
                <td v-if="flightplan === LPL">Liverpool John Lennon Airport</td>
                <td v-else-if="flightplan === BOH">Bournemouth International Airport</td>
            </tr>
            <tr>
                <th scope="row">Foreign airport</th>
                <td>{{ flightplan.foreignAirport }}</td>
            </tr>
            <tr class="border-bottom border-dark">
                <th scope="row">Distance between them</th>
                <td>{{ object.airport_plan.distance }}km</td>
            </tr>

            <tr>
                <th rowspan="3" class="text-center align-middle border-bottom border-dark">Aircraft details</th>
                <th scope="row">Aircraft type</th>
                <td>{{ object.aircraft_plan.aircraft }}</td>
            </tr>
            <tr>
                <th scope="row">Number of first class seats</th>
                <td>{{ object.aircraft_plan.num_first_class }}</td>
            </tr>
            <tr class="border-bottom border-dark">
                <th scope="row">Number of standard class seats</th>
                <td>{{ object.aircraft_plan.num_standard_class }}</td>
            </tr>

            <tr>
                <th rowspan="5" class="text-center align-middle border-bottom border-dark">Pricing details</th>
                <th scope="row">Standard class price</th>
                <td>£{{ object.pricing_plan.standard_class_price }}</td>
            </tr>
            <tr>
                <th scope="row">First class price</th>
                <td>£{{ object.pricing_plan.first_class_price }}</td>
            </tr>
            <tr>
                <th scope="row">Running cost per seat</th>
                <td>£{{ object.pricing_plan.cost_per_seat }}</td>
            </tr>
           <tr>
                <th scope="row">Total running cost</th>
                <td>£{{ object.pricing_plan.running_cost }}</td>
            </tr>
           <tr class="border-bottom border-dark">
                <th scope="row">Income</th>
                <td>£{{ object.pricing_plan.income }}</td>
            </tr>

        </tbody>
        <tfoot>
            <tr class="table-{% if profitable %}success{% else %}danger{% endif %}">
                <th class="text-center align-middle">Profit</th>
                <td colspan="2">£{{ object.pricing_plan.profit }}</td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  getters: {
    ...mapGetters('selected', ['flightplan']),
    ...mapState
    ...mapState('selected', ['flightplan']),
  },
  mounted() {
    console.log(this);
  }
}
</script>