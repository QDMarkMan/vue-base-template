#!/bin/bash 
# build 脚本 暂时不使用 如果对sh有研究 可以直接使用

echo "打包文件"
yarn build
echo "传输文件"
scp -r ./dist/** pig@xxx.xxx.xxx.xxx:/data
echo "部署成功"