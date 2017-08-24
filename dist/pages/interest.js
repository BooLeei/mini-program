'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _formatTime = require('./../utils/formatTime.js');

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Interest = function (_wepy$page) {
    _inherits(Interest, _wepy$page);

    function Interest() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Interest);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Interest.__proto__ || Object.getPrototypeOf(Interest)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '对我感兴趣'
        }, _this.request = new _request2.default(), _this.data = {
            list: []
        }, _this.components = {
            'toast': _toast2.default
        }, _this.userId = '', _this.pages = {
            index: 1,
            busy: false,
            hasNot: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Interest, [{
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'getInterestCompany',
        value: function getInterestCompany() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

            return this.request.Get({
                userId: this.userId,
                userType: 1,
                page: page,
                pageSize: pageSize
            }, '/Chat/getInterestList');
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this2 = this;

            this.userId = params.id;
            this.getInterestCompany().then(function (_ref2) {
                var data = _ref2.data;

                data.forEach(function (item) {
                    item.collectTime = (0, _formatTime.formatTime)(item.collectTime);
                });
                _this2.list = data;
                _this2.$apply();
            });
        }
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            var _this3 = this;

            if (this.pages.hasNot) {
                // this.toast({content: '没有更多了'})
                return false;
            }
            if (this.pages.busy) {
                // this.toast({content: '正在加载请稍后再试'})
                return false;
            }
            this.pages.busy = true;
            this.pages.index++;
            this.getInterestCompany(this.pages.index).then(function (_ref3) {
                var data = _ref3.data;

                if (data.length < 8) {
                    _this3.pages.hasNot = true;
                }
                data.forEach(function (item) {
                    item.collectTime = (0, _formatTime.formatTime)(item.collectTime);
                });
                _this3.list = [].concat(_toConsumableArray(_this3.list), _toConsumableArray(data));
                _this3.$apply();
            });
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this4 = this;

            this.pages.index = 1;
            this.pages.hasNot = false;
            this.pages.busy = false;
            this.getInterestCompany().then(function (_ref4) {
                var data = _ref4.data;

                data.forEach(function (item) {
                    item.collectTime = (0, _formatTime.formatTime)(item.collectTime);
                });
                _this4.list = data;
                _wepy2.default.stopPullDownRefresh();
                _this4.$apply();
            });
        }
    }]);

    return Interest;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Interest , 'pages/interest'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVyZXN0LmpzIl0sIm5hbWVzIjpbIkludGVyZXN0IiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJyZXF1ZXN0IiwiZGF0YSIsImxpc3QiLCJjb21wb25lbnRzIiwidXNlcklkIiwicGFnZXMiLCJpbmRleCIsImJ1c3kiLCJoYXNOb3QiLCIkaW52b2tlIiwicGFnZSIsInBhZ2VTaXplIiwiR2V0IiwidXNlclR5cGUiLCJwYXJhbXMiLCJpZCIsImdldEludGVyZXN0Q29tcGFueSIsInRoZW4iLCJmb3JFYWNoIiwiaXRlbSIsImNvbGxlY3RUaW1lIiwiJGFwcGx5IiwibGVuZ3RoIiwic3RvcFB1bGxEb3duUmVmcmVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QjtBQUZuQixTLFFBS1RDLE8sR0FBVSx1QixRQUVWQyxJLEdBQU87QUFDSEMsa0JBQU07QUFESCxTLFFBSVBDLFUsR0FBYTtBQUNUO0FBRFMsUyxRQVFiQyxNLEdBQVMsRSxRQUNUQyxLLEdBQVE7QUFDSkMsbUJBQU8sQ0FESDtBQUVKQyxrQkFBTSxLQUZGO0FBR0pDLG9CQUFRO0FBSEosUzs7Ozs7Z0NBTFU7QUFBQSxnQkFBWFAsSUFBVyx1RUFBSixFQUFJOztBQUNkLGlCQUFLUSxPQUFMLENBQWEsT0FBYixFQUFzQixXQUF0QixFQUFtQ1IsSUFBbkM7QUFDSDs7OzZDQVMyQztBQUFBLGdCQUF4QlMsSUFBd0IsdUVBQWpCLENBQWlCO0FBQUEsZ0JBQWRDLFFBQWMsdUVBQUgsQ0FBRzs7QUFDeEMsbUJBQU8sS0FBS1gsT0FBTCxDQUFhWSxHQUFiLENBQWlCO0FBQ3BCUix3QkFBUSxLQUFLQSxNQURPO0FBRXBCUywwQkFBVSxDQUZVO0FBR3BCSCxzQkFBTUEsSUFIYztBQUlwQkMsMEJBQVVBO0FBSlUsYUFBakIsRUFLSix1QkFMSSxDQUFQO0FBTUg7OzsrQkFFT0csTSxFQUFRO0FBQUE7O0FBQ1osaUJBQUtWLE1BQUwsR0FBY1UsT0FBT0MsRUFBckI7QUFDQSxpQkFBS0Msa0JBQUwsR0FDQ0MsSUFERCxDQUNNLGlCQUFZO0FBQUEsb0JBQVZoQixJQUFVLFNBQVZBLElBQVU7O0FBQ2RBLHFCQUFLaUIsT0FBTCxDQUFhLFVBQUNDLElBQUQsRUFBVTtBQUNuQkEseUJBQUtDLFdBQUwsR0FBbUIsNEJBQVdELEtBQUtDLFdBQWhCLENBQW5CO0FBQ0gsaUJBRkQ7QUFHQSx1QkFBS2xCLElBQUwsR0FBWUQsSUFBWjtBQUNBLHVCQUFLb0IsTUFBTDtBQUNILGFBUEQ7QUFRSDs7O3dDQUVnQjtBQUFBOztBQUNiLGdCQUFJLEtBQUtoQixLQUFMLENBQVdHLE1BQWYsRUFBdUI7QUFDbkI7QUFDQSx1QkFBTyxLQUFQO0FBQ0g7QUFDRCxnQkFBSSxLQUFLSCxLQUFMLENBQVdFLElBQWYsRUFBcUI7QUFDakI7QUFDQSx1QkFBTyxLQUFQO0FBQ0g7QUFDRCxpQkFBS0YsS0FBTCxDQUFXRSxJQUFYLEdBQWtCLElBQWxCO0FBQ0EsaUJBQUtGLEtBQUwsQ0FBV0MsS0FBWDtBQUNBLGlCQUFLVSxrQkFBTCxDQUF3QixLQUFLWCxLQUFMLENBQVdDLEtBQW5DLEVBQ0NXLElBREQsQ0FDTSxpQkFBWTtBQUFBLG9CQUFWaEIsSUFBVSxTQUFWQSxJQUFVOztBQUNkLG9CQUFJQSxLQUFLcUIsTUFBTCxHQUFjLENBQWxCLEVBQXFCO0FBQ2pCLDJCQUFLakIsS0FBTCxDQUFXRyxNQUFYLEdBQW9CLElBQXBCO0FBQ0g7QUFDRFAscUJBQUtpQixPQUFMLENBQWEsVUFBQ0MsSUFBRCxFQUFVO0FBQ25CQSx5QkFBS0MsV0FBTCxHQUFtQiw0QkFBV0QsS0FBS0MsV0FBaEIsQ0FBbkI7QUFDSCxpQkFGRDtBQUdBLHVCQUFLbEIsSUFBTCxnQ0FBZ0IsT0FBS0EsSUFBckIsc0JBQThCRCxJQUE5QjtBQUNBLHVCQUFLb0IsTUFBTDtBQUNILGFBVkQ7QUFXSDs7OzRDQUVvQjtBQUFBOztBQUNqQixpQkFBS2hCLEtBQUwsQ0FBV0MsS0FBWCxHQUFtQixDQUFuQjtBQUNBLGlCQUFLRCxLQUFMLENBQVdHLE1BQVgsR0FBb0IsS0FBcEI7QUFDQSxpQkFBS0gsS0FBTCxDQUFXRSxJQUFYLEdBQWtCLEtBQWxCO0FBQ0EsaUJBQUtTLGtCQUFMLEdBQ0NDLElBREQsQ0FDTSxpQkFBWTtBQUFBLG9CQUFWaEIsSUFBVSxTQUFWQSxJQUFVOztBQUNkQSxxQkFBS2lCLE9BQUwsQ0FBYSxVQUFDQyxJQUFELEVBQVU7QUFDbkJBLHlCQUFLQyxXQUFMLEdBQW1CLDRCQUFXRCxLQUFLQyxXQUFoQixDQUFuQjtBQUNILGlCQUZEO0FBR0EsdUJBQUtsQixJQUFMLEdBQVlELElBQVo7QUFDQSwrQkFBS3NCLG1CQUFMO0FBQ0EsdUJBQUtGLE1BQUw7QUFDSCxhQVJEO0FBU0g7Ozs7RUFyRmlDLGVBQUtYLEk7O2tCQUF0QmQsUSIsImZpbGUiOiJpbnRlcmVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQge2Zvcm1hdFRpbWV9IGZyb20gJy4uL3V0aWxzL2Zvcm1hdFRpbWUnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJlc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5a+55oiR5oSf5YW06LajJ1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBsaXN0OiBbXVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgJ3RvYXN0JzogVG9hc3RcclxuICAgIH1cclxuXHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIHVzZXJJZCA9ICcnXHJcbiAgICBwYWdlcyA9IHtcclxuICAgICAgICBpbmRleDogMSxcclxuICAgICAgICBidXN5OiBmYWxzZSxcclxuICAgICAgICBoYXNOb3Q6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW50ZXJlc3RDb21wYW55IChwYWdlID0gMSwgcGFnZVNpemUgPSA4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxyXG4gICAgICAgICAgICB1c2VyVHlwZTogMSxcclxuICAgICAgICAgICAgcGFnZTogcGFnZSxcclxuICAgICAgICAgICAgcGFnZVNpemU6IHBhZ2VTaXplXHJcbiAgICAgICAgfSwgJy9DaGF0L2dldEludGVyZXN0TGlzdCcpXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkIChwYXJhbXMpIHtcclxuICAgICAgICB0aGlzLnVzZXJJZCA9IHBhcmFtcy5pZFxyXG4gICAgICAgIHRoaXMuZ2V0SW50ZXJlc3RDb21wYW55KClcclxuICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jb2xsZWN0VGltZSA9IGZvcm1hdFRpbWUoaXRlbS5jb2xsZWN0VGltZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5saXN0ID0gZGF0YVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlcy5oYXNOb3QpIHtcclxuICAgICAgICAgICAgLy8gdGhpcy50b2FzdCh7Y29udGVudDogJ+ayoeacieabtOWkmuS6hid9KVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZXMuYnVzeSkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnRvYXN0KHtjb250ZW50OiAn5q2j5Zyo5Yqg6L296K+356iN5ZCO5YaN6K+VJ30pXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2VzLmJ1c3kgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5wYWdlcy5pbmRleCsrXHJcbiAgICAgICAgdGhpcy5nZXRJbnRlcmVzdENvbXBhbnkodGhpcy5wYWdlcy5pbmRleClcclxuICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA8IDgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jb2xsZWN0VGltZSA9IGZvcm1hdFRpbWUoaXRlbS5jb2xsZWN0VGltZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5saXN0ID0gWy4uLnRoaXMubGlzdCwgLi4uZGF0YV1cclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAgIHRoaXMucGFnZXMuaW5kZXggPSAxXHJcbiAgICAgICAgdGhpcy5wYWdlcy5oYXNOb3QgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMucGFnZXMuYnVzeSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5nZXRJbnRlcmVzdENvbXBhbnkoKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNvbGxlY3RUaW1lID0gZm9ybWF0VGltZShpdGVtLmNvbGxlY3RUaW1lKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBkYXRhXHJcbiAgICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==