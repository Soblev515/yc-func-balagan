import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery, idDbQuery, deleteDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const request = RequestParams.parse(context.getPayload());
  const user = atob(_event['headers']['Authorization'].split(" ")[1]).split(":");
  const ydbQuery = idDbQuery(user[0], user[1]);
  const result = await requestFromDB(ydbQuery);
  console.log(result[0][0]["user_id"])
  const ydbQuery2 = deleteDbQuery(result[0][0]["user_id"]);
  await requestFromDB(ydbQuery);
  for(const item of request['tags']){
    console.log(item)
    const ydbQuery3 = createDbQuery(result[0][0]["user_id"], item);
    const result3 = await requestFromDB(ydbQuery3);
  }
  
  return {
    statusCode: 200,
    body: "Ok"
  };
};
