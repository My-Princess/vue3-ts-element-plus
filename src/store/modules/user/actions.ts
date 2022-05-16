
import { ActionTree, ActionContext } from 'vuex'
import { UserState } from '@/store/interface';
import { signIn } from "@/api/user/index"
import { RootState, useStore } from '@/store'
import { state } from './state';
import { Mutations } from './mutations'
import { UserMutationTypes } from '@/store/interface/mutation-types';
import { UserActionTypes } from "@/store/interface/action-types";
// import { removeToken, setToken } from '@/utils/cookies'
import { getToken, setToken, removeToken } from '@/utils/auth'
type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>

export interface Actions {
    [UserActionTypes.ACTION_LOGIN]({ commit }: AugmentedActionContext,
        userInfo: { username: string, password: string }
    ): void
}

export const actions: ActionTree<UserState, RootState> & Actions = {
    // 登录保存token
    async [UserActionTypes.ACTION_LOGIN](
        { commit }: AugmentedActionContext,
        userInfo: { username: string, password: string }
    ) {

        return new Promise((resolve: any, reject: any) => {
            signIn(userInfo).then((res: any) => {
                const { code, data: { token } } = res;
                if (code == 0 && token != "") {
                    // 固定的 cookies 的存储方式
                    // setToken(res.data.accessToken)
                    // 不固定的 cookies 的存储方式
                    setToken('USER-TOKEN', token)
                    commit(UserMutationTypes.SET_TOKEN, token)
                    resolve({ code })
                }
            }).catch((error: any) => {
                reject(error)
            })
        })

    }
}