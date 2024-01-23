import {RequestParamsType} from './model';

export const createDbQuery = (user_id, {event_id}: RequestParamsType) => `
    DECLARE $event_id AS String;
    DECLARE $user_id AS String;

    $user_id = "${user_id}";
    $event_id = "${event_id}";
    
    UPSERT INTO favorite_user_event (user_id, event_id)
    Values ($user_id, $event_id)
`;

export const idDbQuery = (login, password) => `
    DECLARE $login AS String;
    DECLARE $password AS String;

    $login = "${login}";
    $password = "${password}";

    SELECT user_id FROM auth 
    WHERE login = $login 
    AND password = $password
`;