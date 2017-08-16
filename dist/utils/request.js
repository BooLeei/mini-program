'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _constants = require('./constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = function () {
    function Request() {
        _classCallCheck(this, Request);
    }

    _createClass(Request, [{
        key: 'Get',
        value: function Get(params, path) {
            return new Promise(function (resolve, reject) {
                _wepy2.default.request({
                    url: _constants.SERVICE_URL + path,
                    data: params,
                    method: 'GET',
                    success: function success(ret) {
                        if (Number.parseInt(ret.data.err) === 0) {
                            resolve(ret.data);
                        } else {
                            reject(ret.data);
                        }
                    },
                    fail: function fail(err) {
                        reject(err);
                    }
                });
            });
        }
    }, {
        key: 'Post',
        value: function Post(data, path) {
            return new Promise(function (resolve, reject) {
                _wepy2.default.request({
                    url: _constants.SERVICE_URL + path,
                    data: data,
                    method: 'POST',
                    success: function success(ret) {
                        if (Number.parseInt(ret.data.err) === 0) {
                            resolve(ret.data);
                        } else {
                            reject(ret.data);
                        }
                    },
                    fail: function fail(err) {
                        reject(err);
                    }
                });
            });
        }
    }, {
        key: 'special',
        value: function special(params, path) {
            var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';

            return new Promise(function (resolve, reject) {
                _wepy2.default.request({
                    url: _constants.SERVICE_URL + path,
                    data: params,
                    method: method,
                    success: function success(ret) {
                        resolve(ret.data);
                    },
                    fail: function fail(err) {
                        reject(err);
                    }
                });
            });
        }
    }]);

    return Request;
}();

exports.default = Request;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVlc3QuanMiXSwibmFtZXMiOlsiUmVxdWVzdCIsInBhcmFtcyIsInBhdGgiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVlc3QiLCJ1cmwiLCJkYXRhIiwibWV0aG9kIiwic3VjY2VzcyIsIk51bWJlciIsInBhcnNlSW50IiwicmV0IiwiZXJyIiwiZmFpbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxPOzs7Ozs7OzRCQUNaQyxNLEVBQVFDLEksRUFBTTtBQUNmLG1CQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMsK0JBQUtDLE9BQUwsQ0FBYTtBQUNUQyx5QkFBSyx5QkFBY0wsSUFEVjtBQUVUTSwwQkFBTVAsTUFGRztBQUdUUSw0QkFBUSxLQUhDO0FBSVRDLDZCQUFTLHNCQUFPO0FBQ1osNEJBQUlDLE9BQU9DLFFBQVAsQ0FBZ0JDLElBQUlMLElBQUosQ0FBU00sR0FBekIsTUFBa0MsQ0FBdEMsRUFBeUM7QUFDckNWLG9DQUFRUyxJQUFJTCxJQUFaO0FBQ0gseUJBRkQsTUFFTztBQUNISCxtQ0FBT1EsSUFBSUwsSUFBWDtBQUNIO0FBQ0oscUJBVlE7QUFXVE8sMEJBQU0sbUJBQU87QUFDVFYsK0JBQU9TLEdBQVA7QUFDSDtBQWJRLGlCQUFiO0FBZUgsYUFoQk0sQ0FBUDtBQWlCSDs7OzZCQUVLTixJLEVBQU1OLEksRUFBTTtBQUNkLG1CQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMsK0JBQUtDLE9BQUwsQ0FBYTtBQUNUQyx5QkFBSyx5QkFBY0wsSUFEVjtBQUVUTSwwQkFBTUEsSUFGRztBQUdUQyw0QkFBUSxNQUhDO0FBSVRDLDZCQUFTLHNCQUFPO0FBQ1osNEJBQUlDLE9BQU9DLFFBQVAsQ0FBZ0JDLElBQUlMLElBQUosQ0FBU00sR0FBekIsTUFBa0MsQ0FBdEMsRUFBeUM7QUFDckNWLG9DQUFRUyxJQUFJTCxJQUFaO0FBQ0gseUJBRkQsTUFFTztBQUNISCxtQ0FBT1EsSUFBSUwsSUFBWDtBQUNIO0FBQ0oscUJBVlE7QUFXVE8sMEJBQU0sbUJBQU87QUFDVFYsK0JBQU9TLEdBQVA7QUFDSDtBQWJRLGlCQUFiO0FBZUgsYUFoQk0sQ0FBUDtBQWlCSDs7O2dDQUVRYixNLEVBQVFDLEksRUFBc0I7QUFBQSxnQkFBaEJPLE1BQWdCLHVFQUFQLEtBQU87O0FBQ25DLG1CQUFPLElBQUlOLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMsK0JBQUtDLE9BQUwsQ0FBYTtBQUNUQyx5QkFBSyx5QkFBY0wsSUFEVjtBQUVUTSwwQkFBTVAsTUFGRztBQUdUUSw0QkFBUUEsTUFIQztBQUlUQyw2QkFBUyxzQkFBTztBQUNaTixnQ0FBUVMsSUFBSUwsSUFBWjtBQUNILHFCQU5RO0FBT1RPLDBCQUFNLG1CQUFPO0FBQ1RWLCtCQUFPUyxHQUFQO0FBQ0g7QUFUUSxpQkFBYjtBQVdILGFBWk0sQ0FBUDtBQWFIOzs7Ozs7a0JBdkRnQmQsTyIsImZpbGUiOiJyZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IHsgU0VSVklDRV9VUkwgfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXF1ZXN0IHtcclxuICAgIEdldCAocGFyYW1zLCBwYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogU0VSVklDRV9VUkwgKyBwYXRoLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludChyZXQuZGF0YS5lcnIpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmV0LmRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJldC5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBQb3N0IChkYXRhLCBwYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogU0VSVklDRV9VUkwgKyBwYXRoLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KHJldC5kYXRhLmVycikgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXQuZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmV0LmRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHNwZWNpYWwgKHBhcmFtcywgcGF0aCwgbWV0aG9kID0gJ0dFVCcpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBTRVJWSUNFX1VSTCArIHBhdGgsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBwYXJhbXMsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXQuZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=