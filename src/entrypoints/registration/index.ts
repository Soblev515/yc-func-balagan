import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery, nextIdDbQuery,checkLoginDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const data = context.getPayload();
  console.log("headers:"+data)
  const request = RequestParams.parse(data);
  const [count] = await requestFromDB(checkLoginDbQuery(request.login))
  console.log(request.login)
  console.log("count:"+count[0]["column0"])
  const [a] = await requestFromDB(nextIdDbQuery())
  const id = Number(a[0]["column0"])+1;
  console.log("id:"+a[0]["column0"])
  if(count[0]["column0"] != 0)
    return {
      statusCode: 409,
      body: JSON.stringify('User with this login already exists')
    };
  
  const ydbQuery = createDbQuery(id.toString(), request);
  await requestFromDB(ydbQuery);

  return {
    statusCode: 200,
    body: JSON.stringify('Ok')
  };
};
