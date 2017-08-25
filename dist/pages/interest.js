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
            var _this3 = this;

            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            this.userId = params.id;
            this.getInterestCompany().then(function (_ref2) {
                var data = _ref2.data;

                data.forEach(function (item) {
                    item.collectTime = (0, _formatTime.formatTime)(item.collectTime);
                });
                _this3.list = data;
                _this3.$apply();
                _wepy2.default.hideLoading();
            });
        }
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            var _this4 = this;

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
                    _this4.pages.hasNot = true;
                }
                data.forEach(function (item) {
                    item.collectTime = (0, _formatTime.formatTime)(item.collectTime);
                });
                _this4.list = [].concat(_toConsumableArray(_this4.list), _toConsumableArray(data));
                _this4.$apply();
            });
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this5 = this;

            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            this.pages.index = 1;
            this.pages.hasNot = false;
            this.pages.busy = false;
            this.getInterestCompany().then(function (_ref4) {
                var data = _ref4.data;

                data.forEach(function (item) {
                    item.collectTime = (0, _formatTime.formatTime)(item.collectTime);
                });
                _this5.list = data;
                _this5.$apply();
                _wepy2.default.stopPullDownRefresh();
                _wepy2.default.hideLoading();
            });
        }
    }]);

    return Interest;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Interest , 'pages/interest'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVyZXN0LmpzIl0sIm5hbWVzIjpbIkludGVyZXN0IiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJyZXF1ZXN0IiwiZGF0YSIsImxpc3QiLCJjb21wb25lbnRzIiwidXNlcklkIiwicGFnZXMiLCJpbmRleCIsImJ1c3kiLCJoYXNOb3QiLCIkaW52b2tlIiwib25Tb2NrZXRNZXNzYWdlIiwiJHBhcmVudCIsImdsb2JhbCIsImN1clZhbCIsIk51bWJlciIsInBhcnNlSW50IiwidG9hc3QiLCJjb250ZW50IiwicGFnZSIsInBhZ2VTaXplIiwiR2V0IiwidXNlclR5cGUiLCJwYXJhbXMiLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsImlkIiwiZ2V0SW50ZXJlc3RDb21wYW55IiwidGhlbiIsImZvckVhY2giLCJpdGVtIiwiY29sbGVjdFRpbWUiLCIkYXBwbHkiLCJoaWRlTG9hZGluZyIsImxlbmd0aCIsInN0b3BQdWxsRG93blJlZnJlc2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzhMQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0I7QUFGbkIsUyxRQUtUQyxPLEdBQVUsdUIsUUFFVkMsSSxHQUFPO0FBQ0hDLGtCQUFNO0FBREgsUyxRQUlQQyxVLEdBQWE7QUFDVDtBQURTLFMsUUFtQmJDLE0sR0FBUyxFLFFBQ1RDLEssR0FBUTtBQUNKQyxtQkFBTyxDQURIO0FBRUpDLGtCQUFNLEtBRkY7QUFHSkMsb0JBQVE7QUFISixTOzs7OztnQ0FoQlU7QUFBQSxnQkFBWFAsSUFBVyx1RUFBSixFQUFJOztBQUNkLGlCQUFLUSxPQUFMLENBQWEsT0FBYixFQUFzQixXQUF0QixFQUFtQ1IsSUFBbkM7QUFDSDs7O2dDQUVpQjtBQUFBLGdCQUFYQSxJQUFXLHVFQUFK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QVdELEtBQUtDLFdBQWhCLENBQW5CO0FBQ0gsaUJBRkQ7QUFHQSx1QkFBSzdCLElBQUwsR0FBWUQsSUFBWjtBQUNBLHVCQUFLK0IsTUFBTDtBQUNBLCtCQUFLRyxtQkFBTDtBQUNBLCtCQUFLRixXQUFMO0FBQ0gsYUFURDtBQVVIOzs7O0VBcEdpQyxlQUFLZixJOztrQkFBdEJ0QixRIiwiZmlsZSI6ImludGVyZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCB7Zm9ybWF0VGltZX0gZnJvbSAnLi4vdXRpbHMvZm9ybWF0VGltZSdcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdG9hc3QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlcmVzdCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflr7nmiJHmhJ/lhbTotqMnXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGxpc3Q6IFtdXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgICAndG9hc3QnOiBUb2FzdFxyXG4gICAgfVxyXG5cclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgdG9hc3QgKGRhdGEgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvd1RvYXN0JywgZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICAgIHdlcHkub25Tb2NrZXRNZXNzYWdlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsID0gTnVtYmVyLnBhcnNlSW50KHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsKSArIDFcclxuICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+aCqOacieaWsOa2iOaBryd9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdXNlcklkID0gJydcclxuICAgIHBhZ2VzID0ge1xyXG4gICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgIGJ1c3k6IGZhbHNlLFxyXG4gICAgICAgIGhhc05vdDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbnRlcmVzdENvbXBhbnkgKHBhZ2UgPSAxLCBwYWdlU2l6ZSA9IDgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXHJcbiAgICAgICAgICAgIHVzZXJUeXBlOiAxLFxyXG4gICAgICAgICAgICBwYWdlOiBwYWdlLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogcGFnZVNpemVcclxuICAgICAgICB9LCAnL0NoYXQvZ2V0SW50ZXJlc3RMaXN0JylcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHBhcmFtcykge1xyXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJywgbWFzazogdHJ1ZX0pXHJcbiAgICAgICAgdGhpcy51c2VySWQgPSBwYXJhbXMuaWRcclxuICAgICAgICB0aGlzLmdldEludGVyZXN0Q29tcGFueSgpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY29sbGVjdFRpbWUgPSBmb3JtYXRUaW1lKGl0ZW0uY29sbGVjdFRpbWUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IGRhdGFcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2VzLmhhc05vdCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnRvYXN0KHtjb250ZW50OiAn5rKh5pyJ5pu05aSa5LqGJ30pXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wYWdlcy5idXN5KSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfmraPlnKjliqDovb3or7fnqI3lkI7lho3or5UnfSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFnZXMuYnVzeSA9IHRydWVcclxuICAgICAgICB0aGlzLnBhZ2VzLmluZGV4KytcclxuICAgICAgICB0aGlzLmdldEludGVyZXN0Q29tcGFueSh0aGlzLnBhZ2VzLmluZGV4KVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlcy5oYXNOb3QgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNvbGxlY3RUaW1lID0gZm9ybWF0VGltZShpdGVtLmNvbGxlY3RUaW1lKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBbLi4udGhpcy5saXN0LCAuLi5kYXRhXVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgICAgd2VweS5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0uLi4nLCBtYXNrOiB0cnVlfSlcclxuICAgICAgICB0aGlzLnBhZ2VzLmluZGV4ID0gMVxyXG4gICAgICAgIHRoaXMucGFnZXMuaGFzTm90ID0gZmFsc2VcclxuICAgICAgICB0aGlzLnBhZ2VzLmJ1c3kgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuZ2V0SW50ZXJlc3RDb21wYW55KClcclxuICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jb2xsZWN0VGltZSA9IGZvcm1hdFRpbWUoaXRlbS5jb2xsZWN0VGltZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5saXN0ID0gZGF0YVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19