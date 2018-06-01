<template>
    <div>
        <VuetableproSearch :rows="rows" />

        <table style="width: 500px">
            <thead>
                <tr>
                    <th v-for="column in columns" :style="{width: column.width}">{{ column.name }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows">
                    <td v-for="data in row">{{ data }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import VuetableproSearch from './VuetableproSearch';

    export default {
        name: 'Vuetablepro',
        data() {
            return {
                columns: [
                    {
                        name: 'Id',
                        width: '20%'
                    },
                    {
                        name: 'Name',
                        width: '20%'
                    },
                    {
                        name: 'Job'
                    }
                ],
                rows: [
                    ['1', 'John Smith', 'Bank robber'],
                    ['5', 'Samantha Cole', 'Nurse'],
                    ['30', 'Robert van Zant', 'Investor'],
                    ['125', 'Trisha Portman', 'Waitress'],
                    ['255', 'Paul Newman', 'Detective'],
                ]
            }
        },
        components: { VuetableproSearch }
    }
</script>

<style scoped>

</style>