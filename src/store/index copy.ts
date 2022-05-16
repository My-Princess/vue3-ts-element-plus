import type { App,InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { RootStateTypes } from './interface/index';
// https://developer.mozilla.org/zh-cn/docs/web/javascript/reference/statements/import.meta
const modulesGlob = import.meta.globEager('./**/*.ts'), modules: any = {};
console.log('modulesGlob',modulesGlob)
// Set global vuex getters
let getters: any = "";
// 获取modules文件夹下的所有文件夹，
// 遍历文件对象设置Vuex模块和getter
Object.keys(modulesGlob).map((key) => {
    if (key.indexOf("modules") >= 0) {
        modules[key.split("/")[key.split("/").length - 1].replace(/\.ts|.js/, "")] = modulesGlob[key].default;
    } else {
        getters = modulesGlob[key].default;
    }
});
console.log('modules',modules)
console.log('getters',getters,process.env.NODE_ENV)

//  定义注入类型 InjectionKey 将store安装到Vue应用程序时提供类型,将类型传递InjectionKey给useStore方法
const key: InjectionKey<Store<RootStateTypes>> = Symbol()

const store = createStore<RootStateTypes>({
    modules,
    getters,
    strict:false,
})

export function setupStore(app:App<Element>):any{
    app.use(store,key);
}


export default store

