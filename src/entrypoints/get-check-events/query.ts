import {RequestParamsType} from './model';

export const createDbQuery = (user_id, {limit = 20, offset = 0}: RequestParamsType) => `
    DECLARE $limit AS Uint32;
    DECLARE $offset AS Uint32;
    DECLARE $user_id AS String;
    $limit = ${limit};
    $offset = ${offset};
    $user_id = "${user_id}";
    SELECT e.*, es.status as status FROM \`event\` as e
    Left Join \`event_status\` as es
    On e.event_id = es.event_id
    WHERE status != "confirm"
    AND IF ($user_id = "", true, organizer_id = $user_id)
    LIMIT $limit
    OFFSET $offset;
`;

export const countDbQuery = () => `
    DECLARE $user_id AS String;
    SELECT Count(e.event_id) FROM \`event\` as e
    Left Join \`event_status\` as es
    On e.event_id = es.event_id
    WHERE status != "confirm"
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