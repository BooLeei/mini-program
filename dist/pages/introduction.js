'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Introduction = function (_wepy$page) {
    _inherits(Introduction, _wepy$page);

    function Introduction() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Introduction);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Introduction.__proto__ || Object.getPrototypeOf(Introduction)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '国王招聘',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.methods = {
            back: function back() {
                _wepy2.default.navigateBack({
                    delta: 1
                });
            }
        }, _this.components = {
            'toast': _toast2.default
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Introduction, [{
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
        key: 'onShareAppMessage',
        value: function onShareAppMessage() {
            return {
                title: '国王招聘',
                path: '/pages/introduction',
                success: function success(ret) {
                    log(ret);
                },
                fail: function fail(err) {
                    log(err);
                }
            };
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            _wepy2.default.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#40c4ff'
            });
        }
    }]);

    return Introduction;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Introduction , 'pages/introduction'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludHJvZHVjdGlvbi5qcyJdLCJuYW1lcyI6WyJJbnRyb2R1Y3Rpb24iLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRpc2FibGVTY3JvbGwiLCJtZXRob2RzIiwiYmFjayIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiY29tcG9uZW50cyIsImRhdGEiLCIkaW52b2tlIiwib25Tb2NrZXRNZXNzYWdlIiwiJHBhcmVudCIsImdsb2JhbCIsImN1clZhbCIsIk51bWJlciIsInBhcnNlSW50IiwidG9hc3QiLCJjb250ZW50IiwidGl0bGUiLCJwYXRoIiwic3VjY2VzcyIsImxvZyIsInJldCIsImZhaWwiLCJlcnIiLCJzZXROYXZpZ2F0aW9uQmFyQ29sb3IiLCJmcm9udENvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxZOzs7Ozs7Ozs7Ozs7OztzTUFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCLE1BRm5CO0FBR0xDLG1DQUF1QixLQUhsQjtBQUlMQywyQkFBZTtBQUpWLFMsUUFPVEMsTyxHQUFVO0FBQ05DLGdCQURNLGtCQUNFO0FBQ0osK0JBQUtDLFlBQUwsQ0FBa0I7QUFDZEMsMkJBQU87QUFETyxpQkFBbEI7QUFHSDtBQUxLLFMsUUFRVkMsVSxHQUFhO0FBQ1Q7QUFEUyxTOzs7OztnQ0FJSztBQUFBLGdCQUFYQyxJQUFXLHVFQUFKLEVBQUk7O0FBQ2QsaUJBQUtDLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLFdBQXRCLEVBQW1DRCxJQUFuQztBQUNIOzs7aUNBRVM7QUFBQTs7QUFDTiwyQkFBS0UsZUFBTCxDQUFxQixlQUFPO0FBQ3hCLHVCQUFLQyxPQUFMLENBQWFDLE1BQWIsQ0FBb0JDLE1BQXBCLEdBQTZCQyxPQUFPQyxRQUFQLENBQWdCLE9BQUtKLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkMsTUFBcEMsSUFBOEMsQ0FBM0U7QUFDQSx1QkFBS0csS0FBTCxDQUFXLEVBQUNDLFNBQVMsT0FBVixFQUFYO0FBQ0gsYUFIRDtBQUlIOzs7NENBRW9CO0FBQ2pCLG1CQUFPO0FBQ0hDLHVCQUFPLE1BREo7QUFFSEMsc0JBQU0scUJBRkg7QUFHSEMseUJBQVMsc0JBQU87QUFDWkMsd0JBQUlDLEdBQUo7QUFDSCxpQkFMRTtBQU1IQyxzQkFBTSxtQkFBTztBQUNURix3QkFBSUcsR0FBSjtBQUNIO0FBUkUsYUFBUDtBQVVIOzs7aUNBRVM7QUFDTiwyQkFBS0MscUJBQUwsQ0FBMkI7QUFDdkJDLDRCQUFZLFNBRFc7QUFFdkJDLGlDQUFpQjtBQUZNLGFBQTNCO0FBSUg7Ozs7RUFqRHFDLGVBQUtDLEk7O2tCQUExQi9CLFkiLCJmaWxlIjoiaW50cm9kdWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50cm9kdWN0aW9uIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WbveeOi+aLm+iBmCcsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgYmFjayAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgJ3RvYXN0JzogVG9hc3RcclxuICAgIH1cclxuXHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgd2VweS5vblNvY2tldE1lc3NhZ2UocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwgPSBOdW1iZXIucGFyc2VJbnQodGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwpICsgMVxyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5oKo5pyJ5paw5raI5oGvJ30pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGl0bGU6ICflm73njovmi5vogZgnLFxyXG4gICAgICAgICAgICBwYXRoOiAnL3BhZ2VzL2ludHJvZHVjdGlvbicsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2cocmV0KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKGVycilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhckNvbG9yKHtcclxuICAgICAgICAgICAgZnJvbnRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjNDBjNGZmJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19