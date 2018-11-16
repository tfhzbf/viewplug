export default class {
  constructor(divid) {
    this.mapcontainer = divid;
    this.matrixIds = [];
    for (var i = 0; i < 22; ++i) {
      this.matrixIds[i] = {
        identifier: i
      };
    };
    this.resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 0.0006866455078125, 0.00034332275390625, 0.000171661376953125, 8.58306884765625e-005];
    this.drawStyle = {
      fillColor: "#3388ff",
      fillOpacity: 0.2,
      fillRule: "evenodd",
      hoverFillColor: "white",
      hoverFillOpacity: 0.6,
      strokeColor: "#3388ff",
      strokeOpacity: 0.5,
      strokeWidth: 4,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeDashstyle: "solid",
      hoverStrokeColor: "#3388ff",
      hoverStrokeOpacity: 0.5,
      hoverStrokeWidth: 4,
      pointRadius: 6,
      hoverPointRadius: 1,
      hoverPointUnit: "%",
      pointerEvents: "visiblePainted",
      cursor: "inherit",
      fontColor: "#000000",
      labelAlign: "cm",
      labelOutlineColor: "white",
      labelOutlineWidth: 3
    }
  }

  getTDT_yx(isshow = true) {
    var tiandituLayer = new SuperMap.Layer.Tianditu();
    var tianMarkerLayer = new SuperMap.Layer.Tianditu();
    tiandituLayer.id = "YX";
    tianMarkerLayer.id = "YXBZ";
    tiandituLayer.layerType = "img";
    tianMarkerLayer.layerType = "cia";
    tianMarkerLayer.isLabel = true;
    tiandituLayer.visibility = isshow;
    tianMarkerLayer.visibility = isshow;
    return [tiandituLayer, tianMarkerLayer];
  }
  getTDT_sl(isshow = true) {
    var tiandituLayer = new SuperMap.Layer.Tianditu();
    var tianMarkerLayer = new SuperMap.Layer.Tianditu();
    tiandituLayer.id = "SL";
    tianMarkerLayer.id = "SLBZ";
    tianMarkerLayer.layerType = "cva";
    tianMarkerLayer.isLabel = true;
    tiandituLayer.visibility = isshow;
    tianMarkerLayer.visibility = isshow;
    return [tiandituLayer, tianMarkerLayer];
  }
  /**
   * 初始化地图
   */
  init() {
    var map;
    map = new SuperMap.Map(this.mapcontainer, {
      controls: [new SuperMap.Control.Navigation({
        dragPanOptions: {
          enableKinetic: true
        }
      })],
      allOverlays: true,
      minZoom: 3
    });
    var layer_sl = this.getTDT_yx(false);
    var layer_yj = this.getTDT_sl(true);
    var layersArray = layer_sl.concat(layer_yj);
    map.addControl(new SuperMap.Control.MousePosition());
    map.addLayers(layersArray);
    map.setCenter(new SuperMap.LonLat(109.146, 32.198), 4);
    this["MAP"] = map;
  }
  loadTDT_YX() {
    var yx = this.MAP.getLayer("YX");
    var yxby = this.MAP.getLayer("YXBZ");
    var sl = this.MAP.getLayer("SL");
    var slby = this.MAP.getLayer("SLBZ");
    sl.setVisibility(false);
    slby.setVisibility(false);
    yx.setVisibility(true);
    yxby.setVisibility(true);
  }
  /**
   * 加载天地图矢量图层
   */
  loadTDT_SL() {
    var yx = this.MAP.getLayer("YX");
    var yxby = this.MAP.getLayer("YXBZ");
    var sl = this.MAP.getLayer("SL");
    var slby = this.MAP.getLayer("SLBZ");
    sl.setVisibility(true);
    slby.setVisibility(true);
    yx.setVisibility(false);
    yxby.setVisibility(false);
  }
  loadMapBar() {
    // 初始化复杂缩放控件类
    var panzoombar = new SuperMap.Control.PanZoomBar();
    // 是否显示滑动条，默认值为false
    panzoombar.showSlider = true;
    /*
     * 点击箭头移动地图时，所移动的距离占总距离（上下移动的总距离为高度，左右移动的总距离为宽度）的百分比，默认为null。
     * 例如：如果slideRatio 设为0.5, 则垂直上移地图半个地图高度.
     */
    panzoombar.slideRatio = 0.5;
    this.MAP.addControl(panzoombar);
    var doms = panzoombar.getDoms();
    var zoommaxextent = doms.zoommaxextent; // 罗盘中心的按钮
    var map = this.MAP;
    $(zoommaxextent).off("click").on("click", function () {
      map.setCenter(new SuperMap.LonLat(109.146, 32.198), 4);
    });
  }
  loadWMTS (name, url, layerid) {
    const wmtsname = name || "";
    let wmtskey;
    if (url.indexOf("igserver") > -1) {
      url = url.substring(0, url.indexOf("/1.0.0"));
      wmtskey = url.substring(url.indexOf('kvp/') + 4, url.indexOf('/WMTSServer'));
    } else if (url.indexOf("arcgis") > -1) {
      url = url.substring(0, url.indexOf("/tile"));
    }
    var wmtsUrl = url;
    var wmtsparam = {
      name: wmtsname,
      url: wmtsUrl,
      layer: wmtskey,
      style: "default",
      matrixSet: `EPSG:4326_${wmtskey}_028mm_GB`,
      format: "image/png",
      resolutions: this.resolutions,
      matrixIds: this.matrixIds,
      opacity: 0.7,
      requestEncoding: "KVP"
    };
    var layer = new SuperMap.Layer.WMTS(wmtsparam);
    this.MAP.addLayers([layer]);
  }
  loadWMS (name, url, layerid) {
    var url = "http://218.58.174.202:6163/igs/rest/ogc/doc/向城幅/WMSServer";
    let layers = '地层界线1校正.WP_0_1,边框校正.WL_0_1,道路村庄校正.WL_0_1,地层界线1校正.WL_0_1,断层线2校正.WL_0_1,其他线校正.WL_0_1,其他点校正.WT_0_1,图例点校正1.WT_0_1';
    var wms = new SuperMap.Layer.WMS("向城幅", url, {
      layers: layers,
      version: '1.1.1',
      transparent: true
    });
    wms.setOpacity(0.5);
    this.MAP.addLayers([wms]);
  }
  loadShowConlayer(selectfun, unselectfun) {
    // {renderers: ["Canvas2"]}
    let vectorLayer = new SuperMap.Layer.Vector("polygonLayer");
    let selectCtrl = new SuperMap.Control.SelectFeature(vectorLayer, {
      onSelect: function (feature) {
        selectfun(feature, vectorLayer);
      },
      onUnSelect: function (feature) {
        selectfun(feature, vectorLayer);
      },
      unSelect: function (feature) {
        selectfun(feature, vectorLayer);
      },
      hover: false,
      repeat: true,
      clickout: false
    });
    vectorLayer.style = this.drawStyle;
    this.MAP.addLayers([vectorLayer]);
    this.MAP.addControls([selectCtrl]);
    selectCtrl.activate();
    this.MAP.setLayerIndex(vectorLayer, 5);
    return vectorLayer;
  }
  startTxTool (drawCompleted) {
    let vectorLayer = new SuperMap.Layer.Vector("polygonLayer");
    // 几何圆查询
    let drawCircle = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.RegularPolygon, {
      handlerOptions: {
        sides: 50
      }
    });
    let drawPoint = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Point);
    let drawLine = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Path);
    let drawPolygon = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Polygon);
    let drawBox = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Box);
    let modifyCtrl = new SuperMap.Control.ModifyFeature(vectorLayer);
    let markerLayer = new SuperMap.Layer.Markers("Markers");
    this.MAP.addControls([drawPoint, drawCircle, drawLine, drawPolygon, drawBox, modifyCtrl]);
    vectorLayer.style = this.drawStyle;
    this.MAP.addLayers([vectorLayer, markerLayer]);
    this.MAP.setLayerIndex(vectorLayer, 4);
    drawCircle.events.on({
      "featureadded": drawCompleted
    });
    drawLine.events.on({
      "featureadded": drawCompleted
    });
    drawPolygon.events.on({
      "featureadded": drawCompleted
    });
    drawBox.events.on({
      "featureadded": drawCompleted
    });
    drawPoint.events.on({
      "featureadded": drawCompleted
    });
    var map = this.MAP;
    return {
      vectorLayer: vectorLayer,
      markerLayer: markerLayer,
      drawPoint: drawPoint,
      drawCircle: drawCircle,
      drawLine: drawLine,
      drawPolygon: drawPolygon,
      drawBox: drawBox,
      clearFeatures: function () {
        this.deactivateAll();
        vectorLayer.removeAllFeatures();
        markerLayer.clearMarkers();
        map.removeAllPopup();
      },
      deactivateAll: function () {
        drawPoint.deactivate();
        drawCircle.deactivate();
        drawLine.deactivate();
        drawPolygon.deactivate();
        drawBox.deactivate();
        modifyCtrl.deactivate();
      }
    }
  }
}
