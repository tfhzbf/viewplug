/**
 * @description 获取集合图形样式
 * @returns
 */
function maplisting_getGeometryStyle(data, type, index) {
  var style = {}
  switch (type) {
    case "点":
      style = {
        fillColor: data.COLOR,
        fillOpacity: 0.7,
        strokeColor: data.COLOR,
        strokeOpacity: 0.7,
        pointRadius: 7,
        label: data.TITLE,
        fontColor: data.COLOR,
        graphZIndex: index
      }
      break;
    case "点图标":
      style = {
        label: data.TB,
        fontFamily: "icomoon",
        labelAlign: 'cm',
        fontColor: data.COLOR,
        fontSize: 35 + "px",
        labelRotation: data.FW,
        labelSelect: true,
        pointRadius: 20,
        fillColor: 'transparent',
        strokeColor: 'transparent',
        graphZIndex: index
      }
      break;
    case "线":
      style = {
        fillColor: data.COLOR,
        strokeColor: data.COLOR,
        label: data.TITLE,
        labelAlign: 'cm',
        fontColor: data.COLOR,
        strokeWidth: 4,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeDashstyle: "solid",
        labelSelect: true,
        graphZIndex: index
      }
      break;
    case "面":
      style = {
        fillColor: data.COLOR,
        fillOpacity: 0.3,
        strokeColor: data.COLOR,
        strokeOpacity: 0.6,
        strokeWidth: 4,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeDashstyle: "solid",
        label: data.TITLE,
        labelAlign: 'cm',
        fontColor: data.COLOR,
        labelSelect: true,
        graphZIndex: index
      }
      break;
    default:
      style = null;
  }
  return style;
}

/**
 * @description 地图覆盖物加载_多边形
 * @returns
 */
function maplisting_Graphical_polygon(index, data, vectorLayer) {
  var rowkey = data.ROWKEY;
  var txArray = data.TXARRAY;
  if (txArray.length == 0) txArray = [
    [{
      X: 0,
      Y: 0
    }]
  ];
  let ringArray = new Array();
  for (var k = 0; k < txArray.length; k++) {
    var pointsArary = new Array();
    var array = txArray[k];
    for (var j = 0; j < array.length; j++) {
      var obj = array[j];
      pointsArary.push(new SuperMap.Geometry.Point(obj.X, obj.Y))
    }
    var linearRings = new SuperMap.Geometry.LinearRing(pointsArary);
    ringArray.push(linearRings);
  }
  var region = new SuperMap.Geometry.Polygon(ringArray);
  var pointFeature = new SuperMap.Feature.Vector(region, {
    ROWKEY: rowkey
  }, maplisting_getGeometryStyle(data, "面", index));
  pointFeature.rowkey = rowkey;
  pointFeature.info = data.INFO;
  pointFeature.FL = data.FL;
  pointFeature.color = data.COLOR;
  pointFeature.TXDATA = data;
  vectorLayer.addFeatures(pointFeature);
}

/**
 * @description 地图覆盖物加载_线
 * @returns
 */
function maplisting_Graphical_Line(index, data, vectorLayer) {
  var rowkey = data.ROWKEY;
  var txArray = data.TXARRAY;
  if (txArray.length == 0) txArray = [
    [{
      X: 0,
      Y: 0
    }]
  ];
  for (var k = 0; k < txArray.length; k++) {
    var pointsArary = new Array();
    var array = txArray[k];
    for (var j = 0; j < array.length; j++) {
      var obj = array[j];
      pointsArary.push(new SuperMap.Geometry.Point(obj.X, obj.Y))
    }
    var region = new SuperMap.Geometry.LineString(pointsArary);
    var pointFeature = new SuperMap.Feature.Vector(region, null, maplisting_getGeometryStyle(data, "线", index));
    pointFeature.rowkey = rowkey;
    pointFeature.info = data.INFO;
    pointFeature.FL = data.FL;
    pointFeature.color = data.COLOR;
    pointFeature.TXDATA = data;
    vectorLayer.addFeatures(pointFeature);
  }
}

/**
 * @description 地图覆盖物加载_点
 * @returns
 */
function maplisting_Graphical_Point(index, data, vectorLayer) {
  var rowkey = data.ROWKEY;
  var txArray = data.TXARRAY;
  for (var i = 0; i < txArray.length; i++) {
    var tx_point = txArray[i];
    var geometry = new SuperMap.Geometry.Point(tx_point.X, tx_point.Y);
    var pointFeature = null;
    if (data.TB) {
      pointFeature = new SuperMap.Feature.Vector(geometry, null, maplisting_getGeometryStyle(data, "点图标", index));
    } else {
      pointFeature = new SuperMap.Feature.Vector(geometry, null, maplisting_getGeometryStyle(data, "点", index));
    }
    pointFeature.rowkey = rowkey;
    pointFeature.info = data.INFO;
    pointFeature.FL = data.FL;
    pointFeature.color = data.COLOR;
    pointFeature.TXDATA = data;
    vectorLayer.addFeatures(pointFeature);
  }
}

export default {
  addGraphical: function (mapdata, vectorLayer) {
    let mianArray = new Array();
    let otherArray = new Array();
    for (var i = 0; i < mapdata.length; i++) {
      var data = mapdata[i];
      var txlx = data.TXLX;
      if ("面" == txlx) {
        mianArray.push(data);
      } else {
        otherArray.push(data);
      }
    }
    mapdata = mianArray.concat(otherArray);
    for (var i = 0; i < mapdata.length; i++) {
      var data = mapdata[i];
      var txlx = data.TXLX;
      if ("面" == txlx) {
        maplisting_Graphical_polygon(i, data, vectorLayer);
      } else if ("点" == txlx) {
        maplisting_Graphical_Point(i, data, vectorLayer);
      } else if ("线" == txlx) {
        maplisting_Graphical_Line(i, data, vectorLayer);
      }
    }
  },
  maplisting_getInfoHtml(info) {
    var html = '';
    for (var i = 0; i < info.length; i++) {
      var obj = info[i];
      var btmc = obj["BTMC"];
      var sx_z = (obj["SX_Z"] || "").replace(/<[^>]+>/g, "");
      var dz_mc = (obj["DW_MC"] || "");
      html += `<div><span>${btmc}：</span><span>${sx_z}${dz_mc}</span></div>`;
    }
    return `<div style="color:#000">${html}</div>`;
  },
  maplisting_getButton(shownr, attrHTML, className) {
    return '<button class="layui-btn ' + className + ' buttonNew" ' + attrHTML + ' >' + shownr + '</button>';
  }
  
}
