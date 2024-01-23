import {RequestParamsType} from './model';

export const createDbQuery = ({user_id}: RequestParamsType) => `
    DECLARE $user_id AS String;

    $user_id = "${user_id}";

    SELECT * FROM \`users\` WHERE user_id = $user_id;
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

export const eventDbQuery = ({user_id}: RequestParamsType) => `
    DECLARE $user_id AS String;

    $user_id = "${user_id}";

    SELECT u.* FROM \`event\` as u 
    Left Join \`participants\` as uc
    On u.event_id = uc.event_id
    WHERE user_id = $user_id;
`;

export const communityDbQuery = ({user_id}: RequestParamsType) => `
    DECLARE $user_id AS String;

    $user_id = "${user_id}";

    SELECT e.* FROM \`community\` as e 
    Left Join \`user_community\` as ec
    On e.community_id = ec.community_id
    WHERE user_id = $user_id;
`;

export const tagsDbQuery = ({user_id}: RequestParamsType) => `
    DECLARE $user_id AS String;

    $user_id = "${user_id}";

    SELECT t.* FROM \`tag\` as t 
    Left Join \`user_tags\` as ct
    On t.tag_id = ct.tag_id
    WHERE user_id = $user_id;
`;