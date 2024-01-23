import e from"ydb-sdk";import{z as t}from"zod";function n(e,t,n,i){return new(n||(n=Promise))((function(r,o){function s(e){try{a(i.next(e))}catch(e){o(e)}}function d(e){try{a(i.throw(e))}catch(e){o(e)}}function a(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,d)}a((i=i.apply(e,t||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;const{Driver:i,TypedData:r,getCredentialsFromEnv:o,getLogger:s}=e,d=e=>r.createNativeObjects(e),a=e=>n(void 0,void 0,void 0,(function*(){const t=s({level:"debug"}),r=(()=>{const e=process.env.DB_ENDPOINT,t=process.env.DB_DATABASE,n=o();return new i({endpoint:e,database:t,authService:n})})();if(!(yield r.ready(1e4))){const e="Driver has not become ready in 10 seconds!";throw t.fatal(e),new Error(e)}const a=yield r.tableClient.withSession((t=>n(void 0,void 0,void 0,(function*(){var n;const i=yield t.prepareQuery(e);return(null!==(n=(yield t.executeQuery(i)).resultSets)&&void 0!==n?n:[]).map(d)}))));return r.destroy(),a})),v=t.object({event_id:t.number()}),c=function(e,t){return n(this,void 0,void 0,(function*(){const t={};t.event_id=Number(e.queryStringParameters.event_id.toString());const n=v.parse(t),i=(({event_id:e})=>`\n    DECLARE $event_id as String;\n        \n    $event_id = "${e}";\n    \n    SELECT e.*, es.status as status FROM \`event\` as e\n    Left Join \`event_status\` as es\n    On e.event_id = es.event_id\n    WHERE e.event_id = $event_id\n`)(n),r=yield a(i),o=(({event_id:e})=>`\n    DECLARE $event_id AS String;\n\n    $event_id = "${e}";\n\n    SELECT t.* FROM \`tag\` as t \n    Left Join \`event_tag\` as ct\n    On t.tag_id = ct.tag_id\n    WHERE event_id = $event_id;\n`)(n),s=yield a(o);return r[0][0].tags={},r[0][0].tags.data=s[0],r[0][0].tags.count=s[0].length,{statusCode:200,body:JSON.stringify(r[0][0])}}))};export{c as handler};