import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {idDbQuery, getDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
  console.log(_event['headers'])
  console.log(_event['headers']['Authorization'])
  const user = atob(_event['headers']['Authorization'].split(" ")[1]).split(":");
  console.log(user)
  const ydbQuery = idDbQuery(user[0], user[1]);
  const result = await requestFromDB(ydbQuery);
  console.log(result)
  const ydbQuery2 = getDbQuery(result[0][0]["user_id"]);
  const result2 = await requestFromDB(ydbQuery2);
  console.log(result2)
  return {
    statusCode: 200,
    body: JSON.stringify(result2[0])
  };
};
