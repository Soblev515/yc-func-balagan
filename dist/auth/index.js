import e from"ydb-sdk";import{z as n}from"zod";function o(e,n,o,t){return new(o||(o=Promise))((function(r,i){function s(e){try{a(t.next(e))}catch(e){i(e)}}function d(e){try{a(t.throw(e))}catch(e){i(e)}}function a(e){var n;e.done?r(e.value):(n=e.value,n instanceof o?n:new o((function(e){e(n)}))).then(s,d)}a((t=t.apply(e,n||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;const{Driver:t,TypedData:r,getCredentialsFromEnv:i,getLogger:s}=e,d=e=>r.createNativeObjects(e),a=e=>o(void 0,void 0,void 0,(function*(){const n=s({level:"debug"}),r=(()=>{const e=process.env.DB_ENDPOINT,n=process.env.DB_DATABASE,o=i();return new t({endpoint:e,database:n,authService:o})})();if(!(yield r.ready(1e4))){const e="Driver has not become ready in 10 seconds!";throw n.fatal(e),new Error(e)}const a=yield r.tableClient.withSession((n=>o(void 0,void 0,void 0,(function*(){var o;const t=yield n.prepareQuery(e);return(null!==(o=(yield n.executeQuery(t)).resultSets)&&void 0!==o?o:[]).map(d)}))));return r.destroy(),a})),u=n.object({login:n.string(),password:n.string()}),c=function(e,n){return o(this,void 0,void 0,(function*(){const n=(({login:e,password:n})=>`\n    DECLARE $login AS String;\n    DECLARE $password AS String;\n\n    $login = "${e}";\n    $password = "${n}";\n\n    SELECT Count(user_id) FROM \`auth\` \n    WHERE login = $login\n    AND password = $password;\n`)(u.parse(e.queryStringParameters)),o=yield a(n);return console.log(o[0][0].column0),"0"==o[0][0].column0?{statusCode:409,body:"Not authorized"}:{statusCode:200,body:"Authorized"}}))};export{c as handler};
