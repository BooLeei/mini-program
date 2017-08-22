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

function Close(_ref2) {
    var _ref2$reason = _ref2.reason,
        reason = _ref2$reason === undefined ? '' : _ref2$reason,
        _ref2$code = _ref2.code,
        code = _ref2$code === undefined ? 1000 : _ref2$code;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvY2tldC5qcyJdLCJuYW1lcyI6WyJDcmVhdGUiLCJJbml0IiwiU2VuZCIsIlJlY2VpdmUiLCJPbk9wZW4iLCJPbkNsb3NlIiwiQ2xvc2UiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjb25uZWN0U29ja2V0IiwidXJsIiwic3VjY2VzcyIsInJldCIsImZhaWwiLCJlcnIiLCJ1c2VySWQiLCJzZW5kU29ja2V0TWVzc2FnZSIsImNvbnRlbnQiLCJjaGF0SWQiLCJncm91cElkIiwib25Tb2NrZXRNZXNzYWdlIiwicmVzIiwib25Tb2NrZXRPcGVuIiwib25Tb2NrZXRFcnJvciIsIm9uU29ja2V0Q2xvc2UiLCJyZWFzb24iLCJjb2RlIiwiY2xvc2VTb2NrZXQiXSwibWFwcGluZ3MiOiI7Ozs7O1FBR2dCQSxNLEdBQUFBLE07UUFjQUMsSSxHQUFBQSxJO1FBY0FDLEksR0FBQUEsSTtRQWNBQyxPLEdBQUFBLE87UUFRQUMsTSxHQUFBQSxNO1FBV0FDLE8sR0FBQUEsTztRQVFBQyxLLEdBQUFBLEs7O0FBeEVoQjs7OztBQUNBOzs7O0FBRU8sU0FBU04sTUFBVCxHQUE0QjtBQUFBLFFBQVhPLElBQVcsdUVBQUosRUFBSTs7QUFDL0IsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLHVCQUFLQyxhQUFMLENBQW1CO0FBQ2ZDLHNDQURlO0FBRWZDLHFCQUFTLHNCQUFPO0FBQ1pKLHdCQUFRSyxHQUFSO0FBQ0gsYUFKYztBQUtmQyxrQkFBTSxtQkFBTztBQUNUTCx1QkFBT00sR0FBUDtBQUNIO0FBUGMsU0FBbkI7QUFTSCxLQVZNLENBQVA7QUFXSDs7QUFFTSxTQUFTZixJQUFULEdBQTRCO0FBQUEsUUFBYmdCLE1BQWEsdUVBQUosRUFBSTs7QUFDL0IsV0FBTyxJQUFJVCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLHVCQUFLUSxpQkFBTCxDQUF1QjtBQUNuQlgsZ0NBQWtCVSxNQURDO0FBRW5CSixxQkFBUyxzQkFBTztBQUNaSix3QkFBUUssR0FBUjtBQUNILGFBSmtCO0FBS25CQyxrQkFBTSxtQkFBTztBQUNUTCx1QkFBT00sR0FBUDtBQUNIO0FBUGtCLFNBQXZCO0FBU0gsS0FWTSxDQUFQO0FBV0g7O0FBRU0sU0FBU2QsSUFBVCxPQUF1RTtBQUFBLDRCQUF2RGlCLE9BQXVEO0FBQUEsUUFBdkRBLE9BQXVELGdDQUE3QyxFQUE2QztBQUFBLDJCQUF6Q0YsTUFBeUM7QUFBQSxRQUF6Q0EsTUFBeUMsK0JBQWhDLEVBQWdDO0FBQUEsMkJBQTVCRyxNQUE0QjtBQUFBLFFBQTVCQSxNQUE0QiwrQkFBbkIsRUFBbUI7QUFBQSw0QkFBZkMsT0FBZTtBQUFBLFFBQWZBLE9BQWUsZ0NBQUwsRUFBSzs7QUFDMUUsV0FBTyxJQUFJYixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLHVCQUFLUSxpQkFBTCxDQUF1QjtBQUNuQlgsZ0NBQWtCWSxPQUFsQixXQUErQkMsTUFBL0IsV0FBMkNILE1BQTNDLGFBQXlESSxPQUR0QztBQUVuQlIscUJBQVMsc0JBQU87QUFDWkosd0JBQVFLLEdBQVI7QUFDSCxhQUprQjtBQUtuQkMsa0JBQU0sbUJBQU87QUFDVEwsdUJBQU9NLEdBQVA7QUFDSDtBQVBrQixTQUF2QjtBQVNILEtBVk0sQ0FBUDtBQVdIOztBQUVNLFNBQVNiLE9BQVQsR0FBb0I7QUFDdkIsV0FBTyxJQUFJSyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLHVCQUFLWSxlQUFMLENBQXFCLGVBQU87QUFDeEJiLG9CQUFRYyxHQUFSO0FBQ0gsU0FGRDtBQUdILEtBSk0sQ0FBUDtBQUtIOztBQUVNLFNBQVNuQixNQUFULEdBQW1CO0FBQ3RCLFdBQU8sSUFBSUksT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQyx1QkFBS2MsWUFBTCxDQUFrQixlQUFPO0FBQ3JCZixvQkFBUWMsR0FBUjtBQUNILFNBRkQ7QUFHQSx1QkFBS0UsYUFBTCxDQUFtQixlQUFPO0FBQ3RCZixtQkFBT00sR0FBUDtBQUNILFNBRkQ7QUFHSCxLQVBNLENBQVA7QUFRSDs7QUFFTSxTQUFTWCxPQUFULEdBQW9CO0FBQ3ZCLFdBQU8sSUFBSUcsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQyx1QkFBS2dCLGFBQUwsQ0FBbUIsZUFBTztBQUN0QmpCLG9CQUFRYyxHQUFSO0FBQ0gsU0FGRDtBQUdILEtBSk0sQ0FBUDtBQUtIOztBQUVNLFNBQVNqQixLQUFULFFBQTRDO0FBQUEsNkJBQTNCcUIsTUFBMkI7QUFBQSxRQUEzQkEsTUFBMkIsZ0NBQWxCLEVBQWtCO0FBQUEsMkJBQWRDLElBQWM7QUFBQSxRQUFkQSxJQUFjLDhCQUFQLElBQU87O0FBQy9DLFdBQU8sSUFBSXBCLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMsdUJBQUttQixXQUFMLENBQWlCO0FBQ2JoQixxQkFBUyxzQkFBTztBQUNaSix3QkFBUUssR0FBUjtBQUNILGFBSFk7QUFJYkMsa0JBQU0sbUJBQU87QUFDVEwsdUJBQU9NLEdBQVA7QUFDSDtBQU5ZLFNBQWpCO0FBUUgsS0FUTSxDQUFQO0FBVUgiLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IHsgU09DS0VUX1VSTCB9IGZyb20gJy4vY29uc3RhbnRzJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZSAoZGF0YSA9IHt9KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHdlcHkuY29ubmVjdFNvY2tldCh7XHJcbiAgICAgICAgICAgIHVybDogU09DS0VUX1VSTCxcclxuICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmV0KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gSW5pdCAodXNlcklkID0gJycpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgd2VweS5zZW5kU29ja2V0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgIGRhdGE6IGB0cD1hZGQmZj0ke3VzZXJJZH1gLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXQpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBTZW5kICh7Y29udGVudCA9ICcnLCB1c2VySWQgPSAnJywgY2hhdElkID0gJycsIGdyb3VwSWQgPSAnJ30pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgd2VweS5zZW5kU29ja2V0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgIGRhdGE6IGB0cD1tc2cmYz0ke2NvbnRlbnR9JnQ9JHtjaGF0SWR9JmY9JHt1c2VySWR9JmdpZD0ke2dyb3VwSWR9YCxcclxuICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmV0KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVjZWl2ZSAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHdlcHkub25Tb2NrZXRNZXNzYWdlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gT25PcGVuICgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgd2VweS5vblNvY2tldE9wZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3ZXB5Lm9uU29ja2V0RXJyb3IoZXJyID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE9uQ2xvc2UgKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB3ZXB5Lm9uU29ja2V0Q2xvc2UocmVzID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBDbG9zZSAoe3JlYXNvbiA9ICcnLCBjb2RlID0gMTAwMH0pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgd2VweS5jbG9zZVNvY2tldCh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJldClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG4iXX0=