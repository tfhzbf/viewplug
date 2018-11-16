<template>
    <div>
        <div id="maptool"></div>
        <div :id="mapid" class="map">
            
        </div>
    </div>
</template>
<script>
import SMapOperate from "./js/supermap.js";
import GraphicalUtil  from "./js/GraphicalUtil.js";
export default {
    name:"supermap",
    data(){
        let pageData = this.$parent.pageData;
        let mapid = "map_"+Date.parse(new Date());
        let mapData = pageData.DATA.BGAREA.MAPDATA;
        return {
            smapoperate:null,
            vectorLayer:null,
            mapid:mapid,
            mapdata:mapData
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            let smapoperate = new SMapOperate(this.mapid);
            this.smapoperate=smapoperate;
            smapoperate.init();
            let selectFunction = this.$parent.clickGraphical;
            this.vectorLayer=smapoperate.loadShowConlayer(function (feature,layer){
                selectFunction(smapoperate,feature,layer);
            });
            let mapdata = this.mapdata;
            GraphicalUtil.addGraphical(mapdata,this.vectorLayer);
        }
    }
}
</script>
<style>
.map{
    position:absolute;
    top:0px;
    bottom: 0px;
    left:0px;
    right:0px;
}
</style>


