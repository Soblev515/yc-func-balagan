import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const request = RequestParams.parse(_event["queryStringParameters"]);

  const ydbQuery = createDbQuery(request);
  const result = await requestFromDB(ydbQuery);
  console.log(result[0][0]["column0"])
  if(result[0][0]["column0"] == "0"){
    return {
      statusCode: 409,
      body: "Not authorized"
    };  
  }
  return {
    statusCode: 200,
    body: "Authorized"
  };
};
