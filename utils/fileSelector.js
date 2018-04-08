var fs = require('fs');
var path = require('path');

// 解析需要遍历的文件夹，我这以E盘根目录为例
// var filePath = path.resolve('E:');

//调用文件遍历方法
// fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */

exports.fileDisplay = function (filePath) {

    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            // 遍历读取到的文件列表
            files.forEach(function (filename) {
                // 获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                // 根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        console.warn('獲取文件stats失敗');
                    } else {
                        var isFile = stats.isFile(); //是文件
                        var isDir = stats.isDirectory(); //是文件夹
                        if (isFile) {
                            // 只filter出md檔
                            if (path.extname(filedir) == '.md') {
                                console.log(filedir);
                            }
                        }
                        if (isDir) {
                            fileDisplay(filedir); //遞迴，如果是文件夹，就繼續遍歷該文件夹下面的文件
                        }
                    }
                })
            });
        }
    }); 
    
}
