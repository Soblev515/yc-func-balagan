import {RequestParamsType} from './model';

export const createDbQuery = (user_id, tag_id) => `
    DECLARE $tag_id AS String;
    DECLARE $user_id AS String;

    $user_id = "${user_id}";
    $tag_id = "${tag_id}";
    
    UPSERT INTO user_tags (user_id, tag_id)
    Values ($user_id, $tag_id)
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

export const deleteDbQuery = (user_id) => `
    DECLARE $user_id AS String;
    $user_id = "${user_id}";
    
    Delete FROM user_tags 
    WHERE user_id = $user_id 
`;