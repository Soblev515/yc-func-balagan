import e from"ydb-sdk";import{z as t}from"zod";function n(e,t,n,i){return new(n||(n=Promise))((function(r,o){function s(e){try{u(i.next(e))}catch(e){o(e)}}function d(e){try{u(i.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,d)}u((i=i.apply(e,t||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;const{Driver:i,TypedData:r,getCredentialsFromEnv:o,getLogger:s}=e,d=e=>r.createNativeObjects(e),u=e=>n(void 0,void 0,void 0,(function*(){const t=s({level:"debug"}),r=(()=>{const e=process.env.DB_ENDPOINT,t=process.env.DB_DATABASE,n=o();return new i({endpoint:e,database:t,authService:n})})();if(!(yield r.ready(1e4))){const e="Driver has not become ready in 10 seconds!";throw t.fatal(e),new Error(e)}const u=yield r.tableClient.withSession((t=>n(void 0,void 0,void 0,(function*(){var n;const i=yield t.prepareQuery(e);return(null!==(n=(yield t.executeQuery(i)).resultSets)&&void 0!==n?n:[]).map(d)}))));return r.destroy(),u})),a=t.object({event_id:t.string(),limit:t.number(),offset:t.number()}),c=function(e,t){return n(this,void 0,void 0,(function*(){const t={};t.limit=Number(e.queryStringParameters.limit.toString()),t.offset=Number(e.queryStringParameters.offset.toString()),t.event_id=e.queryStringParameters.event_id;const n=a.parse(t),i=(({event_id:e,limit:t=20,offset:n=0})=>`\n    DECLARE $limit AS Uint32;\n    DECLARE $offset AS Uint32;\n    DECLARE $event_id AS String;\n\n    $event_id = "${e}";\n    $limit = ${t};\n    $offset = ${n};\n\n    SELECT user_id FROM participants \n    WHERE event_id = $event_id\n    LIMIT $limit\n    OFFSET $offset;\n`)(n),r=yield u(i),o=(({event_id:e})=>`\n    DECLARE $event_id AS String;\n\n    $event_id = "${e}";\n\n    SELECT Count(user_id) FROM participants \n    WHERE event_id = $event_id\n`)(n),s=yield u(o);return{statusCode:200,body:JSON.stringify({data:r[0],count:s[0][0].column0})}}))};export{c as handler};