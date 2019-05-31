/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(f){"object"===typeof module&&module.exports?(f["default"]=f,module.exports=f):"function"===typeof define&&define.amd?define(function(){return f}):f("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(f){(function(e){var f=e.seriesType,n=e.merge,k=e.defined,l=e.seriesTypes.sma,m=e.seriesTypes.ema,p=e.correctFloat;f("macd","sma",{params:{shortPeriod:12,longPeriod:26,signalPeriod:9,period:26},signalLine:{zones:[],styles:{lineWidth:1,lineColor:void 0}},macdLine:{zones:[],styles:{lineWidth:1,
lineColor:void 0}},threshold:0,groupPadding:.1,pointPadding:.1,states:{hover:{halo:{size:0}}},tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eValue: {point.MACD}\x3cbr/\x3eSignal: {point.signal}\x3cbr/\x3eHistogram: {point.y}\x3cbr/\x3e'},dataGrouping:{approximation:"averages"},minPointLength:0},{nameComponents:["longPeriod","shortPeriod","signalPeriod"],requiredIndicators:["ema"],pointArrayMap:["y","signal","MACD"],
parallelArrays:["x","y","signal","MACD"],pointValKey:"y",markerAttribs:e.noop,getColumnMetrics:e.seriesTypes.column.prototype.getColumnMetrics,crispCol:e.seriesTypes.column.prototype.crispCol,init:function(){l.prototype.init.apply(this,arguments);this.options&&(this.options=n({signalLine:{styles:{lineColor:this.color}},macdLine:{styles:{color:this.color}}},this.options),this.macdZones={zones:this.options.macdLine.zones,startIndex:0},this.signalZones={zones:this.macdZones.zones.concat(this.options.signalLine.zones),
startIndex:this.macdZones.zones.length},this.resetZones=!0)},toYData:function(a){return[a.y,a.signal,a.MACD]},translate:function(){var a=this,b=["plotSignal","plotMACD"];e.seriesTypes.column.prototype.translate.apply(a);a.points.forEach(function(d){[d.signal,d.MACD].forEach(function(c,e){null!==c&&(d[b[e]]=a.yAxis.toPixels(c,!0))})})},destroy:function(){this.graph=null;this.graphmacd=this.graphmacd&&this.graphmacd.destroy();this.graphsignal=this.graphsignal&&this.graphsignal.destroy();l.prototype.destroy.apply(this,
arguments)},drawPoints:e.seriesTypes.column.prototype.drawPoints,drawGraph:function(){for(var a=this,b=a.points,d=b.length,c=a.options,e=a.zones,f={options:{gapSize:c.gapSize}},h=[[],[]],g;d--;)g=b[d],k(g.plotMACD)&&h[0].push({plotX:g.plotX,plotY:g.plotMACD,isNull:!k(g.plotMACD)}),k(g.plotSignal)&&h[1].push({plotX:g.plotX,plotY:g.plotSignal,isNull:!k(g.plotMACD)});["macd","signal"].forEach(function(b,d){a.points=h[d];a.options=n(c[b+"Line"].styles,f);a.graph=a["graph"+b];a.currentLineZone=b+"Zones";
a.zones=a[a.currentLineZone].zones;l.prototype.drawGraph.call(a);a["graph"+b]=a.graph});a.points=b;a.options=c;a.zones=e;a.currentLineZone=null},getZonesGraphs:function(a){var b=l.prototype.getZonesGraphs.call(this,a),d=b;this.currentLineZone&&(d=b.splice(this[this.currentLineZone].startIndex+1),d.length?d.splice(0,0,a[0]):d=[a[0]]);return d},applyZones:function(){var a=this.zones;this.zones=this.signalZones.zones;l.prototype.applyZones.call(this);this.options.macdLine.zones.length&&this.graphmacd.hide();
this.zones=a},getValues:function(a,b){var d=0,c=[],e=[],f=[],h,g;if(a.xData.length<b.longPeriod+b.signalPeriod)return!1;h=m.prototype.getValues(a,{period:b.shortPeriod});g=m.prototype.getValues(a,{period:b.longPeriod});h=h.values;g=g.values;for(a=1;a<=h.length;a++)k(g[a-1])&&k(g[a-1][1])&&k(h[a+b.shortPeriod+1])&&k(h[a+b.shortPeriod+1][0])&&c.push([h[a+b.shortPeriod+1][0],0,null,h[a+b.shortPeriod+1][1]-g[a-1][1]]);for(a=0;a<c.length;a++)e.push(c[a][0]),f.push([0,null,c[a][3]]);b=m.prototype.getValues({xData:e,
yData:f},{period:b.signalPeriod,index:2});b=b.values;for(a=0;a<c.length;a++)c[a][0]>=b[0][0]&&(c[a][2]=b[d][1],f[a]=[0,b[d][1],c[a][3]],null===c[a][3]?(c[a][1]=0,f[a][0]=0):(c[a][1]=p(c[a][3]-b[d][1]),f[a][0]=p(c[a][3]-b[d][1])),d++);return{values:c,xData:e,yData:f}}})})(f)});
//# sourceMappingURL=macd.js.map