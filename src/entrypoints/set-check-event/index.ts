import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {cancelDbQuery, confirmDbQuery} from './query';


export const handler: Handler.Http = async function (_event, context) {
  const request = RequestParams.parse(context.getPayload());
  if(request.status != "confirm" && request.status != "cancel"){
    return {
      statusCode: 409,
      body: "unknown status"
    };
  }
  console.log(request.status)
  if(request.status == "confirm"){
    const ydbQuery = confirmDbQuery(request);
    const result = await requestFromDB(ydbQuery);
  }
  else if(request.status == "cancel"){
    const ydbQuery = cancelDbQuery(request);
    const result = await requestFromDB(ydbQuery);
  }
  return {
    statusCode: 200,
    body: "Ok"
  };
};
