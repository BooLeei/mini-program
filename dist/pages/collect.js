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

var _jobListItem = require('./../components/job-list-item.js');

var _jobListItem2 = _interopRequireDefault(_jobListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collect = function (_wepy$page) {
    _inherits(Collect, _wepy$page);

    function Collect() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Collect);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Collect.__proto__ || Object.getPrototypeOf(Collect)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '收藏职位'
        }, _this.request = new _request2.default(), _this.userId = '', _this.page = {
            index: 1,
            busy: false,
            hasNot: false
        }, _this.$props = { "job-item": { "xmlns:v-bind": { "for": "collect", "item": "item", "index": "index", "key": "index", "value": "2" }, "v-bind:listItem.once": { "for": "collect", "item": "item", "index": "index", "key": "index", "value": "2" }, "type": { "for": "collect", "item": "item", "index": "index", "key": "index", "value": "2" } } }, _this.$events = {}, _this.components = {
            'job-item': _jobListItem2.default,
            'toast': _toast2.default
        }, _this.data = {
            collect: []
        }, _this.methods = {
            cancelCollect: function cancelCollect(e) {
                var _this2 = this;

                if (e.target.dataset.btnindex != undefined) {
                    this.request.Post({
                        userId: this.userId,
                        inviteWorkId: e.target.dataset.id,
                        status: 0
                    }, '/InviteWork/collect').then(function (ret) {
                        _this2.collect.splice(Number.parseInt(e.target.dataset.btnindex), 1);
                        _this2.$apply();
                    });
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Collect, [{
        key: 'getCollectJob',
        value: function getCollectJob() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

            return this.request.Get({
                userId: this.userId,
                page: page,
                pageSize: pageSize
            }, '/Collect/getInviteList');
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
            var _this3 = this;

            _wepy2.default.onSocketMessage(function (res) {
                _this3.$parent.global.curVal = Number.parseInt(_this3.$parent.global.curVal) + 1;
                _this3.toast({ content: '您有新消息' });
            });
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
            this.getCollectJob(this.page.index).then(function (_ref2) {
                var data = _ref2.data;

                if (Array.isArray(data) && data.length === 0) {
                    _this4.hasNot = true;
                }
                _this4.collect = [].concat(_toConsumableArray(_this4.collect), _toConsumableArray(data));
                _this4.$apply();
            });
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this5 = this;

            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            this.getCollectJob().then(function (_ref3) {
                var data = _ref3.data;

                _this5.collect = data;
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
            this.getCollectJob().then(function (_ref4) {
                var data = _ref4.data;

                _this6.collect = data;
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

    return Collect;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Collect , 'pages/collect'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3QuanMiXSwibmFtZXMiOlsiQ29sbGVjdCIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwicmVxdWVzdCIsInVzZXJJZCIsInBhZ2UiLCJpbmRleCIsImJ1c3kiLCJoYXNOb3QiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImRhdGEiLCJjb2xsZWN0IiwibWV0aG9kcyIsImNhbmNlbENvbGxlY3QiLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsImJ0bmluZGV4IiwidW5kZWZpbmVkIiwiUG9zdCIsImludml0ZVdvcmtJZCIsImlkIiwic3RhdHVzIiwidGhlbiIsInNwbGljZSIsIk51bWJlciIsInBhcnNlSW50IiwiJGFwcGx5IiwicGFnZVNpemUiLCJHZXQiLCIkaW52b2tlIiwib25Tb2NrZXRNZXNzYWdlIiwiJHBhcmVudCIsImdsb2JhbCIsImN1clZhbCIsInRvYXN0IiwiY29udGVudCIsImdldENvbGxlY3RKb2IiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsInN0b3BQdWxsRG93blJlZnJlc2giLCJoaWRlTG9hZGluZyIsInBhcmFtcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0I7QUFGbkIsUyxRQUtUQyxPLEdBQVUsdUIsUUFFVkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0hDLG1CQUFPLENBREo7QUFFSEMsa0JBQU0sS0FGSDtBQUdIQyxvQkFBUTtBQUhMLFMsUUFjUkMsTSxHQUFTLEVBQUMsWUFBVyxFQUFDLGdCQUFlLEVBQUMsT0FBTSxTQUFQLEVBQWlCLFFBQU8sTUFBeEIsRUFBK0IsU0FBUSxPQUF2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Q2pCLDJCQUFLYyxXQUFMLENBQWlCLEVBQUNDLE9BQU8sUUFBUixFQUFrQkMsTUFBTSxJQUF4QixFQUFqQjtBQUNBLGlCQUFLTixhQUFMLEdBQ0NkLElBREQsQ0FDTSxpQkFBWTtBQUFBLG9CQUFWYixJQUFVLFNBQVZBLElBQVU7O0FBQ2QsdUJBQUtDLE9BQUwsR0FBZUQsSUFBZjtBQUNBLHVCQUFLaUIsTUFBTDtBQUNBLCtCQUFLaUIsbUJBQUw7QUFDQSwrQkFBS0MsV0FBTDtBQUNILGFBTkQ7QUFPSDs7OytCQUVPQyxNLEVBQVE7QUFBQTs7QUFDWiwyQkFBS0wsV0FBTCxDQUFpQixFQUFDQyxPQUFPLFFBQVIsRUFBa0JDLE1BQU0sSUFBeEIsRUFBakI7QUFDQSxpQkFBS3pDLE1BQUwsR0FBYzRDLE9BQU96QixFQUFyQjtBQUNBLGlCQUFLZ0IsYUFBTCxHQUNDZCxJQURELENBQ00saUJBQVk7QUFBQSxvQkFBVmIsSUFBVSxTQUFWQSxJQUFVOztBQUNkLHVCQUFLQyxPQUFMLEdBQWVELElBQWY7QUFDQSx1QkFBS2lCLE1BQUw7QUFDQSwrQkFBS2tCLFdBQUw7QUFDSCxhQUxEO0FBTUg7OzttQ0FFVztBQUNSLGlCQUFLMUMsSUFBTCxDQUFVQyxLQUFWLEdBQWtCLENBQWxCO0FBQ0EsaUJBQUtELElBQUwsQ0FBVUUsSUFBVixHQUFpQixLQUFqQjtBQUNBLGlCQUFLRixJQUFMLENBQVVHLE1BQVYsR0FBbUIsS0FBbkI7QUFDSDs7OztFQTNHZ0MsZUFBS0gsSTs7a0JBQXJCTixPIiwiZmlsZSI6ImNvbGxlY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdG9hc3QnXHJcbmltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IEpvYkl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9qb2ItbGlzdC1pdGVtJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlLbol4/ogYzkvY0nXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICB1c2VySWQgPSAnJ1xyXG5cclxuICAgIHBhZ2UgPSB7XHJcbiAgICAgICAgaW5kZXg6IDEsXHJcbiAgICAgICAgYnVzeTogZmFsc2UsXHJcbiAgICAgICAgaGFzTm90OiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGdldENvbGxlY3RKb2IgKHBhZ2UgPSAxLCBwYWdlU2l6ZSA9IDgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXHJcbiAgICAgICAgICAgIHBhZ2U6IHBhZ2UsXHJcbiAgICAgICAgICAgIHBhZ2VTaXplOiBwYWdlU2l6ZVxyXG4gICAgICAgIH0sICcvQ29sbGVjdC9nZXRJbnZpdGVMaXN0JylcclxuICAgIH1cclxuXHJcbiAgICRwcm9wcyA9IHtcImpvYi1pdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1wiZm9yXCI6XCJjb2xsZWN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIixcInZhbHVlXCI6XCIyXCJ9LFwidi1iaW5kOmxpc3RJdGVtLm9uY2VcIjp7XCJmb3JcIjpcImNvbGxlY3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwiLFwidmFsdWVcIjpcIjJcIn0sXCJ0eXBlXCI6e1wiZm9yXCI6XCJjb2xsZWN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIixcInZhbHVlXCI6XCIyXCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgJ2pvYi1pdGVtJzogSm9iSXRlbSxcclxuICAgICAgICAndG9hc3QnOiBUb2FzdFxyXG4gICAgfVxyXG5cclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICB3ZXB5Lm9uU29ja2V0TWVzc2FnZShyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCA9IE51bWJlci5wYXJzZUludCh0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCkgKyAxXHJcbiAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfmgqjmnInmlrDmtojmga8nfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgY29sbGVjdDogW11cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGNhbmNlbENvbGxlY3QgKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuYnRuaW5kZXggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuUG9zdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICBpbnZpdGVXb3JrSWQ6IGUudGFyZ2V0LmRhdGFzZXQuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAwXHJcbiAgICAgICAgICAgICAgICB9LCAnL0ludml0ZVdvcmsvY29sbGVjdCcpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdC5zcGxpY2UoTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuYnRuaW5kZXgpLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZS5idXN5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wYWdlLmhhc05vdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlLmluZGV4KytcclxuICAgICAgICB0aGlzLnBhZ2UuYnVzeSA9IHRydWVcclxuICAgICAgICB0aGlzLmdldENvbGxlY3RKb2IodGhpcy5wYWdlLmluZGV4KVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdCA9IFsuLi50aGlzLmNvbGxlY3QsIC4uLmRhdGFdXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgICB3ZXB5LnNob3dMb2FkaW5nKHt0aXRsZTogJ+WKoOi9veS4rS4uLicsIG1hc2s6IHRydWV9KVxyXG4gICAgICAgIHRoaXMuZ2V0Q29sbGVjdEpvYigpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3QgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKClcclxuICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHBhcmFtcykge1xyXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJywgbWFzazogdHJ1ZX0pXHJcbiAgICAgICAgdGhpcy51c2VySWQgPSBwYXJhbXMuaWRcclxuICAgICAgICB0aGlzLmdldENvbGxlY3RKb2IoKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0ID0gZGF0YVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25VbmxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMucGFnZS5pbmRleCA9IDFcclxuICAgICAgICB0aGlzLnBhZ2UuYnVzeSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5wYWdlLmhhc05vdCA9IGZhbHNlXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==