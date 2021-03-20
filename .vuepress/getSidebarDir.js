const path = require('path');
const fs = require('fs')


function getSideBar (folder) {
  let myPath = path.resolve(__dirname, '../', `blogs/${folder}/`);
  // myPath += `/blogs/${folder}/`
  function getAllFile (filePath, parentPath) {
    let file_list = fs.readdirSync(filePath);
    let result = [];
    for (let i = 0; i < file_list.length; i++) {
      // 判断是否是以.md结尾以此来判断是一个文件夹还是一个文件
      if (check(file_list[i])) {
        let filename = file_list[i].slice(0, -3);
        if (parentPath !== undefined) {
          result[i] = `${parentPath}/${filename}`
        } else {
          result[i] = filename
        }
        if (result[i] === 'README' || result[i] === 'readme') {
          result.splice(i, 1);
          result.unshift('')
        }
      } else {
        // 计算接下来需要解析的路径
        const nextPath = path.resolve(filePath, file_list[i]);
        result[i] = {
          title: file_list[i],
          children: getAllFile(nextPath, file_list[i])
        }
      }

    }
    return result;
  }
  return getAllFile(myPath)
}

function check (fileName) {
  // 如果是文件夹 会返回null  如果是 md文件会返回相应信息
  return fileName, fileName.match(/\.md$/) !== null
}

module.exports.getSideBar = getSideBar