import e from"ydb-sdk";import{z as n}from"zod";function t(e,n,t,r){return new(t||(t=Promise))((function(o,i){function s(e){try{a(r.next(e))}catch(e){i(e)}}function d(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(s,d)}a((r=r.apply(e,n||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;const{Driver:r,TypedData:o,getCredentialsFromEnv:i,getLogger:s}=e,d=e=>o.createNativeObjects(e),a=e=>t(void 0,void 0,void 0,(function*(){const n=s({level:"debug"}),o=(()=>{const e=process.env.DB_ENDPOINT,n=process.env.DB_DATABASE,t=i();return new r({endpoint:e,database:n,authService:t})})();if(!(yield o.ready(1e4))){const e="Driver has not become ready in 10 seconds!";throw n.fatal(e),new Error(e)}const a=yield o.tableClient.withSession((n=>t(void 0,void 0,void 0,(function*(){var t;const r=yield n.prepareQuery(e);return(null!==(t=(yield n.executeQuery(r)).resultSets)&&void 0!==t?t:[]).map(d)}))));return o.destroy(),a})),u=n.object({tags:n.array(n.string())}),c=(e,n)=>`\n    DECLARE $tag_id AS String;\n    DECLARE $user_id AS String;\n\n    $user_id = "${e}";\n    $tag_id = "${n}";\n    \n    UPSERT INTO user_tags (user_id, tag_id)\n    Values ($user_id, $tag_id)\n`,l=function(e,n){return t(this,void 0,void 0,(function*(){const t=u.parse(n.getPayload()),r=atob(e.headers.Authorization.split(" ")[1]).split(":"),o=(i=r[0],s=r[1],`\n    DECLARE $login AS String;\n    DECLARE $password AS String;\n\n    $login = "${i}";\n    $password = "${s}";\n\n    SELECT user_id FROM auth \n    WHERE login = $login \n    AND password = $password\n`);var i,s;const d=yield a(o);console.log(d[0][0].user_id),d[0][0].user_id,yield a(o);for(const e of t.tags){console.log(e);const n=c(d[0][0].user_id,e);yield a(n)}return{statusCode:200,body:"Ok"}}))};export{l as handler};
