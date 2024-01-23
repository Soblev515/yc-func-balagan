import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery,idDbQuery, tagsDbQuery, usersDbQuery, countDbQuery, organizerDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const a = {}
  a["limit"] = Number(_event["queryStringParameters"]["limit"].toString())
  a["offset"] = Number(_event["queryStringParameters"]["offset"].toString())
  const b = Number(_event["queryStringParameters"]["only_me"].toString())
  a["only_me"] = b != 0; 
  console.log(a)
  const request = RequestParams.parse(a);
  const user = atob(_event['headers']['Authorization'].split(" ")[1]).split(":");
  const idq = idDbQuery(user[0], user[1]);
  const id = await requestFromDB(idq);
  let ydbQuery;
  if(request.only_me){
    console.log(id[0][0]["user_id"])
    ydbQuery = createDbQuery(id[0][0]["user_id"], request);
  }
  else{
    ydbQuery = createDbQuery("", request);
  }
  const result = await requestFromDB(ydbQuery);
  
  for(const item of result[0]){
    const ydbQuery2 = usersDbQuery(item['community_id']);
    const result2 = await requestFromDB(ydbQuery2)
    const ydbQuery4 = tagsDbQuery(item['community_id']);
    const result4 = await requestFromDB(ydbQuery4);
    item['tags'] = {}
    item['tags']['data'] = result4[0]
    item['tags']['count'] = result4[0].length
    item['users'] = {}
    item['users']['data'] = result2[0]
    item['users']['count'] = result2[0].length
    const ydbQuery6 = organizerDbQuery(item["organizer_id"]);
    const result6 = await requestFromDB(ydbQuery6);
    delete item["organizer_id"]
    item['organizer'] = result6[0][0]
    item['image'] = "https://storage.yandexcloud.net/balaganimg/community/"+item['community_id']+".png"
    item['i_join'] = false
    for(const user of result2){
      user['image'] = "https://storage.yandexcloud.net/balaganimg/user/"+user['user_id']+".png"
      if(user["user_id"] == id[0][0]["user_id"]){
        item['i_join'] = true
      }
    }
  }
  let count = result[0].length
  if(!request.only_me){
    const ydbQuery3 = countDbQuery();
    const result3 = await requestFromDB(ydbQuery3);
    console.log(result3)
    count = result3[0][0]["column0"]
  }
  return {
    statusCode: 200,
    body: JSON.stringify({"data": result[0], "count": count})
  };
};
