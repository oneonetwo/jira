### 笔记
1. 绝对路径 tsconfig.js 中配置 { "complierOptions": "baseUrl": "./src"};
2. 格式化 perttier 
3. commit规范 commit-msg 
4. 我们的工程用什么把TS编译成JS文件的？
    - 目前大多数的ts工程都是`ts类型检查+babel编译`这样的组合,我们的工程也不例外；
    - 用babel编译ts，就可以实现一种效果： babel编译一切，降低开发/配置成本；
    - 我们代码中的jsx/tsx文件，就是用@babel/plugin-transform-react-jsx这个babel插件转化的。
5. Fetch方法
    1. 当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject， 即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
    2. fetch() 可以不会接受跨域 cookies；你也可以不能使用 fetch() 建立起跨域会话。其他网站的 Set-Cookie 头部字段将会被无视。
    3. fetch 不会发送 cookies。除非你使用了credentials 的初始化选项。（自 2017 年 8 月 25 日以后，默认的 credentials 政策变更为 same-origin。Firefox 也在 61.0b13 版本中进行了修改
6. src下的 .env .env.development文件配置不同环境的接口地址；
7. "json-server": "json-server __json_server_mock__/db.json --watch --middlewares __json_server_mock__/middleware.js"
8. why-did-you-render 告诉你你的页面为什么一直重新渲染
    1. 先安装https://github.com/welldone-software/why-did-you-render
    2. 在src下建立wdyr.js文件，在app.js中引用；
9. 基本类型可以放到依赖里面，组件状态可以放到依赖里面；非组件状态的对象一定不能放在依赖里面；
10. useState 直接传入函数的意义是惰性初始化，所以用useState保存函数不能直接传入函数
    1. useRef保存的值，并不是组件的转态，改变它的值并不会触发组件的重新渲染；
11. 函数柯力化和函数省参的结合，在useEditProject()中
#### 第10章
1. 用useMountedRef自定义hook来确定组件的加载状态，避免组件卸载之后请求返回发生的错误；进而阻止在已卸载组件上赋值；
2. 在useCallback中用到了setState,并且把state加到依赖里面，会造成无限渲染的问题， 那么可以用setState的函数用法，然后去掉state作为依赖项
