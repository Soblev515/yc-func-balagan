import {RequestParamsType} from './model';

export const createDbQuery = ({community_id}: RequestParamsType) => `
    DECLARE $community_id AS String;

    $community_id = "${community_id}";

    SELECT * FROM \`community\` WHERE community_id = $community_id;
`;
export const countDbQuery = () => `
    DECLARE $user_id AS String;
    SELECT Count(community_id) FROM community
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


export const organizerDbQuery = (user_id) => `
    DECLARE $user_id AS String;

    $user_id = "${user_id}";

    SELECT * FROM users 
    WHERE user_id = $user_id
`;

export const usersDbQuery = ({community_id}: RequestParamsType) => `
    DECLARE $community_id AS String;

    $community_id = "${community_id}";

    SELECT u.* FROM \`users\` as u 
    Left Join \`user_community\` as uc
    On u.user_id = uc.user_id
    WHERE community_id = $community_id;
`;

export const eventsDbQuery = ({community_id}: RequestParamsType) => `
    DECLARE $community_id AS String;

    $community_id = "${community_id}";

    SELECT e.* FROM \`event\` as e 
    Left Join \`event_community\` as ec
    On e.event_id = ec.event_id
    WHERE community_id = $community_id
    AND status = "confirm";
`;

export const tagsDbQuery = ({community_id}: RequestParamsType) => `
    DECLARE $community_id AS String;

    $community_id = "${community_id}";

    SELECT t.* FROM \`tag\` as t 
    Left Join \`community_tag\` as ct
    On t.tag_id = ct.tag_id
    WHERE community_id = $community_id;
`;