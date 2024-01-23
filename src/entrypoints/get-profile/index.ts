import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery, eventDbQuery, idDbQuery, tagsDbQuery, communityDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const request = RequestParams.parse(_event["queryStringParameters"]);
  if(request.user_id == ""){
    console.log("k");
    const user = atob(_event['headers']['Authorization'].split(" ")[1]).split(":");
    const idq = idDbQuery(user[0], user[1]);
    const id = await requestFromDB(idq);
    request.user_id = id[0][0]["user_id"];
  }
  const ydbQuery = createDbQuery(request);
  const result = await requestFromDB(ydbQuery);
  const ydbQuery2 = communityDbQuery(request);
  const result2 = await requestFromDB(ydbQuery2);
  for(const c of result2[0]){
    c["image"] = "https://storage.yandexcloud.net/balaganimg/community/"+c["community_id"]+".png"
  }
  result[0][0]['community'] = {}
  result[0][0]['community']['data'] = result2[0]
  result[0][0]['community']['count'] = result2[0].length
  const ydbQuery3 = eventDbQuery(request);
  const result3 = await requestFromDB(ydbQuery3);
  console.log(result2)
  for(const c of result3[0]){
    c["image"] = "https://storage.yandexcloud.net/balaganimg/event/"+c["event_id"]+".png"
  }
  result[0][0]['events'] = {}
  result[0][0]['events']['data'] = result3[0]
  result[0][0]['events']['count'] = result3[0].length
  const ydbQuery4 = tagsDbQuery(request);
  const result4 = await requestFromDB(ydbQuery4);
  result[0][0]['tags'] = {}
  result[0][0]['tags']['data'] = result4[0]
  result[0][0]['tags']['count'] = result4[0].length
  return {
    statusCode: 200,
    body: JSON.stringify(result[0][0])
  };
};
