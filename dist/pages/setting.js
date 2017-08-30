'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _socket = require('./../utils/socket.js');

var _storage = require('./../utils/storage.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Setting = function (_wepy$page) {
    _inherits(Setting, _wepy$page);

    function Setting() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Setting);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Setting.__proto__ || Object.getPrototypeOf(Setting)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '我的设置',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.components = {
            'toast': _toast2.default
        }, _this.methods = {
            toAccountSet: function toAccountSet() {
                _wepy2.default.navigateTo({ url: 'account-setting' });
            },
            quit: function quit() {
                this.$parent.clearSocket();
                Promise.all([(0, _storage.Remove)('userId'), (0, _storage.Remove)('userImg'), (0, _storage.Remove)('userPhone'), (0, _socket.Close)()]).then(function () {
                    _wepy2.default.reLaunch({ url: 'jobs' });
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Setting, [{
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
    }]);

    return Setting;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Setting , 'pages/setting'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmcuanMiXSwibmFtZXMiOlsiU2V0dGluZyIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwidG9BY2NvdW50U2V0IiwibmF2aWdhdGVUbyIsInVybCIsInF1aXQiLCIkcGFyZW50IiwiY2xlYXJTb2NrZXQiLCJQcm9taXNlIiwiYWxsIiwidGhlbiIsInJlTGF1bmNoIiwiZGF0YSIsIiRpbnZva2UiLCJvblNvY2tldE1lc3NhZ2UiLCJnbG9iYWwiLCJjdXJWYWwiLCJOdW1iZXIiLCJwYXJzZUludCIsInRvYXN0IiwiY29udGVudCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QixNQUZuQjtBQUdMQyxtQ0FBdUIsS0FIbEI7QUFJTEMsMkJBQWU7QUFKVixTLFFBT1RDLFUsR0FBYTtBQUNUO0FBRFMsUyxRQWViQyxPLEdBQVU7QUFDTkMsd0JBRE0sMEJBQ1U7QUFDWiwrQkFBS0MsVUFBTCxDQUFnQixFQUFDQyxLQUFLLGlCQUFOLEVBQWhCO0FBQ0gsYUFISztBQUlOQyxnQkFKTSxrQkFJRTtBQUNKLHFCQUFLQyxPQUFMLENBQWFDLFdBQWI7QUFDQUMsd0JBQVFDLEdBQVIsQ0FBWSxDQUFDLHFCQUFPLFFBQVAsQ0FBRCxFQUFtQixxQkFBTyxTQUFQLENBQW5CLEVBQXNDLHFCQUFPLFdBQVAsQ0FBdEMsRUFBMkQsb0JBQTNELENBQVosRUFDQ0MsSUFERCxDQUNNLFlBQU07QUFDUixtQ0FBS0MsUUFBTCxDQUFjLEVBQUNQLEtBQUssTUFBTixFQUFkO0FBQ0gsaUJBSEQ7QUFJSDtBQVZLLFM7Ozs7O2dDQVhRO0FBQUEsZ0JBQVhRLElBQVcsdUVBQUosRUFBSTs7QUFDZCxpQkFBS0MsT0FBTCxDQUFhLE9BQWIsRUFBc0IsV0FBdEIsRUFBbUNELElBQW5DO0FBQ0g7OztpQ0FFUztBQUFBOztBQUNOLDJCQUFLRSxlQUFMLENBQXFCLGVBQU87QUFDeEIsdUJBQUtSLE9BQUwsQ0FBYVMsTUFBYixDQUFvQkMsTUFBcEIsR0FBNkJDLE9BQU9DLFFBQVAsQ0FBZ0IsT0FBS1osT0FBTCxDQUFhUyxNQUFiLENBQW9CQyxNQUFwQyxJQUE4QyxDQUEzRTtBQUNBLHVCQUFLRyxLQUFMLENBQVcsRUFBQ0MsU0FBUyxPQUFWLEVBQVg7QUFDSCxhQUhEO0FBSUg7Ozs7RUFyQmdDLGVBQUtDLEk7O2tCQUFyQjNCLE8iLCJmaWxlIjoic2V0dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnLi4vY29tcG9uZW50cy90b2FzdCdcclxuaW1wb3J0IHtDbG9zZX0gZnJvbSAnLi4vdXRpbHMvc29ja2V0J1xyXG5pbXBvcnQgeyBSZW1vdmUsIENsZWFyIH0gZnJvbSAnLi4vdXRpbHMvc3RvcmFnZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRpbmcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE6K6+572uJyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgICAndG9hc3QnOiBUb2FzdFxyXG4gICAgfVxyXG5cclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICB3ZXB5Lm9uU29ja2V0TWVzc2FnZShyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCA9IE51bWJlci5wYXJzZUludCh0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCkgKyAxXHJcbiAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfmgqjmnInmlrDmtojmga8nfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgdG9BY2NvdW50U2V0ICgpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdhY2NvdW50LXNldHRpbmcnfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHF1aXQgKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuY2xlYXJTb2NrZXQoKVxyXG4gICAgICAgICAgICBQcm9taXNlLmFsbChbUmVtb3ZlKCd1c2VySWQnKSwgUmVtb3ZlKCd1c2VySW1nJyksIFJlbW92ZSgndXNlclBob25lJyksIENsb3NlKCldKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHt1cmw6ICdqb2JzJ30pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==