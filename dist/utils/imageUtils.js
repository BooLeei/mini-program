'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Choose = Choose;
exports.Upload = Upload;
exports.Preview = Preview;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _constants = require('./constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Choose() {
    var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    return new Promise(function (resolve, reject) {
        _wepy2.default.chooseImage({
            count: num,
            sizeType: 'origin',
            success: function success(ret) {
                resolve(ret);
            },
            fail: function fail(err) {
                reject(err);
            }
        });
    });
}

function Upload(file, type, progess) {
    var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'file';

    return new Promise(function (resolve, reject) {
        _wepy2.default.uploadFile({
            url: _constants.UPLOAD_URL,
            name: name,
            filePath: file,
            formData: {
                'type': type
            },
            success: function success(res) {
                var ret = JSON.parse(res.data);
                if (Number.parseInt(ret.err) !== 0) {
                    reject(ret.errmsg);
                } else {
                    resolve(ret);
                }
            },
            fail: function fail(err) {
                reject(err);
            }
        });
        // if (uploadTask) {
        // uploadTask.onProgressUpdate((progress, loaded, total) => {
        //     if (typeof progress === 'function') {
        //         progess(progress, loaded, total)
        //     }
        // })
        // } else {
        //     wepy.showModal({
        //         title: '提示',
        //         content: '当前版本过低，无法查看上传进度，请升级到最新微信版本后重试'
        //     })
        // }
    });
}

