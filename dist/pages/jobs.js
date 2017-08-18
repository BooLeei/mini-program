'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _jobListItem = require('./../components/job-list-item.js');

var _jobListItem2 = _interopRequireDefault(_jobListItem);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Jobs = function (_wepy$page) {
    _inherits(Jobs, _wepy$page);

    function Jobs() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Jobs);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Jobs.__proto__ || Object.getPrototypeOf(Jobs)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark'
        }, _this.data = {
            loading: false,
            fixTab: false,
            autoplay: true,
            hasNot: false,
            tabIndex: 0,
            cityId: '0',
            cityName: '全国',
            bannerImg: [],
            tabList: ['最新职位', '最热职位'],
            newJobList: [],
            hotJobList: []
        }, _this.page = {
            scrollTop: 220,
            busy: false,
            newIndex: 1,
            hotIndex: 1
        }, _this.Request = new _request2.default(), _this.$props = { "new-job-item": { "xmlns:v-bind": { "for": "newJobList", "item": "item", "index": "index", "key": "key", "value": "1" }, "v-bind:listItem.once": { "for": "newJobList", "item": "item", "index": "index", "key": "key", "value": "1" }, "type": { "for": "newJobList", "item": "item", "index": "index", "key": "key", "value": "1" } }, "hot-job-item": { "v-bind:listItem.once": { "for": "hotJobList", "item": "item", "index": "index", "key": "key", "value": "1" }, "type": { "for": "hotJobList", "item": "item", "index": "index", "key": "key", "value": "1" } }, "loading": { "xmlns:v-bind": "", "v-bind:show.sync": "loading" } }, _this.$events = {}, _this.components = {
            'new-job-item': _jobListItem2.default,
            'hot-job-item': _jobListItem2.default,
            'loading': _loading2.default
        }, _this.methods = {
            toggleTab: function toggleTab(index) {
                this.tabIndex = index;
                this.hasNot = false;
            },
            scrollToTop: function scrollToTop() {
                if (_wepy2.default.pageScrollTo) {
                    _wepy2.default.pageScrollTo({
                        scrollTop: 0
                    });
                } else {
                    _wepy2.default.showModal({
                        title: '提示',
                        content: '当前微信版本过低，无法使用回到顶部功能，请升级到最新微信版本后重试'
                    });
                }
            },
            toSearch: function toSearch() {
                _wepy2.default.navigateTo({
                    url: 'search'
                });
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Jobs, [{
        key: 'getJobList',
        value: function getJobList() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

            return this.Request.Get({
                type: type,
                page: page,
                pageSize: size,
                cityId: this.cityId
            }, '/InviteWork/getRecommendList');
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var _this2 = this;

            this.loading = true;
            wx.createSelectorQuery().select('#fixed').boundingClientRect(function (rect) {
                _this2.page.scrollTop = rect.top - 45;
            }).exec();
            this.cityId = this.$parent.global.choose.region_id;
            this.cityName = this.$parent.global.choose.region_name;
            var all = Promise.all([this.Request.Get({ type: '100' }, '/Banner/getListByType'), this.getJobList(0), this.getJobList(1)]);
            all.then(function (_ref2) {
                var _ref3 = _slicedToArray(_ref2, 3),
                    banner = _ref3[0],
                    newJob = _ref3[1],
                    hotJob = _ref3[2];

                _this2.bannerImg = banner.data[100];
                _this2.newJobList = newJob.data;
                _this2.hotJobList = hotJob.data;
                _this2.loading = false;
                _this2.$apply();
            }).catch(function (err) {
                (0, _log.log)(err);
            });
        }
    }, {
        key: 'onPageScroll',
        value: function onPageScroll(event) {
            if (event.scrollTop >= this.page.scrollTop) {
                this.fixTab = true;
            } else {
                this.fixTab = false;
            }
        }
    }, {
        key: 'onShareAppMessage',
        value: function onShareAppMessage() {
            return {
                title: '健身求职',
                path: '/pages/jobs',
                success: function success(ret) {
                    (0, _log.log)(ret);
                },
                fail: function fail(err) {
                    (0, _log.log)(err);
                }
            };
        }
    }, {
        key: 'onHide',
        value: function onHide() {
            this.hasNot = false;
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this3 = this;

            Promise.all([this.getJobList(0), this.getJobList(1)]).then(function (ret) {
                var _ret2 = _slicedToArray(ret, 2),
                    newJob = _ret2[0],
                    hotJob = _ret2[1];

                _this3.newJobList = newJob.data;
                _this3.hotJobList = hotJob.data;
                _this3.$apply();
                _wepy2.default.stopPullDownRefresh();
            }).catch(function (err) {
                (0, _log.log)(err);
            });
        }
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            var _this4 = this;

            if (this.page.busy) {
                return false;
            }
            if (this.tabIndex === 1) {
                if (this.hasNot) {
                    return false;
                }
                this.page.hotIndex++;
                this.page.busy = true;
                this.getJobList(1, this.page.hotIndex, 8).then(function (ret) {
                    if (Array.isArray(ret.data) && ret.data.length === 0) {
                        _this4.hasNot = true;
                    }
                    _this4.hotJobList = [].concat(_toConsumableArray(_this4.hotJobList), _toConsumableArray(ret.data));
                    _this4.page.busy = false;
                });
            } else {
                if (this.hasNot) {
                    return false;
                }
                this.page.newIndex++;
                this.page.busy = true;
                this.getJobList(0, this.page.newIndex, 8).then(function (ret) {
                    if (Array.isArray(ret.data) && ret.data.length === 0) {
                        _this4.hasNot = true;
                    }
                    _this4.newJobList = [].concat(_toConsumableArray(_this4.newJobList), _toConsumableArray(ret.data));
                    _this4.page.busy = false;
                });
            }
        }
    }]);

    return Jobs;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Jobs , 'pages/jobs'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYnMuanMiXSwibmFtZXMiOlsiSm9icyIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJkYXRhIiwibG9hZGluZyIsImZpeFRhYiIsImF1dG9wbGF5IiwiaGFzTm90IiwidGFiSW5kZXgiLCJjaXR5SWQiLCJjaXR5TmFtZSIsImJhbm5lckltZyIsInRhYkxpc3QiLCJuZXdKb2JMaXN0IiwiaG90Sm9iTGlzdCIsInBhZ2UiLCJzY3JvbGxUb3AiLCJidXN5IiwibmV3SW5kZXgiLCJob3RJbmRleCIsIlJlcXVlc3QiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJ0b2dnbGVUYWIiLCJpbmRleCIsInNjcm9sbFRvVG9wIiwicGFnZVNjcm9sbFRvIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwidG9TZWFyY2giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZXZlbnRzIiwidHlwZSIsInNpemUiLCJHZXQiLCJwYWdlU2l6ZSIsInd4IiwiY3JlYXRlU2VsZWN0b3JRdWVyeSIsInNlbGVjdCIsImJvdW5kaW5nQ2xpZW50UmVjdCIsInJlY3QiLCJ0b3AiLCJleGVjIiwiJHBhcmVudCIsImdsb2JhbCIsImNob29zZSIsInJlZ2lvbl9pZCIsInJlZ2lvbl9uYW1lIiwiYWxsIiwiUHJvbWlzZSIsImdldEpvYkxpc3QiLCJ0aGVuIiwiYmFubmVyIiwibmV3Sm9iIiwiaG90Sm9iIiwiJGFwcGx5IiwiY2F0Y2giLCJlcnIiLCJldmVudCIsInBhdGgiLCJzdWNjZXNzIiwicmV0IiwiZmFpbCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztzTEFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUI7QUFEaEIsUyxRQUlUQyxJLEdB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QUFTbUUsTUFBVCxLQUFvQixDQUFuRCxFQUFzRDtBQUNsRCwrQkFBSy9ELE1BQUwsR0FBYyxJQUFkO0FBQ0g7QUFDRCwyQkFBS08sVUFBTCxnQ0FBc0IsT0FBS0EsVUFBM0Isc0JBQTBDbUQsSUFBSTlELElBQTlDO0FBQ0EsMkJBQUtZLElBQUwsQ0FBVUUsSUFBVixHQUFpQixLQUFqQjtBQUNILGlCQVBEO0FBUUgsYUFaRCxNQVlPO0FBQ0gsb0JBQUksS0FBS1YsTUFBVCxFQUFpQjtBQUFFLDJCQUFPLEtBQVA7QUFBYztBQUNqQyxxQkFBS1EsSUFBTCxDQUFVRyxRQUFWO0FBQ0EscUJBQUtILElBQUwsQ0FBVUUsSUFBVixHQUFpQixJQUFqQjtBQUNBLHFCQUFLcUMsVUFBTCxDQUFnQixDQUFoQixFQUFtQixLQUFLdkMsSUFBTCxDQUFVRyxRQUE3QixFQUF1QyxDQUF2QyxFQUNDcUMsSUFERCxDQUNNLGVBQU87QUFDVCx3QkFBSWEsTUFBTUMsT0FBTixDQUFjSixJQUFJOUQsSUFBbEIsS0FBMkI4RCxJQUFJOUQsSUFBSixDQUFTbUUsTUFBVCxLQUFvQixDQUFuRCxFQUFzRDtBQUNsRCwrQkFBSy9ELE1BQUwsR0FBYyxJQUFkO0FBQ0g7QUFDRCwyQkFBS00sVUFBTCxnQ0FBc0IsT0FBS0EsVUFBM0Isc0JBQTBDb0QsSUFBSTlELElBQTlDO0FBQ0EsMkJBQUtZLElBQUwsQ0FBVUUsSUFBVixHQUFpQixLQUFqQjtBQUNILGlCQVBEO0FBUUg7QUFDSjs7OztFQWxLNkIsZUFBS0YsSTs7a0JBQWxCZixJIiwiZmlsZSI6ImpvYnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IEpvYkl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9qb2ItbGlzdC1pdGVtJ1xyXG5pbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXHJcbmltcG9ydCB7IGxvZyB9IGZyb20gJy4uL3V0aWxzL2xvZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvYnMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJ1xyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgZml4VGFiOiBmYWxzZSxcclxuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICBoYXNOb3Q6IGZhbHNlLFxyXG4gICAgICAgIHRhYkluZGV4OiAwLFxyXG4gICAgICAgIGNpdHlJZDogJzAnLFxyXG4gICAgICAgIGNpdHlOYW1lOiAn5YWo5Zu9JyxcclxuICAgICAgICBiYW5uZXJJbWc6IFtdLFxyXG4gICAgICAgIHRhYkxpc3Q6IFsn5pyA5paw6IGM5L2NJywgJ+acgOeDreiBjOS9jSddLFxyXG4gICAgICAgIG5ld0pvYkxpc3Q6IFtdLFxyXG4gICAgICAgIGhvdEpvYkxpc3Q6IFtdXHJcbiAgICB9XHJcblxyXG4gICAgcGFnZSA9IHtcclxuICAgICAgICBzY3JvbGxUb3A6IDIyMCxcclxuICAgICAgICBidXN5OiBmYWxzZSxcclxuICAgICAgICBuZXdJbmRleDogMSxcclxuICAgICAgICBob3RJbmRleDogMVxyXG4gICAgfVxyXG5cclxuICAgIFJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgZ2V0Sm9iTGlzdCAodHlwZSA9IDAsIHBhZ2UgPSAxLCBzaXplID0gNSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgcGFnZTogcGFnZSxcclxuICAgICAgICAgICAgcGFnZVNpemU6IHNpemUsXHJcbiAgICAgICAgICAgIGNpdHlJZDogdGhpcy5jaXR5SWRcclxuICAgICAgICB9LCAnL0ludml0ZVdvcmsvZ2V0UmVjb21tZW5kTGlzdCcpXHJcbiAgICB9XHJcblxyXG4gICAkcHJvcHMgPSB7XCJuZXctam9iLWl0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJmb3JcIjpcIm5ld0pvYkxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIixcInZhbHVlXCI6XCIxXCJ9LFwidi1iaW5kOmxpc3RJdGVtLm9uY2VcIjp7XCJmb3JcIjpcIm5ld0pvYkxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIixcInZhbHVlXCI6XCIxXCJ9LFwidHlwZVwiOntcImZvclwiOlwibmV3Sm9iTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwiLFwidmFsdWVcIjpcIjFcIn19LFwiaG90LWpvYi1pdGVtXCI6e1widi1iaW5kOmxpc3RJdGVtLm9uY2VcIjp7XCJmb3JcIjpcImhvdEpvYkxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIixcInZhbHVlXCI6XCIxXCJ9LFwidHlwZVwiOntcImZvclwiOlwiaG90Sm9iTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwiLFwidmFsdWVcIjpcIjFcIn19LFwibG9hZGluZ1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2hvdy5zeW5jXCI6XCJsb2FkaW5nXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAnbmV3LWpvYi1pdGVtJzogSm9iSXRlbSxcclxuICAgICAgICAnaG90LWpvYi1pdGVtJzogSm9iSXRlbSxcclxuICAgICAgICAnbG9hZGluZyc6IExvYWRpbmdcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHRvZ2dsZVRhYiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy50YWJJbmRleCA9IGluZGV4XHJcbiAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjcm9sbFRvVG9wICgpIHtcclxuICAgICAgICAgICAgaWYgKHdlcHkucGFnZVNjcm9sbFRvKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnBhZ2VTY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn5b2T5YmN5b6u5L+h54mI5pys6L+H5L2O77yM5peg5rOV5L2/55So5Zue5Yiw6aG26YOo5Yqf6IO977yM6K+35Y2H57qn5Yiw5pyA5paw5b6u5L+h54mI5pys5ZCO6YeN6K+VJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9TZWFyY2ggKCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnc2VhcmNoJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICAgICAgd3guY3JlYXRlU2VsZWN0b3JRdWVyeSgpLnNlbGVjdCgnI2ZpeGVkJykuYm91bmRpbmdDbGllbnRSZWN0KHJlY3QgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2Nyb2xsVG9wID0gcmVjdC50b3AgLSA0NVxyXG4gICAgICAgIH0pLmV4ZWMoKVxyXG4gICAgICAgIHRoaXMuY2l0eUlkID0gdGhpcy4kcGFyZW50Lmdsb2JhbC5jaG9vc2UucmVnaW9uX2lkXHJcbiAgICAgICAgdGhpcy5jaXR5TmFtZSA9IHRoaXMuJHBhcmVudC5nbG9iYWwuY2hvb3NlLnJlZ2lvbl9uYW1lXHJcbiAgICAgICAgbGV0IGFsbCA9IFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgdGhpcy5SZXF1ZXN0LkdldCh7dHlwZTogJzEwMCd9LCAnL0Jhbm5lci9nZXRMaXN0QnlUeXBlJyksXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Sm9iTGlzdCgwKSxcclxuICAgICAgICAgICAgdGhpcy5nZXRKb2JMaXN0KDEpXHJcbiAgICAgICAgXSlcclxuICAgICAgICBhbGwudGhlbigoW2Jhbm5lciwgbmV3Sm9iLCBob3RKb2JdKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFubmVySW1nID0gYmFubmVyLmRhdGFbMTAwXVxyXG4gICAgICAgICAgICB0aGlzLm5ld0pvYkxpc3QgPSBuZXdKb2IuZGF0YVxyXG4gICAgICAgICAgICB0aGlzLmhvdEpvYkxpc3QgPSBob3RKb2IuZGF0YVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgbG9nKGVycilcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uUGFnZVNjcm9sbCAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQuc2Nyb2xsVG9wID49IHRoaXMucGFnZS5zY3JvbGxUb3ApIHtcclxuICAgICAgICAgICAgdGhpcy5maXhUYWIgPSB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5maXhUYWIgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGl0bGU6ICflgaXouqvmsYLogYwnLFxyXG4gICAgICAgICAgICBwYXRoOiBgL3BhZ2VzL2pvYnNgLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKHJldClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZyhlcnIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25IaWRlICgpIHtcclxuICAgICAgICB0aGlzLmhhc05vdCA9IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAgIFByb21pc2UuYWxsKFt0aGlzLmdldEpvYkxpc3QoMCksIHRoaXMuZ2V0Sm9iTGlzdCgxKV0pXHJcbiAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgbGV0IFtuZXdKb2IsIGhvdEpvYl0gPSByZXRcclxuICAgICAgICAgICAgdGhpcy5uZXdKb2JMaXN0ID0gbmV3Sm9iLmRhdGFcclxuICAgICAgICAgICAgdGhpcy5ob3RKb2JMaXN0ID0gaG90Sm9iLmRhdGFcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGxvZyhlcnIpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlLmJ1c3kpIHsgcmV0dXJuIGZhbHNlIH1cclxuICAgICAgICBpZiAodGhpcy50YWJJbmRleCA9PT0gMSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNOb3QpIHsgcmV0dXJuIGZhbHNlIH1cclxuICAgICAgICAgICAgdGhpcy5wYWdlLmhvdEluZGV4KytcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmJ1c3kgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Sm9iTGlzdCgxLCB0aGlzLnBhZ2UuaG90SW5kZXgsIDgpXHJcbiAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXQuZGF0YSkgJiYgcmV0LmRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvdEpvYkxpc3QgPSBbLi4udGhpcy5ob3RKb2JMaXN0LCAuLi5yZXQuZGF0YV1cclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5idXN5ID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNOb3QpIHsgcmV0dXJuIGZhbHNlIH1cclxuICAgICAgICAgICAgdGhpcy5wYWdlLm5ld0luZGV4KytcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmJ1c3kgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Sm9iTGlzdCgwLCB0aGlzLnBhZ2UubmV3SW5kZXgsIDgpXHJcbiAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXQuZGF0YSkgJiYgcmV0LmRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0pvYkxpc3QgPSBbLi4udGhpcy5uZXdKb2JMaXN0LCAuLi5yZXQuZGF0YV1cclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5idXN5ID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19