'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Create = Create;
exports.Init = Init;
exports.Send = Send;
exports.Receive = Receive;
exports.OnOpen = OnOpen;
exports.OnClose = OnClose;
exports.Close = Close;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _constants = require('./constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Create() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new Promise(function (resolve, reject) {
        _wepy2.default.connectSocket({
            url: _constants.SOCKET_URL,
            success: function success(ret) {
                resolve(ret);
            },
            fail: function fail(err) {
                reject(err);
            }
        });
    });
}

function Init() {
    var userId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return new Promise(function (resolve, reject) {
        _wepy2.default.sendSocketMessage({
            data: 'tp=add&f=' + userId,
            success: function success(ret) {
                resolve(ret);
            },
            fail: function fail(err) {
                reject(err);
            }
        });
    });
}

function Send(_ref) {
    var _ref$content = _ref.content,
        content = _ref$content === undefined ? '' : _ref$content,
        _ref$userId = _ref.userId,
        userId = _ref$userId === undefined ? '' : _ref$userId,
        _ref$chatId = _ref.chatId,
        chatId = _ref$chatId === undefined ? '' : _ref$chatId,
        _ref$groupId = _ref.groupId,
        groupId = _ref$groupId === undefined ? '' : _ref$groupId;

    return new Promise(function (resolve, reject) {
        _wepy2.default.sendSocketMessage({
            data: 'tp=msg&c=' + content + '&t=' + chatId + '&f=' + userId + '&gid=' + groupId,
            success: function success(ret) {
                resolve(ret);
            },
            fail: function fail(err) {
                reject(err);
            }
        });
    });
}

function Receive() {
    return new Promise(function (resolve, reject) {
        _wepy2.default.onSocketMessage(function (res) {
            console.log(res);
            resolve(res);
        });
    });
}

function OnOpen() {
    return new Promise(function (resolve, reject) {
        _wepy2.default.onSocketOpen(function (res) {
            resolve(res);
        });
        _wepy2.default.onSocketError(function (err) {
            reject(err);
        });
    });
}

function OnClose() {
    return new Promise(function (resolve, reject) {
        _wepy2.default.onSocketClose(function (res) {
            resolve(res);
        });
    });
}

