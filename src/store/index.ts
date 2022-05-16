import { createStore, createLogger } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import { store as permission, PermissionStore, PermissionState } from '@/store/modules/permission'
import { store as user, UserStore, UserState } from '@/store/modules/user'

export interface RootState {
    permission: PermissionState
    user: UserState
}

export type Store = PermissionStore<Pick<RootState, 'permission'>> & UserStore<Pick<RootState, 'user'>>

//在开发环境中插入记录器
const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []
// 插入基于会话存储的持久性
// plugins.push(createPersistedState({ storage: window.sessionStorage }))


export const store = createStore({
    plugins,
    modules: {
        permission,
        user,
    }
})

export function useStore(): Store {
    return store as Store
}
