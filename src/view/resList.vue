<template>
  <div style="width:100%;height:100%;">
    <div :data-responsive-table-toolbar="tableid" style="margin:0px;display:none;"></div>
    <div class="table-responsive" style="width:100%;height:100%;" data-pattern="priority-columns">
      <table :id="tableid" class="table table-small-font table-bordered ">
        <thead v-if="tableHead">
          <tr v-for="(row,index) in tableHead">
            <th v-for="(column,colindex) in row " @click="columnClick(column,colindex,$event,'head')" v-html="column.SHOWNR">

            </th>
          </tr>
        </thead>
        <tbody v-if="tableBody">
          <tr v-for="row in tableBody">
            <td v-for="(column,colindex) in row " @click="columnClick(column,colindex,$event,'body')" v-html="column.SHOWNR">

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
        let pageData = this.$parent.pageData;
        let tableHead = [pageData.DATA.BGAREA.BT];
        let tableBody = pageData.DATA.BGAREA.DATA;
      return {
        tableid: id,
        pageData: pageData,
        tableHead: tableHead,
        tableBody: tableBody
      };
    },
    mounted() {
        
    },
    methods: {
      columnClick(column, colindex, $event, type) {
        if (this.$parent.columnClick)
          this.$parent.columnClick(column, colindex, $event, type);
      }
    }
  };
</script>

<style>
</style>