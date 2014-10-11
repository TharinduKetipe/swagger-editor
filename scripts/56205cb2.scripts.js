function removeVendorExtensions(a){if(!angular.isObject(a))return a;var b={};return Object.keys(a).forEach(function(c){"x-"!==c.toLowerCase().substring(0,2)&&(b[c]=removeVendorExtensions(a[c]))}),b}function load(a){var b,c;if(!angular.isString(a))throw new Error("load function only accepts a string");try{JSON.parse(a)}catch(d){b=d}if(!b)return jsyaml.dump(JSON.parse(a));try{jsyaml.load(a)}catch(d){c=d}if(!c)return a;throw new Error("load function called with an invalid string")}_.templateSettings={interpolate:/\{(.+?)\}/g},window.PhonicsApp=angular.module("PhonicsApp",["ngCookies","ngResource","ngSanitize","ui.router","ui.ace","ui.bootstrap","ngStorage","ngSanitize","jsonFormatter","hc.marked","ui.layout","mohsen1.json-schema-view"]),PhonicsApp.config(["$compileProvider","$stateProvider","$urlRouterProvider",function(a,b,c){c.otherwise("/"),b.state("home",{url:"/{mode}?import",views:{"":{templateUrl:function(a){return"edit"===a.mode?"views/main.html":"views/main-preview.html"},controller:"MainCtrl"},"header@home":{templateUrl:"views/header/header.html",controller:"HeaderCtrl"},"editor@home":{templateUrl:"views/editor/editor.html",controller:"EditorCtrl"},"preview@home":{templateUrl:"views/preview/preview.html",controller:"PreviewCtrl"}}}),a.aHrefSanitizationWhitelist(".")}]),PhonicsApp.controller("MainCtrl",["$rootScope","$stateParams","$location","Editor","Storage","FileLoader","BackendHealthCheck","defaults",function(a,b,c,d,e,f,g,h){function i(){e.load("yaml").then(function(a){var g;b.import?(g=b.import,c.search("import",null)):a||(g=h.examplesFolder+h.exampleFiles[0]),g&&f.loadFromUrl(g).then(function(a){a&&(e.save("yaml",a),d.setValue(a))})})}a.$on("$stateChangeStart",d.initializeEditor),g.startChecking(),a.$on("$stateChangeStart",i),a.isPreviewMode="edit"!==b.mode,$("body").addClass(h.brandingCssClass),i()}]),PhonicsApp.controller("HeaderCtrl",["$scope","Editor","Storage","Builder","Codegen","$modal","$stateParams","defaults","strings",function(a,b,c,d,e,f,g,h,i){function j(a){f.open({templateUrl:"templates/code-gen-error-modal.html",controller:"GeneralModal",size:"large",resolve:{data:function(){return a.data}}})}function k(){var b="text/plain";c.load("yaml").then(function(c){var d=jsyaml.load(c);d.info.version&&(d.info.version=String(d.info.version)),d.swagger&&(d.swagger=2===d.swagger?"2.0":String(d.swagger)),d=JSON.stringify(d,null,4);var e=new Blob([d],{type:b});a.jsonDownloadHref=window.URL.createObjectURL(e),a.jsonDownloadUrl=[b,"swagger.json",a.jsonDownloadHref].join(":");var f=new Blob([c],{type:b});a.yamlDownloadHref=window.URL.createObjectURL(f),a.yamlDownloadUrl=[b,"swagger.yaml",a.yamlDownloadHref].join(":")})}function l(){}a.breadcrumbs=g.path?[{active:!0,name:g.path}]:[],c.addChangeListener("progress",function(b){a.status=i.stausMessages[b],a.statusClass=null,b>0&&(a.statusClass="success"),0>b&&(a.statusClass="error")}),c.load("intro").then(function(b){b||h.disableNewUserIntro||(a.showAbout=!0,c.save("intro",!0))}),a.disableCodeGen=h.disableCodeGen,e.getServers().then(function(b){a.servers=b}),e.getClients().then(function(b){a.clinets=b}),a.getServer=function(a){e.getServer(a).then(l,j)},a.getClient=function(a){e.getClient(a).then(l,j)},a.showFileMenu=function(){return!h.disableFileMenu},a.showHeaderBranding=function(){return h.headerBranding},a.newProject=function(){b.setValue(""),c.reset()},a.assignDownloadHrefs=function(){k(a,c)},a.openImportFile=function(){f.open({templateUrl:"templates/file-import.html",controller:"FileImportCtrl",size:"large"})},a.openImportUrl=function(){f.open({templateUrl:"templates/url-import.html",controller:"UrlImportCtrl",size:"large"})},a.toggleAboutEditor=function(b){a.showAbout=b},a.openExamples=function(){f.open({templateUrl:"templates/open-examples.html",controller:"OpenExamplesCtrl",size:"large"})}}]),PhonicsApp.directive("onReadFile",["$parse",function(a){return{restrict:"A",scope:!1,link:function(b,c,d){var e=a(d.onReadFile);c.on("change",function(a){var c=new FileReader;c.onload=function(a){b.$apply(function(){e(b,{$fileContent:a.target.result})})},c.readAsText((a.srcElement||a.target).files[0])})}}}]),PhonicsApp.directive("path",function(){return{restrict:"E",replace:!0,templateUrl:"templates/path.html",scope:!1}}),PhonicsApp.directive("operation",[function(){return{restrict:"E",replace:!0,templateUrl:"templates/operation.html",scope:!1,link:function(a){a.isTryOpen=!1,a.toggleTry=function(){a.isTryOpen=!a.isTryOpen}}}}]),PhonicsApp.directive("dropdownMenu",function(){return{templateUrl:"templates/dropdown-menu.html",restrict:"E",transclude:!0,scope:{label:"@",onOpen:"="}}}),PhonicsApp.directive("schemaModel",["$parse",function(a){return{templateUrl:"templates/schema-model.html",restrict:"E",replace:!0,scope:{schema:"="},link:function(b,c,d){b.mode="model",b.json=removeVendorExtensions(a(d.schema)(b.$parent))}}}]),PhonicsApp.directive("stopEvent",function(){return{restrict:"A",link:function(a,b){b.bind("click",function(a){a.stopPropagation()})}}}),PhonicsApp.filter("getResourceName",function(){return function(a){return a.resourcePath.replace(/\//g,"")}}),function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("require","linker"),ga("linker:autoLink",["wordnik.github.io","apigee.github.io","swagger.wordnik.com","editor.swagger.wordnik.com"]),ga("create","UA-51231036-1","auto",{allowLinker:!0}),ga("send","pageview"),PhonicsApp.directive("tryOperation",function(){return{templateUrl:"templates/try-operation.html",restrict:"E",replace:!0,scope:{operation:"="},link:function(a){function b(){var b={};return a.hasParams&&a.$parent.operation.parameters.filter(function(c){"header"===c.in&&a.paramModels[c.name]&&(b[c.name]=a.paramModels[c.name])}),b}function c(){return a.$parent.operation.consumes?a.$parent.operation.consumes:f.consumes}function d(){var b=window.location.protocol,c=f.host||window.location.host,d=f.basePath||"",e=a.$parent.$parent.pathName,g=_.template(e),h=a.hasParams?a.$parent.operation.parameters:[],i=h.reduce(function(b,c){return"path"===c.in&&(b[c.name]=a.paramModels[c.name]),b},{}),j=h.reduce(function(b,c){return"query"===c.in&&a.paramModels[c.name]&&(b[c.name]=a.paramModels[c.name]),b},{}),k=$.param(j);return b+"//"+c+d+g(i)+(k?"?"+k:"")}function e(){a.response=null,a.xhrInProgress=!0,a.failed=!1,$.ajax({url:a.generateUrl(),type:a.$parent.operationName,headers:_.extend({"Content-Type":a.contentType},b())}).fail(function(){a.failed=!0}).always(function(b){if(!b)return a.responseText="",a.xhrInProgress=!1,void a.$digest();var c;try{c=JSON.stringify(JSON.parse(b.responseText),null,2)}catch(d){c=b.responseText}a.responseText=angular.isString(c)&&0===c.indexOf("<?xml")?$("<div/>").text(c).html():c,a.response=b,a.xhrInProgress=!1,a.$digest()})}var f=a.$parent.$parent.$parent.$parent.specs;a.httpProtorcol="HTTP/1.1",a.paramModels={},a.hasParams=Array.isArray(a.$parent.operation.parameters),a.hasBody=a.hasParams&&a.$parent.operation.parameters.some(function(a){return"body"===a.in}),a.generateUrl=d,a.makeCall=e,a.getContentTypeHeaders=c,a.xhrInProgress=!1,a.getHeaderParams=b}}}),PhonicsApp.service("Sorter",function(){function a(a){var e=[];return angular.isObject(a)?(e=Object.keys(a).map(function(d){if(d.toLowerCase().substring(0,2)!==c){var e={operationName:d,responses:b(a[d].responses)};return a[d]=_.omit(a[d],"responses"),_.extend(e,a[d]),e}}).sort(function(a,b){return a[d]-b[d]}),_.compact(e)):e}function b(a){var b=[];return angular.isObject(a)?(b=Object.keys(a).map(function(b){if(b.toLowerCase().substring(0,2)!==c){var d=_.extend({responseCode:b},a[b]);return d}}).sort(function(a,b){return a[d]-b[d]}),_.compact(b)):b}var c="x-",d="x-row";this.sort=function(b){if(b&&b.paths){var e=Object.keys(b.paths).map(function(e){if(e.toLowerCase().substring(0,2)!==c){var f={pathName:e,operations:a(b.paths[e])};return f[d]=b.paths[e][d],f}}).sort(function(a,b){return a[d]-b[d]});b.paths=_.compact(e)}return b}}),PhonicsApp.service("Operation",function(){this.getEditPath=function(a){return"#/paths?path="+window.encodeURIComponent(a)},this.responseCodeClassFor=function(a){var b="default";switch(Math.floor(+a/100)){case 2:b="green";break;case 5:b="red";break;case 4:b="yellow";break;case 3:b="blue"}return b},this.isVendorExtension=function(a){return"x-"===a.substring(0,2).toLowerCase()}}),PhonicsApp.service("FileLoader",["$http",function(a){this.loadFromUrl=function(b){return a.get(b).then(function(a){return load(a.data)})},this.load=load}]),PhonicsApp.controller("FileImportCtrl",["$scope","$modalInstance","FileLoader","$localStorage","Storage","Editor","ASTManager",function(a,b,c,d,e,f,g){var h;a.fileChanged=function(a){h=c.load(a)},a.ok=function(){angular.isString(h)&&(f.setValue(h),e.save("yaml",h),g.refresh()),b.close()},a.isInvalidFile=function(){return null===h},a.isFileSelected=function(){return!!h},a.cancel=b.close}]),PhonicsApp.service("Editor",function(){function a(a){a&&a.mark&&a.reason&&p.getSession().setAnnotations([{row:a.mark.line,column:a.mark.column,text:a.reason,type:"error"}])}function b(){p.getSession().clearAnnotations()}function c(a){window.e=p=a,p.setOptions({fontFamily:"Source Code Pro"}),q.forEach(function(a){a(s)}),q=[];var b=p.getSession();b.on("changeFold",d),e(b)}function d(){var a=arguments;r.forEach(function(b){b.apply(p,a)})}function e(a){a.setTabSize(2)}function f(a){angular.isString(a)&&p.getSession().setValue(a),angular.isObject(a)&&f(jsyaml.dump(angular.copy(a)))}function g(){return p.getSession().getValue()}function h(){p.resize()}function i(a){angular.isFunction(a)&&q.push(a)}function j(){var a=p.getSession(),b=null;return a.foldAll(),b=a.unfold(),Array.isArray(b)?b:[]}function k(a){return p.session.getLine(a)}function l(a){r.push(a)}function m(a,b){p.getSession().foldAll(a,b)}function n(a){p.getSession().unfold(a,100)}function o(a){p.gotoLine(a)}var p=null,q=[],r=[],s=this;this.getValue=g,this.setValue=f,this.aceLoaded=c,this.resize=h,this.ready=i,this.annotateYAMLErrors=a,this.clearAnnotation=b,this.getAllFolds=j,this.getLine=k,this.onFoldChanged=l,this.addFold=m,this.removeFold=n,this.gotoLine=o}),PhonicsApp.service("Builder",["Resolver","Validator","$q",function(a,b,c){function d(a){var b,d=c.defer();if(!a)return d.reject({specs:null,error:{emptyDocsError:{message:"Empty Document"}}}),d.promise;try{b=h(a)}catch(f){return d.reject({error:{yamlError:f},specs:null}),d.promise}return e(b)}function e(c){return a.resolve(c).then(function(a){var c={specs:a},d=b.validateSwagger(a);return d&&d.swaggerError&&(c.error=d),c},function(a){return{error:{resolveError:a.data,raw:a},specs:null}})}function f(a,b,c){var d,e=null;try{d=h(a)}catch(f){e={yamlError:f}}return e||(c.paths[b]=d[b]),{specs:c,error:e}}function g(a,b){return _.pick(a.paths,b)}var h=_.memoize(jsyaml.load);this.buildDocs=d,this.buildDocsWithObject=e,this.updatePath=f,this.getPath=g}]),PhonicsApp.service("Validator",["defaultSchema","defaults","$http",function(a,b,c){function d(){b.schemaUrl&&c.get(b.schemaUrl).then(function(a){e=a.data})}var e,f=Object.create(null);this.setStatus=function(a,b){f[a]=!!b},this.isValid=function(){for(var a in f)if(!f[a])return{valid:!1,reason:a};return{valid:!0}},this.reset=function(){f=Object.create(null)},this.validateYamlString=function(a){try{jsyaml.load(a)}catch(b){var c=b.message.replace("JS-YAML: ","");return{yamlError:{message:c,row:b.mark.line,column:b.mark.column}}}return null},this.validateSwagger=function(b,c){d(),c=c||e||a;var f=tv4.validate(b,c);return f?null:{swaggerError:tv4.error}}}]),PhonicsApp.service("ASTManager",["Editor",function(a){function b(){j=yaml.compose(a.getValue()),c()}function c(){k.forEach(function(a){a()})}function d(a,b){var c;if(b=b||j,!Array.isArray(a))throw new Error("Need path to find the node in the AST");if(!a.length)return b;if(c=a.shift(),b.tag===h)for(var e=0;e<b.value.length;e++){var f=b.value[e];if(f[0].value===c)return d(a,f[1])}else if(b.tag===i)return c=parseInt(c,10),b=b.value[c],d(a,b);return b}function e(a,b){var c;if(a=a||j,!angular.isObject(a)||!a.value)return a;if(a.start_mark.line===b)return a;for(var d=0;d<a.value.length;d++)if(a.tag===h?c=e(a.value[d][1],b):a.tag===i&&(c=e(a.value[d],b)),c)return c;return null}function f(a){var b=d(a);return b?b.start_mark.line:null}function g(b,c){c="undefined"==typeof c?b.folded:!c,c?(a.removeFold(b.start_mark.line),b.folded=!1):(a.addFold(b.start_mark.line-1,b.end_mark.line-1),b.folded=!0)}var h="tag:yaml.org,2002:map",i="tag:yaml.org,2002:seq",j={},k=[];a.ready(b),a.onFoldChanged(function(a){var b=a.data.start.row+1,d="remove"!==a.action,f=e(j,b);f&&(f.folded=d),c()}),this.toggleFold=function(a){var b=d(a,j);b&&b.start_mark&&(g(b),c())},this.setFoldAll=function(a,b){for(var e,f=d(a,j),k=0;k<f.value.length;k++)f.tag===h?e=f.value[k][1]:f.tag===i&&(e=f.value[k]),g(e,b);c()},this.isFolded=function(a){var b=d(a,j);return angular.isObject(b)&&!!b.folded},this.isAllFolded=function(a){for(var b,c=d(a),e=0;e<c.value.length;e++)if(c.tag===h?b=c.value[e][1]:c.tag===i&&(b=c.value[e]),!b.folded)return!1;return!0},this.onFoldStatusChanged=function(a){k.push(a)},this.refresh=b,this.lineForPath=f}]),PhonicsApp.service("Resolver",["$q","$http",function(a,b){function c(b,e){if(e||(e=b),Array.isArray(b))return a.all(b.map(function(a){return c(a,e)}));if(!angular.isObject(b)){var f=a.defer();return f.resolve(b),f.promise}if(b.$ref)return d(b.$ref,e).then(function(a){return c(a,e)});var g=[];return Object.keys(b).forEach(function(a){g.push(c(b[a],e))}),a.all(g).then(function(a){var c={};return Object.keys(b).forEach(function(b,d){c[b]=a[d]}),c})}function d(c,d){var e=a.defer();if(/^http(s?):\/\//.test(c))return b.get(c).then(function(a){return a.data});0!==c.indexOf("#/")&&(c="#/definitions/"+c);for(var f,g=c.substring(2).split("/"),h=d;g.length;)f=g.shift(),h[f]||e.reject({data:"Can not lookup "+f+" in "+angular.toJson(h)}),h=h[f];return e.resolve(h),e.promise}this.resolve=c}]),PhonicsApp.service("BackendHealthCheck",["$http","$interval","defaults","Storage",function(a,b,c,d){var e=!0;this.startChecking=function(){b(function(){a.get(window.location.href).then(function(){e=!0},function(){e=!1,d.save("progress",-2)})},c.backendHelathCheckTimeout)},this.isHealthy=function(){return e}}]),PhonicsApp.service("Codegen",["$http","defaults","Storage",function(a,b,c){function d(a){angular.isObject(a)&&a.code&&(window.location=a.data.code)}this.getServers=function(){return a.get(b.codegen.servers).then(function(a){return a.data})},this.getClients=function(){return a.get(b.codegen.clients).then(function(a){return a.data})},this.getServer=function(e){var f=_.template(b.codegen.server)({language:e});return c.load("yaml").then(function(b){var c=jsyaml.load(b);return a.post(f,{swagger:c}).then(d)})},this.getClient=function(e){var f=_.template(b.codegen.client)({language:e});return c.load("yaml").then(function(b){var c=jsyaml.load(b);return a.post(f,{swagger:c}).then(d)})}}]),PhonicsApp.controller("EditorCtrl",["$scope","Editor","Builder","Storage","ASTManager",function(a,b,c,d,e){function f(){var a=b.getValue();d.save("yaml",a),e.refresh()}var g=_.debounce(f,1e3);a.aceLoaded=b.aceLoaded,a.aceChanged=function(){d.save("progress",0),g()},b.ready(function(){d.load("yaml").then(function(a){b.setValue(a),e.refresh(a),f()})})}]),PhonicsApp.controller("PreviewCtrl",["Storage","Builder","ASTManager","Sorter","Editor","Operation","BackendHealthCheck","$scope","$rootScope",function(a,b,c,d,e,f,g,h,i){function j(a){(g.isHealthy()||i.isPreviewMode)&&b.buildDocs(a).then(k,k)}function k(b){h.specs=d.sort(b.specs),h.error=null,a.save("progress",1),i.isPreviewMode||e.clearAnnotation(),b.error&&(b.error.yamlError&&!i.isPreviewMode&&e.annotateYAMLErrors(b.error.yamlError),h.error=b.error,a.save("progress",-1))}a.addChangeListener("yaml",j),i.isPreviewMode&&a.load("yaml").then(j),c.onFoldStatusChanged(function(){_.defer(function(){h.$apply()})}),h.toggle=c.toggleFold,h.isCollapsed=c.isFolded,h.isAllFolded=c.isAllFolded,h.toggleAll=function(a){c.setFoldAll(a,!0)},h.focusEdit=function(a,b,d){if(!i.isPreviewMode){var f=c.lineForPath(b);d=d||0,a.stopPropagation(),e.gotoLine(f-d)}},_.extend(h,f)}]),PhonicsApp.service("Storage",["LocalStorage","Backend","defaults",function(a,b,c){return c.useBackendForStorage?b:a}]),PhonicsApp.service("LocalStorage",["$localStorage","$q",function(a,b){var c="SwaggerEditorCache",d=Object.create(null),e=this;a[c]=a[c]||Object.create(null),this.save=function(b,e){null!==e&&(Array.isArray(d[b])&&d[b].forEach(function(a){a(e)}),_.debounce(function(){window.requestAnimationFrame(function(){a[c][b]=e})},100)())},this.reset=function(){Object.keys(a[c]).forEach(function(a){e.save(a,"")})},this.load=function(d){var e=b.defer();return e.resolve(d?a[c][d]:a[c]),e.promise},this.addChangeListener=function(a,b){angular.isFunction(b)&&(d[a]||(d[a]=[]),d[a].push(b))}}]),PhonicsApp.config(["$provide",function(a){a.constant("defaultSchema",{title:"A JSON Schema for Swagger 2.0 API.",$schema:"http://json-schema.org/draft-04/schema#",type:"object",required:["swagger","info","paths"],additionalProperties:!1,patternProperties:{"^x-":{$ref:"#/definitions/vendorExtension"}},properties:{swagger:{type:"number","enum":[2],description:"The Swagger version of this document."},info:{$ref:"#/definitions/info"},externalDocs:{$ref:"#/definitions/externalDocs"},host:{type:"string",format:"uri",pattern:"^((?!\\://).)*$",description:"The fully qualified URI to the host of the API."},basePath:{type:"string",pattern:"^/",description:"The base path to the API. Example: '/api'."},schemes:{type:"array",description:"The transfer protocol of the API.",items:{type:"string","enum":["http","https","ws","wss"]}},consumes:{type:"array",description:"A list of MIME types accepted by the API.",items:{$ref:"#/definitions/mimeType"}},produces:{type:"array",description:"A list of MIME types the API can produce.",items:{$ref:"#/definitions/mimeType"}},paths:{type:"object",description:"Relative paths to the individual endpoints. They must be relative to the 'basePath'.",patternProperties:{"^x-":{$ref:"#/definitions/vendorExtension"},"^/$|^/.*[^/]$":{$ref:"#/definitions/pathItem"}},additionalProperties:!1},definitions:{type:"object",description:"One or more JSON objects describing the schemas being consumed and produced by the API.",additionalProperties:{$ref:"#/definitions/schema"}},parameters:{type:"object",description:"One or more JSON representations for parameters",additionalProperties:{$ref:"#/definitions/parameter"}},responses:{$ref:"#/definitions/responses"},security:{$ref:"#/definitions/security"},tags:{type:"array",items:{$ref:"#/definitions/tag"}}},definitions:{externalDocs:{type:"object",description:"information about external documentation",required:["url"],properties:{description:{type:"string"},url:{type:"string",format:"uri"}}},info:{type:"object",description:"General information about the API.",required:["version","title"],additionalProperties:!1,patternProperties:{"^x-":{$ref:"#/definitions/vendorExtension"}},properties:{version:{type:"string",description:"A semantic version number of the API."},title:{type:"string",description:"A unique and precise title of the API."},description:{type:"string",description:"A longer description of the API. Should be different from the title.  Github-flavored markdown is allowed."},termsOfService:{type:"string",description:"The terms of service for the API."},contact:{type:"object",description:"Contact information for the owners of the API.",additionalProperties:!1,properties:{name:{type:"string",description:"The identifying name of the contact person/organization."},url:{type:"string",description:"The URL pointing to the contact information.",format:"uri"},email:{type:"string",description:"The email address of the contact person/organization.",format:"email"}}},license:{type:"object",required:["name"],additionalProperties:!1,properties:{name:{type:"string",description:"The name of the license type. It's encouraged to use an OSI compatible license."},url:{type:"string",description:"The URL pointing to the license.",format:"uri"}}}}},example:{type:"object",patternProperties:{"^[a-z0-9-]+/[a-z0-9\\-+]+$":{}},additionalProperties:!1},mimeType:{type:"string",pattern:"^[\\sa-z0-9\\-+;\\.=\\/]+$",description:"The MIME type of the HTTP message."},operation:{type:"object",required:["responses"],additionalProperties:!1,patternProperties:{"^x-":{$ref:"#/definitions/vendorExtension"}},properties:{tags:{type:"array",items:{type:"string"}},summary:{type:"string",description:"A brief summary of the operation."},description:{type:"string",description:"A longer description of the operation, github-flavored markdown is allowed."},externalDocs:{$ref:"#/definitions/externalDocs"},operationId:{type:"string",description:"A friendly name of the operation"},produces:{type:"array",description:"A list of MIME types the API can produce.",additionalItems:!1,items:{$ref:"#/definitions/mimeType"}},consumes:{type:"array",description:"A list of MIME types the API can consume.",additionalItems:!1,items:{$ref:"#/definitions/mimeType"}},parameters:{type:"array",description:"The parameters needed to send a valid API call.",minItems:1,additionalItems:!1,items:{oneOf:[{$ref:"#/definitions/parameter"},{type:"object",additionalProperties:!1,properties:{$ref:{type:"string"}}}]}},responses:{$ref:"#/definitions/responses"},schemes:{type:"array",description:"The transfer protocol of the API.",items:{type:"string","enum":["http","https","ws","wss"]}},security:{$ref:"#/definitions/securityRequirement"}}},pathItem:{type:"object",additionalProperties:!1,patternProperties:{"^x-":{$ref:"#/definitions/vendorExtension"}},properties:{$ref:{type:"string"},get:{$ref:"#/definitions/operation"},put:{$ref:"#/definitions/operation"},post:{$ref:"#/definitions/operation"},"delete":{$ref:"#/definitions/operation"},options:{$ref:"#/definitions/operation"},head:{$ref:"#/definitions/operation"},patch:{$ref:"#/definitions/operation"},parameters:{type:"array",items:{$ref:"#/definitions/parameter"}}}},responses:{type:"object",description:"Response objects names can either be any valid HTTP status code or 'default'.",minProperties:1,additionalProperties:!1,patternProperties:{"^([0-9]+)$|^(default)$":{$ref:"#/definitions/response"},"^x-":{$ref:"#/definitions/vendorExtension"}}},response:{type:"object",required:["description"],properties:{description:{type:"string"},schema:{$ref:"#/definitions/schema"},headers:{type:"array",items:{$ref:"#/definitions/serializableType"}},examples:{$ref:"#/definitions/example"}},additionalProperties:!1},serializableType:{properties:{type:{type:"string","enum":["string","number","boolean","integer","array","file"]},format:{type:"string"},items:{type:"object"},collectionFormat:{type:"string"}}},vendorExtension:{description:"Any property starting with x- is valid.",additionalProperties:!0,additionalItems:!0},parameter:{type:"object",required:["name","in"],oneOf:[{patternProperties:{"^x-":{$ref:"#/definitions/vendorExtension"}},properties:{name:{type:"string",description:"The name of the parameter."},"in":{type:"string",description:"Determines the location of the parameter.","enum":["query","header","path","formData"]},description:{type:"string",description:"A brief description of the parameter. This could contain examples of use.  Github-flavored markdown is allowed."},required:{type:"boolean",description:"Determines whether or not this parameter is required or optional."},type:{type:"string","enum":["string","number","boolean","integer","array"]},format:{type:"string"},items:{type:"object"},collectionFormat:{type:"string"}},additionalProperties:!1},{patternProperties:{"^x-":{$ref:"#/definitions/vendorExtension"}},properties:{name:{type:"string",description:"The name of the parameter."},"in":{type:"string",description:"Determines the location of the parameter.","enum":["body"]},description:{type:"string",description:"A brief description of the parameter. This could contain examples of use."},required:{type:"boolean",description:"Determines whether or not this parameter is required or optional."},schema:{$ref:"#/definitions/schema"}},additionalProperties:!1}]},schema:{type:"object",description:"A deterministic version of a JSON Schema object.",patternProperties:{"^x-":{$ref:"#/definitions/vendorExtension"}},properties:{$ref:{type:"string"},format:{type:"string"},title:{$ref:"http://json-schema.org/draft-04/schema#/properties/title"},description:{$ref:"http://json-schema.org/draft-04/schema#/properties/description"},"default":{$ref:"http://json-schema.org/draft-04/schema#/properties/default"},multipleOf:{$ref:"http://json-schema.org/draft-04/schema#/properties/multipleOf"},maximum:{$ref:"http://json-schema.org/draft-04/schema#/properties/maximum"},exclusiveMaximum:{$ref:"http://json-schema.org/draft-04/schema#/properties/exclusiveMaximum"},minimum:{$ref:"http://json-schema.org/draft-04/schema#/properties/minimum"},exclusiveMinimum:{$ref:"http://json-schema.org/draft-04/schema#/properties/exclusiveMinimum"},maxLength:{$ref:"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},minLength:{$ref:"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},pattern:{$ref:"http://json-schema.org/draft-04/schema#/properties/pattern"},discriminator:{type:"string"},xml:{$ref:"#/definitions/xml"},items:{anyOf:[{$ref:"#/definitions/schema"},{type:"array",minItems:1,items:{$ref:"#/definitions/schema"}}],"default":{}},maxItems:{$ref:"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},minItems:{$ref:"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},uniqueItems:{$ref:"http://json-schema.org/draft-04/schema#/properties/uniqueItems"},maxProperties:{$ref:"http://json-schema.org/draft-04/schema#/definitions/positiveInteger"},minProperties:{$ref:"http://json-schema.org/draft-04/schema#/definitions/positiveIntegerDefault0"},required:{$ref:"http://json-schema.org/draft-04/schema#/definitions/stringArray"},externalDocs:{$ref:"#/definitions/externalDocs"},properties:{type:"object",additionalProperties:{$ref:"#/definitions/schema"},"default":{}},"enum":{$ref:"http://json-schema.org/draft-04/schema#/properties/enum"},type:{$ref:"http://json-schema.org/draft-04/schema#/properties/type"},example:{},allOf:{type:"array",minItems:1,items:{$ref:"#/definitions/schema"}}}},security:{description:"defines security definitions"},securityRequirement:{description:"defines a security requirement",type:"array"},xml:{properties:{name:{type:"string"},namespace:{type:"string"},prefix:{type:"string"},attribute:{type:"boolean"},wrapped:{type:"boolean"}},additionalProperties:!1},tag:{type:"object",properties:{externalDocs:{$ref:"#/definitions/externalDocs"}},patternProperties:{"^x-":{$ref:"#/definitions/vendorExtension"},"^/$|^/.*[^/]$":{type:"string"}}}}})}]),PhonicsApp.config(["$provide",function(a){a.constant("defaults",{downloadZipUrl:"http://generator.wordnik.com/online/api/gen/download/",codegen:{servers:"http://generator.wordnik.com/online/api/gen/servers",clients:"http://generator.wordnik.com/online/api/gen/clients",server:"http://generator.wordnik.com/online/api/gen/servers/{language}",client:"http://generator.wordnik.com/online/api/gen/clients/{language}"},schemaUrl:"",examplesFolder:"/spec-files/",exampleFiles:["default.yaml","minimal.yaml","heroku-pets.yaml","petstore.yaml"],backendEndpoint:"/editor/spec",useBackendForStorage:!1,backendHelathCheckTimeout:5e3,disableFileMenu:!1,disableCodeGen:!0,useYamlBackend:!1,headerBranding:!1,brandingCssClass:""})}]),PhonicsApp.config(["$provide",function(a){a.constant("strings",{stausMessages:{"-2":"Unsaved Changes. Check your server connection","-1":"Error!",0:"Working...",1:"All changes saved."}})}]),PhonicsApp.directive("collapseWhen",function(){var a=200;return{restrict:"A",link:function(b,c,d){function e(){setTimeout(function(){c.removeAttr("style")},a)}var f=null;if(d.collapseWhen){var g=c.clone();g.removeAttr("style"),g.appendTo("body"),f=g.height(),g.remove()}b.$watch(d.collapseWhen,function(a){a?(f=c.height(),c.height(f),c.height(0),c.addClass("c-w-collapsed"),e()):(c.height(f),c.removeClass("c-w-collapsed"),e())})}}}),PhonicsApp.controller("GeneralModal",["$scope","$modalInstance","data",function(a,b,c){a.ok=b.close,a.cancel=b.close,a.data=c}]),PhonicsApp.controller("UrlImportCtrl",["$scope","$modalInstance","FileLoader","$localStorage","Storage","Editor","ASTManager",function(a,b,c,d,e,f,g){var h;a.url=null,a.fetch=function(b){angular.isString("string")&&b.indexOf("http")>-1&&c.loadFromUrl(b).then(function(b){h=b,a.canImport=!0},function(b){a.error=b,a.canImport=!1})},a.ok=function(){angular.isString(h)&&(e.save("yaml",h),f.setValue(h),g.refresh()),b.close()},a.cancel=b.close}]),PhonicsApp.controller("ErrorPresenterCtrl",["$scope",function(a){a.docsMode=!1,a.getError=function(){var b=a.$parent.error;return b&&b.emptyDocsError&&!a.docsMode?null:(b&&b.swaggerError&&delete b.swaggerError.stack,b)},a.getType=function(){var b=a.getError();return b.swaggerError?"Swagger Error":b.yamlError?"YAML Syntax Error":b.resolveError?"Resolve Error":b.emptyDocsError?"Empty Document Error":"Unknown Error"},a.getDescription=function(){var b=a.getError();return b.emptyDocsError?b.emptyDocsError.message:b.swaggerError&&angular.isString(b.swaggerError.dataPath)?b.swaggerError.message+" at\n"+b.swaggerError.dataPath.replace(/\//g," ▹ ").replace(" ▹ ","").replace(/~1/g,"/"):b.yamlError?b.yamlError.message.replace("JS-YAML: ","").replace(/./,function(a){return a.toUpperCase()}):b.resolveError?b.resolveError:b},a.getLineNumber=function(){var b=a.getError();return b&&b.yamlError?b.yamlError.mark.line:-1},a.showLineJumpLink=function(){return-1!==a.getLineNumber()}}]),PhonicsApp.controller("OpenExamplesCtrl",["FileLoader","Builder","Storage","Editor","ASTManager","defaults","$scope","$modalInstance",function(a,b,c,d,e,f,g,h){g.files=f.exampleFiles,g.selectedFile=f.exampleFiles[0],g.open=function(b){a.loadFromUrl("spec-files/"+b).then(function(a){c.save("yaml",a),d.setValue(a),e.refresh(),h.close()},h.close)},g.cancel=h.close}]),PhonicsApp.service("Backend",["$http","$q","defaults","Builder",function(a,b,c,d){function e(b){var e=d.buildDocs(b,{resolve:!0});e.error||a.put(c.backendEndpoint,b)}function f(){}var g=Object.create(null),h=Object.create(null),i=_.throttle(e,200,{leading:!1,trailing:!0});this.save=function(a,b){h[a]=b,Array.isArray(g[a])&&g[a].forEach(function(a){a(b)}),c.useYamlBackend&&"yaml"===a&&b?i(b):"specs"===a&&b&&i(h[a])},this.reset=f,this.load=function(d){if("yaml"!==d){var e=b.defer();return d?e.resolve(h[d]):e.reject(),e.promise}return a.get(c.backendEndpoint).then(function(a){return c.useYamlBackend?(h.yaml=a.data,h.yaml):a.data})},this.addChangeListener=function(a,b){angular.isFunction(b)&&(g[a]||(g[a]=[]),g[a].push(b))}}]);