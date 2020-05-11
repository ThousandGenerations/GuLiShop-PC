module.exports = {
    lintOnSave: false, // 关闭eslint规则检查
    devServer: {
        open: true,
        port: 9527,
        proxy: { // 配置代理
            '/api': { // 只处理以/api开头的请求
                target: 'http://182.92.128.115', // 转发的目标地址
                changeOrigin: true // 支持跨域
            }
        }
    },
}