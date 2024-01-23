import {RequestParamsType} from './model';

export const createDbQuery = (user_id, {login, password, name}: RequestParamsType) => `
    DECLARE $user_id AS String;
    DECLARE $login AS String;
    DECLARE $password AS String;
    DECLARE $name AS String;

    $user_id = "${user_id}";
    $login = "${login}";
    $password = "${password}";
    $name = "${name}";
    -- Create/Update content block
    UPSERT INTO \`auth\` (user_id, login, password)
    VALUES ($user_id, $login, $password);
    -- Create/Update content block
    UPSERT INTO \`users\` (user_id, name, city, verify)
    VALUES ($user_id, $name, "Екатеринбург", false);
`;
export const nextIdDbQuery = () => `
    DECLARE $login AS String;
    SELECT Max(user_id) 
    From \`auth\`;
`;

export const checkLoginDbQuery = (login) => `
    DECLARE $login AS String;
    $login = "${login}";
    SELECT Count(user_id)
    From \`auth\` 
    Where login = $login;
`;