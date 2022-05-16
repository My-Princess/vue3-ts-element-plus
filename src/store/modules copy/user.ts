import { Module } from "vuex";
import { signIn } from "@/api/user/index"
import { Userinfo, RootStateTypes } from '../interface/index';
import { getToken, setToken, removeToken } from '@/utils/auth'
const userstate: Module<Userinfo, RootStateTypes> = {
    state() {
        return {
            name: '',
            avatar: '',
            roles: [],
            permissions: [],
        }
    },
    mutations: {

    },
    actions: {
        Login({ commit }: any, Userinfo: any) {
            // const res = await signIn(Userinfo)
            return new Promise((resolve: any, reject: any) => {
                signIn(Userinfo).then((res: any) => {
                    const { code, data: { token } } = res;
                    setToken('USER-TOKEN', token)
                    resolve({code})
                }).catch((error:any)=>{
                    reject(error)
                })
            })
        }

    }
}
export default userstate;