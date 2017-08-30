'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AllRecomend = function (_wepy$page) {
    _inherits(AllRecomend, _wepy$page);

    function AllRecomend() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AllRecomend);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AllRecomend.__proto__ || Object.getPrototypeOf(AllRecomend)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '推荐公司',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.components = {
            'loading': _loading2.default,
            'toast': _toast2.default
        }, _this.data = {
            loading: false,
            hasLogin: false,
            recomend: []
        }, _this.request = new _request2.default(), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AllRecomend, [{
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
        key: 'onLoad',
        value: function onLoad() {
            var _this3 = this;

            // this.loading = true
            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            this.request.Get({ 'type': 0, 'userId': _wepy2.default.getStorageSync('userId') || 0 }, '/Company/getRecommendList').then(function (_ref2) {
                var data = _ref2.data;

                _this3.recomend = data;
                // this.loading = false
                _wepy2.default.hideLoading();
                _this3.$apply();
            });
        }
    }]);

    return AllRecomend;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(AllRecomend , 'pages/allRecomend'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsbFJlY29tZW5kLmpzIl0sIm5hbWVzIjpbIkFsbFJlY29tZW5kIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJkaXNhYmxlU2Nyb2xsIiwiY29tcG9uZW50cyIsImRhdGEiLCJsb2FkaW5nIiwiaGFzTG9naW4iLCJyZWNvbWVuZCIsInJlcXVlc3QiLCIkaW52b2tlIiwib25Tb2NrZXRNZXNzYWdlIiwiJHBhcmVudCIsImdsb2JhbCIsImN1clZhbCIsIk51bWJlciIsInBhcnNlSW50IiwidG9hc3QiLCJjb250ZW50Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJHZXQiLCJnZXRTdG9yYWdlU3luYyIsInRoZW4iLCJoaWRlTG9hZGluZyIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O29NQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0IsTUFGbkI7QUFHTEMsbUNBQXVCLEtBSGxCO0FBSUxDLDJCQUFlO0FBSlYsUyxRQU9UQyxVLEdBQWE7QUFDVCx3Q0FEUztBQUVUO0FBRlMsUyxRQVNiQyxJLEdBQU87QUFDSEMscUJBQVMsS0FETjtBQUVIQyxzQkFBVSxLQUZQO0FBR0hDLHNCQUFVO0FBSFAsUyxRQU1QQyxPLEdBQVUsdUI7Ozs7O2dDQVZRO0FBQUEsZ0JBQVhKLElBQVcsdUVBQUosRUFBSTs7QUFDZCxpQkFBS0ssT0FBTCxDQUFhLE9BQWIsRUFBc0IsV0FBdEIsRUFBbUNMLElBQW5DO0FBQ0g7OztpQ0FVUztBQUFBOztBQUNOLDJCQUFLTSxlQUFMLENBQXFCLGVBQU87QUFDeEIsdUJBQUtDLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkMsTUFBcEIsR0FBNkJDLE9BQU9DLFFBQVAsQ0FBZ0IsT0FBS0osT0FBTCxDQUFhQyxNQUFiLENBQW9CQyxNQUFwQyxJQUE4QyxDQUEzRTtBQUNBLHVCQUFLRyxLQUFMLENBQVcsRUFBQ0MsU0FBUyxPQUFWLEVBQVg7QUFDSCxhQUhEO0FBSUg7OztpQ0FFUTtBQUFBOztBQUNMO0FBQ0EsMkJBQUtDLFdBQUwsQ0FBaUIsRUFBQ0MsT0FBTyxRQUFSLEVBQWtCQyxNQUFNLElBQXhCLEVBQWpCO0FBQ0EsaUJBQUtaLE9BQUwsQ0FBYWEsR0FBYixDQUFpQixFQUFDLFFBQVEsQ0FBVCxFQUFZLFVBQVUsZUFBS0MsY0FBTCxDQUFvQixRQUFwQixLQUFpQyxDQUF2RCxFQUFqQixFQUE0RSwyQkFBNUUsRUFDS0MsSUFETCxDQUNVLGlCQUFZO0FBQUEsb0JBQVZuQixJQUFVLFNBQVZBLElBQVU7O0FBQ2QsdUJBQUtHLFFBQUwsR0FBZ0JILElBQWhCO0FBQ0E7QUFDQSwrQkFBS29CLFdBQUw7QUFDQSx1QkFBS0MsTUFBTDtBQUNILGFBTkw7QUFPSDs7OztFQTFDb0MsZUFBS0MsSTs7a0JBQXpCN0IsVyIsImZpbGUiOiJhbGxSZWNvbWVuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnLi4vY29tcG9uZW50cy90b2FzdCdcclxuaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxsUmVjb21lbmQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5o6o6I2Q5YWs5Y+4JyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgICAnbG9hZGluZyc6IGxvYWRpbmcsXHJcbiAgICAgICAgJ3RvYXN0JzogVG9hc3RcclxuICAgIH1cclxuXHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgaGFzTG9naW46IGZhbHNlLFxyXG4gICAgICAgIHJlY29tZW5kOiBbXVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICB3ZXB5Lm9uU29ja2V0TWVzc2FnZShyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCA9IE51bWJlci5wYXJzZUludCh0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCkgKyAxXHJcbiAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfmgqjmnInmlrDmtojmga8nfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5sb2FkaW5nID0gdHJ1ZVxyXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJywgbWFzazogdHJ1ZX0pXHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7J3R5cGUnOiAwLCAndXNlcklkJzogd2VweS5nZXRTdG9yYWdlU3luYygndXNlcklkJykgfHwgMH0sICcvQ29tcGFueS9nZXRSZWNvbW1lbmRMaXN0JylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvbWVuZCA9IGRhdGFcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubG9hZGluZyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=