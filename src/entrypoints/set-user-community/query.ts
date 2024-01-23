import {RequestParamsType} from './model';

export const createDbQuery = (user_id, {community_id}: RequestParamsType) => `
    DECLARE $community_id AS String;
    DECLARE $user_id AS String;

    $user_id = "${user_id}";
    $community_id = "${community_id}";
    
    UPSERT INTO user_community (user_id, community_id, role_id)
    Values ($user_id, $community_id, "member")
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