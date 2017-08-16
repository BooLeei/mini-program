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

var _formatTime = require('./../utils/formatTime.js');

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
            loading: false,
            page: null,
            tagIndex: 0,
            nameIndex: -1
        }, _this.location = {
            lon: '',
            lat: ''
        }, _this.type = '1', _this.$props = { "loading": { "xmlns:v-bind": "", "v-bind:show.sync": "loading" } }, _this.$events = {}, _this.components = {
            'loading': _loading2.default
        }, _this.mapApi = new _qqmapWxJssdk2.default({
            key: _constants.QQMAPKEY
        }), _this.computed = {
            publishTime: function publishTime() {
                if (this.page) {
                    return (0, _formatTime.formatDay)(this.page.vaild_time_start, '.');
                } else {
                    return '';
                }
            },
            collect: function collect() {
                if (this.page && Number.parseInt(this.page.hasCollect) === 1) {
                    return true;
                } else {
                    return false;
                }
            }
        }, _this.methods = {
            collect: function collect() {
                // if (wepy.getStorageSync('userId')) {
                if (Number.parseInt(this.page.hasCollect) === 1) {
                    this.page.hasCollect = 0;
                } else {
                    this.page.hasCollect = 1;
                }
                // } else {
                //     wepy.showToast({title: '请先登录'})
                // }
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
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this2 = this;

            this.request.Get({
                'userId': _wepy2.default.getStorageSync('userId') || 0,
                'inviteWorkId': this.page.id
            }, '/InviteWork/getInfo').then(function (_ref2) {
                var data = _ref2.data;

                _this2.page = data;
                _this2.$apply();
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
            var _this3 = this;

            this.loading = true;
            this.type = params.type;
            this.request.Get({
                'userId': _wepy2.default.getStorageSync('userId') || 0,
                'inviteWorkId': params.id
            }, '/InviteWork/getInfo').then(function (_ref3) {
                var data = _ref3.data;

                _this3.page = data;
                _this3.mapApi.geocoder({
                    address: data.city_name + data.address,
                    success: function success(_ref4) {
                        var location = _ref4.result.location;

                        _this3.location.lon = location.lng;
                        _this3.location.lat = location.lat;
                    },
                    fail: function fail(err) {
                        (0, _log.log)(err);
                    }
                });
                _this3.loading = false;
                _this3.$apply();
            });
        }
    }, {
        key: 'onUnload',
        value: function onUnload() {
            this.tagIndex = 0;
            this.nameIndex = -1;
        }
    }]);

    return JobDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(JobDetail , 'pages/jobDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYkRldGFpbC5qcyJdLCJuYW1lcyI6WyJKb2JEZXRhaWwiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInJlcXVlc3QiLCJkYXRhIiwibG9hZGluZyIsInBhZ2UiLCJ0YWdJbmRleCIsIm5hbWVJbmRleCIsImxvY2F0aW9uIiwibG9uIiwibGF0IiwidHlwZSIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibWFwQXBpIiwia2V5IiwiY29tcHV0ZWQiLCJwdWJsaXNoVGltZSIsInZhaWxkX3RpbWVfc3RhcnQiLCJjb2xsZWN0IiwiTnVtYmVyIiwicGFyc2VJbnQiLCJoYXNDb2xsZWN0IiwibWV0aG9kcyIsInRvQ29tcGFueSIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwibmF2aWdhdGVUbyIsInVybCIsInVzZXJDb21wYW55IiwiaWQiLCJzaG93VGFnSW50cm8iLCJlIiwidGFyZ2V0IiwiZGF0YXNldCIsImluZGV4Iiwic2hvd05hbWVEZXRhaWwiLCJvcGVuTWFwIiwib3BlbkxvY2F0aW9uIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJuYW1lIiwic2hvcF9uYW1lIiwiYWRkcmVzcyIsImNpdHlfbmFtZSIsIkdldCIsImdldFN0b3JhZ2VTeW5jIiwidGhlbiIsIiRhcHBseSIsInN0b3BQdWxsRG93blJlZnJlc2giLCJ0aXRsZSIsIndvcmtfbmFtZSIsInBhdGgiLCJzdWNjZXNzIiwicmV0IiwiZmFpbCIsImVyciIsInBhcmFtcyIsImdlb2NvZGVyIiwicmVzdWx0IiwibG5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7OztnTUFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCO0FBRm5CLFMsUUFLVEMsTyxHQUFVLHVCLFFB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QUNBLHVCQUFLWSxNQUFMLENBQVk0QyxRQUFaLENBQXFCO0FBQ2pCZiw2QkFBU3pDLEtBQUswQyxTQUFMLEdBQWlCMUMsS0FBS3lDLE9BRGQ7QUFFakJVLDZCQUFTLHdCQUE0QjtBQUFBLDRCQUFoQjlDLFFBQWdCLFNBQTFCb0QsTUFBMEIsQ0FBaEJwRCxRQUFnQjs7QUFDakMsK0JBQUtBLFFBQUwsQ0FBY0MsR0FBZCxHQUFvQkQsU0FBU3FELEdBQTdCO0FBQ0EsK0JBQUtyRCxRQUFMLENBQWNFLEdBQWQsR0FBb0JGLFNBQVNFLEdBQTdCO0FBQ0gscUJBTGdCO0FBTWpCOEMsMEJBQU0sbUJBQU87QUFDVCxzQ0FBSUMsR0FBSjtBQUNIO0FBUmdCLGlCQUFyQjtBQVVBLHVCQUFLckQsT0FBTCxHQUFlLEtBQWY7QUFDQSx1QkFBSzZDLE1BQUw7QUFDSCxhQWxCRDtBQW1CSDs7O21DQUVXO0FBQ1IsaUJBQUszQyxRQUFMLEdBQWdCLENBQWhCO0FBQ0EsaUJBQUtDLFNBQUwsR0FBaUIsQ0FBQyxDQUFsQjtBQUNIOzs7O0VBckprQyxlQUFLRixJOztrQkFBdkJQLFMiLCJmaWxlIjoiam9iRGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IHsgZm9ybWF0RGF5IH0gZnJvbSAnLi4vdXRpbHMvZm9ybWF0VGltZSdcclxuaW1wb3J0IHsgUVFNQVBLRVkgfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnXHJcbmltcG9ydCBRUU1hcFdYIGZyb20gJy4uL3V0aWxzL3FxbWFwLXd4LWpzc2RrLm1pbidcclxuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9iRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iBjOS9jeS/oeaBrydcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgcGFnZTogbnVsbCxcclxuICAgICAgICB0YWdJbmRleDogMCxcclxuICAgICAgICBuYW1lSW5kZXg6IC0xXHJcbiAgICB9XHJcblxyXG4gICAgbG9jYXRpb24gPSB7XHJcbiAgICAgICAgbG9uOiAnJyxcclxuICAgICAgICBsYXQ6ICcnXHJcbiAgICB9XHJcblxyXG4gICAgdHlwZSA9ICcxJ1xyXG5cclxuICAgJHByb3BzID0ge1wibG9hZGluZ1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2hvdy5zeW5jXCI6XCJsb2FkaW5nXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAnbG9hZGluZyc6IExvYWRpbmdcclxuICAgIH1cclxuXHJcbiAgICBtYXBBcGkgPSBuZXcgUVFNYXBXWCh7XHJcbiAgICAgICAga2V5OiBRUU1BUEtFWVxyXG4gICAgfSlcclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgICBwdWJsaXNoVGltZSAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXREYXkodGhpcy5wYWdlLnZhaWxkX3RpbWVfc3RhcnQsICcuJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb2xsZWN0ICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZSAmJiBOdW1iZXIucGFyc2VJbnQodGhpcy5wYWdlLmhhc0NvbGxlY3QpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBjb2xsZWN0ICgpIHtcclxuICAgICAgICAgICAgLy8gaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpKSB7XHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodGhpcy5wYWdlLmhhc0NvbGxlY3QpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaGFzQ29sbGVjdCA9IDBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5oYXNDb2xsZWN0ID0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICB3ZXB5LnNob3dUb2FzdCh7dGl0bGU6ICfor7flhYjnmbvlvZUnfSlcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9Db21wYW55ICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJzMnKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7ZGVsdGE6IDJ9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJzInKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7ZGVsdGE6IDF9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6IGBjb21wYW55P2lkPSR7dGhpcy5wYWdlLnVzZXJDb21wYW55LmlkfWB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93VGFnSW50cm8gKGUpIHtcclxuICAgICAgICAgICAgbG9nKGUpXHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YWdJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFnSW5kZXggPSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdJbmRleCA9IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd05hbWVEZXRhaWwgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5hbWVJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZUluZGV4ID0gLTFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZUluZGV4ID0gTnVtYmVyLnBhcnNlSW50KGluZGV4KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcGVuTWFwICgpIHtcclxuICAgICAgICAgICAgd2VweS5vcGVuTG9jYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgbGF0aXR1ZGU6IHRoaXMubG9jYXRpb24ubGF0LFxyXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiB0aGlzLmxvY2F0aW9uLmxvbixcclxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucGFnZS5zaG9wX25hbWUsXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiB0aGlzLnBhZ2UuY2l0eV9uYW1lICsgdGhpcy5wYWdlLmFkZHJlc3NcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAndXNlcklkJzogd2VweS5nZXRTdG9yYWdlU3luYygndXNlcklkJykgfHwgMCxcclxuICAgICAgICAgICAgJ2ludml0ZVdvcmtJZCc6IHRoaXMucGFnZS5pZFxyXG4gICAgICAgIH0sICcvSW52aXRlV29yay9nZXRJbmZvJylcclxuICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IGRhdGFcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB3ZXB5LnN0b3BQdWxsRG93blJlZnJlc2goKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UgKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnBhZ2Uud29ya19uYW1lLFxyXG4gICAgICAgICAgICBwYXRoOiBgL3BhZ2VzL2pvYkRldGFpbD9pZD0ke3RoaXMucGFnZS5pZH0mdHlwZT0xYCxcclxuICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZyhyZXQpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2coZXJyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAocGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMudHlwZSA9IHBhcmFtcy50eXBlXHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICd1c2VySWQnOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKSB8fCAwLFxyXG4gICAgICAgICAgICAnaW52aXRlV29ya0lkJzogcGFyYW1zLmlkXHJcbiAgICAgICAgfSwgJy9JbnZpdGVXb3JrL2dldEluZm8nKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlID0gZGF0YVxyXG4gICAgICAgICAgICB0aGlzLm1hcEFwaS5nZW9jb2Rlcih7XHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBkYXRhLmNpdHlfbmFtZSArIGRhdGEuYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7cmVzdWx0OiB7IGxvY2F0aW9uIH19KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5sb24gPSBsb2NhdGlvbi5sbmdcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmxhdCA9IGxvY2F0aW9uLmxhdFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nKGVycilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25VbmxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMudGFnSW5kZXggPSAwXHJcbiAgICAgICAgdGhpcy5uYW1lSW5kZXggPSAtMVxyXG4gICAgfVxyXG59XHJcbiJdfQ==