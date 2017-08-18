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

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _formatTime = require('./../utils/formatTime.js');

var _storage = require('./../utils/storage.js');

var _constants = require('./../utils/constants.js');

var _qqmapWxJssdk = require('./../utils/qqmap-wx-jssdk.min.js');

var _qqmapWxJssdk2 = _interopRequireDefault(_qqmapWxJssdk);

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JobDetail = function (_wepy$page) {
    _inherits(JobDetail, _wepy$page);

    function JobDetail() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, JobDetail);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = JobDetail.__proto__ || Object.getPrototypeOf(JobDetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '职位信息'
        }, _this.request = new _request2.default(), _this.data = {
            hasLogin: false,
            loading: false,
            page: null,
            tagIndex: 0,
            nameIndex: -1
        }, _this.location = {
            lon: '',
            lat: ''
        }, _this.type = '1', _this.id = '', _this.userId = '', _this.$props = { "loading": { "xmlns:v-bind": "", "v-bind:show.sync": "loading" } }, _this.$events = {}, _this.components = {
            'loading': _loading2.default,
            'toast': _toast2.default
        }, _this.mapApi = new _qqmapWxJssdk2.default({
            key: _constants.QQMAPKEY
        }), _this.computed = {
            publishTime: function publishTime() {
                if (this.page) {
                    return (0, _formatTime.formatDay)(this.page.vaild_time_start, '.');
                } else {
                    return '';
                }
            }
        }, _this.methods = {
            collect: function collect() {
                var _this2 = this;

                if (!this.hasLogin) {
                    this.toast({ content: '请先登录' });
                    _wepy2.default.navigateTo({ url: 'login' });
                    return false;
                }
                if (Number.parseInt(this.page.hasCollect) === 1) {
                    this.page.hasCollect = 0;
                } else {
                    this.page.hasCollect = 1;
                }
                this.request.Post({
                    userId: this.userId,
                    inviteWorkId: this.id,
                    status: this.page.hasCollect
                }, '/InviteWork/collect').then(function (_ref2) {
                    var data = _ref2.data;

                    if (_this2.page.hasCollect === 1) {
                        _this2.toast({ content: '已收藏' });
                    } else {
                        _this2.toast({ content: '取消收藏' });
                    }
                });
            },
            toCompany: function toCompany() {
                if (this.type === '3') {
                    _wepy2.default.navigateBack({ delta: 2 });
                } else if (this.type === '2') {
                    _wepy2.default.navigateBack({ delta: 1 });
                } else {
                    _wepy2.default.navigateTo({ url: 'company?id=' + this.page.userCompany.id });
                }
            },
            showTagIntro: function showTagIntro(e) {
                (0, _log.log)(e);
                if (e.target.dataset.index) {
                    if (this.tagIndex === 0) {
                        this.tagIndex = Number.parseInt(e.target.dataset.index);
                    } else {
                        this.tagIndex = 0;
                    }
                }
            },
            showNameDetail: function showNameDetail(index) {
                if (this.nameIndex !== -1) {
                    this.nameIndex = -1;
                } else {
                    this.nameIndex = Number.parseInt(index);
                }
            },
            openMap: function openMap() {
                _wepy2.default.openLocation({
                    latitude: this.location.lat,
                    longitude: this.location.lon,
                    name: this.page.shop_name,
                    address: this.page.city_name + this.page.address
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(JobDetail, [{
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this3 = this;

            this.request.Get({
                'userId': _wepy2.default.getStorageSync('userId') || 0,
                'inviteWorkId': this.page.id
            }, '/InviteWork/getInfo').then(function (_ref3) {
                var data = _ref3.data;

                _this3.page = data;
                _this3.$apply();
                _wepy2.default.stopPullDownRefresh();
            });
        }
    }, {
        key: 'onShareAppMessage',
        value: function onShareAppMessage() {
            return {
                title: this.page.work_name,
                path: '/pages/jobDetail?id=' + this.page.id + '&type=1',
                success: function success(ret) {
                    (0, _log.log)(ret);
                },
                fail: function fail(err) {
                    (0, _log.log)(err);
                }
            };
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this4 = this;

            this.loading = true;
            this.type = params.type;
            this.id = params.id;
            (0, _storage.Get)('userId').then(function (ret) {
                _this4.hasLogin = true;
                _this4.userId = ret;
                _this4.$apply();
            }).catch(function (err) {
                _this4.hasLogin = false;
                _this4.$apply();
            });
            this.request.Get({
                'userId': _wepy2.default.getStorageSync('userId') || 0,
                'inviteWorkId': params.id
            }, '/InviteWork/getInfo').then(function (_ref4) {
                var data = _ref4.data;

                _this4.page = data;
                _this4.mapApi.geocoder({
                    address: data.city_name + data.address,
                    success: function success(_ref5) {
                        var location = _ref5.result.location;

                        _this4.location.lon = location.lng;
                        _this4.location.lat = location.lat;
                    },
                    fail: function fail(err) {
                        (0, _log.log)(err);
                    }
                });
                _this4.loading = false;
                _this4.$apply();
            });
        }
    }, {
        key: 'onUnload',
        value: function onUnload() {
            this.tagIndex = 0;
            this.nameIndex = -1;
            this.hasLogin = false;
        }
    }]);

    return JobDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(JobDetail , 'pages/jobDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYkRldGFpbC5qcyJdLCJuYW1lcyI6WyJKb2JEZXRhaWwiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInJlcXVlc3QiLCJkYXRhIiwiaGFzTG9naW4iLCJsb2FkaW5nIiwicGFnZSIsInRhZ0luZGV4IiwibmFtZUluZGV4IiwibG9jYXRpb24iLCJsb24iLCJsYXQiLCJ0eXBlIiwiaWQiLCJ1c2VySWQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm1hcEFwaSIsImtleSIsImNvbXB1dGVkIiwicHVibGlzaFRpbWUiLCJ2YWlsZF90aW1lX3N0YXJ0IiwibWV0aG9kcyIsImNvbGxlY3QiLCJ0b2FzdCIsImNvbnRlbnQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJoYXNDb2xsZWN0IiwiUG9zdCIsImludml0ZVdvcmtJZCIsInN0YXR1cyIsInRoZW4iLCJ0b0NvbXBhbnkiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsInVzZXJDb21wYW55Iiwic2hvd1RhZ0ludHJvIiwiZSIsInRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsInNob3dOYW1lRGV0YWlsIiwib3Blbk1hcCIsIm9wZW5Mb2NhdGlvbiIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwibmFtZSIsInNob3BfbmFtZSIsImFkZHJlc3MiLCJjaXR5X25hbWUiLCIkaW52b2tlIiwiR2V0IiwiZ2V0U3RvcmFnZVN5bmMiLCIkYXBwbHkiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwidGl0bGUiLCJ3b3JrX25hbWUiLCJwYXRoIiwic3VjY2VzcyIsInJldCIsImZhaWwiLCJlcnIiLCJwYXJhbXMiLCJjYXRjaCIsImdlb2NvZGVyIiwicmVzdWx0IiwibG5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7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RCxLQUFLaUQsT0FEZDtBQUVqQlUsNkJBQVMsd0JBQTRCO0FBQUEsNEJBQWhCckQsUUFBZ0IsU0FBMUI0RCxNQUEwQixDQUFoQjVELFFBQWdCOztBQUNqQywrQkFBS0EsUUFBTCxDQUFjQyxHQUFkLEdBQW9CRCxTQUFTNkQsR0FBN0I7QUFDQSwrQkFBSzdELFFBQUwsQ0FBY0UsR0FBZCxHQUFvQkYsU0FBU0UsR0FBN0I7QUFDSCxxQkFMZ0I7QUFNakJxRCwwQkFBTSxtQkFBTztBQUNULHNDQUFJQyxHQUFKO0FBQ0g7QUFSZ0IsaUJBQXJCO0FBVUEsdUJBQUs1RCxPQUFMLEdBQWUsS0FBZjtBQUNBLHVCQUFLb0QsTUFBTDtBQUNILGFBbEJEO0FBbUJIOzs7bUNBRVc7QUFDUixpQkFBS2xELFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxpQkFBS0MsU0FBTCxHQUFpQixDQUFDLENBQWxCO0FBQ0EsaUJBQUtKLFFBQUwsR0FBZ0IsS0FBaEI7QUFDSDs7OztFQTVLa0MsZUFBS0UsSTs7a0JBQXZCUixTIiwiZmlsZSI6ImpvYkRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0J1xyXG5pbXBvcnQgeyBmb3JtYXREYXkgfSBmcm9tICcuLi91dGlscy9mb3JtYXRUaW1lJ1xyXG5pbXBvcnQge0dldH0gZnJvbSAnLi4vdXRpbHMvc3RvcmFnZSdcclxuaW1wb3J0IHsgUVFNQVBLRVkgfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnXHJcbmltcG9ydCBRUU1hcFdYIGZyb20gJy4uL3V0aWxzL3FxbWFwLXd4LWpzc2RrLm1pbidcclxuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9iRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iBjOS9jeS/oeaBrydcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaGFzTG9naW46IGZhbHNlLFxyXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgIHBhZ2U6IG51bGwsXHJcbiAgICAgICAgdGFnSW5kZXg6IDAsXHJcbiAgICAgICAgbmFtZUluZGV4OiAtMVxyXG4gICAgfVxyXG5cclxuICAgIGxvY2F0aW9uID0ge1xyXG4gICAgICAgIGxvbjogJycsXHJcbiAgICAgICAgbGF0OiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHR5cGUgPSAnMSdcclxuICAgIGlkID0gJydcclxuICAgIHVzZXJJZCA9ICcnXHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgJHByb3BzID0ge1wibG9hZGluZ1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2hvdy5zeW5jXCI6XCJsb2FkaW5nXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAnbG9hZGluZyc6IExvYWRpbmcsXHJcbiAgICAgICAgJ3RvYXN0JzogVG9hc3RcclxuICAgIH1cclxuXHJcbiAgICBtYXBBcGkgPSBuZXcgUVFNYXBXWCh7XHJcbiAgICAgICAga2V5OiBRUU1BUEtFWVxyXG4gICAgfSlcclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgICBwdWJsaXNoVGltZSAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXREYXkodGhpcy5wYWdlLnZhaWxkX3RpbWVfc3RhcnQsICcuJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgY29sbGVjdCAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNMb2dpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+WFiOeZu+W9lSd9KVxyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdsb2dpbid9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0aGlzLnBhZ2UuaGFzQ29sbGVjdCkgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5oYXNDb2xsZWN0ID0gMFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmhhc0NvbGxlY3QgPSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LlBvc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgIGludml0ZVdvcmtJZDogdGhpcy5pZCxcclxuICAgICAgICAgICAgICAgIHN0YXR1czogdGhpcy5wYWdlLmhhc0NvbGxlY3RcclxuICAgICAgICAgICAgfSwgJy9JbnZpdGVXb3JrL2NvbGxlY3QnKVxyXG4gICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlLmhhc0NvbGxlY3QgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5bey5pS26JePJ30pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICflj5bmtojmlLbol48nfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvQ29tcGFueSAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICczJykge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe2RlbHRhOiAyfSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICcyJykge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe2RlbHRhOiAxfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiBgY29tcGFueT9pZD0ke3RoaXMucGFnZS51c2VyQ29tcGFueS5pZH1gfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd1RhZ0ludHJvIChlKSB7XHJcbiAgICAgICAgICAgIGxvZyhlKVxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFnSW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ0luZGV4ID0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFnSW5kZXggPSAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNob3dOYW1lRGV0YWlsIChpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5uYW1lSW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWVJbmRleCA9IC0xXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWVJbmRleCA9IE51bWJlci5wYXJzZUludChpbmRleClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3Blbk1hcCAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkub3BlbkxvY2F0aW9uKHtcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLmxvY2F0aW9uLmxhdCxcclxuICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogdGhpcy5sb2NhdGlvbi5sb24sXHJcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnBhZ2Uuc2hvcF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogdGhpcy5wYWdlLmNpdHlfbmFtZSArIHRoaXMucGFnZS5hZGRyZXNzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgJ3VzZXJJZCc6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpIHx8IDAsXHJcbiAgICAgICAgICAgICdpbnZpdGVXb3JrSWQnOiB0aGlzLnBhZ2UuaWRcclxuICAgICAgICB9LCAnL0ludml0ZVdvcmsvZ2V0SW5mbycpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5wYWdlLndvcmtfbmFtZSxcclxuICAgICAgICAgICAgcGF0aDogYC9wYWdlcy9qb2JEZXRhaWw/aWQ9JHt0aGlzLnBhZ2UuaWR9JnR5cGU9MWAsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2cocmV0KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKGVycilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHBhcmFtcykge1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWVcclxuICAgICAgICB0aGlzLnR5cGUgPSBwYXJhbXMudHlwZVxyXG4gICAgICAgIHRoaXMuaWQgPSBwYXJhbXMuaWRcclxuICAgICAgICBHZXQoJ3VzZXJJZCcpLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oYXNMb2dpbiA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy51c2VySWQgPSByZXRcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzTG9naW4gPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgJ3VzZXJJZCc6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpIHx8IDAsXHJcbiAgICAgICAgICAgICdpbnZpdGVXb3JrSWQnOiBwYXJhbXMuaWRcclxuICAgICAgICB9LCAnL0ludml0ZVdvcmsvZ2V0SW5mbycpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMubWFwQXBpLmdlb2NvZGVyKHtcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IGRhdGEuY2l0eV9uYW1lICsgZGF0YS5hZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHtyZXN1bHQ6IHsgbG9jYXRpb24gfX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmxvbiA9IGxvY2F0aW9uLmxuZ1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24ubGF0ID0gbG9jYXRpb24ubGF0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsb2coZXJyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblVubG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy50YWdJbmRleCA9IDBcclxuICAgICAgICB0aGlzLm5hbWVJbmRleCA9IC0xXHJcbiAgICAgICAgdGhpcy5oYXNMb2dpbiA9IGZhbHNlXHJcbiAgICB9XHJcbn1cclxuIl19