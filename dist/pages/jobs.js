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

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

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
            hasNot: true,
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
            'loading': _loading2.default,
            'toast': _toast2.default
        }, _this.methods = {
            toggleTab: function toggleTab(index) {
                this.tabIndex = index;
                if (Number.parseInt(index) === 0) {
                    if (this.newJobList.length < 5) {
                        this.hasNot = true;
                    } else {
                        this.hasNot = false;
                    }
                } else {
                    if (this.hotJobList.length < 5) {
                        this.hasNot = true;
                    } else {
                        this.hasNot = false;
                    }
                }
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
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var _this2 = this;

            // this.loading = true
            _wepy2.default.showLoading({ title: '加载中...' });
            wx.createSelectorQuery().select('#fixed').boundingClientRect(function (rect) {
                _this2.page.scrollTop = rect.top - 45;
                _this2.$apply();
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
                if (newJob.data.length < 5) {
                    _this2.hasNot = true;
                } else {
                    _this2.hasNot = false;
                }
                // this.loading = false
                _wepy2.default.hideLoading();
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
        key: 'onShow',
        value: function onShow() {
            var _this3 = this;

            _wepy2.default.onSocketMessage(function (res) {
                _this3.$parent.global.curVal = Number.parseInt(_this3.$parent.global.curVal) + 1;
                _this3.toast({ content: '您有新消息' });
            });
        }
    }, {
        key: 'onHide',
        value: function onHide() {
            this.hasNot = false;
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this4 = this;

            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            Promise.all([this.getJobList(0), this.getJobList(1)]).then(function (ret) {
                var _ret2 = _slicedToArray(ret, 2),
                    newJob = _ret2[0],
                    hotJob = _ret2[1];

                if (newJob.data.length < 5) {
                    _this4.hasNot = true;
                } else {
                    _this4.hasNot = false;
                }
                _this4.newJobList = newJob.data;
                _this4.hotJobList = hotJob.data;
                _wepy2.default.stopPullDownRefresh();
                _wepy2.default.hideLoading();
                _this4.$apply();
            }).catch(function (err) {
                (0, _log.log)(err);
            });
        }
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            var _this5 = this;

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
                        _this5.hasNot = true;
                    }
                    _this5.hotJobList = [].concat(_toConsumableArray(_this5.hotJobList), _toConsumableArray(ret.data));
                    _this5.page.busy = false;
                });
            } else {
                if (this.hasNot) {
                    return false;
                }
                this.page.newIndex++;
                this.page.busy = true;
                this.getJobList(0, this.page.newIndex, 8).then(function (ret) {
                    if (Array.isArray(ret.data) && ret.data.length === 0) {
                        _this5.hasNot = true;
                    }
                    _this5.newJobList = [].concat(_toConsumableArray(_this5.newJobList), _toConsumableArray(ret.data));
                    _this5.page.busy = false;
                });
            }
        }
    }]);

    return Jobs;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Jobs , 'pages/jobs'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYnMuanMiXSwibmFtZXMiOlsiSm9icyIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJkYXRhIiwibG9hZGluZyIsImZpeFRhYiIsImF1dG9wbGF5IiwiaGFzTm90IiwidGFiSW5kZXgiLCJjaXR5SWQiLCJjaXR5TmFtZSIsImJhbm5lckltZyIsInRhYkxpc3QiLCJuZXdKb2JMaXN0IiwiaG90Sm9iTGlzdCIsInBhZ2UiLCJzY3JvbGxUb3AiLCJidXN5IiwibmV3SW5kZXgiLCJob3RJbmRleCIsIlJlcXVlc3QiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJ0b2dnbGVUYWIiLCJpbmRleCIsIk51bWJlciIsInBhcnNlSW50IiwibGVuZ3RoIiwic2Nyb2xsVG9Ub3AiLCJwYWdlU2Nyb2xsVG8iLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJ0b1NlYXJjaCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJldmVudHMiLCJ0eXBlIiwic2l6ZSIsIkdldCIsInBhZ2VTaXplIiwiJGludm9rZSIsInNob3dMb2FkaW5nIiwid3giLCJjcmVhdGVTZWxlY3RvclF1ZXJ5Iiwic2VsZWN0IiwiYm91bmRpbmdDbGllbnRSZWN0IiwicmVjdCIsInRvcCIsIiRhcHBseSIsImV4ZWMiLCIkcGFyZW50IiwiZ2xvYmFsIiwiY2hvb3NlIiwicmVnaW9uX2lkIiwicmVnaW9uX25hbWUiLCJhbGwiLCJQcm9taXNlIiwiZ2V0Sm9iTGlzdCIsInRoZW4iLCJiYW5uZXIiLCJuZXdKb2IiLCJob3RKb2IiLCJoaWRlTG9hZGluZyIsImNhdGNoIiwiZXJyIiwiZXZlbnQiLCJwYXRoIiwic3VjY2VzcyIsInJldCIsImZhaWwiLCJvblNvY2tldE1lc3NhZ2UiLCJjdXJWYWwiLCJ0b2FzdCIsIm1hc2siLCJzdG9wUHVsbERvd25SZWZyZXNoIiwiQXJyYXkiLCJpc0FycmF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7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bEJmLEkiLCJmaWxlIjoiam9icy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQgSm9iSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL2pvYi1saXN0LWl0ZW0nXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0J1xyXG5pbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXHJcbmltcG9ydCB7IGxvZyB9IGZyb20gJy4uL3V0aWxzL2xvZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvYnMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJ1xyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgZml4VGFiOiBmYWxzZSxcclxuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICBoYXNOb3Q6IHRydWUsXHJcbiAgICAgICAgdGFiSW5kZXg6IDAsXHJcbiAgICAgICAgY2l0eUlkOiAnMCcsXHJcbiAgICAgICAgY2l0eU5hbWU6ICflhajlm70nLFxyXG4gICAgICAgIGJhbm5lckltZzogW10sXHJcbiAgICAgICAgdGFiTGlzdDogWyfmnIDmlrDogYzkvY0nLCAn5pyA54Ot6IGM5L2NJ10sXHJcbiAgICAgICAgbmV3Sm9iTGlzdDogW10sXHJcbiAgICAgICAgaG90Sm9iTGlzdDogW11cclxuICAgIH1cclxuXHJcbiAgICBwYWdlID0ge1xyXG4gICAgICAgIHNjcm9sbFRvcDogMjIwLFxyXG4gICAgICAgIGJ1c3k6IGZhbHNlLFxyXG4gICAgICAgIG5ld0luZGV4OiAxLFxyXG4gICAgICAgIGhvdEluZGV4OiAxXHJcbiAgICB9XHJcblxyXG4gICAgUmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICBnZXRKb2JMaXN0ICh0eXBlID0gMCwgcGFnZSA9IDEsIHNpemUgPSA1KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuUmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICBwYWdlOiBwYWdlLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogc2l6ZSxcclxuICAgICAgICAgICAgY2l0eUlkOiB0aGlzLmNpdHlJZFxyXG4gICAgICAgIH0sICcvSW52aXRlV29yay9nZXRSZWNvbW1lbmRMaXN0JylcclxuICAgIH1cclxuXHJcbiAgICRwcm9wcyA9IHtcIm5ldy1qb2ItaXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcImZvclwiOlwibmV3Sm9iTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwiLFwidmFsdWVcIjpcIjFcIn0sXCJ2LWJpbmQ6bGlzdEl0ZW0ub25jZVwiOntcImZvclwiOlwibmV3Sm9iTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwiLFwidmFsdWVcIjpcIjFcIn0sXCJ0eXBlXCI6e1wiZm9yXCI6XCJuZXdKb2JMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCIsXCJ2YWx1ZVwiOlwiMVwifX0sXCJob3Qtam9iLWl0ZW1cIjp7XCJ2LWJpbmQ6bGlzdEl0ZW0ub25jZVwiOntcImZvclwiOlwiaG90Sm9iTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwiLFwidmFsdWVcIjpcIjFcIn0sXCJ0eXBlXCI6e1wiZm9yXCI6XCJob3RKb2JMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCIsXCJ2YWx1ZVwiOlwiMVwifX0sXCJsb2FkaW5nXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzaG93LnN5bmNcIjpcImxvYWRpbmdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICduZXctam9iLWl0ZW0nOiBKb2JJdGVtLFxyXG4gICAgICAgICdob3Qtam9iLWl0ZW0nOiBKb2JJdGVtLFxyXG4gICAgICAgICdsb2FkaW5nJzogTG9hZGluZyxcclxuICAgICAgICAndG9hc3QnOiBUb2FzdFxyXG4gICAgfVxyXG5cclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICB0b2dnbGVUYWIgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFiSW5kZXggPSBpbmRleFxyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KGluZGV4KSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmV3Sm9iTGlzdC5sZW5ndGggPCA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvdEpvYkxpc3QubGVuZ3RoIDwgNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjcm9sbFRvVG9wICgpIHtcclxuICAgICAgICAgICAgaWYgKHdlcHkucGFnZVNjcm9sbFRvKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnBhZ2VTY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn5b2T5YmN5b6u5L+h54mI5pys6L+H5L2O77yM5peg5rOV5L2/55So5Zue5Yiw6aG26YOo5Yqf6IO977yM6K+35Y2H57qn5Yiw5pyA5paw5b6u5L+h54mI5pys5ZCO6YeN6K+VJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9TZWFyY2ggKCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnc2VhcmNoJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICAvLyB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICAgICAgd2VweS5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0uLi4nfSlcclxuICAgICAgICB3eC5jcmVhdGVTZWxlY3RvclF1ZXJ5KCkuc2VsZWN0KCcjZml4ZWQnKS5ib3VuZGluZ0NsaWVudFJlY3QocmVjdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5zY3JvbGxUb3AgPSByZWN0LnRvcCAtIDQ1XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KS5leGVjKClcclxuICAgICAgICB0aGlzLmNpdHlJZCA9IHRoaXMuJHBhcmVudC5nbG9iYWwuY2hvb3NlLnJlZ2lvbl9pZFxyXG4gICAgICAgIHRoaXMuY2l0eU5hbWUgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsLmNob29zZS5yZWdpb25fbmFtZVxyXG4gICAgICAgIGxldCBhbGwgPSBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgIHRoaXMuUmVxdWVzdC5HZXQoe3R5cGU6ICcxMDAnfSwgJy9CYW5uZXIvZ2V0TGlzdEJ5VHlwZScpLFxyXG4gICAgICAgICAgICB0aGlzLmdldEpvYkxpc3QoMCksXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Sm9iTGlzdCgxKVxyXG4gICAgICAgIF0pXHJcbiAgICAgICAgYWxsLnRoZW4oKFtiYW5uZXIsIG5ld0pvYiwgaG90Sm9iXSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJhbm5lckltZyA9IGJhbm5lci5kYXRhWzEwMF1cclxuICAgICAgICAgICAgdGhpcy5uZXdKb2JMaXN0ID0gbmV3Sm9iLmRhdGFcclxuICAgICAgICAgICAgdGhpcy5ob3RKb2JMaXN0ID0gaG90Sm9iLmRhdGFcclxuICAgICAgICAgICAgaWYgKG5ld0pvYi5kYXRhLmxlbmd0aCA8IDUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHRoaXMubG9hZGluZyA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgbG9nKGVycilcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uUGFnZVNjcm9sbCAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQuc2Nyb2xsVG9wID49IHRoaXMucGFnZS5zY3JvbGxUb3ApIHtcclxuICAgICAgICAgICAgdGhpcy5maXhUYWIgPSB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5maXhUYWIgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGl0bGU6ICflgaXouqvmsYLogYwnLFxyXG4gICAgICAgICAgICBwYXRoOiBgL3BhZ2VzL2pvYnNgLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKHJldClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZyhlcnIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICB3ZXB5Lm9uU29ja2V0TWVzc2FnZShyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCA9IE51bWJlci5wYXJzZUludCh0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCkgKyAxXHJcbiAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfmgqjmnInmlrDmtojmga8nfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uSGlkZSAoKSB7XHJcbiAgICAgICAgdGhpcy5oYXNOb3QgPSBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgICB3ZXB5LnNob3dMb2FkaW5nKHt0aXRsZTogJ+WKoOi9veS4rS4uLicsIG1hc2s6IHRydWV9KVxyXG4gICAgICAgIFByb21pc2UuYWxsKFt0aGlzLmdldEpvYkxpc3QoMCksIHRoaXMuZ2V0Sm9iTGlzdCgxKV0pXHJcbiAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgbGV0IFtuZXdKb2IsIGhvdEpvYl0gPSByZXRcclxuICAgICAgICAgICAgaWYgKG5ld0pvYi5kYXRhLmxlbmd0aCA8IDUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubmV3Sm9iTGlzdCA9IG5ld0pvYi5kYXRhXHJcbiAgICAgICAgICAgIHRoaXMuaG90Sm9iTGlzdCA9IGhvdEpvYi5kYXRhXHJcbiAgICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgbG9nKGVycilcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuYnVzeSkgeyByZXR1cm4gZmFsc2UgfVxyXG4gICAgICAgIGlmICh0aGlzLnRhYkluZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc05vdCkgeyByZXR1cm4gZmFsc2UgfVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuaG90SW5kZXgrK1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuYnVzeSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5nZXRKb2JMaXN0KDEsIHRoaXMucGFnZS5ob3RJbmRleCwgOClcclxuICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJldC5kYXRhKSAmJiByZXQuZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaG90Sm9iTGlzdCA9IFsuLi50aGlzLmhvdEpvYkxpc3QsIC4uLnJldC5kYXRhXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmJ1c3kgPSBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc05vdCkgeyByZXR1cm4gZmFsc2UgfVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UubmV3SW5kZXgrK1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuYnVzeSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5nZXRKb2JMaXN0KDAsIHRoaXMucGFnZS5uZXdJbmRleCwgOClcclxuICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJldC5kYXRhKSAmJiByZXQuZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubmV3Sm9iTGlzdCA9IFsuLi50aGlzLm5ld0pvYkxpc3QsIC4uLnJldC5kYXRhXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmJ1c3kgPSBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=