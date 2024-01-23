import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery, eventsDbQuery, idDbQuery, organizerDbQuery, tagsDbQuery, usersDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const request = RequestParams.parse(_event["queryStringParameters"]);
  const ydbQuery = createDbQuery(request);
  const result = await requestFromDB(ydbQuery);
  const ydbQuery2 = usersDbQuery(request);
  const result2 = await requestFromDB(ydbQuery2);
  const user = atob(_event['headers']['Authorization'].split(" ")[1]).split(":");
  const idq = idDbQuery(user[0], user[1]);
  const id = await requestFromDB(idq);
  console.log(result[0][0])
  for(const i of result2[0]){
    i['image'] = "https://storage.yandexcloud.net/balaganimg/user/"+i['user_id']+".png"
  }
  result[0][0]['users'] = {}
  console.log("ok")
  result[0][0]['users']['data'] = result2[0]
  result[0][0]['users']['count'] = result2[0].length
  const ydbQuery3 = eventsDbQuery(request);
  const result3 = await requestFromDB(ydbQuery3);
  for(const i of result3[0]){
    i['image'] = "https://storage.yandexcloud.net/balaganimg/event/"+i['event_id']+".png"
  }
  result[0][0]['events'] = {}
  result[0][0]['events']['data'] = result3[0]
  result[0][0]['events']['count'] = result3[0].length
  const ydbQuery4 = tagsDbQuery(request);
  const result4 = await requestFromDB(ydbQuery4);
  result[0][0]['tags'] = {}
  result[0][0]['tags']['data'] = result4[0]
  result[0][0]['tags']['count'] = result4[0].length
  const ydbQuery6 = organizerDbQuery(result[0][0]["organizer_id"]);
  const result6 = await requestFromDB(ydbQuery6);
  delete result[0][0]["organizer_id"]
  result[0][0]['organizer'] = {}
  result[0][0]['organizer'] = result6[0][0]
  result[0][0]['image'] = "https://storage.yandexcloud.net/balaganimg/community/"+request.community_id+".png"
  result[0][0]['i_join'] = false
  for(const user of result2[0]){
    if(user["user_id"] == id[0][0]["user_id"]){
      result[0][0]['i_join'] = true
      break
    }
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(result[0][0])
  };
};
