'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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
            fadeIn: false,
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
                _this2.fadeIn = true;
                _this2.$apply();
            }).catch(function (err) {
                (0, _log.log)(err);
            });
            this.$preload('mmp', 1);
            setTimeout(function () {
                _this2.$preload('hotCity', _this2.Request.Get({ provinceId: -1 }, '/Region/getCityList'));
            }, 4000);
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
        key: 'onShow',
        value: function onShow() {
            this.$preload('mmp', 1);
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

exports.default = Jobs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXRKb2JzLmpzIl0sIm5hbWVzIjpbIkpvYnMiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwiZGF0YSIsImxvYWRpbmciLCJmYWRlSW4iLCJmaXhUYWIiLCJhdXRvcGxheSIsImhhc05vdCIsInRhYkluZGV4IiwiY2l0eUlkIiwiY2l0eU5hbWUiLCJiYW5uZXJJbWciLCJ0YWJMaXN0IiwibmV3Sm9iTGlzdCIsImhvdEpvYkxpc3QiLCJwYWdlIiwic2Nyb2xsVG9wIiwiYnVzeSIsIm5ld0luZGV4IiwiaG90SW5kZXgiLCJSZXF1ZXN0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwidG9nZ2xlVGFiIiwiaW5kZXgiLCJzY3JvbGxUb1RvcCIsInBhZ2VTY3JvbGxUbyIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInRvU2VhcmNoIiwibmF2aWdhdGVUbyIsInVybCIsImV2ZW50cyIsInR5cGUiLCJzaXplIiwiR2V0IiwicGFnZVNpemUiLCIkcGFyZW50IiwiZ2xvYmFsIiwiY2hvb3NlIiwicmVnaW9uX2lkIiwicmVnaW9uX25hbWUiLCJhbGwiLCJQcm9taXNlIiwiZ2V0Sm9iTGlzdCIsInRoZW4iLCJiYW5uZXIiLCJuZXdKb2IiLCJob3RKb2IiLCIkYXBwbHkiLCJjYXRjaCIsImVyciIsIiRwcmVsb2FkIiwic2V0VGltZW91dCIsInByb3ZpbmNlSWQiLCJldmVudCIsInJldCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztzTEFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUI7QUFEaEIsUyxRQUlUQyxJLEdBQU87QUFDSEMscUJBQVMsS0FETjtBQUVIQyxvQkFBUSxLQUZMO0FBR0hDLG9CQUFRLEtB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LFVBQUwsZ0NBQXNCLE9BQUtBLFVBQTNCLHNCQUEwQzZDLElBQUl6RCxJQUE5QztBQUNBLDJCQUFLYSxJQUFMLENBQVVFLElBQVYsR0FBaUIsS0FBakI7QUFDSCxpQkFQRDtBQVFILGFBWkQsTUFZTztBQUNILG9CQUFJLEtBQUtWLE1BQVQsRUFBaUI7QUFBRSwyQkFBTyxLQUFQO0FBQWM7QUFDakMscUJBQUtRLElBQUwsQ0FBVUcsUUFBVjtBQUNBLHFCQUFLSCxJQUFMLENBQVVFLElBQVYsR0FBaUIsSUFBakI7QUFDQSxxQkFBSzhCLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIsS0FBS2hDLElBQUwsQ0FBVUcsUUFBN0IsRUFBdUMsQ0FBdkMsRUFDQzhCLElBREQsQ0FDTSxlQUFPO0FBQ1Qsd0JBQUlhLE1BQU1DLE9BQU4sQ0FBY0gsSUFBSXpELElBQWxCLEtBQTJCeUQsSUFBSXpELElBQUosQ0FBUzZELE1BQVQsS0FBb0IsQ0FBbkQsRUFBc0Q7QUFDbEQsK0JBQUt4RCxNQUFMLEdBQWMsSUFBZDtBQUNIO0FBQ0QsMkJBQUtNLFVBQUwsZ0NBQXNCLE9BQUtBLFVBQTNCLHNCQUEwQzhDLElBQUl6RCxJQUE5QztBQUNBLDJCQUFLYSxJQUFMLENBQVVFLElBQVYsR0FBaUIsS0FBakI7QUFDSCxpQkFQRDtBQVFIO0FBQ0o7Ozs7RUE1SjZCLGVBQUtGLEk7O2tCQUFsQmhCLEkiLCJmaWxlIjoiaW5pdEpvYnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IEpvYkl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9qb2ItbGlzdC1pdGVtJ1xyXG5pbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXHJcbmltcG9ydCB7IGxvZyB9IGZyb20gJy4uL3V0aWxzL2xvZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvYnMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJ1xyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgZmFkZUluOiBmYWxzZSxcclxuICAgICAgICBmaXhUYWI6IGZhbHNlLFxyXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgIGhhc05vdDogZmFsc2UsXHJcbiAgICAgICAgdGFiSW5kZXg6IDAsXHJcbiAgICAgICAgY2l0eUlkOiAnMCcsXHJcbiAgICAgICAgY2l0eU5hbWU6ICflhajlm70nLFxyXG4gICAgICAgIGJhbm5lckltZzogW10sXHJcbiAgICAgICAgdGFiTGlzdDogWyfmnIDmlrDogYzkvY0nLCAn5pyA54Ot6IGM5L2NJ10sXHJcbiAgICAgICAgbmV3Sm9iTGlzdDogW10sXHJcbiAgICAgICAgaG90Sm9iTGlzdDogW11cclxuICAgIH1cclxuXHJcbiAgICBwYWdlID0ge1xyXG4gICAgICAgIHNjcm9sbFRvcDogMjIwLFxyXG4gICAgICAgIGJ1c3k6IGZhbHNlLFxyXG4gICAgICAgIG5ld0luZGV4OiAxLFxyXG4gICAgICAgIGhvdEluZGV4OiAxXHJcbiAgICB9XHJcblxyXG4gICAgUmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICBnZXRKb2JMaXN0ICh0eXBlID0gMCwgcGFnZSA9IDEsIHNpemUgPSA1KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuUmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICBwYWdlOiBwYWdlLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogc2l6ZSxcclxuICAgICAgICAgICAgY2l0eUlkOiB0aGlzLmNpdHlJZFxyXG4gICAgICAgIH0sICcvSW52aXRlV29yay9nZXRSZWNvbW1lbmRMaXN0JylcclxuICAgIH1cclxuXHJcbiAgICRwcm9wcyA9IHtcIm5ldy1qb2ItaXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcImZvclwiOlwibmV3Sm9iTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwiLFwidmFsdWVcIjpcIjFcIn0sXCJ2LWJpbmQ6bGlzdEl0ZW0ub25jZVwiOntcImZvclwiOlwibmV3Sm9iTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwiLFwidmFsdWVcIjpcIjFcIn0sXCJ0eXBlXCI6e1wiZm9yXCI6XCJuZXdKb2JMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCIsXCJ2YWx1ZVwiOlwiMVwifX0sXCJob3Qtam9iLWl0ZW1cIjp7XCJ2LWJpbmQ6bGlzdEl0ZW0ub25jZVwiOntcImZvclwiOlwiaG90Sm9iTGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwiLFwidmFsdWVcIjpcIjFcIn0sXCJ0eXBlXCI6e1wiZm9yXCI6XCJob3RKb2JMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCIsXCJ2YWx1ZVwiOlwiMVwifX0sXCJsb2FkaW5nXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzaG93LnN5bmNcIjpcImxvYWRpbmdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICduZXctam9iLWl0ZW0nOiBKb2JJdGVtLFxyXG4gICAgICAgICdob3Qtam9iLWl0ZW0nOiBKb2JJdGVtLFxyXG4gICAgICAgICdsb2FkaW5nJzogTG9hZGluZ1xyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgdG9nZ2xlVGFiIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhYkluZGV4ID0gaW5kZXhcclxuICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2Nyb2xsVG9Ub3AgKCkge1xyXG4gICAgICAgICAgICBpZiAod2VweS5wYWdlU2Nyb2xsVG8pIHtcclxuICAgICAgICAgICAgICAgIHdlcHkucGFnZVNjcm9sbFRvKHtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICflvZPliY3lvq7kv6HniYjmnKzov4fkvY7vvIzml6Dms5Xkvb/nlKjlm57liLDpobbpg6jlip/og73vvIzor7fljYfnuqfliLDmnIDmlrDlvq7kv6HniYjmnKzlkI7ph43or5UnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b1NlYXJjaCAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdzZWFyY2gnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWVcclxuICAgICAgICB0aGlzLmNpdHlJZCA9IHRoaXMuJHBhcmVudC5nbG9iYWwuY2hvb3NlLnJlZ2lvbl9pZFxyXG4gICAgICAgIHRoaXMuY2l0eU5hbWUgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsLmNob29zZS5yZWdpb25fbmFtZVxyXG4gICAgICAgIGxldCBhbGwgPSBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgIHRoaXMuUmVxdWVzdC5HZXQoe3R5cGU6ICcxMDAnfSwgJy9CYW5uZXIvZ2V0TGlzdEJ5VHlwZScpLFxyXG4gICAgICAgICAgICB0aGlzLmdldEpvYkxpc3QoMCksXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Sm9iTGlzdCgxKVxyXG4gICAgICAgIF0pXHJcbiAgICAgICAgYWxsLnRoZW4oKFtiYW5uZXIsIG5ld0pvYiwgaG90Sm9iXSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJhbm5lckltZyA9IGJhbm5lci5kYXRhWzEwMF1cclxuICAgICAgICAgICAgdGhpcy5uZXdKb2JMaXN0ID0gbmV3Sm9iLmRhdGFcclxuICAgICAgICAgICAgdGhpcy5ob3RKb2JMaXN0ID0gaG90Sm9iLmRhdGFcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5mYWRlSW4gPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICBsb2coZXJyKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy4kcHJlbG9hZCgnbW1wJywgMSlcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kcHJlbG9hZCgnaG90Q2l0eScsIHRoaXMuUmVxdWVzdC5HZXQoe3Byb3ZpbmNlSWQ6IC0xfSwgJy9SZWdpb24vZ2V0Q2l0eUxpc3QnKSlcclxuICAgICAgICB9LCA0MDAwKVxyXG4gICAgfVxyXG5cclxuICAgIG9uUGFnZVNjcm9sbCAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQuc2Nyb2xsVG9wID49IHRoaXMucGFnZS5zY3JvbGxUb3ApIHtcclxuICAgICAgICAgICAgdGhpcy5maXhUYWIgPSB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5maXhUYWIgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICAgIHRoaXMuJHByZWxvYWQoJ21tcCcsIDEpXHJcbiAgICB9XHJcblxyXG4gICAgb25IaWRlICgpIHtcclxuICAgICAgICB0aGlzLmhhc05vdCA9IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAgIFByb21pc2UuYWxsKFt0aGlzLmdldEpvYkxpc3QoMCksIHRoaXMuZ2V0Sm9iTGlzdCgxKV0pXHJcbiAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgbGV0IFtuZXdKb2IsIGhvdEpvYl0gPSByZXRcclxuICAgICAgICAgICAgdGhpcy5uZXdKb2JMaXN0ID0gbmV3Sm9iLmRhdGFcclxuICAgICAgICAgICAgdGhpcy5ob3RKb2JMaXN0ID0gaG90Sm9iLmRhdGFcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGxvZyhlcnIpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlLmJ1c3kpIHsgcmV0dXJuIGZhbHNlIH1cclxuICAgICAgICBpZiAodGhpcy50YWJJbmRleCA9PT0gMSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNOb3QpIHsgcmV0dXJuIGZhbHNlIH1cclxuICAgICAgICAgICAgdGhpcy5wYWdlLmhvdEluZGV4KytcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmJ1c3kgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Sm9iTGlzdCgxLCB0aGlzLnBhZ2UuaG90SW5kZXgsIDgpXHJcbiAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXQuZGF0YSkgJiYgcmV0LmRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvdEpvYkxpc3QgPSBbLi4udGhpcy5ob3RKb2JMaXN0LCAuLi5yZXQuZGF0YV1cclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5idXN5ID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNOb3QpIHsgcmV0dXJuIGZhbHNlIH1cclxuICAgICAgICAgICAgdGhpcy5wYWdlLm5ld0luZGV4KytcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmJ1c3kgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Sm9iTGlzdCgwLCB0aGlzLnBhZ2UubmV3SW5kZXgsIDgpXHJcbiAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXQuZGF0YSkgJiYgcmV0LmRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0pvYkxpc3QgPSBbLi4udGhpcy5uZXdKb2JMaXN0LCAuLi5yZXQuZGF0YV1cclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5idXN5ID0gZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19