'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
            'job-item': _jobListItem2.default
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
        key: 'onReachBottom',
        value: function onReachBottom() {
            var _this3 = this;

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
                    _this3.hasNot = true;
                }
                _this3.collect = [].concat(_toConsumableArray(_this3.collect), _toConsumableArray(data));
                _this3.$apply();
            });
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this4 = this;

            this.getCollectJob().then(function (_ref3) {
                var data = _ref3.data;

                _this4.collect = data;
                _wepy2.default.stopPullDownRefresh();
                _this4.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this5 = this;

            this.userId = params.id;
            this.getCollectJob().then(function (_ref4) {
                var data = _ref4.data;

                _this5.collect = data;
                _this5.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3QuanMiXSwibmFtZXMiOlsiQ29sbGVjdCIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwicmVxdWVzdCIsInVzZXJJZCIsInBhZ2UiLCJpbmRleCIsImJ1c3kiLCJoYXNOb3QiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImRhdGEiLCJjb2xsZWN0IiwibWV0aG9kcyIsImNhbmNlbENvbGxlY3QiLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsImJ0bmluZGV4IiwidW5kZWZpbmVkIiwiUG9zdCIsImludml0ZVdvcmtJZCIsImlkIiwic3RhdHVzIiwidGhlbiIsInNwbGljZSIsIk51bWJlciIsInBhcnNlSW50IiwiJGFwcGx5IiwicGFnZVNpemUiLCJHZXQiLCJnZXRDb2xsZWN0Sm9iIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsInBhcmFtcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCO0FBRm5CLFMsUUFLVEMsTyxHQUFVLHVCLFFBRVZDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNIQyxtQkFBTyxDQURKO0FBRUhDLGtCQUFNLEtBRkg7QUFHSEMsb0JBQVE7QUFITCxTLFFBY1JDLE0sR0FBUyxFQUFDLFlBQVcsRUFBQyxnQkFBZSxFQUFDLE9BQU0sU0FBUCxFQUFpQixRQUFPLE1BQXhCLEVBQStCLFNBQVEsT0FBdkMsRUFBK0MsT0FBTSxPQUFyRCxFQUE2RCxTQUFRLEdBQXJFLEVBQWhCLEVBQTBGLHdCQUF1QixFQUFDLE9BQU0sU0FBUCxFQUFpQixRQUFPLE1BQXhCLEVBQStCLFNBQVEsT0FBdkMsRUFBK0MsT0FBTSxPQUFyRCxFQUE2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VixHQUFtQixLQUFuQjtBQUNIOzs7O0VBM0ZnQyxlQUFLSCxJOztrQkFBckJOLE8iLCJmaWxlIjoiY29sbGVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCBKb2JJdGVtIGZyb20gJy4uL2NvbXBvbmVudHMvam9iLWxpc3QtaXRlbSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pS26JeP6IGM5L2NJ1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgdXNlcklkID0gJydcclxuXHJcbiAgICBwYWdlID0ge1xyXG4gICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgIGJ1c3k6IGZhbHNlLFxyXG4gICAgICAgIGhhc05vdDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb2xsZWN0Sm9iIChwYWdlID0gMSwgcGFnZVNpemUgPSA4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxyXG4gICAgICAgICAgICBwYWdlOiBwYWdlLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogcGFnZVNpemVcclxuICAgICAgICB9LCAnL0NvbGxlY3QvZ2V0SW52aXRlTGlzdCcpXHJcbiAgICB9XHJcblxyXG4gICAkcHJvcHMgPSB7XCJqb2ItaXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcImZvclwiOlwiY29sbGVjdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCIsXCJ2YWx1ZVwiOlwiMlwifSxcInYtYmluZDpsaXN0SXRlbS5vbmNlXCI6e1wiZm9yXCI6XCJjb2xsZWN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIixcInZhbHVlXCI6XCIyXCJ9LFwidHlwZVwiOntcImZvclwiOlwiY29sbGVjdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCIsXCJ2YWx1ZVwiOlwiMlwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICdqb2ItaXRlbSc6IEpvYkl0ZW1cclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGNvbGxlY3Q6IFtdXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBjYW5jZWxDb2xsZWN0IChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmJ0bmluZGV4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LlBvc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaW52aXRlV29ya0lkOiBlLnRhcmdldC5kYXRhc2V0LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogMFxyXG4gICAgICAgICAgICAgICAgfSwgJy9JbnZpdGVXb3JrL2NvbGxlY3QnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3Quc3BsaWNlKE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmJ0bmluZGV4KSwgMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuYnVzeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZS5oYXNOb3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFnZS5pbmRleCsrXHJcbiAgICAgICAgdGhpcy5wYWdlLmJ1c3kgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5nZXRDb2xsZWN0Sm9iKHRoaXMucGFnZS5pbmRleClcclxuICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpICYmIGRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3QgPSBbLi4udGhpcy5jb2xsZWN0LCAuLi5kYXRhXVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDb2xsZWN0Sm9iKClcclxuICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdCA9IGRhdGFcclxuICAgICAgICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKClcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkIChwYXJhbXMpIHtcclxuICAgICAgICB0aGlzLnVzZXJJZCA9IHBhcmFtcy5pZFxyXG4gICAgICAgIHRoaXMuZ2V0Q29sbGVjdEpvYigpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3QgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uVW5sb2FkICgpIHtcclxuICAgICAgICB0aGlzLnBhZ2UuaW5kZXggPSAxXHJcbiAgICAgICAgdGhpcy5wYWdlLmJ1c3kgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMucGFnZS5oYXNOb3QgPSBmYWxzZVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=