function Preview(index, arr) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.previewImage({
            current: arr[index],
            urls: arr,
            success: function success(ret) {
                resolve(ret);
            },
            fail: function fail(err) {
                reject(err);
            }
        });
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlVXRpbHMuanMiXSwibmFtZXMiOlsiQ2hvb3NlIiwiVXBsb2FkIiwiUHJldmlldyIsIm51bSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic3VjY2VzcyIsInJldCIsImZhaWwiLCJlcnIiLCJmaWxlIiwidHlwZSIsInByb2dlc3MiLCJuYW1lIiwidXBsb2FkRmlsZSIsInVybCIsImZpbGVQYXRoIiwiZm9ybURhdGEiLCJKU09OIiwicGFyc2UiLCJyZXMiLCJkYXRhIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJlcnJtc2ciLCJpbmRleCIsImFyciIsInByZXZpZXdJbWFnZSIsImN1cnJlbnQiLCJ1cmxzIl0sIm1hcHBpbmdzIjoiOzs7OztRQUdnQkEsTSxHQUFBQSxNO1FBZUFDLE0sR0FBQUEsTTtRQW9DQUMsTyxHQUFBQSxPOztBQXREaEI7Ozs7QUFDQTs7OztBQUVPLFNBQVNGLE1BQVQsR0FBMEI7QUFBQSxRQUFURyxHQUFTLHVFQUFILENBQUc7O0FBQzdCLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQyx1QkFBS0MsV0FBTCxDQUFpQjtBQUNiQyxtQkFBT0wsR0FETTtBQUViTSxzQkFBVSxRQUZHO0FBR2JDLHFCQUFTLHNCQUFPO0FBQ1pMLHdCQUFRTSxHQUFSO0FBQ0gsYUFMWTtBQU1iQyxrQkFBTSxtQkFBTztBQUNUTix1QkFBT08sR0FBUDtBQUNIO0FBUlksU0FBakI7QUFVSCxLQVhNLENBQVA7QUFZSDs7QUFFTSxTQUFTWixNQUFULENBQWdCYSxJQUFoQixFQUFzQkMsSUFBdEIsRUFBNEJDLE9BQTVCLEVBQW9EO0FBQUEsUUFBZkMsSUFBZSx1RUFBUixNQUFROztBQUN2RCxXQUFPLElBQUliLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMsdUJBQUtZLFVBQUwsQ0FBZ0I7QUFDWkMsc0NBRFk7QUFFWkYsa0JBQU1BLElBRk07QUFHWkcsc0JBQVVOLElBSEU7QUFJWk8sc0JBQVU7QUFDTix3QkFBUU47QUFERixhQUpFO0FBT1pMLHFCQUFTLHNCQUFPO0FBQ1osb0JBQUlDLE1BQU1XLEtBQUtDLEtBQUwsQ0FBV0MsSUFBSUMsSUFBZixDQUFWO0FBQ0Esb0JBQUlDLE9BQU9DLFFBQVAsQ0FBZ0JoQixJQUFJRSxHQUFwQixNQUE2QixDQUFqQyxFQUFvQztBQUNoQ1AsMkJBQU9LLElBQUlpQixNQUFYO0FBQ0gsaUJBRkQsTUFFTztBQUNIdkIsNEJBQVFNLEdBQVI7QUFDSDtBQUNKLGFBZFc7QUFlWkMsa0JBQU0sbUJBQU87QUFDVE4sdUJBQU9PLEdBQVA7QUFDSDtBQWpCVyxTQUFoQjtBQW1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSCxLQWhDTSxDQUFQO0FBaUNIOztBQUVNLFNBQVNYLE9BQVQsQ0FBa0IyQixLQUFsQixFQUF5QkMsR0FBekIsRUFBOEI7QUFDakMsV0FBTyxJQUFJMUIsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQyx1QkFBS3lCLFlBQUwsQ0FBa0I7QUFDZEMscUJBQVNGLElBQUlELEtBQUosQ0FESztBQUVkSSxrQkFBTUgsR0FGUTtBQUdkcEIscUJBQVMsc0JBQU87QUFDWkwsd0JBQVFNLEdBQVI7QUFDSCxhQUxhO0FBTWRDLGtCQUFNLG1CQUFPO0FBQ1ROLHVCQUFPTyxHQUFQO0FBQ0g7QUFSYSxTQUFsQjtBQVVILEtBWE0sQ0FBUDtBQVlIIiwiZmlsZSI6ImltYWdlVXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyBVUExPQURfVVJMIH0gZnJvbSAnLi9jb25zdGFudHMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQ2hvb3NlIChudW0gPSAxKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHdlcHkuY2hvb3NlSW1hZ2Uoe1xyXG4gICAgICAgICAgICBjb3VudDogbnVtLFxyXG4gICAgICAgICAgICBzaXplVHlwZTogJ29yaWdpbicsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJldClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFVwbG9hZChmaWxlLCB0eXBlLCBwcm9nZXNzLCBuYW1lID0gJ2ZpbGUnKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHdlcHkudXBsb2FkRmlsZSh7XHJcbiAgICAgICAgICAgIHVybDogVVBMT0FEX1VSTCxcclxuICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgZmlsZVBhdGg6IGZpbGUsXHJcbiAgICAgICAgICAgIGZvcm1EYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAndHlwZSc6IHR5cGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZXQgPSBKU09OLnBhcnNlKHJlcy5kYXRhKVxyXG4gICAgICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludChyZXQuZXJyKSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXQuZXJybXNnKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJldClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIGlmICh1cGxvYWRUYXNrKSB7XHJcbiAgICAgICAgLy8gdXBsb2FkVGFzay5vblByb2dyZXNzVXBkYXRlKChwcm9ncmVzcywgbG9hZGVkLCB0b3RhbCkgPT4ge1xyXG4gICAgICAgIC8vICAgICBpZiAodHlwZW9mIHByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBwcm9nZXNzKHByb2dyZXNzLCBsb2FkZWQsIHRvdGFsKVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSlcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgLy8gICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgLy8gICAgICAgICBjb250ZW50OiAn5b2T5YmN54mI5pys6L+H5L2O77yM5peg5rOV5p+l55yL5LiK5Lyg6L+b5bqm77yM6K+35Y2H57qn5Yiw5pyA5paw5b6u5L+h54mI5pys5ZCO6YeN6K+VJ1xyXG4gICAgICAgIC8vICAgICB9KVxyXG4gICAgICAgIC8vIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQcmV2aWV3IChpbmRleCwgYXJyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHdlcHkucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgY3VycmVudDogYXJyW2luZGV4XSxcclxuICAgICAgICAgICAgdXJsczogYXJyLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXQpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuIl19