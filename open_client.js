const path = require('path')
const exec = require('child_process').exec

const arg = process.argv[2]

const pwd = path.join(__dirname, `./dist/dev/${arg}/`)

let cmds = {
  'mp-weixin': `/Applications/wechatwebdevtools.app/Contents/MacOS/cli open --project ${pwd}/dist/dev/mp-weixin/`
}
if (cmds[arg]) {
  exec(cmds[arg], function(error, stdout, stderr) {
    if (!error) {
      console.log('成功打开开发工具')
    }
  })
}
