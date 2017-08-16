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

var Mine = function (_wepy$page) {
    _inherits(Mine, _wepy$page);

    function Mine() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Mine);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mine.__proto__ || Object.getPrototypeOf(Mine)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '我',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.userId = _wepy2.default.getStorageSync('userId') || '294', _this.methods = {
            slide: function slide() {
                _wepy2.default.navigateTo({
                    url: 'introduction'
                });
            },
            progess: function progess() {
                // if (wepy.getStorageSync("userId")) {
                _wepy2.default.navigateTo({
                    url: 'progress?id=' + this.userId
                });
                // } else {
                //     return
                // }
            },
            resume: function resume() {
                // if (wepy.getStorageSync("userId")) {
                _wepy2.default.navigateTo({
                    url: 'resume?id=' + this.userId
                });
                // } else {
                //     return
                // }
            },
            collect: function collect() {
                // if (wepy.getStorageSync("userId")) {
                _wepy2.default.navigateTo({
                    url: 'collect?id=' + this.userId
                });
                // } else {
                //     return
                // }
            },
            follow: function follow() {
                // if (wepy.getStorageSync("userId")) {
                _wepy2.default.navigateTo({
                    url: 'follow?id=' + this.userId
                });
                // } else {
                //     return
                // }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mine, [{
        key: 'onLoad',
        value: function onLoad() {
            _wepy2.default.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#40c4ff'
            });
        }
    }]);

    return Mine;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Mine , 'pages/mine'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pbmUuanMiXSwibmFtZXMiOlsiTWluZSIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsInVzZXJJZCIsImdldFN0b3JhZ2VTeW5jIiwibWV0aG9kcyIsInNsaWRlIiwibmF2aWdhdGVUbyIsInVybCIsInByb2dlc3MiLCJyZXN1bWUiLCJjb2xsZWN0IiwiZm9sbG93Iiwic2V0TmF2aWdhdGlvbkJhckNvbG9yIiwiZnJvbnRDb2xvciIsImJhY2tncm91bmRDb2xvciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3NMQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0IsR0FGbkI7QUFHTEMsbUNBQXVCLEtBSGxCO0FBSUxDLDJCQUFlO0FBSlYsUyxRQU9UQyxNLEdBQVMsZUFBS0MsY0FBTCxDQUFvQixRQUFwQixLQUFpQyxLLFFBRTFDQyxPLEdBQVU7QUFDTkMsaUJBRE0sbUJBQ0c7QUFDTCwrQkFBS0MsVUFBTCxDQUFnQjtBQUNaQyx5QkFBSztBQURPLGlCQUFoQjtBQUdILGFBTEs7QUFNTkMsbUJBTk0scUJBTUs7QUFDUDtBQUNJLCtCQUFLRixVQUFMLENBQWdCO0FBQ1pDLDBDQUFvQixLQUFLTDtBQURiLGlCQUFoQjtBQUdKO0FBQ0E7QUFDQTtBQUNILGFBZEs7QUFlTk8sa0JBZk0sb0JBZUk7QUFDTjtBQUNJLCtCQUFLSCxVQUFMLENBQWdCO0FBQ1pDLHdDQUFrQixLQUFLTDtBQURYLGlCQUFoQjtBQUdKO0FBQ0E7QUFDQTtBQUNILGFBdkJLO0FBd0JOUSxtQkF4Qk0scUJBd0JLO0FBQ1A7QUFDSSwrQkFBS0osVUFBTCxDQUFnQjtBQUNaQyx5Q0FBbUIsS0FBS0w7QUFEWixpQkFBaEI7QUFHSjtBQUNBO0FBQ0E7QUFDSCxhQWhDSztBQWlDTlMsa0JBakNNLG9CQWlDSTtBQUNOO0FBQ0ksK0JBQUtMLFVBQUwsQ0FBZ0I7QUFDWkMsd0NBQWtCLEtBQUtMO0FBRFgsaUJBQWhCO0FBR0o7QUFDQTtBQUNBO0FBQ0g7QUF6Q0ssUzs7Ozs7aUNBNENBO0FBQ04sMkJBQUtVLHFCQUFMLENBQTJCO0FBQ3ZCQyw0QkFBWSxTQURXO0FBRXZCQyxpQ0FBaUI7QUFGTSxhQUEzQjtBQUlIOzs7O0VBM0Q2QixlQUFLQyxJOztrQkFBbEJuQixJIiwiZmlsZSI6Im1pbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pbmUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiRJyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgdXNlcklkID0gd2VweS5nZXRTdG9yYWdlU3luYygndXNlcklkJykgfHwgJzI5NCdcclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHNsaWRlICgpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogJ2ludHJvZHVjdGlvbidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb2dlc3MgKCkge1xyXG4gICAgICAgICAgICAvLyBpZiAod2VweS5nZXRTdG9yYWdlU3luYyhcInVzZXJJZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBwcm9ncmVzcz9pZD0ke3RoaXMudXNlcklkfWBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm5cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzdW1lICgpIHtcclxuICAgICAgICAgICAgLy8gaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJ1c2VySWRcIikpIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgcmVzdW1lP2lkPSR7dGhpcy51c2VySWR9YFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVyblxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2xsZWN0ICgpIHtcclxuICAgICAgICAgICAgLy8gaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJ1c2VySWRcIikpIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgY29sbGVjdD9pZD0ke3RoaXMudXNlcklkfWBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm5cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9sbG93ICgpIHtcclxuICAgICAgICAgICAgLy8gaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoXCJ1c2VySWRcIikpIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgZm9sbG93P2lkPSR7dGhpcy51c2VySWR9YFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVyblxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyQ29sb3Ioe1xyXG4gICAgICAgICAgICBmcm9udENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyM0MGM0ZmYnXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=