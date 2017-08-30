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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Follow = function (_wepy$page) {
    _inherits(Follow, _wepy$page);

    function Follow() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Follow);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Follow.__proto__ || Object.getPrototypeOf(Follow)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '关注公司'
        }, _this.request = new _request2.default(), _this.userId = '', _this.components = {
            'toast': _toast2.default
        }, _this.page = {
            index: 1,
            busy: false,
            hasNot: false
        }, _this.data = {
            follow: []
        }, _this.methods = {
            cancelFollow: function cancelFollow(e) {
                var _this2 = this;

                console.log(e);
                if (e.target.dataset.btnindex != undefined) {
                    this.request.Post({
                        userId: this.userId,
                        objectId: e.target.dataset.id,
                        type: 1,
                        status: 0
                    }, '/UserOperate/addUserOperate').then(function (ret) {
                        _this2.follow.splice(Number.parseInt(e.target.dataset.btnindex), 1);
                        _this2.$apply();
                    });
                }
            },
            toCompany: function toCompany(id) {
                _wepy2.default.navigateTo({
                    url: 'company?id=' + id
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Follow, [{
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this3 = this;

            _wepy2.default.onSocketMessage(function (res) {
                _this3.$parent.global.curVal = Number.parseInt(_this3.$parent.global.curVal) + 1;
                _this3.toast({ content: '您有新消息' });
            });
        }
    }, {
        key: 'getFollowCompany',
        value: function getFollowCompany() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

            return this.request.Get({
                userId: this.userId,
                page: page,
                pageSize: pageSize
            }, '/UserOperate/getCompanyList');
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
            this.getFollowCompany(this.page.index).then(function (_ref2) {
                var data = _ref2.data;

                if (Array.isArray(data) && data.length === 0) {
                    _this4.hasNot = true;
                }
                _this4.follow = [].concat(_toConsumableArray(_this4.follow), _toConsumableArray(data));
                _this4.$apply();
            });
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this5 = this;

            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            this.getFollowCompany().then(function (_ref3) {
                var data = _ref3.data;

                _this5.follow = data;
                _this5.$apply();
                _wepy2.default.stopPullDownRefresh();
                _wepy2.default.hideLoading();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this6 = this;

            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            this.userId = params.id;
            this.getFollowCompany().then(function (_ref4) {
                var data = _ref4.data;

                _this6.follow = data;
                _this6.$apply();
                _wepy2.default.hideLoading();
            });
        }
    }, {
        key: 'onUnload',
        value: function onUnload() {
            this.page.index = 1;
            this.page.busy = false;
            this.page.hasNot = false;
        }
    }]);

    return Follow;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Follow , 'pages/follow'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvbGxvdy5qcyJdLCJuYW1lcyI6WyJGb2xsb3ciLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInJlcXVlc3QiLCJ1c2VySWQiLCJjb21wb25lbnRzIiwicGFnZSIsImluZGV4IiwiYnVzeSIsImhhc05vdCIsImRhdGEiLCJmb2xsb3ciLCJtZXRob2RzIiwiY2FuY2VsRm9sbG93IiwiZSIsImNvbnNvbGUiLCJsb2ciLCJ0YXJnZXQiLCJkYXRhc2V0IiwiYnRuaW5kZXgiLCJ1bmRlZmluZWQiLCJQb3N0Iiwib2JqZWN0SWQiLCJpZCIsInR5cGUiLCJzdGF0dXMiLCJ0aGVuIiwic3BsaWNlIiwiTnVtYmVyIiwicGFyc2VJbnQiLCIkYXBwbHkiLCJ0b0NvbXBhbnkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiJGludm9rZSIsIm9uU29ja2V0TWVzc2FnZSIsIiRwYXJlbnQiLCJnbG9iYWwiLCJjdXJWYWwiLCJ0b2FzdCIsImNvbnRlbnQiLCJwYWdlU2l6ZSIsIkdldCIsImdldEZvbGxvd0NvbXBhbnkiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInN0b3BQdWxsRG93blJlZnJlc2giLCJoaWRlTG9hZGluZyIsInBhcmFtcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7MExBQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QjtBQUZuQixTLFFBS1RDLE8sR0FBVSx1QixRQUVWQyxNLEdBQVMsRSxRQUVUQyxVLEdBQWE7QUFDVDtBQURTLFMsUUFJYkMsSSxHQUFPO0FBQ0hDLG1CQUFPLENBREo7QUFFSEMsa0JBQU0sS0FGSDtBQUdIQyxvQkFBUTtBQUhMLFMsUUF5QlBDLEksR0FBTztBQUNIQyxvQkFBUTtBQURMLFMsUUFJUEMsTyxH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K0JBQUtDLFdBQUw7QUFDSCxhQU5EO0FBT0g7OzsrQkFFT0MsTSxFQUFRO0FBQUE7O0FBQ1osMkJBQUtMLFdBQUwsQ0FBaUIsRUFBQ0MsT0FBTyxRQUFSLEVBQWtCQyxNQUFNLElBQXhCLEVBQWpCO0FBQ0EsaUJBQUs3QyxNQUFMLEdBQWNnRCxPQUFPN0IsRUFBckI7QUFDQSxpQkFBS29CLGdCQUFMLEdBQ0NqQixJQURELENBQ00saUJBQVk7QUFBQSxvQkFBVmhCLElBQVUsU0FBVkEsSUFBVTs7QUFDZCx1QkFBS0MsTUFBTCxHQUFjRCxJQUFkO0FBQ0EsdUJBQUtvQixNQUFMO0FBQ0EsK0JBQUtxQixXQUFMO0FBQ0gsYUFMRDtBQU1IOzs7bUNBRVc7QUFDUixpQkFBSzdDLElBQUwsQ0FBVUMsS0FBVixHQUFrQixDQUFsQjtBQUNBLGlCQUFLRCxJQUFMLENBQVVFLElBQVYsR0FBaUIsS0FBakI7QUFDQSxpQkFBS0YsSUFBTCxDQUFVRyxNQUFWLEdBQW1CLEtBQW5CO0FBQ0g7Ozs7RUEvRytCLGVBQUtILEk7O2tCQUFwQlAsTSIsImZpbGUiOiJmb2xsb3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdG9hc3QnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb2xsb3cgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5YWz5rOo5YWs5Y+4J1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgdXNlcklkID0gJydcclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICd0b2FzdCc6IFRvYXN0XHJcbiAgICB9XHJcblxyXG4gICAgcGFnZSA9IHtcclxuICAgICAgICBpbmRleDogMSxcclxuICAgICAgICBidXN5OiBmYWxzZSxcclxuICAgICAgICBoYXNOb3Q6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgdG9hc3QgKGRhdGEgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvd1RvYXN0JywgZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICAgIHdlcHkub25Tb2NrZXRNZXNzYWdlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsID0gTnVtYmVyLnBhcnNlSW50KHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsKSArIDFcclxuICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+aCqOacieaWsOa2iOaBryd9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Rm9sbG93Q29tcGFueSAocGFnZSA9IDEsIHBhZ2VTaXplID0gOCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcclxuICAgICAgICAgICAgcGFnZTogcGFnZSxcclxuICAgICAgICAgICAgcGFnZVNpemU6IHBhZ2VTaXplXHJcbiAgICAgICAgfSwgJy9Vc2VyT3BlcmF0ZS9nZXRDb21wYW55TGlzdCcpXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBmb2xsb3c6IFtdXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBjYW5jZWxGb2xsb3cgKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuYnRuaW5kZXggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuUG9zdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RJZDogZS50YXJnZXQuZGF0YXNldC5pZCxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogMFxyXG4gICAgICAgICAgICAgICAgfSwgJy9Vc2VyT3BlcmF0ZS9hZGRVc2VyT3BlcmF0ZScpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9sbG93LnNwbGljZShOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5idG5pbmRleCksIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9Db21wYW55IChpZCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBgY29tcGFueT9pZD0ke2lkfWBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZS5idXN5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wYWdlLmhhc05vdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlLmluZGV4KytcclxuICAgICAgICB0aGlzLnBhZ2UuYnVzeSA9IHRydWVcclxuICAgICAgICB0aGlzLmdldEZvbGxvd0NvbXBhbnkodGhpcy5wYWdlLmluZGV4KVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZm9sbG93ID0gWy4uLnRoaXMuZm9sbG93LCAuLi5kYXRhXVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgICAgd2VweS5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0uLi4nLCBtYXNrOiB0cnVlfSlcclxuICAgICAgICB0aGlzLmdldEZvbGxvd0NvbXBhbnkoKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mb2xsb3cgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKClcclxuICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHBhcmFtcykge1xyXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJywgbWFzazogdHJ1ZX0pXHJcbiAgICAgICAgdGhpcy51c2VySWQgPSBwYXJhbXMuaWRcclxuICAgICAgICB0aGlzLmdldEZvbGxvd0NvbXBhbnkoKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mb2xsb3cgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblVubG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlLmluZGV4ID0gMVxyXG4gICAgICAgIHRoaXMucGFnZS5idXN5ID0gZmFsc2VcclxuICAgICAgICB0aGlzLnBhZ2UuaGFzTm90ID0gZmFsc2VcclxuICAgIH1cclxufVxyXG4iXX0=