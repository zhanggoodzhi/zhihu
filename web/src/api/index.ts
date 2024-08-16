import request from "../utils/request";


export function defaultFetcher(url: string):Promise<any> {
    return request({
        url,
        method: 'get',
    });
}
export function sigin(data: any):Promise<any> {
    return request({
        url: '/api/auth/login',
        method: 'post',
        data
    });
}
export function register(data: any):Promise<any> {
    return request({
        url: '/api/user',
        method: 'post',
        data
    });
}
export function updateUserInfo(data: any):Promise<any> {
    return request({
        url: '/api/user',
        method: 'patch',
        data
    });
}