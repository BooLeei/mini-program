'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Progress = function (_wepy$page) {
    _inherits(Progress, _wepy$page);

    function Progress() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Progress);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Progress.__proto__ || Object.getPrototypeOf(Progress)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '求职进度'
        }, _this.userId = '', _this.page = {
            index: 1,
            busy: false,
            hasNot: false
        }, _this.request = new _request2.default(), _this.data = {
            progress: []
        }, _this.components = {
            'toast': _toast2.default
        }, _this.methods = {
            toCompany: function toCompany(id) {
                _wepy2.default.navigateTo({
                    url: 'company?id=' + id
                });
            },
            test: function test(id) {
                _wepy2.default.navigateTo({
                    url: 'comment?id=' + id + '&type=2'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Progress, [{
        key: 'getProgress',
        value: function getProgress() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

            return this.request.Get({
                userId: this.userId,
                page: page,
                pageSize: pageSize
            }, '/SendResume/getList');
        }
    }, {
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this2 = this;

            _wepy2.default.onSocketMessage(function (res) {
                _this2.$parent.global.curVal = Number.parseInt(_this2.$parent.global.curVal) + 1;
                _this2.toast({ content: '您有新消息' });
            });
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this3 = this;

            this.getProgress().then(function (_ref2) {
                var data = _ref2.data;

                _this3.progress = data;
                _wepy2.default.stopPullDownRefresh();
                _this3.$apply();
            });
        }
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            var _this4 = this;

            if (this.page.busy) {
                return false;
            }
            if (this.page.hasNot) {
                return false;
            }
            this.page.index++;
            this.page.busy = true;
            this.getProgress(this.page.index).then(function (_ref3) {
                var data = _ref3.data;

                if (Array.isArray(data) && data.length === 0) {
                    _this4.hasNot = true;
                }
                _this4.progress = [].concat(_toConsumableArray(_this4.progress), _toConsumableArray(data));
                _this4.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this5 = this;

            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            this.userId = params.id;
            this.getProgress().then(function (_ref4) {
                var data = _ref4.data;

                _this5.progress = data;
                _this5.$apply();
                _wepy2.default.hideLoading();
            });
        }
    }]);

    return Progress;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Progress , 'pages/progress'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2dyZXNzLmpzIl0sIm5hbWVzIjpbIlByb2dyZXNzIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJ1c2VySWQiLCJwYWdlIiwiaW5kZXgiLCJidXN5IiwiaGFzTm90IiwicmVxdWVzdCIsImRhdGEiLCJwcm9ncmVzcyIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwidG9Db21wYW55IiwiaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwidGVzdCIsInBhZ2VTaXplIiwiR2V0IiwiJGludm9rZSIsIm9uU29ja2V0TWVzc2FnZSIsIiRwYXJlbnQiLCJnbG9iYWwiLCJjdXJWYWwiLCJOdW1iZXIiLCJwYXJzZUludCIsInRvYXN0IiwiY29udGVudCIsImdldFByb2dyZXNzIiwidGhlbiIsInN0b3BQdWxsRG93blJlZnJlc2giLCIkYXBwbHkiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJwYXJhbXMiLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsImhpZGVMb2FkaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCO0FBRm5CLFMsUUFLVEMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0hDLG1CQUFPLENBREo7QUFFSEMsa0JBQU0sS0FGSDtBQUdIQyxvQkFBUTtBQUhMLFMsUUFNUEMsTyxHQUFVLHVCLFFBU1ZDLEksR0FBTztBQUNIQyxzQkFBVTtBQURQLFMsUUFJUEMsVSxHQUFhO0FBQ1Q7QUFEUyxTLFFBZWJDLE8sR0FBVTtBQUNOQyxxQkFETSxxQkFDS0MsRUFETCxFQUNTO0FBQ1gsK0JBQUtDLFVBQUwsQ0FBZ0I7QUFDWkMseUNBQW1CRjtBQURQLGlCQUFoQjtBQUdILGFBTEs7QUFNTkcsZ0JBTk0sZ0JBTUFILEVBTkEsRUFNSTtBQUNOLCtCQUFLQyxVQUFMLENBQWdCO0FBQ1pDLHlDQUFtQkYsRUFBbkI7QUFEWSxpQkFBaEI7QUFHSDtBQVZLLFM7Ozs7O3NDQTNCMkI7QUFBQSxnQkFBeEJWLElBQXdCLHVFQUFqQixDQUFpQjtBQUFBLGdCQUFkYyxRQUFjLHVFQUFILENBQUc7O0FBQ2pDLG1CQUFPLEtBQUtWLE9BQUwsQ0FBYVcsR0FBYixDQUFpQjtBQUNwQmhCLHdCQUFRLEtBQUtBLE1BRE87QUFFcEJDLHNCQUFNQSxJQUZjO0FBR3BCYywwQkFBVUE7QUFIVSxhQUFqQixFQUlKLHFCQUpJLENBQVA7QUFLSDs7O2dDQVVpQjtBQUFBLGdCQUFYVCxJQUFXLHVFQUFKLEVBQUk7O0FBQ2QsaUJBQUtXLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLFdBQXRCLEVBQW1DWCxJQUFuQztBQUNIOzs7aUNBRVM7QUFBQTs7QUFDTiwyQkFBS1ksZUFBTCxDQUFxQixlQUFPO0FBQ3hCLHVCQUFLQyxPQUFMLENBQWFDLE1BQWIsQ0FBb0JDLE1BQXBCLEdBQTZCQyxPQUFPQyxRQUFQLENBQWdCLE9BQUtKLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkMsTUFBcEMsSUFBOEMsQ0FBM0U7QUFDQSx1QkFBS0csS0FBTCxDQUFXLEVBQUNDLFNBQVMsT0FBVixFQUFYO0FBQ0gsYUFIRDtBQUlIOzs7NENBZW9CO0FBQUE7O0FBQ2pCLGlCQUFLQyxXQUFMLEdBQ0NDLElBREQsQ0FDTSxpQkFBWTtBQUFBLG9CQUFWckIsSUFBVSxTQUFWQSxJQUFVOztBQUNkLHVCQUFLQyxRQUFMLEdBQWdCRCxJQUFoQjtBQUNBLCtCQUFLc0IsbUJBQUw7QUFDQSx1QkFBS0MsTUFBTDtBQUNILGFBTEQ7QUFNSDs7O3dDQUVnQjtBQUFBOztBQUNiLGdCQUFJLEtBQUs1QixJQUFMLENBQVVFLElBQWQsRUFBb0I7QUFDaEIsdUJBQU8sS0FBUDtBQUNIO0FBQ0QsZ0JBQUksS0FBS0YsSUFBTCxDQUFVRyxNQUFkLEVBQXNCO0FBQ2xCLHVCQUFPLEtBQVA7QUFDSDtBQUNELGlCQUFLSCxJQUFMLENBQVVDLEtBQVY7QUFDQSxpQkFBS0QsSUFBTCxDQUFVRSxJQUFWLEdBQWlCLElBQWpCO0FBQ0EsaUJBQUt1QixXQUFMLENBQWlCLEtBQUt6QixJQUFMLENBQVVDLEtBQTNCLEVBQ0N5QixJQURELENBQ00saUJBQVk7QUFBQSxvQkFBVnJCLElBQVUsU0FBVkEsSUFBVTs7QUFDZCxvQkFBSXdCLE1BQU1DLE9BQU4sQ0FBY3pCLElBQWQsS0FBdUJBLEtBQUswQixNQUFMLEtBQWdCLENBQTNDLEVBQThDO0FBQzFDLDJCQUFLNUIsTUFBTCxHQUFjLElBQWQ7QUFDSDtBQUNELHVCQUFLRyxRQUFMLGdDQUFvQixPQUFLQSxRQUF6QixzQkFBc0NELElBQXRDO0FBQ0EsdUJBQUt1QixNQUFMO0FBQ0gsYUFQRDtBQVFIOzs7K0JBRU9JLE0sRUFBUTtBQUFBOztBQUNaLDJCQUFLQyxXQUFMLENBQWlCLEVBQUNDLE9BQU8sUUFBUixFQUFrQkMsTUFBTSxJQUF4QixFQUFqQjtBQUNBLGlCQUFLcEMsTUFBTCxHQUFjaUMsT0FBT3RCLEVBQXJCO0FBQ0EsaUJBQUtlLFdBQUwsR0FDQ0MsSUFERCxDQUNNLGlCQUFZO0FBQUEsb0JBQVZyQixJQUFVLFNBQVZBLElBQVU7O0FBQ2QsdUJBQUtDLFFBQUwsR0FBZ0JELElBQWhCO0FBQ0EsdUJBQUt1QixNQUFMO0FBQ0EsK0JBQUtRLFdBQUw7QUFDSCxhQUxEO0FBTUg7Ozs7RUE1RmlDLGVBQUtwQyxJOztrQkFBdEJMLFEiLCJmaWxlIjoicHJvZ3Jlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdG9hc3QnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCB7bG9nfSBmcm9tICcuLi91dGlscy9sb2cnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9ncmVzcyBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmsYLogYzov5vluqYnXHJcbiAgICB9XHJcblxyXG4gICAgdXNlcklkID0gJydcclxuXHJcbiAgICBwYWdlID0ge1xyXG4gICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgIGJ1c3k6IGZhbHNlLFxyXG4gICAgICAgIGhhc05vdDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG4gICAgZ2V0UHJvZ3Jlc3MgKHBhZ2UgPSAxLCBwYWdlU2l6ZSA9IDgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXHJcbiAgICAgICAgICAgIHBhZ2U6IHBhZ2UsXHJcbiAgICAgICAgICAgIHBhZ2VTaXplOiBwYWdlU2l6ZVxyXG4gICAgICAgIH0sICcvU2VuZFJlc3VtZS9nZXRMaXN0JylcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHByb2dyZXNzOiBbXVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgJ3RvYXN0JzogVG9hc3RcclxuICAgIH1cclxuXHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgd2VweS5vblNvY2tldE1lc3NhZ2UocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwgPSBOdW1iZXIucGFyc2VJbnQodGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwpICsgMVxyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5oKo5pyJ5paw5raI5oGvJ30pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHRvQ29tcGFueSAoaWQpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogYGNvbXBhbnk/aWQ9JHtpZH1gXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZXN0IChpZCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBgY29tbWVudD9pZD0ke2lkfSZ0eXBlPTJgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgICB0aGlzLmdldFByb2dyZXNzKClcclxuICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBkYXRhXHJcbiAgICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuYnVzeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZS5oYXNOb3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFnZS5pbmRleCsrXHJcbiAgICAgICAgdGhpcy5wYWdlLmJ1c3kgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5nZXRQcm9ncmVzcyh0aGlzLnBhZ2UuaW5kZXgpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSAmJiBkYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcyA9IFsuLi50aGlzLnByb2dyZXNzLCAuLi5kYXRhXVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHBhcmFtcykge1xyXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJywgbWFzazogdHJ1ZX0pXHJcbiAgICAgICAgdGhpcy51c2VySWQgPSBwYXJhbXMuaWRcclxuICAgICAgICB0aGlzLmdldFByb2dyZXNzKClcclxuICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=