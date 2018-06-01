<template>
    <input type="text" name="search" placeholder="Search for" @input="search" v-model="needle">
</template>

<script>
    export default {
        name: 'VuetableproSearch',
        props: ['rows'],
        data() {
            return {
                needle: ''
            }
        },
        methods: {
            search(){
                /**
                 * @TODO
                 * This is a temporary search feature. We must replace the pop()
                 * with something that doesn't destroy the original data object.
                 */
                this.rows.find(row => {
                    let match = row.find(column => {
                        return column.indexOf(this.needle) >= 0;
                    });

                    console.log(match);

                    if(typeof match == 'undefined'){
                        this.rows.pop(row);
                    }
                });      // we must bind this object, so we can access it from inside the forEach loop
            }
        }
    }
</script>

<style scoped>

</style>