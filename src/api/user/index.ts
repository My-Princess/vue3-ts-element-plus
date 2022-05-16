import request from '@/utils/request';


// 用户登录
export function signIn(params: object) { 
    return request({ url: '/user/login',method: 'post',data: params})
}
// 用户获取的权限
export function permissionData(){
    return request({url:"/user/permission",method:"post"})
}