# QQMusicToNetease

本项目用于向网易云中导入QQ音乐歌单。

### 写在最前面

本来想写英文 README 的，后来想想也只有国人有这需求，就算了吧。

> **本项目仅供个人学习使用，请勿用于商业用途，如有侵权，请联系作者删除**

### 使用环境

Windows、NodeJs

### 使用方法

将本项目克隆到本地：

```
git clone https://github.com/sxyugao/QQMusicToNetease.git
```

下载依赖：

```
cd QQMusicToNetease
git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git
```

然后将从 [QQMusicAPI](https://github.com/jsososo/QQMusicApi) 获得的歌单 JSON 文件保存为 `data.json` 放在根目录下。

再将网易云音乐的 cookie 保存到 `cookie.txt` 中。

接着启动依赖 `./NeteaseService.cmd`。

最后执行 `node app.js`。

### TODO

- 更加友好的使用方式

- 将 QQMusicAPI 整合进来

### 鸣谢

https://github.com/jsososo/QQMusicApi

https://github.com/Binaryify/NeteaseCloudMusicApi