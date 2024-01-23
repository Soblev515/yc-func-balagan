import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery,idDbQuery, isFavoriteDbQuery, organizerDbQuery, participantsDbQuery, tagsDbQuery, countDbQuery} from './query';


export const handler: Handler.Http = async function (_event, context) {
  const a = {}
  a["limit"] = Number(_event["queryStringParameters"]["limit"].toString())
  a["offset"] = Number(_event["queryStringParameters"]["offset"].toString())
  const b = Number(_event["queryStringParameters"]["is_me"].toString())
  a["is_me"] = b != 0;
  const c = Number(_event["queryStringParameters"]["is_favorite"].toString())
  a["is_favorite"] = c != 0
  console.log(a)
  const request = RequestParams.parse(a);
  const user = atob(_event['headers']['Authorization'].split(" ")[1]).split(":");
  const idq = idDbQuery(user[0], user[1]);
  const id = await requestFromDB(idq);
    
  const ydbQuery = createDbQuery(request);
  const result = await requestFromDB(ydbQuery);
  const events = []
  console.log(result)
  for(const event of result[0]){ 
    const ydbQuery2 = participantsDbQuery(event["event_id"]);
    const result2 = await requestFromDB(ydbQuery2);
    const ydbQuery5 = tagsDbQuery(event["event_id"]);
    const result5 = await requestFromDB(ydbQuery5);
    event['tags'] = {}
    event['tags']['data'] = result5[0]
    event['tags']['count'] = result5[0].length
    const ydbQuery6 = organizerDbQuery(event["organizer_id"]);
    const result6 = await requestFromDB(ydbQuery6);
    delete event["organizer_id"]
    event['organizer'] = result6[0][0]
    const ydbQuery4 = isFavoriteDbQuery(id[0][0]["user_id"]);
    const result4 = await requestFromDB(ydbQuery4);
    event["isFavorite"] = false
    event["isJoin"] = false
    event['image'] = "https://storage.yandexcloud.net/balaganimg/event/"+event["event_id"]+".png"

    for (const fav of result4[0]) {
      event["isFavorite"] = String(event["event_id"]) == String(fav["event_id"]);
      if(event["isFavorite"])
        break
    }
    if(!event["isFavorite"] && request["is_favorite"]){
      continue
    }
    for (const p of result2[0]) {
      event["isJoin"] = String(id[0][0]["user_id"]) == String(p["user_id"]);
      if(event["isJoin"])
        break
    }
    if(!event["isJoin"] && request["is_me"]){
      continue
    }
    events.push(event)
  }
  let count = events.length
  if(!request["is_me"] && !request["is_favorite"]){
    const ydbQuery3 = countDbQuery();
    const result3 = await requestFromDB(ydbQuery3);
    count = result3[0][0]["column0"]
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify({"data": events, "count": count})
  };
};
