'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _storage = require('./../utils/storage.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccountSetting = function (_wepy$page) {
    _inherits(AccountSetting, _wepy$page);

    function AccountSetting() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AccountSetting);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AccountSetting.__proto__ || Object.getPrototypeOf(AccountSetting)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '账号设置',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.data = {
            phone: ''
        }, _this.methods = {
            toAccountTel: function toAccountTel() {
                _wepy2.default.navigateTo({ url: 'account-tel' });
            },
            toAccountPassword: function toAccountPassword() {
                _wepy2.default.navigateTo({ url: 'account-password' });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AccountSetting, [{
        key: 'onLoad',
        value: function onLoad(params) {
            var _this2 = this;

            (0, _storage.Get)('userPhone').then(function (res) {
                _this2.phone = res;
                _this2.$apply();
            });
        }
    }]);

    return AccountSetting;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(AccountSetting , 'pages/account-setting'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY291bnQtc2V0dGluZy5qcyJdLCJuYW1lcyI6WyJBY2NvdW50U2V0dGluZyIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJwaG9uZSIsIm1ldGhvZHMiLCJ0b0FjY291bnRUZWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwidG9BY2NvdW50UGFzc3dvcmQiLCJwYXJhbXMiLCJ0aGVuIiwicmVzIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsYzs7Ozs7Ozs7Ozs7Ozs7ME1BQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QixNQUZuQjtBQUdMQyxtQ0FBdUIsS0FIbEI7QUFJTEMsMkJBQWU7QUFKVixTLFFBT1RDLEksR0FBTztBQUNIQyxtQkFBTztBQURKLFMsUUFJUEMsTyxHQUFVO0FBQ05DLHdCQURNLDBCQUNVO0FBQ1osK0JBQUtDLFVBQUwsQ0FBZ0IsRUFBQ0MsS0FBSyxhQUFOLEVBQWhCO0FBQ0gsYUFISztBQUlOQyw2QkFKTSwrQkFJZTtBQUNqQiwrQkFBS0YsVUFBTCxDQUFnQixFQUFDQyxLQUFLLGtCQUFOLEVBQWhCO0FBQ0g7QUFOSyxTOzs7OzsrQkFTRkUsTSxFQUFRO0FBQUE7O0FBQ1osOEJBQUksV0FBSixFQUFpQkMsSUFBakIsQ0FBc0IsZUFBTztBQUN6Qix1QkFBS1AsS0FBTCxHQUFhUSxHQUFiO0FBQ0EsdUJBQUtDLE1BQUw7QUFDSCxhQUhEO0FBSUg7Ozs7RUExQnVDLGVBQUtDLEk7O2tCQUE1QmpCLGMiLCJmaWxlIjoiYWNjb3VudC1zZXR0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCB7R2V0fSBmcm9tICcuLi91dGlscy9zdG9yYWdlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjb3VudFNldHRpbmcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LSm5Y+36K6+572uJyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBwaG9uZTogJydcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHRvQWNjb3VudFRlbCAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnYWNjb3VudC10ZWwnfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvQWNjb3VudFBhc3N3b3JkICgpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdhY2NvdW50LXBhc3N3b3JkJ30pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAocGFyYW1zKSB7XHJcbiAgICAgICAgR2V0KCd1c2VyUGhvbmUnKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGhvbmUgPSByZXNcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19