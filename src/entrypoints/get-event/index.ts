import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {communityDbQuery, createDbQuery, organizerDbQuery, participantsDbQuery, idDbQuery, isFavoriteDbQuery, tagsDbQuery} from './query';


export const handler: Handler.Http = async function (_event, context) {
  const request = RequestParams.parse(_event["queryStringParameters"]);
  const user = atob(_event['headers']['Authorization'].split(" ")[1]).split(":");
  const idq = idDbQuery(user[0], user[1]);
  const id = await requestFromDB(idq);
  const ydbQuery = createDbQuery(request);
  const result = await requestFromDB(ydbQuery);
  const ydbQuery2 = participantsDbQuery(request);
  const result2 = await requestFromDB(ydbQuery2);
  for(const i of result2[0]){
    i['image'] = "https://storage.yandexcloud.net/balaganimg/user/"+i['user_id']+".png"
  }
  result[0][0]['participants'] = {}
  result[0][0]['participants']['data'] = result2[0]
  result[0][0]['participants']['count'] = result2[0].length
  const ydbQuery3 = communityDbQuery(request);
  const result3 = await requestFromDB(ydbQuery3);
  for(const i of result3[0]){
    i['image'] = "https://storage.yandexcloud.net/balaganimg/community/"+i['community_id']+".png"
  }
  result[0][0]['communities'] = {}
  result[0][0]['communities']['data'] = result3[0]
  result[0][0]['communities']['count'] = result3[0].length
  const ydbQuery5 = tagsDbQuery(request);
  const result5 = await requestFromDB(ydbQuery5);
  result[0][0]['tags'] = {}
  result[0][0]['tags']['data'] = result5[0]
  result[0][0]['tags']['count'] = result5[0].length
  const ydbQuery6 = organizerDbQuery(result[0][0]["organizer_id"]);
  const result6 = await requestFromDB(ydbQuery6);
  delete result[0][0]["organizer_id"]
  result[0][0]['organizer'] = result6[0][0]
  const ydbQuery4 = isFavoriteDbQuery(id[0][0]["user_id"]);
  const result4 = await requestFromDB(ydbQuery4);
  result[0][0]['image'] = "https://storage.yandexcloud.net/balaganimg/event/"+request.event_id+".png"
  console.log(result4)
  for(const event of result[0]) {
    for (const fav of result4[0]) {
      event["isFavorite"] = String(event["event_id"]) == String(fav["event_id"]);
      if(event["isFavorite"])
        break
    }
    for (const p of result2[0]) {
      event["isJoin"] = String(id[0][0]["user_id"]) == String(p["user_id"]);
      if(event["isJoin"])
        break
    }
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(result[0][0])
  };
};
