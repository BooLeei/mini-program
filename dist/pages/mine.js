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
        }, _this.data = {
            hasLogin: false
        }, _this.userId = _wepy2.default.getStorageSync('userId') || '294', _this.methods = {
            toLogin: function toLogin() {
                if (this.hasLogin) {
                    return false;
                } else {
                    _wepy2.default.navigateTo({
                        url: 'login'
                    });
                }
            },
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
            },
            simpleResume: function simpleResume() {
                _wepy2.default.navigateTo({
                    url: 'simpleResume?id=294'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mine, [{
        key: 'onLoad',
        value: function onLoad() {
            var _this2 = this;

            _wepy2.default.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#40c4ff'
            });
            (0, _storage.Get)('userId').then(function (res) {
                _this2.hasLogin = true;
                _this2.$apply();
            }).catch(function (err) {
                _this2.hasLogin = false;
                _this2.$apply();
            });
        }
    }]);

    return Mine;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Mine , 'pages/mine'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pbmUuanMiXSwibmFtZXMiOlsiTWluZSIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJoYXNMb2dpbiIsInVzZXJJZCIsImdldFN0b3JhZ2VTeW5jIiwibWV0aG9kcyIsInRvTG9naW4iLCJuYXZpZ2F0ZVRvIiwidXJsIiwic2xpZGUiLCJwcm9nZXNzIiwicmVzdW1lIiwiY29sbGVjdCIsImZvbGxvdyIsInNpbXBsZVJlc3VtZSIsInNldE5hdmlnYXRpb25CYXJDb2xvciIsImZyb250Q29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ0aGVuIiwiJGFwcGx5IiwiY2F0Y2giLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztzTEFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCLEdBRm5CO0FBR0xDLG1DQUF1QixLQUhsQjtBQUlMQywyQkFBZTtBQUpWLFMsUUFPVEMsSSxHQUFPO0FBQ0hDLHNCQUFVO0FBRFAsUyxRQUlQQyxNLEdBQVMsZUFBS0MsY0FBTCxDQUFvQixRQUFwQixLQUFpQyxLLFFBRTFDQyxPLEdBQVU7QUFDTkMsbUJBRE0scUJBQ0s7QUFDUCxvQkFBSSxLQUFLSixRQUFULEVBQW1CO0FBQ2YsMkJBQU8sS0FBUDtBQUNILGlCQUZELE1BRU87QUFDSCxtQ0FBS0ssVUFBTCxDQUFnQjtBQUNaQyw2QkFBSztBQURPLHFCQUFoQjtBQUdIO0FBQ0osYUFUSztBQVVOQyxpQkFWTSxtQkFVRztBQUNMLCtCQUFLRixVQUFMLENBQWdCO0FBQ1pDLHlCQUFLO0FBRE8saUJBQWhCO0FBR0gsYUFkSztBQWVORSxtQkFmTSxxQkFlSztBQUNQO0FBQ0ksK0JBQUtILFVBQUwsQ0FBZ0I7QUFDWkMsMENBQW9CLEtBQUtMO0FBRGIsaUJBQWhCO0FBR0o7QUFDQTtBQUNBO0FBQ0gsYUF2Qks7QUF3Qk5RLGtCQXhCTSxvQkF3Qkk7QUFDTjtBQUNJLCtCQUFLSixVQUFMLENBQWdCO0FBQ1pDLHdDQUFrQixLQUFLTDtBQURYLGlCQUFoQjtBQUdKO0FBQ0E7QUFDQTtBQUNILGFBaENLO0FBaUNOUyxtQkFqQ00scUJBaUNLO0FBQ1A7QUFDSSwrQkFBS0wsVUFBTCxDQUFnQjtBQUNaQyx5Q0FBbUIsS0FBS0w7QUFEWixpQkFBaEI7QUFHSjtBQUNBO0FBQ0E7QUFDSCxhQXpDSztBQTBDTlUsa0JBMUNNLG9CQTBDSTtBQUNOO0FBQ0ksK0JBQUtOLFVBQUwsQ0FBZ0I7QUFDWkMsd0NBQWtCLEtBQUtMO0FBRFgsaUJBQWhCO0FBR0o7QUFDQTtBQUNBO0FBQ0gsYUFsREs7QUFtRE5XLHdCQW5ETSwwQkFtRFU7QUFDWiwrQkFBS1AsVUFBTCxDQUFnQjtBQUNaQyx5QkFBSztBQURPLGlCQUFoQjtBQUdIO0FBdkRLLFM7Ozs7O2lDQTBEQTtBQUFBOztBQUNOLDJCQUFLTyxxQkFBTCxDQUEyQjtBQUN2QkMsNEJBQVksU0FEVztBQUV2QkMsaUNBQWlCO0FBRk0sYUFBM0I7QUFJQSw4QkFBSSxRQUFKLEVBQWNDLElBQWQsQ0FBbUIsZUFBTztBQUN0Qix1QkFBS2hCLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSx1QkFBS2lCLE1BQUw7QUFDSCxhQUhELEVBR0dDLEtBSEgsQ0FHUyxlQUFPO0FBQ1osdUJBQUtsQixRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsdUJBQUtpQixNQUFMO0FBQ0gsYUFORDtBQU9IOzs7O0VBcEY2QixlQUFLRSxJOztrQkFBbEIxQixJIiwiZmlsZSI6Im1pbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IHtHZXR9IGZyb20gJy4uL3V0aWxzL3N0b3JhZ2UnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaW5lIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkScsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaGFzTG9naW46IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgdXNlcklkID0gd2VweS5nZXRTdG9yYWdlU3luYygndXNlcklkJykgfHwgJzI5NCdcclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHRvTG9naW4gKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNMb2dpbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2xvZ2luJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2xpZGUgKCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnaW50cm9kdWN0aW9uJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvZ2VzcyAoKSB7XHJcbiAgICAgICAgICAgIC8vIGlmICh3ZXB5LmdldFN0b3JhZ2VTeW5jKFwidXNlcklkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogYHByb2dyZXNzP2lkPSR7dGhpcy51c2VySWR9YFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVyblxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXN1bWUgKCkge1xyXG4gICAgICAgICAgICAvLyBpZiAod2VweS5nZXRTdG9yYWdlU3luYyhcInVzZXJJZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGByZXN1bWU/aWQ9JHt0aGlzLnVzZXJJZH1gXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbGxlY3QgKCkge1xyXG4gICAgICAgICAgICAvLyBpZiAod2VweS5nZXRTdG9yYWdlU3luYyhcInVzZXJJZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBjb2xsZWN0P2lkPSR7dGhpcy51c2VySWR9YFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVyblxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb2xsb3cgKCkge1xyXG4gICAgICAgICAgICAvLyBpZiAod2VweS5nZXRTdG9yYWdlU3luYyhcInVzZXJJZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBmb2xsb3c/aWQ9JHt0aGlzLnVzZXJJZH1gXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNpbXBsZVJlc3VtZSAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdzaW1wbGVSZXN1bWU/aWQ9Mjk0J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHdlcHkuc2V0TmF2aWdhdGlvbkJhckNvbG9yKHtcclxuICAgICAgICAgICAgZnJvbnRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjNDBjNGZmJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgR2V0KCd1c2VySWQnKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzTG9naW4gPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhhc0xvZ2luID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19