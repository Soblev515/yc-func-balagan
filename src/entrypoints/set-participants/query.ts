import {RequestParamsType} from './model';

export const createDbQuery = (user_id, {event_id, is_found}: RequestParamsType) => `
    DECLARE $event_id AS String;
    DECLARE $user_id AS String;
    DECLARE $visible AS Bool;
    $user_id = "${user_id}";
    $event_id = "${event_id}";
    $visible = ${is_found};
    
    UPSERT INTO participants (user_id, event_id, visible)
    Values ($user_id, $event_id, $visible)
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