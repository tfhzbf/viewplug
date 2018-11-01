<template>
<div>
    <div :data-responsive-table-toolbar="tableid" style="margin:0px;display:none;"></div>
    <div class="table-responsive" data-pattern="priority-columns">
        <table :id="tableid" class="table table-small-font table-bordered ">
            <thead>
                <tr v-for="(row,index) in tableHead" >
                    <th v-for="(column,colindex) in row "  @click="columnClick(column,colindex,$event,'head')"  v-html="column.SHOWNR">
                       
                    </th>
                </tr>
            </thead>
            <tbody >
                <tr v-for="row in tableBody" >
                    <td v-for="(column,colindex) in row " @click="columnClick(column,colindex,$event,'body')"  v-html="column.SHOWNR">
                        
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
export default {
    name: "res-list",
    data() {
        let id = "table_" + Date.parse(new Date());
        return {
            tableid: id,
            tableHead:this.$parent.tableHead,
            tableBody:this.$parent.tableBody
        };
    },
    mounted() {
    },
    methods: {
        columnClick(column,colindex,$event,type){
            if(this.$parent.columnClick)
                this.$parent.columnClick(column,colindex,$event,type);
        }
        // getColumnResponse(index) {
        //     let windWidth = $(window).width();
        //     let value;
        //     if (windWidth<=480 && index > 3) {
        //         value= 3;
        //     } else if (windWidth<=640 && index > 5) {
        //         value= 4;
        //     } else if (windWidth <= 800&& index > 7) {
        //         value= 5;
        //     } else if (windWidth <= 960 && index > 7) {
        //         value= 6;
        //     } else {
        //         value= 1;
        //     }
        //     return value;
        // }
    }
};
</script>

<style>
</style>
