'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Introduction, [{
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludHJvZHVjdGlvbi5qcyJdLCJuYW1lcyI6WyJJbnRyb2R1Y3Rpb24iLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRpc2FibGVTY3JvbGwiLCJtZXRob2RzIiwiYmFjayIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwidGl0bGUiLCJwYXRoIiwic3VjY2VzcyIsImxvZyIsInJldCIsImZhaWwiLCJlcnIiLCJzZXROYXZpZ2F0aW9uQmFyQ29sb3IiLCJmcm9udENvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsWTs7Ozs7Ozs7Ozs7Ozs7c01BQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QixNQUZuQjtBQUdMQyxtQ0FBdUIsS0FIbEI7QUFJTEMsMkJBQWU7QUFKVixTLFFBT1RDLE8sR0FBVTtBQUNOQyxnQkFETSxrQkFDRTtBQUNKLCtCQUFLQyxZQUFMLENBQWtCO0FBQ2RDLDJCQUFPO0FBRE8saUJBQWxCO0FBR0g7QUFMSyxTOzs7Ozs0Q0FRVztBQUNqQixtQkFBTztBQUNIQyx1QkFBTyxNQURKO0FBRUhDLHNCQUFNLHFCQUZIO0FBR0hDLHlCQUFTLHNCQUFPO0FBQ1pDLHdCQUFJQyxHQUFKO0FBQ0gsaUJBTEU7QUFNSEMsc0JBQU0sbUJBQU87QUFDVEYsd0JBQUlHLEdBQUo7QUFDSDtBQVJFLGFBQVA7QUFVSDs7O2lDQUVTO0FBQ04sMkJBQUtDLHFCQUFMLENBQTJCO0FBQ3ZCQyw0QkFBWSxTQURXO0FBRXZCQyxpQ0FBaUI7QUFGTSxhQUEzQjtBQUlIOzs7O0VBbENxQyxlQUFLQyxJOztrQkFBMUJwQixZIiwiZmlsZSI6ImludHJvZHVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50cm9kdWN0aW9uIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WbveeOi+aLm+iBmCcsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgYmFjayAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ+WbveeOi+aLm+iBmCcsXHJcbiAgICAgICAgICAgIHBhdGg6ICcvcGFnZXMvaW50cm9kdWN0aW9uJyxcclxuICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZyhyZXQpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2coZXJyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyQ29sb3Ioe1xyXG4gICAgICAgICAgICBmcm9udENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyM0MGM0ZmYnXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=