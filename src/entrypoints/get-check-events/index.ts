import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery, countDbQuery, idDbQuery} from './query';


export const handler: Handler.Http = async function (_event, context) {
  const a = {}
  a["limit"] = Number(_event["queryStringParameters"]["limit"].toString())
  a["offset"] = Number(_event["queryStringParameters"]["offset"].toString())
  const request = RequestParams.parse(a)
  let id = ""
  if(_event["queryStringParameters"]["is_me"].toString() == "true"){
    const user = atob(_event['headers']['Authorization'].split(" ")[1]).split(":");
    const idq = idDbQuery(user[0], user[1]);
    const ids = await requestFromDB(idq);
    id = ids[0][0]["user_id"]
  }
  
  
  const ydbQuery = createDbQuery(id, request);
  const result = await requestFromDB(ydbQuery);
  const ydbQuery3 = countDbQuery();
  const result3 = await requestFromDB(ydbQuery3);
  const count = result3[0][0]["column0"]
  return {
    statusCode: 200,
    body: JSON.stringify({"data": result[0], "count": count})
  };
};
