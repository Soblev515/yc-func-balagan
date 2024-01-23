import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery, tagsDbQuery} from './query';


export const handler: Handler.Http = async function (_event, context) {
  const a = {}
  a["event_id"] = Number(_event["queryStringParameters"]["event_id"].toString())
  const request = RequestParams.parse(a)
  const ydbQuery = createDbQuery(request);
  const result = await requestFromDB(ydbQuery);
  const ydbQuery3 = tagsDbQuery(request);
  const result3 = await requestFromDB(ydbQuery3);
  result[0][0]['tags'] = {}
  result[0][0]['tags']['data'] = result3[0]
  result[0][0]['tags']['count'] = result3[0].length
  return {
    statusCode: 200,
    body: JSON.stringify(result[0][0])
  };
};
