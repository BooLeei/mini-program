'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Get = Get;
exports.Set = Set;
exports.Remove = Remove;
exports.clear = clear;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Get() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return new Promise(function (resolve, reject) {
        _wepy2.default.getStorage({
            key: key,
            success: function success(res) {
                resolve(res.data);
            },
            fail: function fail(err) {
                reject(err);
            }
        });
    });
}

function Set(key, value) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.setStorage({
            key: key,
            data: value,
            success: function success(res) {
                resolve(res);
            },
            fail: function fail(err) {
                reject(err);
            }
        });
    });
}

function Remove(key) {
    return new Promise(function (resolve, reject) {
        _wepy2.default.removeStorage({
            key: key,
            success: function success(res) {
                resolve(res);
            },
            fail: function fail(err) {
                reject(err);
            }
        });
    });
}

function clear() {
    return Promise.resolve(_wepy2.default.clearStorage());
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3JhZ2UuanMiXSwibmFtZXMiOlsiR2V0IiwiU2V0IiwiUmVtb3ZlIiwiY2xlYXIiLCJrZXkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImdldFN0b3JhZ2UiLCJzdWNjZXNzIiwicmVzIiwiZGF0YSIsImZhaWwiLCJlcnIiLCJ2YWx1ZSIsInNldFN0b3JhZ2UiLCJyZW1vdmVTdG9yYWdlIiwiY2xlYXJTdG9yYWdlIl0sIm1hcHBpbmdzIjoiOzs7OztRQUVnQkEsRyxHQUFBQSxHO1FBY0FDLEcsR0FBQUEsRztRQWVBQyxNLEdBQUFBLE07UUFjQUMsSyxHQUFBQSxLOztBQTdDaEI7Ozs7OztBQUVPLFNBQVNILEdBQVQsR0FBdUI7QUFBQSxRQUFWSSxHQUFVLHVFQUFKLEVBQUk7O0FBQzFCLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQyx1QkFBS0MsVUFBTCxDQUFnQjtBQUNaSixpQkFBS0EsR0FETztBQUVaSyxxQkFBUyxzQkFBTztBQUNaSCx3QkFBUUksSUFBSUMsSUFBWjtBQUNILGFBSlc7QUFLWkMsa0JBQU0sbUJBQU87QUFDVEwsdUJBQU9NLEdBQVA7QUFDSDtBQVBXLFNBQWhCO0FBU0gsS0FWTSxDQUFQO0FBV0g7O0FBRU0sU0FBU1osR0FBVCxDQUFhRyxHQUFiLEVBQWtCVSxLQUFsQixFQUF5QjtBQUM1QixXQUFPLElBQUlULE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMsdUJBQUtRLFVBQUwsQ0FBZ0I7QUFDWlgsaUJBQUtBLEdBRE87QUFFWk8sa0JBQU1HLEtBRk07QUFHWkwscUJBQVMsc0JBQU87QUFDWkgsd0JBQVFJLEdBQVI7QUFDSCxhQUxXO0FBTVpFLGtCQUFNLG1CQUFPO0FBQ1RMLHVCQUFPTSxHQUFQO0FBQ0g7QUFSVyxTQUFoQjtBQVVILEtBWE0sQ0FBUDtBQVlIOztBQUVNLFNBQVNYLE1BQVQsQ0FBZ0JFLEdBQWhCLEVBQXFCO0FBQ3hCLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQyx1QkFBS1MsYUFBTCxDQUFtQjtBQUNmWixpQkFBS0EsR0FEVTtBQUVmSyxxQkFBUyxzQkFBTztBQUNaSCx3QkFBUUksR0FBUjtBQUNILGFBSmM7QUFLZkUsa0JBQU0sbUJBQU87QUFDVEwsdUJBQU9NLEdBQVA7QUFDSDtBQVBjLFNBQW5CO0FBU0gsS0FWTSxDQUFQO0FBV0g7O0FBRU0sU0FBU1YsS0FBVCxHQUFpQjtBQUNwQixXQUFPRSxRQUFRQyxPQUFSLENBQWdCLGVBQUtXLFlBQUwsRUFBaEIsQ0FBUDtBQUNIIiwiZmlsZSI6InN0b3JhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdldChrZXkgPSAnJykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB3ZXB5LmdldFN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBTZXQoa2V5LCB2YWx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgZGF0YTogdmFsdWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlbW92ZShrZXkpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgd2VweS5yZW1vdmVTdG9yYWdlKHtcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKCkge1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh3ZXB5LmNsZWFyU3RvcmFnZSgpKVxyXG59XHJcbiJdfQ==