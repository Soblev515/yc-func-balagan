import e from"ydb-sdk";import{z as t}from"zod";function n(e,t,n,i){return new(n||(n=Promise))((function(r,s){function o(e){try{u(i.next(e))}catch(e){s(e)}}function a(e){try{u(i.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,a)}u((i=i.apply(e,t||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;const{Driver:i,TypedData:r,getCredentialsFromEnv:s,getLogger:o}=e,a=e=>r.createNativeObjects(e),u=e=>n(void 0,void 0,void 0,(function*(){const t=o({level:"debug"}),r=(()=>{const e=process.env.DB_ENDPOINT,t=process.env.DB_DATABASE,n=s();return new i({endpoint:e,database:t,authService:n})})();if(!(yield r.ready(1e4))){const e="Driver has not become ready in 10 seconds!";throw t.fatal(e),new Error(e)}const u=yield r.tableClient.withSession((t=>n(void 0,void 0,void 0,(function*(){var n;const i=yield t.prepareQuery(e);return(null!==(n=(yield t.executeQuery(i)).resultSets)&&void 0!==n?n:[]).map(a)}))));return r.destroy(),u})),d=t.object({limit:t.number(),offset:t.number()}),c=function(e,t){return n(this,void 0,void 0,(function*(){const t={};t.limit=Number(e.queryStringParameters.limit.toString()),t.offset=Number(e.queryStringParameters.offset.toString());const n=d.parse(t);let i="";if("true"==e.queryStringParameters.is_me.toString()){const t=atob(e.headers.Authorization.split(" ")[1]).split(":"),n=(r=t[0],s=t[1],`\n    DECLARE $login AS String;\n    DECLARE $password AS String;\n\n    $login = "${r}";\n    $password = "${s}";\n\n    SELECT user_id FROM auth \n    WHERE login = $login \n    AND password = $password\n`);i=(yield u(n))[0][0].user_id}var r,s;const o=((e,{limit:t=20,offset:n=0})=>`\n    DECLARE $limit AS Uint32;\n    DECLARE $offset AS Uint32;\n    DECLARE $user_id AS String;\n    $limit = ${t};\n    $offset = ${n};\n    $user_id = "${e}";\n    SELECT e.*, es.status as status FROM \`event\` as e\n    Left Join \`event_status\` as es\n    On e.event_id = es.event_id\n    WHERE status != "confirm"\n    AND IF ($user_id = "", true, organizer_id = $user_id)\n    LIMIT $limit\n    OFFSET $offset;\n`)(i,n),a=yield u(o),c=(yield u('\n    DECLARE $user_id AS String;\n    SELECT Count(e.event_id) FROM `event` as e\n    Left Join `event_status` as es\n    On e.event_id = es.event_id\n    WHERE status != "confirm"\n'))[0][0].column0;return{statusCode:200,body:JSON.stringify({data:a[0],count:c})}}))};export{c as handler};