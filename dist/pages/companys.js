'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _sliderDelay = require('./../components/slider-delay.js');

var _sliderDelay2 = _interopRequireDefault(_sliderDelay);

var _compListItem = require('./../components/comp-list-item.js');

var _compListItem2 = _interopRequireDefault(_compListItem);

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Companys = function (_wepy$page) {
    _inherits(Companys, _wepy$page);

    function Companys() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Companys);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Companys.__proto__ || Object.getPrototypeOf(Companys)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '招聘公司'
        }, _this.data = {
            loading: false,
            companys: [],
            hasLogin: true,
            slideDown: false,
            fixed: false,
            companyType: 0,
            companyTypeName: '全国公司',
            hasNot: false
        }, _this.request = new _request2.default(), _this.page = {
            busy: false,
            index: 1,
            scrollTop: 0
        }, _this.swiper = {
            first: [],
            second: [],
            third: []
        }, _this.computed = {
            companyTypeName: function companyTypeName() {
                switch (this.companyType) {
                    case 0:
                        return '全部公司';
                    case 1:
                        return '俱乐部';
                    case 2:
                        return '工作室';
                    case 3:
                        return '瑜伽馆';
                    case 4:
                        return '培训学院';
                    case 5:
                        return '器械设备';
                    case 6:
                        return '媒体资讯';
                    case 7:
                        return '会展/活动/赛事';
                    case 8:
                        return '互联网';
                    case 9:
                        return '其他';
                    default:
                        return '';
                }
            }
        }, _this.watch = {
            companyType: function companyType(newVal, oldVal) {
                var _this2 = this;

                if (!this.fadeIn) {
                    return false;
                }
                this.hasNot = false;
                this.index = 1;
                this.getCompanyList().then(function (_ref2) {
                    var data = _ref2.data;

                    _this2.companys = data;
                    _wepy2.default.pageScrollTo({
                        scrollTop: 283
                    });
                    _this2.loading = false;
                });
            }
        }, _this.methods = {
            slideToBottom: function slideToBottom() {
                var _this3 = this;

                if (!this.fixed) {
                    _wepy2.default.pageScrollTo({
                        scrollTop: this.page.scrollTop
                    });
                    this.fixed = true;
                }
                setTimeout(function () {
                    _this3.slideDown = !_this3.slideDown;
                    _this3.$apply();
                });
            },
            slideToTop: function slideToTop(e) {
                if (e.target.dataset.type) {
                    this.companyType = Number.parseInt(e.target.dataset.type);
                }
                this.slideDown = !this.slideDown;
            },
            stop: function stop(e) {
                return false;
            },
            toAllRecomend: function toAllRecomend() {
                _wepy2.default.navigateTo({ url: './allRecomend' });
            }
        }, _this.$props = { "comp-item": { "xmlns:v-bind": { "for": "companys", "item": "item", "index": "index", "key": "key", "value": "item" }, "v-bind:listItem.once": { "for": "companys", "item": "item", "index": "index", "key": "key", "value": "item" } }, "loading": { "xmlns:v-bind": "", "v-bind:show.sync": "loading" }, "slider": { "xmlns:v-bind": "", "v-bind:login.sync": "hasLogin" } }, _this.$events = {}, _this.components = {
            'loading': _loading2.default,
            'slider': _sliderDelay2.default,
            'comp-item': _compListItem2.default
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Companys, [{
        key: 'getCompanyList',
        value: function getCompanyList() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

            return this.request.Get({
                'cityId': this.$parent.global.choose.region_id,
                'page': page,
                'pageSize': pageSize,
                'companyType': this.companyType
            }, '/User/getUserCompanyList');
        }
    }, {
        key: 'onShareAppMessage',
        value: function onShareAppMessage() {
            return {
                title: '健身求职',
                path: '/pages/companys',
                success: function success(ret) {
                    (0, _log.log)(ret);
                },
                fail: function fail(err) {
                    (0, _log.log)(err);
                }
            };
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this4 = this;

            Promise.all([this.request.Get({ 'type': 0, 'userId': _wepy2.default.getStorageSync('userId') || 0 }, '/Company/getRecommendList'), this.getCompanyList()]).then(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    data = _ref4[0].data,
                    list = _ref4[1].data;

                _this4.companys = list;
                _this4.swiper.first = [];
                _this4.swiper.second = [];
                _this4.swiper.third = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2),
                            index = _step$value[0],
                            item = _step$value[1];

                        if (index % 3 === 0) {
                            _this4.swiper.first.push(item);
                        } else if (index % 3 === 1) {
                            _this4.swiper.second.push(item);
                        } else if (index % 3 === 2) {
                            _this4.swiper.third.push(item);
                        } else {
                            continue;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                _this4.$invoke('slider', 'invokeData', { type: 1, arr: _this4.swiper.first });
                _this4.$invoke('slider', 'invokeData', { type: 2, arr: _this4.swiper.second });
                _this4.$invoke('slider', 'invokeData', { type: 3, arr: _this4.swiper.third });
                _this4.$apply();
                _wepy2.default.stopPullDownRefresh();
            });
        }
    }, {
        key: 'onPageScroll',
        value: function onPageScroll(e) {
            if (e.scrollTop >= this.page.scrollTop) {
                this.fixed = true;
            } else {
                this.fixed = false;
            }
        }
    }, {
        key: 'onHide',
        value: function onHide() {
            this.companyType = 0;
            this.slideDown = false;
            this.fixed = false;
            this.hasNot = false;
        }
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            var _this5 = this;

            if (this.page.busy) {
                return false;
            }
            if (this.hasNot) {
                return false;
            }
            this.page.index++;
            this.page.busy = true;
            this.getCompanyList(this.page.index).then(function (_ref5) {
                var data = _ref5.data;

                if (Array.isArray(data) && data.length === 0) {
                    _this5.hasNot = true;
                }
                _this5.companys = [].concat(_toConsumableArray(_this5.companys), _toConsumableArray(data));
                _this5.page.busy = false;
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var _this6 = this;

            this.loading = true;
            wx.createSelectorQuery().select('#fixed').boundingClientRect(function (rect) {
                _this6.page.scrollTop = rect.top;
            }).exec();
            Promise.all([this.request.Get({ 'type': 0, 'userId': _wepy2.default.getStorageSync('userId') || 0 }, '/Company/getRecommendList'), this.getCompanyList()]).then(function (_ref6) {
                var _ref7 = _slicedToArray(_ref6, 2),
                    data = _ref7[0].data,
                    list = _ref7[1].data;

                _this6.companys = list;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = data.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _step2$value = _slicedToArray(_step2.value, 2),
                            index = _step2$value[0],
                            item = _step2$value[1];

                        if (index % 3 === 0) {
                            _this6.swiper.first.push(item);
                        } else if (index % 3 === 1) {
                            _this6.swiper.second.push(item);
                        } else if (index % 3 === 2) {
                            _this6.swiper.third.push(item);
                        } else {
                            continue;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                _this6.$invoke('slider', 'invokeData', { type: 1, arr: _this6.swiper.first });
                _this6.$invoke('slider', 'invokeData', { type: 2, arr: _this6.swiper.second });
                _this6.$invoke('slider', 'invokeData', { type: 3, arr: _this6.swiper.third });
                _this6.loading = false;
                _this6.$apply();
            });
        }
    }]);

    return Companys;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Companys , 'pages/companys'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbnlzLmpzIl0sIm5hbWVzIjpbIkNvbXBhbnlzIiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibG9hZGluZyIsImNvbXBhbnlzIiwiaGFzTG9naW4iLCJzbGlkZURvd24iLCJmaXhlZCIsImNvbXBhbnlUeXBlIiwiY29tcGFueVR5cGVOYW1lIiwiaGFzTm90IiwicmVxdWVzdCIsInBhZ2UiLCJidXN5IiwiaW5kZXgiLCJzY3JvbGxUb3AiLCJzd2lwZXIiLCJmaXJzdCIsInNlY29uZCIsInRoaXJkIiwiY29tcHV0ZWQiLCJ3YXRjaCIsIm5ld1ZhbCIsIm9sZFZhbCIsImZhZGVJbiIsImdldENvbXBhbnlMaXN0IiwidGhlbiIsInBhZ2VTY3JvbGxUbyIsIm1ldGhvZHMiLCJzbGlkZVRvQm90dG9tIiwic2V0VGltZW91dCIsIiRhcHBseSIsInNsaWRlVG9Ub3AiLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsInR5cGUiLCJOdW1iZXIiLCJwYXJzZUludCIsInN0b3AiLCJ0b0FsbFJlY29tZW5kIiwibmF2aWdhdGVUbyIsInVybCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicGFnZVNpemUiLCJHZXQiLCIkcGFyZW50IiwiZ2xvYmFsIiwiY2hvb3NlIiwicmVnaW9uX2lkIiwidGl0bGUiLCJwYXRoIiwic3VjY2VzcyIsInJldCIsImZhaWwiLCJlcnIiLCJQcm9taXNlIiwiYWxsIiwiZ2V0U3RvcmFnZVN5bmMiLCJsaXN0IiwiZW50cmllcyIsIml0ZW0iLCJwdXNoIiwiJGludm9rZSIsImFyciIsInN0b3BQdWxsRG93blJlZnJlc2giLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJ3eCIsImNyZWF0ZVNlbGVjdG9yUXVlcnkiLCJzZWxlY3QiLCJib3VuZGluZ0NsaWVudFJlY3QiLCJyZWN0IiwidG9wIiwiZXhlYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7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QixtQ0FBS0UsTUFBTCxDQUFZQyxLQUFaLENBQWtCK0MsSUFBbEIsQ0FBdUJELElBQXZCO0FBQ0gseUJBRkQsTUFFTyxJQUFJakQsUUFBUSxDQUFSLEtBQWMsQ0FBbEIsRUFBcUI7QUFDeEIsbUNBQUtFLE1BQUwsQ0FBWUUsTUFBWixDQUFtQjhDLElBQW5CLENBQXdCRCxJQUF4QjtBQUNILHlCQUZNLE1BRUEsSUFBSWpELFFBQVEsQ0FBUixLQUFjLENBQWxCLEVBQXFCO0FBQ3hCLG1DQUFLRSxNQUFMLENBQVlHLEtBQVosQ0FBa0I2QyxJQUFsQixDQUF1QkQsSUFBdkI7QUFDSCx5QkFGTSxNQUVBO0FBQ0g7QUFDSDtBQUNKO0FBWitCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBYWhDLHVCQUFLRSxPQUFMLENBQWEsUUFBYixFQUF1QixZQUF2QixFQUFxQyxFQUFDN0IsTUFBTSxDQUFQLEVBQVU4QixLQUFLLE9BQUtsRCxNQUFMLENBQVlDLEtBQTNCLEVBQXJDO0FBQ0EsdUJBQUtnRCxPQUFMLENBQWEsUUFBYixFQUF1QixZQUF2QixFQUFxQyxFQUFDN0IsTUFBTSxDQUFQLEVBQVU4QixLQUFLLE9BQUtsRCxNQUFMLENBQVlFLE1BQTNCLEVBQXJDO0FBQ0EsdUJBQUsrQyxPQUFMLENBQWEsUUFBYixFQUF1QixZQUF2QixFQUFxQyxFQUFDN0IsTUFBTSxDQUFQLEVBQVU4QixLQUFLLE9BQUtsRCxNQUFMLENBQVlHLEtBQTNCLEVBQXJDO0FBQ0EsdUJBQUtoQixPQUFMLEdBQWUsS0FBZjtBQUNBLHVCQUFLNEIsTUFBTDtBQUNILGFBckJEO0FBc0JIOzs7O0VBNU5pQyxlQUFLbkIsSTs7a0JBQXRCZCxRIiwiZmlsZSI6ImNvbXBhbnlzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBsb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IFNsaWRlckRlbGF5IGZyb20gJy4uL2NvbXBvbmVudHMvc2xpZGVyLWRlbGF5J1xyXG5pbXBvcnQgQ29tcGFueUl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21wLWxpc3QtaXRlbSdcclxuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcGFueXMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oub6IGY5YWs5Y+4J1xyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgY29tcGFueXM6IFtdLFxyXG4gICAgICAgIGhhc0xvZ2luOiB0cnVlLFxyXG4gICAgICAgIHNsaWRlRG93bjogZmFsc2UsXHJcbiAgICAgICAgZml4ZWQ6IGZhbHNlLFxyXG4gICAgICAgIGNvbXBhbnlUeXBlOiAwLFxyXG4gICAgICAgIGNvbXBhbnlUeXBlTmFtZTogJ+WFqOWbveWFrOWPuCcsXHJcbiAgICAgICAgaGFzTm90OiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgZ2V0Q29tcGFueUxpc3QgKHBhZ2UgPSAxLCBwYWdlU2l6ZSA9IDgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICdjaXR5SWQnOiB0aGlzLiRwYXJlbnQuZ2xvYmFsLmNob29zZS5yZWdpb25faWQsXHJcbiAgICAgICAgICAgICdwYWdlJzogcGFnZSxcclxuICAgICAgICAgICAgJ3BhZ2VTaXplJzogcGFnZVNpemUsXHJcbiAgICAgICAgICAgICdjb21wYW55VHlwZSc6IHRoaXMuY29tcGFueVR5cGVcclxuICAgICAgICB9LCAnL1VzZXIvZ2V0VXNlckNvbXBhbnlMaXN0JylcclxuICAgIH1cclxuXHJcbiAgICBwYWdlID0ge1xyXG4gICAgICAgIGJ1c3k6IGZhbHNlLFxyXG4gICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgfVxyXG5cclxuICAgIHN3aXBlciA9IHtcclxuICAgICAgICBmaXJzdDogW10sXHJcbiAgICAgICAgc2Vjb25kOiBbXSxcclxuICAgICAgICB0aGlyZDogW11cclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgICBjb21wYW55VHlwZU5hbWUgKCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY29tcGFueVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICflhajpg6jlhazlj7gnXHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHJldHVybiAn5L+x5LmQ6YOoJ1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+W3peS9nOWupCdcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICfnkZzkvL3ppoYnXHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHJldHVybiAn5Z+56K6t5a2m6ZmiJ1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+WZqOaisOiuvuWkhydcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICflqpLkvZPotYTorq8nXHJcbiAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAn5Lya5bGVL+a0u+WKqC/otZvkuosnXHJcbiAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgIHJldHVybiAn5LqS6IGU572RJ1xyXG4gICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+WFtuS7lidcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdhdGNoID0ge1xyXG4gICAgICAgIGNvbXBhbnlUeXBlIChuZXdWYWwsIG9sZFZhbCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZmFkZUluKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmhhc05vdCA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSAxXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29tcGFueUxpc3QoKVxyXG4gICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBhbnlzID0gZGF0YVxyXG4gICAgICAgICAgICAgICAgd2VweS5wYWdlU2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMjgzXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBzbGlkZVRvQm90dG9tICgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmZpeGVkKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnBhZ2VTY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB0aGlzLnBhZ2Uuc2Nyb2xsVG9wXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5maXhlZCA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVEb3duID0gIXRoaXMuc2xpZGVEb3duXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzbGlkZVRvVG9wIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGFueVR5cGUgPSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC50eXBlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVEb3duID0gIXRoaXMuc2xpZGVEb3duXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9BbGxSZWNvbWVuZCAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7IHVybDogJy4vYWxsUmVjb21lbmQnIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgJHByb3BzID0ge1wiY29tcC1pdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1wiZm9yXCI6XCJjb21wYW55c1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwiLFwidmFsdWVcIjpcIml0ZW1cIn0sXCJ2LWJpbmQ6bGlzdEl0ZW0ub25jZVwiOntcImZvclwiOlwiY29tcGFueXNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIixcInZhbHVlXCI6XCJpdGVtXCJ9fSxcImxvYWRpbmdcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnNob3cuc3luY1wiOlwibG9hZGluZ1wifSxcInNsaWRlclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bG9naW4uc3luY1wiOlwiaGFzTG9naW5cIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICdsb2FkaW5nJzogbG9hZGluZyxcclxuICAgICAgICAnc2xpZGVyJzogU2xpZGVyRGVsYXksXHJcbiAgICAgICAgJ2NvbXAtaXRlbSc6IENvbXBhbnlJdGVtXHJcbiAgICB9XHJcblxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UgKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5YGl6Lqr5rGC6IGMJyxcclxuICAgICAgICAgICAgcGF0aDogYC9wYWdlcy9jb21wYW55c2AsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2cocmV0KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKGVycilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHsndHlwZSc6IDAsICd1c2VySWQnOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKSB8fCAwfSwgJy9Db21wYW55L2dldFJlY29tbWVuZExpc3QnKSxcclxuICAgICAgICAgICAgdGhpcy5nZXRDb21wYW55TGlzdCgpXHJcbiAgICAgICAgXSkudGhlbigoW3tkYXRhfSwge2RhdGE6IGxpc3R9XSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBhbnlzID0gbGlzdFxyXG4gICAgICAgICAgICB0aGlzLnN3aXBlci5maXJzdCA9IFtdXHJcbiAgICAgICAgICAgIHRoaXMuc3dpcGVyLnNlY29uZCA9IFtdXHJcbiAgICAgICAgICAgIHRoaXMuc3dpcGVyLnRoaXJkID0gW11cclxuICAgICAgICAgICAgZm9yIChsZXQgW2luZGV4LCBpdGVtXSBvZiBkYXRhLmVudHJpZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICUgMyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dpcGVyLmZpcnN0LnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggJSAzID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2lwZXIuc2Vjb25kLnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggJSAzID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2lwZXIudGhpcmQucHVzaChpdGVtKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJGludm9rZSgnc2xpZGVyJywgJ2ludm9rZURhdGEnLCB7dHlwZTogMSwgYXJyOiB0aGlzLnN3aXBlci5maXJzdH0pXHJcbiAgICAgICAgICAgIHRoaXMuJGludm9rZSgnc2xpZGVyJywgJ2ludm9rZURhdGEnLCB7dHlwZTogMiwgYXJyOiB0aGlzLnN3aXBlci5zZWNvbmR9KVxyXG4gICAgICAgICAgICB0aGlzLiRpbnZva2UoJ3NsaWRlcicsICdpbnZva2VEYXRhJywge3R5cGU6IDMsIGFycjogdGhpcy5zd2lwZXIudGhpcmR9KVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblBhZ2VTY3JvbGwgKGUpIHtcclxuICAgICAgICBpZiAoZS5zY3JvbGxUb3AgPj0gdGhpcy5wYWdlLnNjcm9sbFRvcCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpeGVkID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZml4ZWQgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkhpZGUgKCkge1xyXG4gICAgICAgIHRoaXMuY29tcGFueVR5cGUgPSAwXHJcbiAgICAgICAgdGhpcy5zbGlkZURvd24gPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuZml4ZWQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuaGFzTm90ID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlLmJ1c3kpIHsgcmV0dXJuIGZhbHNlIH1cclxuICAgICAgICBpZiAodGhpcy5oYXNOb3QpIHsgcmV0dXJuIGZhbHNlIH1cclxuICAgICAgICB0aGlzLnBhZ2UuaW5kZXgrK1xyXG4gICAgICAgIHRoaXMucGFnZS5idXN5ID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuZ2V0Q29tcGFueUxpc3QodGhpcy5wYWdlLmluZGV4KVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGFueXMgPSBbLi4udGhpcy5jb21wYW55cywgLi4uZGF0YV1cclxuICAgICAgICAgICAgdGhpcy5wYWdlLmJ1c3kgPSBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICAgICAgd3guY3JlYXRlU2VsZWN0b3JRdWVyeSgpLnNlbGVjdCgnI2ZpeGVkJykuYm91bmRpbmdDbGllbnRSZWN0KHJlY3QgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2Nyb2xsVG9wID0gcmVjdC50b3BcclxuICAgICAgICB9KS5leGVjKClcclxuICAgICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoeyd0eXBlJzogMCwgJ3VzZXJJZCc6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpIHx8IDB9LCAnL0NvbXBhbnkvZ2V0UmVjb21tZW5kTGlzdCcpLFxyXG4gICAgICAgICAgICB0aGlzLmdldENvbXBhbnlMaXN0KClcclxuICAgICAgICBdKS50aGVuKChbe2RhdGF9LCB7ZGF0YTogbGlzdH1dKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGFueXMgPSBsaXN0XHJcbiAgICAgICAgICAgIGZvciAobGV0IFtpbmRleCwgaXRlbV0gb2YgZGF0YS5lbnRyaWVzKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCAlIDMgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3aXBlci5maXJzdC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ICUgMyA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dpcGVyLnNlY29uZC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ICUgMyA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dpcGVyLnRoaXJkLnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRpbnZva2UoJ3NsaWRlcicsICdpbnZva2VEYXRhJywge3R5cGU6IDEsIGFycjogdGhpcy5zd2lwZXIuZmlyc3R9KVxyXG4gICAgICAgICAgICB0aGlzLiRpbnZva2UoJ3NsaWRlcicsICdpbnZva2VEYXRhJywge3R5cGU6IDIsIGFycjogdGhpcy5zd2lwZXIuc2Vjb25kfSlcclxuICAgICAgICAgICAgdGhpcy4kaW52b2tlKCdzbGlkZXInLCAnaW52b2tlRGF0YScsIHt0eXBlOiAzLCBhcnI6IHRoaXMuc3dpcGVyLnRoaXJkfSlcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19