<template>
  <div id="app">
    <resList v-bind:tableHead="tableHead" v-bind:tableBody="tableBody"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      tableHead:[
        [{
          KEY:"name",
          SHOWNR:"名字"
        },{
          KEY:"Age",
          SHOWNR:"年龄"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        }]
      ],
      tableBody:[
         [{
          KEY:"name",
          SHOWNR:"名字"
        },{
          KEY:"Age",
          SHOWNR:"年龄"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        }],
          [{
          KEY:"name",
          SHOWNR:"名字"
        },{
          KEY:"Age",
          SHOWNR:"年龄"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        },{
          KEY:"Occupation",
          SHOWNR:"职业"
        }]
      ]
    }
  }
}
</script>

<style>

</style>
