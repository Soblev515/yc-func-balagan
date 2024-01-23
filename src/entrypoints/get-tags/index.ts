import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery,countDbQuery} from './query';
import {number} from "zod";

export const handler: Handler.Http = async function (_event, context) {
  const a = {}
  a["limit"] = Number(_event["queryStringParameters"]["limit"].toString())
  a["offset"] = Number(_event["queryStringParameters"]["offset"].toString())
  const request = RequestParams.parse(a);
  const ydbQuery = createDbQuery(request);
  const result = await requestFromDB(ydbQuery);
  const ydbQuery2 = countDbQuery();
  const result2 = await requestFromDB(ydbQuery2);
  for(const r of result[0]){
    console.log(r)
    r["image"] = "https://storage.yandexcloud.net/balaganimg/tag/"+r["tag_id"]+".png"
  }
  return {
    statusCode: 200,
    body: JSON.stringify({"data": result[0], "count": result2[0][0]["column0"]})
  };
};
