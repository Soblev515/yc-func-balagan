import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery, idDbQuery, NextIdDbQuery, tagDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const request = RequestParams.parse(context.getPayload());
  const user = atob(_event['headers']['Authorization'].split(" ")[1]).split(":");
  const ydbQuery = idDbQuery(user[0], user[1]);
  const result = await requestFromDB(ydbQuery);
  console.log(result[0][0]["user_id"])
  console.log(result[0]["user_id"])
  const [a] = await requestFromDB(NextIdDbQuery())
  const id = Number(a[0]["column0"])+1;
  const ydbQuery2 = createDbQuery(id, result[0][0]["user_id"], request);
  await requestFromDB(ydbQuery2);
  for(const tag of request["tags"]){
    const ydbQuery3 = tagDbQuery(id, tag);
    await requestFromDB(ydbQuery3);
  }
  return {
    statusCode: 200,
    body: "Ok"
  };
};
