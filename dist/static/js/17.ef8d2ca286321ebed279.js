webpackJsonp([17],{"+n9u":function(e,t,n){var r=n("VU/8")(n("6qAD"),n("fl/s"),null,null);e.exports=r.exports},"6qAD":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("U7mS"),i=n.n(r),a=n("M4fF"),o=(n.n(a),n("I8NT"));t.default={mixins:[o.a],methods:{backButtonAction:function(){this.companyAuthVisible?this.$refs.companyAuthRounded.backButtonAction():this.popupInputVisible?this.popupInputVisible=!1:this.routerBack()},showPreview:function(e){var t=this,n=new Image;n.src=e,n.onload=function(){t.avatar.previewUrl=e,t.user.avatar=e,t.$indicator.close()}},avatarChange:function(e){var t=this,n=e.target.files[0];n&&(this.$indicator.open({spinnerType:"double-bounce"}),i()(n,{quality:.7}).then(function(e){t.avatar.rst=e,t.showPreview(e.base64)}).catch(function(e){t.$indicator.close(),t.$toast(e||"上传失败","error")}))},showPopupInput:function(e){this.$refs.popupInput.init(e),console.log(e),this.popupInputVisible=!0},popInputConfirm:function(e){this.popupInputVisible=!1,this.user[e.customType]=e.value},goCompanyCertify:function(){"passed"===this.user.status?this.$router.push({name:"companyAuth"}):this.$toast("请先实名认证")}},computed:{userRealNameReadOnly:function(){return n.i(a.includes)(["checking","passed"],this.user.status)},companyAuthReadOnly:function(){return n.i(a.includes)(["checking","passed"],this.user.company.status)}},data:function(){return{popupInputVisible:!1,companyAuthVisible:!1,user:n.i(a.cloneDeep)(this.$store.getters.user),avatar:{rst:{},file:null,previewUrl:n("Q8nE"),previewImgStyle:{}}}}}},I8NT:function(e,t,n){"use strict";var r=n("M4fF"),i=(n.n(r),n("oiih")),a=[{label:"品牌4s店",value:1},{label:"港口商家",value:2},{label:"综合展厅",value:3},{label:"资源公司",value:4}],o=[{label:"待下单",value:1},{label:"已下单",value:2},{label:"待验车",value:3},{label:"已提车",value:4},{label:"已发运",value:5},{label:"在途中",value:6},{label:"已运抵",value:7},{label:"已完成",value:8},{label:"已作废",value:9}],l=[{label:"待验车",value:1},{label:"待发运",value:2},{label:"在途",value:3},{label:"到达",value:4},{label:"完成",value:5},{label:"失效",value:6}],s=[{label:"大板车",value:1},{label:"救援车",value:2}],u=[{label:"仓库",value:i.e.TO_WAREHOURSE},{label:"到店",value:i.e.TO_SHOP}],c=[{label:"销售主管",value:1},{label:"销售顾问",value:2},{label:"管理员",value:3}],f=[{label:"签章成功",label2:"可提车",value:1},{label:"未签章",label2:"不可提车",value:2}],h=[{label:"未认证",value:"initial"},{label:"已认证",value:"passed"},{label:"审核中",value:"checking"},{label:"认证失败",value:"rejected"}],d=[{label:"未读",value:"1"},{label:"已读",value:"2"}],p=n.i(r.keyBy)(a,"value"),g=n.i(r.keyBy)(o,"value"),m=n.i(r.keyBy)(l,"value"),v=n.i(r.keyBy)(s,"value"),w=n.i(r.keyBy)(u,"value"),y=n.i(r.keyBy)(c,"value"),b=n.i(r.keyBy)(f,"value"),S=n.i(r.keyBy)(h,"value"),I=n.i(r.keyBy)(d,"value");t.a={filters:{companyTypeFormat:function(e){return p[e]?p[e].label:""},wayBillStatusFormat:function(e){return g[e]?g[e].label:""},wayBillVehicleStatusFormat:function(e){return m[e]?m[e].label:""},transportTypeFormat:function(e){return v[e]?v[e].label:""},deliveryTypeFormat:function(e){return w[e]?w[e].label:""},jobTypeFormat:function(e){return y[e]?y[e].label:""},pickCarLetterStatusFormat:function(e){return b[e]?b[e].label:""},pickCarLetterStatusFormat2:function(e){return b[e]?b[e].label2:""},certifyStatusFormat:function(e){return S[e]?S[e].label:""},messageStatusFormat:function(e){return I[e]?I[e].label:""}},methods:{headerClose:function(){this.$router.push({name:"mine"})}},data:function(){return{companyTypeList:a,companyTypeMap:p,wayBillStatusList:o,wayBillStatusMap:g,wayBillVehicleStatusList:l,wayBillVehicleStatusMap:m,transportTypeList:s,transportTypeMap:v,deliveryTypeList:u,deliveryTypeMap:w,jobTypeList:c,jobTypeMap:y,pickCarStatusList:f,pickCarStatusMap:b,certifyStatusList:h,certifyStatusMap:S,messageStatusList:d,messageStatusMap:I}}}},Q8nE:function(e,t,n){e.exports=n.p+"static/img/default-avatar.6ac272e.svg"},U7mS:function(e,t,n){!function(t,n){e.exports=n()}(0,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){n(6),n(7),e.exports=n(8)},function(e,t,n){(function(t){!function(n){function r(e,t){return function(){e.apply(t,arguments)}}function i(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],c(e,r(o,this),r(l,this))}function a(e){var t=this;return null===this._state?void this._deferreds.push(e):void f(function(){var n=t._state?e.onFulfilled:e.onRejected;if(null===n)return void(t._state?e.resolve:e.reject)(t._value);var r;try{r=n(t._value)}catch(t){return void e.reject(t)}e.resolve(r)})}function o(e){try{if(e===this)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var t=e.then;if("function"==typeof t)return void c(r(t,e),r(o,this),r(l,this))}this._state=!0,this._value=e,s.call(this)}catch(e){l.call(this,e)}}function l(e){this._state=!1,this._value=e,s.call(this)}function s(){for(var e=0,t=this._deferreds.length;t>e;e++)a.call(this,this._deferreds[e]);this._deferreds=null}function u(e,t,n,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.resolve=n,this.reject=r}function c(e,t,n){var r=!1;try{e(function(e){r||(r=!0,t(e))},function(e){r||(r=!0,n(e))})}catch(e){if(r)return;r=!0,n(e)}}var f="function"==typeof t&&t||function(e){setTimeout(e,1)},h=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=this;return new i(function(r,i){a.call(n,new u(e,t,r,i))})},i.all=function(){var e=Array.prototype.slice.call(1===arguments.length&&h(arguments[0])?arguments[0]:arguments);return new i(function(t,n){function r(a,o){try{if(o&&("object"==typeof o||"function"==typeof o)){var l=o.then;if("function"==typeof l)return void l.call(o,function(e){r(a,e)},n)}e[a]=o,0==--i&&t(e)}catch(e){n(e)}}if(0===e.length)return t([]);for(var i=e.length,a=0;a<e.length;a++)r(a,e[a])})},i.resolve=function(e){return e&&"object"==typeof e&&e.constructor===i?e:new i(function(t){t(e)})},i.reject=function(e){return new i(function(t,n){n(e)})},i.race=function(e){return new i(function(t,n){for(var r=0,i=e.length;i>r;r++)e[r].then(t,n)})},i._setImmediateFn=function(e){f=e},i.prototype.always=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){throw n})})},void 0!==e&&e.exports?e.exports=i:n.Promise||(n.Promise=i)}(this)}).call(t,n(2).setImmediate)},function(e,t,n){(function(e,r){function i(e,t){this._id=e,this._clearFn=t}var a=n(3).nextTick,o=Function.prototype.apply,l=Array.prototype.slice,s={},u=0;t.setTimeout=function(){return new i(o.call(setTimeout,window,arguments),clearTimeout)},t.setInterval=function(){return new i(o.call(setInterval,window,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(window,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},t.setImmediate="function"==typeof e?e:function(e){var n=u++,r=!(arguments.length<2)&&l.call(arguments,1);return s[n]=!0,a(function(){s[n]&&(r?e.apply(null,r):e.call(null),t.clearImmediate(n))}),n},t.clearImmediate="function"==typeof r?r:function(e){delete s[e]}}).call(t,n(2).setImmediate,n(2).clearImmediate)},function(e,t){function n(){u=!1,o.length?s=o.concat(s):c=-1,s.length&&r()}function r(){if(!u){var e=setTimeout(n);u=!0;for(var t=s.length;t;){for(o=s,s=[];++c<t;)o&&o[c].run();c=-1,t=s.length}o=null,u=!1,clearTimeout(e)}}function i(e,t){this.fun=e,this.array=t}function a(){}var o,l=e.exports={},s=[],u=!1,c=-1;l.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];s.push(new i(e,t)),1!==s.length||u||setTimeout(r,0)},i.prototype.run=function(){this.fun.apply(null,this.array)},l.title="browser",l.browser=!0,l.env={},l.argv=[],l.version="",l.versions={},l.on=a,l.addListener=a,l.once=a,l.off=a,l.removeListener=a,l.removeAllListeners=a,l.emit=a,l.binding=function(e){throw new Error("process.binding is not supported")},l.cwd=function(){return"/"},l.chdir=function(e){throw new Error("process.chdir is not supported")},l.umask=function(){return 0}},function(e,t){var n=function(){try{return new Blob,!0}catch(e){return!1}}()?window.Blob:function(e,t){var n=new(window.BlobBuilder||window.WebKitBlobBuilder||window.MSBlobBuilder||window.MozBlobBuilder);return e.forEach(function(e){n.append(e)}),n.getBlob(t?t.type:void 0)},r=function(){function e(){var e=this,r=[],i=Array(21).join("-")+(+new Date*(1e16*Math.random())).toString(36),a=XMLHttpRequest.prototype.send;this.getParts=function(){return r.toString()},this.append=function(e,t,n){r.push("--"+i+'\r\nContent-Disposition: form-data; name="'+e+'"'),t instanceof Blob?(r.push('; filename="'+(n||"blob")+'"\r\nContent-Type: '+t.type+"\r\n\r\n"),r.push(t)):r.push("\r\n\r\n"+t),r.push("\r\n")},t++,XMLHttpRequest.prototype.send=function(o){var l,s,u=this;o===e?(r.push("--"+i+"--\r\n"),s=new n(r),l=new FileReader,l.onload=function(){a.call(u,l.result)},l.onerror=function(e){throw e},l.readAsArrayBuffer(s),this.setRequestHeader("Content-Type","multipart/form-data; boundary="+i),0==--t&&(XMLHttpRequest.prototype.send=a)):a.call(this,o)}}var t=0;return e.prototype=Object.create(FormData.prototype),e}();e.exports={Blob:n,FormData:function(){return~navigator.userAgent.indexOf("Android")&&~navigator.vendor.indexOf("Google")&&!~navigator.userAgent.indexOf("Chrome")&&navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop()<=534||/MQQBrowser/g.test(navigator.userAgent)}()?r:FormData}},function(e,t,n){var r,i;(function(){function n(e){return!!e.exifdata}function a(e,t){t=t||e.match(/^data\:([^\;]+)\;base64,/im)[1]||"",e=e.replace(/^data\:([^\;]+)\;base64,/gim,"");for(var n=atob(e),r=n.length,i=new ArrayBuffer(r),a=new Uint8Array(i),o=0;r>o;o++)a[o]=n.charCodeAt(o);return i}function o(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="blob",n.onload=function(e){(200==this.status||0===this.status)&&t(this.response)},n.send()}function l(e,t){function n(n){var r=s(n),i=u(n);e.exifdata=r||{},e.iptcdata=i||{},t&&t.call(e)}if(e.src)if(/^data\:/i.test(e.src)){var r=a(e.src);n(r)}else if(/^blob\:/i.test(e.src)){var i=new FileReader;i.onload=function(e){n(e.target.result)},o(e.src,function(e){i.readAsArrayBuffer(e)})}else{var l=new XMLHttpRequest;l.onload=function(){200==this.status||0===this.status?n(l.response):t(new Error("Could not load image")),l=null},l.open("GET",e.src,!0),l.responseType="arraybuffer",l.send(null)}else if(window.FileReader&&(e instanceof window.Blob||e instanceof window.File)){var i=new FileReader;i.onload=function(e){g&&console.log("Got file of length "+e.target.result.byteLength),n(e.target.result)},i.readAsArrayBuffer(e)}}function s(e){var t=new DataView(e);if(g&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return g&&console.log("Not a valid JPEG"),!1;for(var n,r=2,i=e.byteLength;i>r;){if(255!=t.getUint8(r))return g&&console.log("Not a valid marker at offset "+r+", found: "+t.getUint8(r)),!1;if(n=t.getUint8(r+1),g&&console.log(n),225==n)return g&&console.log("Found 0xFFE1 marker"),p(t,r+4,t.getUint16(r+2));r+=2+t.getUint16(r+2)}}function u(e){var t=new DataView(e);if(g&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return g&&console.log("Not a valid JPEG"),!1;for(var n=2,r=e.byteLength;r>n;){if(function(e,t){return 56===e.getUint8(t)&&66===e.getUint8(t+1)&&73===e.getUint8(t+2)&&77===e.getUint8(t+3)&&4===e.getUint8(t+4)&&4===e.getUint8(t+5)}(t,n)){var i=t.getUint8(n+7);i%2!=0&&(i+=1),0===i&&(i=4);return c(e,n+8+i,t.getUint16(n+6+i))}n++}}function c(e,t,n){for(var r,i,a,o,l=new DataView(e),s={},u=t;t+n>u;)28===l.getUint8(u)&&2===l.getUint8(u+1)&&(o=l.getUint8(u+2))in S&&(a=l.getInt16(u+3),a+5,i=S[o],r=d(l,u+5,a),s.hasOwnProperty(i)?s[i]instanceof Array?s[i].push(r):s[i]=[s[i],r]:s[i]=r),u++;return s}function f(e,t,n,r,i){var a,o,l,s=e.getUint16(n,!i),u={};for(l=0;s>l;l++)a=n+12*l+2,o=r[e.getUint16(a,!i)],!o&&g&&console.log("Unknown tag: "+e.getUint16(a,!i)),u[o]=h(e,a,t,n,i);return u}function h(e,t,n,r,i){var a,o,l,s,u,c,f=e.getUint16(t+2,!i),h=e.getUint32(t+4,!i),p=e.getUint32(t+8,!i)+n;switch(f){case 1:case 7:if(1==h)return e.getUint8(t+8,!i);for(a=h>4?p:t+8,o=[],s=0;h>s;s++)o[s]=e.getUint8(a+s);return o;case 2:return a=h>4?p:t+8,d(e,a,h-1);case 3:if(1==h)return e.getUint16(t+8,!i);for(a=h>2?p:t+8,o=[],s=0;h>s;s++)o[s]=e.getUint16(a+2*s,!i);return o;case 4:if(1==h)return e.getUint32(t+8,!i);for(o=[],s=0;h>s;s++)o[s]=e.getUint32(p+4*s,!i);return o;case 5:if(1==h)return u=e.getUint32(p,!i),c=e.getUint32(p+4,!i),l=new Number(u/c),l.numerator=u,l.denominator=c,l;for(o=[],s=0;h>s;s++)u=e.getUint32(p+8*s,!i),c=e.getUint32(p+4+8*s,!i),o[s]=new Number(u/c),o[s].numerator=u,o[s].denominator=c;return o;case 9:if(1==h)return e.getInt32(t+8,!i);for(o=[],s=0;h>s;s++)o[s]=e.getInt32(p+4*s,!i);return o;case 10:if(1==h)return e.getInt32(p,!i)/e.getInt32(p+4,!i);for(o=[],s=0;h>s;s++)o[s]=e.getInt32(p+8*s,!i)/e.getInt32(p+4+8*s,!i);return o}}function d(e,t,n){var r,i="";for(r=t;t+n>r;r++)i+=String.fromCharCode(e.getUint8(r));return i}function p(e,t){if("Exif"!=d(e,t,4))return g&&console.log("Not valid EXIF data! "+d(e,t,4)),!1;var n,r,i,a,o,l=t+6;if(18761==e.getUint16(l))n=!1;else{if(19789!=e.getUint16(l))return g&&console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),!1;n=!0}if(42!=e.getUint16(l+2,!n))return g&&console.log("Not valid TIFF data! (no 0x002A)"),!1;var s=e.getUint32(l+4,!n);if(8>s)return g&&console.log("Not valid TIFF data! (First offset less than 8)",e.getUint32(l+4,!n)),!1;if(r=f(e,l,l+s,w,n),r.ExifIFDPointer){a=f(e,l,l+r.ExifIFDPointer,v,n);for(i in a){switch(i){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":a[i]=b[i][a[i]];break;case"ExifVersion":case"FlashpixVersion":a[i]=String.fromCharCode(a[i][0],a[i][1],a[i][2],a[i][3]);break;case"ComponentsConfiguration":a[i]=b.Components[a[i][0]]+b.Components[a[i][1]]+b.Components[a[i][2]]+b.Components[a[i][3]]}r[i]=a[i]}}if(r.GPSInfoIFDPointer){o=f(e,l,l+r.GPSInfoIFDPointer,y,n);for(i in o){switch(i){case"GPSVersionID":o[i]=o[i][0]+"."+o[i][1]+"."+o[i][2]+"."+o[i][3]}r[i]=o[i]}}return r}var g=!1,m=function(e){return e instanceof m?e:this instanceof m?void(this.EXIFwrapped=e):new m(e)};void 0!==e&&e.exports&&(t=e.exports=m),t.EXIF=m;var v=m.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"},w=m.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},y=m.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"},b=m.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}},S={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};m.getData=function(e,t){return!((e instanceof Image||e instanceof HTMLImageElement)&&!e.complete)&&(n(e)?t&&t.call(e):l(e,t),!0)},m.getTag=function(e,t){return n(e)?e.exifdata[t]:void 0},m.getAllTags=function(e){if(!n(e))return{};var t,r=e.exifdata,i={};for(t in r)r.hasOwnProperty(t)&&(i[t]=r[t]);return i},m.pretty=function(e){if(!n(e))return"";var t,r=e.exifdata,i="";for(t in r)r.hasOwnProperty(t)&&(i+="object"==typeof r[t]?r[t]instanceof Number?t+" : "+r[t]+" ["+r[t].numerator+"/"+r[t].denominator+"]\r\n":t+" : ["+r[t].length+" values]\r\n":t+" : "+r[t]+"\r\n");return i},m.readFromBinaryFile=function(e){return s(e)},r=[],void 0!==(i=function(){return m}.apply(t,r))&&(e.exports=i)}).call(this)},function(e,t,n){var r,i;!function(){function n(e){var t=e.naturalWidth;if(t*e.naturalHeight>1048576){var n=document.createElement("canvas");n.width=n.height=1;var r=n.getContext("2d");return r.drawImage(e,1-t,0),0===r.getImageData(0,0,1,1).data[3]}return!1}function a(e,t,n){var r=document.createElement("canvas");r.width=1,r.height=n;var i=r.getContext("2d");i.drawImage(e,0,0);for(var a=i.getImageData(0,0,1,n).data,o=0,l=n,s=n;s>o;){0===a[4*(s-1)+3]?l=s:o=s,s=l+o>>1}var u=s/n;return 0===u?1:u}function o(e,t,n){var r=document.createElement("canvas");return l(e,r,t,n),r.toDataURL("image/jpeg",t.quality||.8)}function l(e,t,r,i){var o=e.naturalWidth,l=e.naturalHeight,u=r.width,c=r.height,f=t.getContext("2d");f.save(),s(t,f,u,c,r.orientation),n(e)&&(o/=2,l/=2);var h=1024,d=document.createElement("canvas");d.width=d.height=h;for(var p=d.getContext("2d"),g=i?a(e,o,l):1,m=Math.ceil(h*u/o),v=Math.ceil(h*c/l/g),w=0,y=0;l>w;){for(var b=0,S=0;o>b;)p.clearRect(0,0,h,h),p.drawImage(e,-b,-w),f.drawImage(d,0,0,h,h,S,y,m,v),b+=h,S+=m;w+=h,y+=v}f.restore(),d=p=null}function s(e,t,n,r,i){switch(i){case 5:case 6:case 7:case 8:e.width=r,e.height=n;break;default:e.width=n,e.height=r}switch(i){case 2:t.translate(n,0),t.scale(-1,1);break;case 3:t.translate(n,r),t.rotate(Math.PI);break;case 4:t.translate(0,r),t.scale(1,-1);break;case 5:t.rotate(.5*Math.PI),t.scale(1,-1);break;case 6:t.rotate(.5*Math.PI),t.translate(0,-r);break;case 7:t.rotate(.5*Math.PI),t.translate(n,-r),t.scale(-1,1);break;case 8:t.rotate(-.5*Math.PI),t.translate(-n,0)}}function u(e){if(window.Blob&&e instanceof Blob){var t=new Image,n=window.URL&&window.URL.createObjectURL?window.URL:window.webkitURL&&window.webkitURL.createObjectURL?window.webkitURL:null;if(!n)throw Error("No createObjectURL function found to create blob url");t.src=n.createObjectURL(e),this.blob=e,e=t}if(!e.naturalWidth&&!e.naturalHeight){var r=this;e.onload=function(){var e=r.imageLoadListeners;if(e){r.imageLoadListeners=null;for(var t=0,n=e.length;n>t;t++)e[t]()}},this.imageLoadListeners=[]}this.srcImage=e}u.prototype.render=function(e,t,n){if(this.imageLoadListeners){var r=this;return void this.imageLoadListeners.push(function(){r.render(e,t,n)})}t=t||{};var i=this.srcImage,a=i.src,s=a.length,u=i.naturalWidth,c=i.naturalHeight,f=t.width,h=t.height,d=t.maxWidth,p=t.maxHeight,g=this.blob&&"image/jpeg"===this.blob.type||0===a.indexOf("data:image/jpeg")||a.indexOf(".jpg")===s-4||a.indexOf(".jpeg")===s-5;f&&!h?h=c*f/u<<0:h&&!f?f=u*h/c<<0:(f=u,h=c),d&&f>d&&(f=d,h=c*f/u<<0),p&&h>p&&(h=p,f=u*h/c<<0);var m={width:f,height:h};for(var v in t)m[v]=t[v];var w=e.tagName.toLowerCase();"img"===w?e.src=o(this.srcImage,m,g):"canvas"===w&&l(this.srcImage,e,m,g),"function"==typeof this.onrender&&this.onrender(e),n&&n()},r=[],void 0!==(i=function(){return u}.apply(t,r))&&(e.exports=i)}()},function(e,t){function n(e){function t(e){for(var t=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99],n=0;64>n;n++){var r=P((t[n]*e+50)/100);1>r?r=1:r>255&&(r=255),F[j[n]]=r}for(var i=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],a=0;64>a;a++){var o=P((i[a]*e+50)/100);1>o?o=1:o>255&&(o=255),C[j[a]]=o}for(var l=[1,1.387039845,1.306562965,1.175875602,1,.785694958,.5411961,.275899379],s=0,u=0;8>u;u++)for(var c=0;8>c;c++)T[s]=1/(F[j[s]]*l[u]*l[c]*8),x[s]=1/(C[j[s]]*l[u]*l[c]*8),s++}function n(e,t){for(var n=0,r=0,i=new Array,a=1;16>=a;a++){for(var o=1;o<=e[a];o++)i[t[r]]=[],i[t[r]][0]=n,i[t[r]][1]=a,r++,n++;n*=2}return i}function r(){w=n(N,V),y=n(q,z),b=n(H,W),S=n(X,$)}function i(){for(var e=1,t=2,n=1;15>=n;n++){for(var r=e;t>r;r++)U[32767+r]=n,D[32767+r]=[],D[32767+r][1]=n,D[32767+r][0]=r;for(var i=-(t-1);-e>=i;i++)U[32767+i]=n,D[32767+i]=[],D[32767+i][1]=n,D[32767+i][0]=t-1+i;e<<=1,t<<=1}}function a(){for(var e=0;256>e;e++)_[e]=19595*e,_[e+256>>0]=38470*e,_[e+512>>0]=7471*e+32768,_[e+768>>0]=-11059*e,_[e+1024>>0]=-21709*e,_[e+1280>>0]=32768*e+8421375,_[e+1536>>0]=-27439*e,_[e+1792>>0]=-5329*e}function o(e){for(var t=e[0],n=e[1]-1;n>=0;)t&1<<n&&(k|=1<<M),n--,0>--M&&(255==k?(l(255),l(0)):l(k),M=7,k=0)}function l(e){R.push(E[e])}function s(e){l(e>>8&255),l(255&e)}function u(e,t){var n,r,i,a,o,l,s,u,c,f=0;for(c=0;8>c;++c){n=e[f],r=e[f+1],i=e[f+2],a=e[f+3],o=e[f+4],l=e[f+5],s=e[f+6],u=e[f+7];var h=n+u,d=n-u,p=r+s,g=r-s,m=i+l,v=i-l,w=a+o,y=a-o,b=h+w,S=h-w,I=p+m,P=p-m;e[f]=b+I,e[f+4]=b-I;var F=.707106781*(P+S);e[f+2]=S+F,e[f+6]=S-F,b=y+v,I=v+g,P=g+d;var C=.382683433*(b-P),T=.5411961*b+C,x=1.306562965*P+C,D=.707106781*I,U=d+D,L=d-D;e[f+5]=L+T,e[f+3]=L-T,e[f+1]=U+x,e[f+7]=U-x,f+=8}for(f=0,c=0;8>c;++c){n=e[f],r=e[f+8],i=e[f+16],a=e[f+24],o=e[f+32],l=e[f+40],s=e[f+48],u=e[f+56];var R=n+u,k=n-u,M=r+s,B=r-s,O=i+l,G=i-l,E=a+o,_=a-o,j=R+E,N=R-E,V=M+O,H=M-O;e[f]=j+V,e[f+32]=j-V;var W=.707106781*(H+N);e[f+16]=N+W,e[f+48]=N-W,j=_+G,V=G+B,H=B+k;var q=.382683433*(j-H),z=.5411961*j+q,X=1.306562965*H+q,$=.707106781*V,Q=k+$,Y=k-$;e[f+40]=Y+z,e[f+24]=Y-z,e[f+8]=Q+X,e[f+56]=Q-X,f++}var K;for(c=0;64>c;++c)K=e[c]*t[c],A[c]=K>0?K+.5|0:K-.5|0;return A}function c(){s(65504),s(16),l(74),l(70),l(73),l(70),l(0),l(1),l(1),l(0),s(1),s(1),l(0),l(0)}function f(e,t){s(65472),s(17),l(8),s(t),s(e),l(3),l(1),l(17),l(0),l(2),l(17),l(1),l(3),l(17),l(1)}function h(){s(65499),s(132),l(0);for(var e=0;64>e;e++)l(F[e]);l(1);for(var t=0;64>t;t++)l(C[t])}function d(){s(65476),s(418),l(0);for(var e=0;16>e;e++)l(N[e+1]);for(var t=0;11>=t;t++)l(V[t]);l(16);for(var n=0;16>n;n++)l(H[n+1]);for(var r=0;161>=r;r++)l(W[r]);l(1);for(var i=0;16>i;i++)l(q[i+1]);for(var a=0;11>=a;a++)l(z[a]);l(17);for(var o=0;16>o;o++)l(X[o+1]);for(var u=0;161>=u;u++)l($[u])}function p(){s(65498),s(12),l(3),l(1),l(0),l(2),l(17),l(3),l(17),l(0),l(63),l(0)}function g(e,t,n,r,i){var a,l=i[0],s=i[240];for(var c=u(e,t),f=0;64>f;++f)L[j[f]]=c[f];var h=L[0]-n;n=L[0],0==h?o(r[0]):(a=32767+h,o(r[U[a]]),o(D[a]));for(var d=63;d>0&&0==L[d];d--);if(0==d)return o(l),n;for(var p,g=1;d>=g;){for(var m=g;0==L[g]&&d>=g;++g);var v=g-m;if(v>=16){p=v>>4;for(var w=1;p>=w;++w)o(s);v&=15}a=32767+L[g],o(i[(v<<4)+U[a]]),o(D[a]),g++}return 63!=d&&o(l),n}function m(){for(var e=String.fromCharCode,t=0;256>t;t++)E[t]=e(t)}function v(e){if(0>=e&&(e=1),e>100&&(e=100),I!=e){var n=0;n=50>e?Math.floor(5e3/e):Math.floor(200-2*e),t(n),I=e}}var w,y,b,S,I,P=(Math.round,Math.floor),F=new Array(64),C=new Array(64),T=new Array(64),x=new Array(64),D=new Array(65535),U=new Array(65535),A=new Array(64),L=new Array(64),R=[],k=0,M=7,B=new Array(64),O=new Array(64),G=new Array(64),E=new Array(256),_=new Array(2048),j=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63],N=[0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0],V=[0,1,2,3,4,5,6,7,8,9,10,11],H=[0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125],W=[1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250],q=[0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0],z=[0,1,2,3,4,5,6,7,8,9,10,11],X=[0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119],$=[0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250];this.encode=function(e,t,n){(new Date).getTime();t&&v(t),R=new Array,k=0,M=7,s(65496),c(),h(),f(e.width,e.height),d(),p();var r=0,i=0,a=0;k=0,M=7,this.encode.displayName="_encode_";for(var l,u,m,I,P,F,C,D,U,A=e.data,L=e.width,E=e.height,j=4*L,N=0;E>N;){for(l=0;j>l;){for(P=j*N+l,F=P,C=-1,D=0,U=0;64>U;U++)D=U>>3,C=4*(7&U),F=P+D*j+C,N+D>=E&&(F-=j*(N+1+D-E)),l+C>=j&&(F-=l+C-j+4),u=A[F++],m=A[F++],I=A[F++],B[U]=(_[u]+_[m+256>>0]+_[I+512>>0]>>16)-128,O[U]=(_[u+768>>0]+_[m+1024>>0]+_[I+1280>>0]>>16)-128,G[U]=(_[u+1280>>0]+_[m+1536>>0]+_[I+1792>>0]>>16)-128;r=g(B,T,r,w,b),i=g(O,x,i,y,S),a=g(G,x,a,y,S),l+=32}N+=8}if(M>=0){var V=[];V[1]=M+1,V[0]=(1<<M+1)-1,o(V)}if(s(65497),n){for(var H=R.length,W=new Uint8Array(H),q=0;H>q;q++)W[q]=R[q].charCodeAt();return R=[],(new Date).getTime(),W}var z="data:image/jpeg;base64,"+btoa(R.join(""));return R=[],(new Date).getTime(),z},function(){(new Date).getTime();e||(e=50),m(),r(),i(),a(),v(e),(new Date).getTime()}()}e.exports=n},function(e,t,n){function r(e,t){var n=this;if(!e)throw new Error("没有收到图片，可能的解决方案：https://github.com/think2011/localResizeIMG/issues/7");t=t||{},n.defaults={width:null,height:null,fieldName:"file",quality:.7},n.file=e;for(var r in t)t.hasOwnProperty(r)&&(n.defaults[r]=t[r]);return this.init()}function i(e){var t;t=e.split(",")[0].indexOf("base64")>=0?atob(e.split(",")[1]):unescape(e.split(",")[1]);for(var n=e.split(",")[0].split(":")[1].split(";")[0],r=new Uint8Array(t.length),i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return new o.Blob([r.buffer],{type:n})}n.p=function(e){var t=null;return t=e?[].filter.call(document.scripts,function(t){return-1!==t.src.indexOf(e)})[0]:document.scripts[document.scripts.length-1],t?t.src.substr(0,t.src.lastIndexOf("/")):null}("lrz")+"/",window.URL=window.URL||window.webkitURL;var a=n(1),o=n(4),l=n(5),s=function(e){var t=/OS (\d)_.* like Mac OS X/g.exec(e),n=/Android (\d.*?);/g.exec(e)||/Android\/(\d.*?) /g.exec(e);return{oldIOS:!!t&&+t.pop()<8,oldAndroid:!!n&&+n.pop().substr(0,3)<4.5,iOS:/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(e),android:/Android/g.test(e),mQQBrowser:/MQQBrowser/g.test(e)}}(navigator.userAgent);r.prototype.init=function(){var e=this,t=e.file,n="string"==typeof t,r=/^data:/.test(t),l=new Image,s=document.createElement("canvas"),u=n?t:URL.createObjectURL(t);if(e.img=l,e.blob=u,e.canvas=s,e.fileName=n?r?"base64.jpg":t.split("/").pop():t.name,!document.createElement("canvas").getContext)throw new Error("浏览器不支持canvas");return new a(function(n,a){l.onerror=function(){var e=new Error("加载图片文件失败");throw a(e),e},l.onload=function(){e._getBase64().then(function(e){if(e.length<10){var t=new Error("生成base64失败");throw a(t),t}return e}).then(function(r){var a=null;"object"==typeof e.file&&r.length>e.file.size?(a=new FormData,t=e.file):(a=new o.FormData,t=i(r)),a.append(e.defaults.fieldName,t,e.fileName.replace(/\..+/g,".jpg")),n({formData:a,fileLen:+t.size,base64:r,base64Len:r.length,origin:e.file,file:t});for(var l in e)e.hasOwnProperty(l)&&(e[l]=null);URL.revokeObjectURL(e.blob)})},!r&&(l.crossOrigin="*"),l.src=u})},r.prototype._getBase64=function(){var e=this,t=e.img,n=e.file,r=e.canvas;return new a(function(i){try{l.getData("object"==typeof n?n:t,function(){e.orientation=l.getTag(this,"Orientation"),e.resize=e._getResize(),e.ctx=r.getContext("2d"),r.width=e.resize.width,r.height=e.resize.height,e.ctx.fillStyle="#fff",e.ctx.fillRect(0,0,r.width,r.height),s.oldIOS?e._createBase64ForOldIOS().then(i):e._createBase64().then(i)})}catch(e){throw new Error(e)}})},r.prototype._createBase64ForOldIOS=function(){var e=this,t=e.img,r=e.canvas,i=e.defaults,o=e.orientation;return new a(function(e){!function(){var a=[n(6)];(function(n){var a=new n(t);"5678".indexOf(o)>-1?a.render(r,{width:r.height,height:r.width,orientation:o}):a.render(r,{width:r.width,height:r.height,orientation:o}),e(r.toDataURL("image/jpeg",i.quality))}).apply(null,a)}()})},r.prototype._createBase64=function(){var e=this,t=e.resize,r=e.img,i=e.canvas,o=e.ctx,l=e.defaults;switch(e.orientation){case 3:o.rotate(180*Math.PI/180),o.drawImage(r,-t.width,-t.height,t.width,t.height);break;case 6:o.rotate(90*Math.PI/180),o.drawImage(r,0,-t.width,t.height,t.width);break;case 8:o.rotate(270*Math.PI/180),o.drawImage(r,-t.height,0,t.height,t.width);break;case 2:o.translate(t.width,0),o.scale(-1,1),o.drawImage(r,0,0,t.width,t.height);break;case 4:o.translate(t.width,0),o.scale(-1,1),o.rotate(180*Math.PI/180),o.drawImage(r,-t.width,-t.height,t.width,t.height);break;case 5:o.translate(t.width,0),o.scale(-1,1),o.rotate(90*Math.PI/180),o.drawImage(r,0,-t.width,t.height,t.width);break;case 7:o.translate(t.width,0),o.scale(-1,1),o.rotate(270*Math.PI/180),o.drawImage(r,-t.height,0,t.height,t.width);break;default:o.drawImage(r,0,0,t.width,t.height)}return new a(function(e){s.oldAndroid||s.mQQBrowser||!navigator.userAgent?function(){var t=[n(7)];(function(t){var n=new t,r=o.getImageData(0,0,i.width,i.height);e(n.encode(r,100*l.quality))}).apply(null,t)}():e(i.toDataURL("image/jpeg",l.quality))})},r.prototype._getResize=function(){var e=this,t=e.img,n=e.defaults,r=n.width,i=n.height,a=e.orientation,o={width:t.width,height:t.height};if("5678".indexOf(a)>-1&&(o.width=t.height,o.height=t.width),o.width<r||o.height<i)return o;var l=o.width/o.height;for(r&&i?l>=r/i?o.width>r&&(o.width=r,o.height=Math.ceil(r/l)):o.height>i&&(o.height=i,o.width=Math.ceil(i*l)):r?r<o.width&&(o.width=r,o.height=Math.ceil(r/l)):i&&i<o.height&&(o.width=Math.ceil(i*l),o.height=i);o.width>=3264||o.height>=2448;)o.width*=.8,o.height*=.8;return o},window.lrz=function(e,t){return new r(e,t)},window.lrz.version="4.9.40",e.exports=window.lrz}])})},"fl/s":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"profile"},[n("section",[n("mt-cell",{staticClass:"input-file-cell",attrs:{title:"个人头像"}},[n("div",{staticClass:"avata"},[n("img",{attrs:{src:e.avatar.previewUrl,width:"65",height:"65"}})])]),n("mt-cell",{attrs:{"is-link":"is-link",title:"个人简介",value:e.user.desc},nativeOn:{click:function(t){e.showPopupInput({type:"textarea",customType:"desc",maxLength:20,placeholder:"请输入个人简介",value:e.user.desc,title:"个人简介"})}}})],1),n("section",{staticClass:"mt10"},[n("mt-cell",{class:e.userRealNameReadOnly?"readonly":"",attrs:{"is-link":"is-link",title:"真实姓名",value:e.user.name||"未认证"},nativeOn:{click:function(t){e.$router.push({name:"realNameAuth"})}}}),n("mt-cell",{class:e.companyAuthReadOnly?"readonly":"",attrs:{"is-link":"is-link",title:"公司全称",value:e.user.company.name||"未认证"},nativeOn:{click:function(t){e.goCompanyCertify(t)}}})],1),n("section",{staticClass:"mt10"},[n("mt-cell",{staticClass:"readonly",attrs:{title:"联系方式",value:e.user.phone}}),n("mt-cell",{attrs:{"is-link":"is-link",title:"邮箱",value:e.user.email},nativeOn:{click:function(t){e.showPopupInput({customType:"email",placeholder:"请输入邮箱",value:e.user.email,title:"邮箱",label:"邮箱",validators:[{name:"email",message:"请正确填写邮箱"}]})}}})],1),n("kt-popup-input",{ref:"popupInput",attrs:{visible:e.popupInputVisible},on:{"popup-confirmed":e.popInputConfirm,"visible-change":function(t){return e.popupInputVisible=t}}})],1)},staticRenderFns:[]}}});