function Close() {
    return new Promise(function (resolve, reject) {
        _wepy2.default.closeSocket({
            success: function success(ret) {
                resolve(ret);
            },
            fail: function fail(err) {
                reject(err);
            }
        });
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvY2tldC5qcyJdLCJuYW1lcyI6WyJDcmVhdGUiLCJJbml0IiwiU2VuZCIsIlJlY2VpdmUiLCJPbk9wZW4iLCJPbkNsb3NlIiwiQ2xvc2UiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjb25uZWN0U29ja2V0IiwidXJsIiwic3VjY2VzcyIsInJldCIsImZhaWwiLCJlcnIiLCJ1c2VySWQiLCJzZW5kU29ja2V0TWVzc2FnZSIsImNvbnRlbnQiLCJjaGF0SWQiLCJncm91cElkIiwib25Tb2NrZXRNZXNzYWdlIiwiY29uc29sZSIsImxvZyIsInJlcyIsIm9uU29ja2V0T3BlbiIsIm9uU29ja2V0RXJyb3IiLCJvblNvY2tldENsb3NlIiwiY2xvc2VTb2NrZXQiXSwibWFwcGluZ3MiOiI7Ozs7O1FBR2dCQSxNLEdBQUFBLE07UUFjQUMsSSxHQUFBQSxJO1FBY0FDLEksR0FBQUEsSTtRQWNBQyxPLEdBQUFBLE87UUFTQUMsTSxHQUFBQSxNO1FBV0FDLE8sR0FBQUEsTztRQVFBQyxLLEdBQUFBLEs7O0FBekVoQjs7OztBQUNBOzs7O0FBRU8sU0FBU04sTUFBVCxHQUE0QjtBQUFBLFFBQVhPLElBQVcsdUVBQUosRUFBSTs7QUFDL0IsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLHVCQUFLQyxhQUFMLENBQW1CO0FBQ2ZDLHNDQURlO0FBRWZDLHFCQUFTLHNCQUFPO0FBQ1pKLHdCQUFRSyxHQUFSO0FBQ0gsYUFKYztBQUtmQyxrQkFBTSxtQkFBTztBQUNUTCx1QkFBT00sR0FBUDtBQUNIO0FBUGMsU0FBbkI7QUFTSCxLQVZNLENBQVA7QUFXSDs7QUFFTSxTQUFTZixJQUFULEdBQTRCO0FBQUEsUUFBYmdCLE1BQWEsdUVBQUosRUFBSTs7QUFDL0IsV0FBTyxJQUFJVCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLHVCQUFLUSxpQkFBTCxDQUF1QjtBQUNuQlgsZ0NBQWtCVSxNQURDO0FBRW5CSixxQkFBUyxzQkFBTztBQUNaSix3QkFBUUssR0FBUjtBQUNILGFBSmtCO0FBS25CQyxrQkFBTSxtQkFBTztBQUNUTCx1QkFBT00sR0FBUDtBQUNIO0FBUGtCLFNBQXZCO0FBU0gsS0FWTSxDQUFQO0FBV0g7O0FBRU0sU0FBU2QsSUFBVCxPQUF1RTtBQUFBLDRCQUF2RGlCLE9BQXVEO0FBQUEsUUFBdkRBLE9BQXVELGdDQUE3QyxFQUE2QztBQUFBLDJCQUF6Q0YsTUFBeUM7QUFBQSxRQUF6Q0EsTUFBeUMsK0JBQWhDLEVBQWdDO0FBQUEsMkJBQTVCRyxNQUE0QjtBQUFBLFFBQTVCQSxNQUE0QiwrQkFBbkIsRUFBbUI7QUFBQSw0QkFBZkMsT0FBZTtBQUFBLFFBQWZBLE9BQWUsZ0NBQUwsRUFBSzs7QUFDMUUsV0FBTyxJQUFJYixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLHVCQUFLUSxpQkFBTCxDQUF1QjtBQUNuQlgsZ0NBQWtCWSxPQUFsQixXQUErQkMsTUFBL0IsV0FBMkNILE1BQTNDLGFBQXlESSxPQUR0QztBQUVuQlIscUJBQVMsc0JBQU87QUFDWkosd0JBQVFLLEdBQVI7QUFDSCxhQUprQjtBQUtuQkMsa0JBQU0sbUJBQU87QUFDVEwsdUJBQU9NLEdBQVA7QUFDSDtBQVBrQixTQUF2QjtBQVNILEtBVk0sQ0FBUDtBQVdIOztBQUVNLFNBQVNiLE9BQVQsR0FBb0I7QUFDdkIsV0FBTyxJQUFJSyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLHVCQUFLWSxlQUFMLENBQXFCLGVBQU87QUFDeEJDLG9CQUFRQyxHQUFSLENBQVlDLEdBQVo7QUFDQWhCLG9CQUFRZ0IsR0FBUjtBQUNILFNBSEQ7QUFJSCxLQUxNLENBQVA7QUFNSDs7QUFFTSxTQUFTckIsTUFBVCxHQUFtQjtBQUN0QixXQUFPLElBQUlJLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMsdUJBQUtnQixZQUFMLENBQWtCLGVBQU87QUFDckJqQixvQkFBUWdCLEdBQVI7QUFDSCxTQUZEO0FBR0EsdUJBQUtFLGFBQUwsQ0FBbUIsZUFBTztBQUN0QmpCLG1CQUFPTSxHQUFQO0FBQ0gsU0FGRDtBQUdILEtBUE0sQ0FBUDtBQVFIOztBQUVNLFNBQVNYLE9BQVQsR0FBb0I7QUFDdkIsV0FBTyxJQUFJRyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLHVCQUFLa0IsYUFBTCxDQUFtQixlQUFPO0FBQ3RCbkIsb0JBQVFnQixHQUFSO0FBQ0gsU0FGRDtBQUdILEtBSk0sQ0FBUDtBQUtIOztBQUVNLFNBQVNuQixLQUFULEdBQWtCO0FBQ3JCLFdBQU8sSUFBSUUsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQyx1QkFBS21CLFdBQUwsQ0FBaUI7QUFDYmhCLHFCQUFTLHNCQUFPO0FBQ1pKLHdCQUFRSyxHQUFSO0FBQ0gsYUFIWTtBQUliQyxrQkFBTSxtQkFBTztBQUNUTCx1QkFBT00sR0FBUDtBQUNIO0FBTlksU0FBakI7QUFRSCxLQVRNLENBQVA7QUFVSCIsImZpbGUiOiJzb2NrZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgeyBTT0NLRVRfVVJMIH0gZnJvbSAnLi9jb25zdGFudHMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQ3JlYXRlIChkYXRhID0ge30pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgd2VweS5jb25uZWN0U29ja2V0KHtcclxuICAgICAgICAgICAgdXJsOiBTT0NLRVRfVVJMLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXQpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJbml0ICh1c2VySWQgPSAnJykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB3ZXB5LnNlbmRTb2NrZXRNZXNzYWdlKHtcclxuICAgICAgICAgICAgZGF0YTogYHRwPWFkZCZmPSR7dXNlcklkfWAsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJldClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFNlbmQgKHtjb250ZW50ID0gJycsIHVzZXJJZCA9ICcnLCBjaGF0SWQgPSAnJywgZ3JvdXBJZCA9ICcnfSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB3ZXB5LnNlbmRTb2NrZXRNZXNzYWdlKHtcclxuICAgICAgICAgICAgZGF0YTogYHRwPW1zZyZjPSR7Y29udGVudH0mdD0ke2NoYXRJZH0mZj0ke3VzZXJJZH0mZ2lkPSR7Z3JvdXBJZH1gLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXQpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWNlaXZlICgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgd2VweS5vblNvY2tldE1lc3NhZ2UocmVzID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICByZXNvbHZlKHJlcylcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE9uT3BlbiAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHdlcHkub25Tb2NrZXRPcGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgd2VweS5vblNvY2tldEVycm9yKGVyciA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBPbkNsb3NlICgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgd2VweS5vblNvY2tldENsb3NlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQ2xvc2UgKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB3ZXB5LmNsb3NlU29ja2V0KHtcclxuICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmV0KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcbiJdfQ==