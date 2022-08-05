module.exports = {
    types:[
        {value:'feat',name:'新功能'},
        {value:'fix',name:'修复缺陷'},
        {value:'docs',name:'文档变更'},
        {value:'style',name:'代码格式'},
        {value:'refactor',name:'重构'},
        {value:'perf',name:'性能优化'},
        {value:'test',name:'增加测试'},
        {value:'chroe',name:'构建过程或辅助工具的变动'},
        {value:'revert',name:'回退'},
        {value:'build',name:'打包'},
    ],
    messages:{
        type:'请选择提交类型：',
        customScope:'\n请输入修改范围(可选):',
        subject:'请简要描述提交(必填):\n',
        body:'请输入详细描述(可选):\n',
        footer:'请输入要关闭的issue(可选):',
        confirm:'确认使用以上信息提交？(y/n)',
    },
    allowBreakingChanges: ['feat', 'fix'],
    skipQuestions: ['body'],
    allowCustomScopes:true,
    subjectLimit: 50, // 详细描述限制词数
}