#!/usr/bin/env sh

set -e

git config user.name 'etongfu'
git config user.email '13583254085@163.com'
git add -A
git commit -m 'deploy'

git push -f git@github.com/QDMarkMan/vue-base-template.git master
cd -