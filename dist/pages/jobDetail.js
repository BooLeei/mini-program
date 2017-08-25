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

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _jobListItem = require('./../components/job-list-item.js');

var _jobListItem2 = _interopRequireDefault(_jobListItem);

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
            nameIndex: -1,
            commentSlide: 1,
            similarJob: []
        }, _this.location = {
            lon: '',
            lat: ''
        }, _this.type = '1', _this.id = '', _this.userId = '', _this.$props = { "job-item": { "v-bind:listItem.once": { "for": "similarJob", "item": "item", "index": "index", "key": "index", "value": "9" }, "type": { "for": "similarJob", "item": "item", "index": "index", "key": "index", "value": "9" } }, "loading": { "xmlns:v-bind": "", "v-bind:show.sync": "loading" } }, _this.$events = {}, _this.components = {
            'loading': _loading2.default,
            'toast': _toast2.default,
            'job-item': _jobListItem2.default
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
            toChat: function toChat() {
                var _this3 = this;

                if (this.hasLogin) {
                    (0, _storage.Get)('finishType').then(function (type) {
                        if (Number.parseInt(type) === 0) {
                            var temp = {
                                _id: Number.parseInt(_this3.page.userCompany.id) < Number.parseInt(_this3.userId) ? _this3.page.userCompany.id + '' + _this3.userId : _this3.userId + '' + _this3.page.userCompany.id,
                                chatUserId: _this3.page.userCompany.id,
                                chatUserName: _this3.page.userCompany.nickname,
                                chatUserHeaderImage: _this3.page.userCompany.headerImage
                            };
                            _wepy2.default.navigateTo({
                                url: 'chat?type=2&userId=' + _this3.userId + '&msg=' + JSON.stringify(temp)
                            });
                        } else {
                            _this3.toast({ content: '请先完善简历' });
                        }
                    });
                } else {
                    _wepy2.default.navigateTo({ url: 'login' });
                }
            },
            sendResume: function sendResume() {
                var _this4 = this;

                if (this.hasLogin) {
                    (0, _storage.Get)('finishType').then(function (type) {
                        if (Number.parseInt(type) === 0) {
                            _this4.request.Post({
                                userCompanyId: _this4.page.userCompany.id,
                                inviteWorkId: _this4.page.id,
                                userId: _this4.userId,
                                checkPerisher: 1
                            }, '/Resume/send').then(function (res) {
                                _wepy2.default.showModal({
                                    title: '提示',
                                    content: '确定向此职位投递你的简历？',
                                    confirmColor: '#40c4ff',
                                    success: function success(res) {
                                        if (res.confirm) {
                                            _this4.request.Post({
                                                userCompanyId: _this4.page.userCompany.id,
                                                inviteWorkId: _this4.page.id,
                                                userId: _this4.userId
                                            }, '/Resume/send').then(function () {
                                                _this4.toast({ content: '已投递' });
                                            });
                                        }
                                    }
                                });
                            }).catch(function (_ref3) {
                                var res = _ref3.data;

                                if (res.err == -3) {
                                    _this4.toast({ content: '已被对方拉黑' });
                                } else if (res.err == -4) {
                                    _this4.toast({ content: '对方已被你拉黑，请先从黑名单中移出' });
                                } else if (res.err == -5) {
                                    _this4.toast({ content: '已投递过，30天后再来投递' });
                                }
                            });
                        } else {
                            _this4.toast({ content: '请先完善简历' });
                        }
                    });
                } else {
                    _wepy2.default.navigateTo({ url: 'login' });
                }
            },
            showTagIntro: function showTagIntro(e) {
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
            commentLike: function commentLike(index, id) {
                var _this5 = this;

                if (this.hasLogin) {
                    this.request.Post({
                        userId: this.userId,
                        inviteWorkFeedbackId: id,
                        status: this.page.inviteWorkFeedback[index].hasLike == 1 ? '0' : '1'
                    }, '/InviteWorkFeedback/like').then(function () {
                        if (_this5.page.inviteWorkFeedback[index].hasLike == 1) {
                            _this5.page.inviteWorkFeedback[index].hasLike = 0;
                            _this5.commentSlide = _this5.commentSlide - 1;
                        } else {
                            _this5.page.inviteWorkFeedback[index].hasLike = 1;
                            _this5.commentSlide = _this5.commentSlide + 1;
                        }
                        _this5.$apply();
                    });
                } else {
                    _wepy2.default.navigateTo({ url: 'login' });
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
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this6 = this;

            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            Promise.all([this.request.Get({
                workId: params.id
            }, '/InviteWork/getLikenessList'), this.request.Get({
                'userId': _wepy2.default.getStorageSync('userId') || 0,
                'inviteWorkId': params.id
            }, '/InviteWork/getInfo')]).then(function (_ref4) {
                var _ref5 = _slicedToArray(_ref4, 2),
                    list = _ref5[0].data,
                    data = _ref5[1].data;

                if (data.inviteWorkFeedback.length != 0) {
                    data.inviteWorkFeedback.forEach(function (item) {
                        item.tagArr = item.tag_str.split(',');
                        item.interviewer_num = Number.parseInt(item.interviewer_num);
                        item.env_num = Number.parseInt(item.env_num);
                        item.conform_num = Number.parseInt(item.conform_num);
                        item.salary_num = Number.parseInt(item.salary_num);
                        item.like_num = Number.parseInt(item.like_num);
                        item.create_time = (0, _formatTime.formatTime)(Number.parseInt(item.create_time) * 1000, 2);
                    });
                }
                _this6.page = data;
                _this6.similarJob = list;
                _this6.mapApi.geocoder({
                    address: data.city_name + data.address,
                    success: function success(_ref6) {
                        var location = _ref6.result.location;

                        _this6.location.lon = location.lng;
                        _this6.location.lat = location.lat;
                    },
                    fail: function fail(err) {}
                });
                _wepy2.default.hideLoading();
                _this6.$apply();
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
        key: 'onShow',
        value: function onShow() {
            var _this7 = this;

            _wepy2.default.onSocketMessage(function (res) {
                _this7.$parent.global.curVal = Number.parseInt(_this7.$parent.global.curVal) + 1;
                _this7.toast({ content: '您有新消息' });
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this8 = this;

            // this.loading = true
            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            this.type = params.type;
            this.id = params.id;
            (0, _storage.Get)('userId').then(function (ret) {
                _this8.hasLogin = true;
                _this8.userId = ret;
                _this8.$apply();
            }).catch(function (err) {
                _this8.hasLogin = false;
                _this8.userId = '';
                _this8.$apply();
            });
            Promise.all([this.request.Get({
                workId: params.id
            }, '/InviteWork/getLikenessList'), this.request.Get({
                'userId': _wepy2.default.getStorageSync('userId') || 0,
                'inviteWorkId': params.id
            }, '/InviteWork/getInfo')]).then(function (_ref7) {
                var _ref8 = _slicedToArray(_ref7, 2),
                    list = _ref8[0].data,
                    data = _ref8[1].data;

                if (data.inviteWorkFeedback.length != 0) {
                    data.inviteWorkFeedback.forEach(function (item) {
                        item.tagArr = item.tag_str.split(',');
                        item.interviewer_num = Number.parseInt(item.interviewer_num);
                        item.env_num = Number.parseInt(item.env_num);
                        item.conform_num = Number.parseInt(item.conform_num);
                        item.salary_num = Number.parseInt(item.salary_num);
                        item.like_num = Number.parseInt(item.like_num);
                        item.create_time = (0, _formatTime.formatTime)(Number.parseInt(item.create_time) * 1000, 2);
                    });
                }
                _this8.page = data;
                _this8.similarJob = list;
                _this8.mapApi.geocoder({
                    address: data.city_name + data.address,
                    success: function success(_ref9) {
                        var location = _ref9.result.location;

                        _this8.location.lon = location.lng;
                        _this8.location.lat = location.lat;
                    },
                    fail: function fail(err) {}
                });
                // this.loading = false
                _wepy2.default.hideLoading();
                _this8.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYkRldGFpbC5qcyJdLCJuYW1lcyI6WyJKb2JEZXRhaWwiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInJlcXVlc3QiLCJkYXRhIiwiaGFzTG9naW4iLCJsb2FkaW5nIiwicGFnZSIsInRhZ0luZGV4IiwibmFtZUluZGV4IiwiY29tbWVudFNsaWRlIiwic2ltaWxhckpvYiIsImxvY2F0aW9uIiwibG9uIiwibGF0IiwidHlwZSIsImlkIiwidXNlcklkIiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJtYXBBcGkiLCJrZXkiLCJjb21wdXRlZCIsInB1Ymxpc2hUaW1lIiwidmFpbGRfdGltZV9zdGFydCIsIm1ldGhvZHMiLCJjb2xsZWN0IiwidG9hc3QiLCJjb250ZW50IiwibmF2aWdhdGVUbyIsInVybCIsIk51bWJlciIsInBhcnNlSW50IiwiaGFzQ29sbGVjdCIsIlBvc3QiLCJpbnZpdGVXb3JrSWQiLCJzdGF0dXMiLCJ0aGVuIiwidG9Db21wYW55IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJ1c2VyQ29tcGFueSIsInRvQ2hhdCIsInRlbXAiLCJfaWQiLCJjaGF0VXNlcklkIiwiY2hhdFVzZXJOYW1lIiwibmlja25hbWUiLCJjaGF0VXNlckhlYWRlckltYWdlIiwiaGVhZGVySW1hZ2UiLCJKU09OIiwic3RyaW5naWZ5Iiwic2VuZFJlc3VtZSIsInVzZXJDb21wYW55SWQiLCJjaGVja1BlcmlzaGVyIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb25maXJtQ29sb3IiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhdGNoIiwiZXJyIiwic2hvd1RhZ0ludHJvIiwiZSIsInRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsInNob3dOYW1lRGV0YWlsIiwiY29tbWVudExpa2UiLCJpbnZpdGVXb3JrRmVlZGJhY2tJZCIsImludml0ZVdvcmtGZWVkYmFjayIsImhhc0xpa2UiLCIkYXBwbHkiLCJvcGVuTWFwIiwib3BlbkxvY2F0aW9uIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJuYW1lIiwic2hvcF9uYW1lIiwiYWRkcmVzcyIsImNpdHlfbmFtZSIsIiRpbnZva2UiLCJzaG93TG9hZGluZyIsIm1hc2siLCJQcm9taXNlIiwiYWxsIiwiR2V0Iiwid29ya0lkIiwicGFyYW1zIiwiZ2V0U3RvcmFnZVN5bmMiLCJsaXN0IiwibGVuZ3RoIiwiZm9yRWFjaCIsIml0ZW0iLCJ0YWdBcnIiLCJ0YWdfc3RyIiwic3BsaXQiLCJpbnRlcnZpZXdlcl9udW0iLCJlbnZfbnVtIiwiY29uZm9ybV9udW0iLCJzYWxhcnlfbnVtIiwibGlrZV9udW0iLCJjcmVhdGVfdGltZSIsImdlb2NvZGVyIiwicmVzdWx0IiwibG5nIiwiZmFpbCIsImhpZGVMb2FkaW5nIiwid29ya19uYW1lIiwicGF0aCIsInJldCIsIm9uU29ja2V0TWVzc2FnZSIsIiRwYXJlbnQiLCJnbG9iYWwiLCJjdXJWYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7O2dNQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0I7QUFGbkIsUyxRQUtUQyxPLEdBQVUsdUIsUUFLVkMsSSxHQUFPO0FBQ0hDLHNCQUFVLEtBRFA7QUFFSEMscUJBQVMsS0FGTjtBQUdIQyxrQkFBTSxJQUhIO0FBSUhDLHNCQUFVLENBSlA7QUFLSEMsdUJBQVcsQ0FBQyxDQUxUO0FBTUhDLDBCQUFjLENBTlg7QUFPSEMsd0JBQVk7QUFQVCxTLFFBVVBDLFEsR0FBVztBQUNQQyxpQkFBSyxFQURFO0FBRVBDLGlCQUFLO0FBRkUsUyxRQUtYQyxJLEdBQU8sRyxRQUNQQyxFLEdBQUssRSxRQUNMQyxNLEdBQVMsRSxRQUtWQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMsd0JBQXVC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QUFDQSxpQkFBS0MsU0FBTCxHQUFpQixDQUFDLENBQWxCO0FBQ0EsaUJBQUtKLFFBQUwsR0FBZ0IsS0FBaEI7QUFDSDs7OztFQTFUa0MsZUFBS0UsSTs7a0JBQXZCUixTIiwiZmlsZSI6ImpvYkRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0J1xyXG5pbXBvcnQgSm9iSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL2pvYi1saXN0LWl0ZW0nXHJcbmltcG9ydCB7IGZvcm1hdERheSwgZm9ybWF0VGltZSB9IGZyb20gJy4uL3V0aWxzL2Zvcm1hdFRpbWUnXHJcbmltcG9ydCB7R2V0fSBmcm9tICcuLi91dGlscy9zdG9yYWdlJ1xyXG5pbXBvcnQgeyBRUU1BUEtFWSB9IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cydcclxuaW1wb3J0IFFRTWFwV1ggZnJvbSAnLi4vdXRpbHMvcXFtYXAtd3gtanNzZGsubWluJ1xyXG5pbXBvcnQgeyBsb2cgfSBmcm9tICcuLi91dGlscy9sb2cnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2JEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6IGM5L2N5L+h5oGvJ1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaGFzTG9naW46IGZhbHNlLFxyXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgIHBhZ2U6IG51bGwsXHJcbiAgICAgICAgdGFnSW5kZXg6IDAsXHJcbiAgICAgICAgbmFtZUluZGV4OiAtMSxcclxuICAgICAgICBjb21tZW50U2xpZGU6IDEsXHJcbiAgICAgICAgc2ltaWxhckpvYjogW11cclxuICAgIH1cclxuXHJcbiAgICBsb2NhdGlvbiA9IHtcclxuICAgICAgICBsb246ICcnLFxyXG4gICAgICAgIGxhdDogJydcclxuICAgIH1cclxuXHJcbiAgICB0eXBlID0gJzEnXHJcbiAgICBpZCA9ICcnXHJcbiAgICB1c2VySWQgPSAnJ1xyXG4gICAgdG9hc3QgKGRhdGEgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvd1RvYXN0JywgZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICRwcm9wcyA9IHtcImpvYi1pdGVtXCI6e1widi1iaW5kOmxpc3RJdGVtLm9uY2VcIjp7XCJmb3JcIjpcInNpbWlsYXJKb2JcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwiLFwidmFsdWVcIjpcIjlcIn0sXCJ0eXBlXCI6e1wiZm9yXCI6XCJzaW1pbGFySm9iXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIixcInZhbHVlXCI6XCI5XCJ9fSxcImxvYWRpbmdcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnNob3cuc3luY1wiOlwibG9hZGluZ1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgJ2xvYWRpbmcnOiBMb2FkaW5nLFxyXG4gICAgICAgICd0b2FzdCc6IFRvYXN0LFxyXG4gICAgICAgICdqb2ItaXRlbSc6IEpvYkl0ZW1cclxuICAgIH1cclxuXHJcbiAgICBtYXBBcGkgPSBuZXcgUVFNYXBXWCh7XHJcbiAgICAgICAga2V5OiBRUU1BUEtFWVxyXG4gICAgfSlcclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgICBwdWJsaXNoVGltZSAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXREYXkodGhpcy5wYWdlLnZhaWxkX3RpbWVfc3RhcnQsICcuJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgY29sbGVjdCAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNMb2dpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+WFiOeZu+W9lSd9KVxyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdsb2dpbid9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0aGlzLnBhZ2UuaGFzQ29sbGVjdCkgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5oYXNDb2xsZWN0ID0gMFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmhhc0NvbGxlY3QgPSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LlBvc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgIGludml0ZVdvcmtJZDogdGhpcy5pZCxcclxuICAgICAgICAgICAgICAgIHN0YXR1czogdGhpcy5wYWdlLmhhc0NvbGxlY3RcclxuICAgICAgICAgICAgfSwgJy9JbnZpdGVXb3JrL2NvbGxlY3QnKVxyXG4gICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlLmhhc0NvbGxlY3QgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5bey5pS26JePJ30pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICflj5bmtojmlLbol48nfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvQ29tcGFueSAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICczJykge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe2RlbHRhOiAyfSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICcyJykge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe2RlbHRhOiAxfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiBgY29tcGFueT9pZD0ke3RoaXMucGFnZS51c2VyQ29tcGFueS5pZH1gfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9DaGF0ICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTG9naW4pIHtcclxuICAgICAgICAgICAgICAgIEdldCgnZmluaXNoVHlwZScpLnRoZW4odHlwZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0eXBlKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pZDogTnVtYmVyLnBhcnNlSW50KHRoaXMucGFnZS51c2VyQ29tcGFueS5pZCkgPCBOdW1iZXIucGFyc2VJbnQodGhpcy51c2VySWQpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UudXNlckNvbXBhbnkuaWQgKyAnJyArIHRoaXMudXNlcklkIDogdGhpcy51c2VySWQgKyAnJyArIHRoaXMucGFnZS51c2VyQ29tcGFueS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXRVc2VySWQ6IHRoaXMucGFnZS51c2VyQ29tcGFueS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXRVc2VyTmFtZTogdGhpcy5wYWdlLnVzZXJDb21wYW55Lm5pY2tuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhdFVzZXJIZWFkZXJJbWFnZTogdGhpcy5wYWdlLnVzZXJDb21wYW55LmhlYWRlckltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYGNoYXQ/dHlwZT0yJnVzZXJJZD0ke3RoaXMudXNlcklkfSZtc2c9JHtKU09OLnN0cmluZ2lmeSh0ZW1wKX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+WFiOWujOWWhOeugOWOhid9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbmRSZXN1bWUgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNMb2dpbikge1xyXG4gICAgICAgICAgICAgICAgR2V0KCdmaW5pc2hUeXBlJykudGhlbih0eXBlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KHR5cGUpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5Qb3N0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJDb21wYW55SWQ6IHRoaXMucGFnZS51c2VyQ29tcGFueS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludml0ZVdvcmtJZDogdGhpcy5wYWdlLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrUGVyaXNoZXI6MVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAnL1Jlc3VtZS9zZW5kJykudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn56Gu5a6a5ZCR5q2k6IGM5L2N5oqV6YCS5L2g55qE566A5Y6G77yfJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtQ29sb3I6ICcjNDBjNGZmJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5Qb3N0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyQ29tcGFueUlkOiB0aGlzLnBhZ2UudXNlckNvbXBhbnkuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52aXRlV29ya0lkOiB0aGlzLnBhZ2UuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgJy9SZXN1bWUvc2VuZCcpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICflt7LmipXpgJInfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoe2RhdGE6IHJlc30pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyID09IC0zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+W3suiiq+WvueaWueaLiem7kSd9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyID09IC00KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+WvueaWueW3suiiq+S9oOaLiem7ke+8jOivt+WFiOS7jum7keWQjeWNleS4reenu+WHuid9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuZXJyID09IC01KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+W3suaKlemAkui/h++8jDMw5aSp5ZCO5YaN5p2l5oqV6YCSJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+WFiOWujOWWhOeugOWOhid9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNob3dUYWdJbnRybyAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGFnSW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ0luZGV4ID0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFnSW5kZXggPSAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNob3dOYW1lRGV0YWlsIChpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5uYW1lSW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWVJbmRleCA9IC0xXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWVJbmRleCA9IE51bWJlci5wYXJzZUludChpbmRleClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tbWVudExpa2UgKGluZGV4LCBpZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNMb2dpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LlBvc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaW52aXRlV29ya0ZlZWRiYWNrSWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogdGhpcy5wYWdlLmludml0ZVdvcmtGZWVkYmFja1tpbmRleF0uaGFzTGlrZSA9PSAxID8gJzAnIDogJzEnXHJcbiAgICAgICAgICAgICAgICB9LCAnL0ludml0ZVdvcmtGZWVkYmFjay9saWtlJylcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdlLmludml0ZVdvcmtGZWVkYmFja1tpbmRleF0uaGFzTGlrZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5pbnZpdGVXb3JrRmVlZGJhY2tbaW5kZXhdLmhhc0xpa2UgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudFNsaWRlID0gdGhpcy5jb21tZW50U2xpZGUgLSAxXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmludml0ZVdvcmtGZWVkYmFja1tpbmRleF0uaGFzTGlrZSA9IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21tZW50U2xpZGUgPSB0aGlzLmNvbW1lbnRTbGlkZSArIDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnbG9naW4nfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3Blbk1hcCAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkub3BlbkxvY2F0aW9uKHtcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLmxvY2F0aW9uLmxhdCxcclxuICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogdGhpcy5sb2NhdGlvbi5sb24sXHJcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnBhZ2Uuc2hvcF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogdGhpcy5wYWdlLmNpdHlfbmFtZSArIHRoaXMucGFnZS5hZGRyZXNzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgICB3ZXB5LnNob3dMb2FkaW5nKHt0aXRsZTogJ+WKoOi9veS4rS4uLicsIG1hc2s6IHRydWV9KVxyXG4gICAgICAgIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICB3b3JrSWQ6IHBhcmFtcy5pZFxyXG4gICAgICAgICAgICB9LCAnL0ludml0ZVdvcmsvZ2V0TGlrZW5lc3NMaXN0JyksXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgJ3VzZXJJZCc6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpIHx8IDAsXHJcbiAgICAgICAgICAgICAgICAnaW52aXRlV29ya0lkJzogcGFyYW1zLmlkXHJcbiAgICAgICAgICAgIH0sICcvSW52aXRlV29yay9nZXRJbmZvJylcclxuICAgICAgICBdKS50aGVuKChbe2RhdGE6IGxpc3R9LCB7ZGF0YX1dKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmludml0ZVdvcmtGZWVkYmFjay5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5pbnZpdGVXb3JrRmVlZGJhY2suZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udGFnQXJyID0gaXRlbS50YWdfc3RyLnNwbGl0KCcsJylcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmludGVydmlld2VyX251bSA9IE51bWJlci5wYXJzZUludChpdGVtLmludGVydmlld2VyX251bSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmVudl9udW0gPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5lbnZfbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY29uZm9ybV9udW0gPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5jb25mb3JtX251bSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNhbGFyeV9udW0gPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5zYWxhcnlfbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubGlrZV9udW0gPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5saWtlX251bSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNyZWF0ZV90aW1lID0gZm9ybWF0VGltZShOdW1iZXIucGFyc2VJbnQoaXRlbS5jcmVhdGVfdGltZSkgKiAxMDAwLCAyKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuc2ltaWxhckpvYiA9IGxpc3RcclxuICAgICAgICAgICAgdGhpcy5tYXBBcGkuZ2VvY29kZXIoe1xyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogZGF0YS5jaXR5X25hbWUgKyBkYXRhLmFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoe3Jlc3VsdDogeyBsb2NhdGlvbiB9fSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24ubG9uID0gbG9jYXRpb24ubG5nXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5sYXQgPSBsb2NhdGlvbi5sYXRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UgKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnBhZ2Uud29ya19uYW1lLFxyXG4gICAgICAgICAgICBwYXRoOiBgL3BhZ2VzL2pvYkRldGFpbD9pZD0ke3RoaXMucGFnZS5pZH0mdHlwZT0xYCxcclxuICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZyhyZXQpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2coZXJyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgd2VweS5vblNvY2tldE1lc3NhZ2UocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwgPSBOdW1iZXIucGFyc2VJbnQodGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwpICsgMVxyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5oKo5pyJ5paw5raI5oGvJ30pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHBhcmFtcykge1xyXG4gICAgICAgIC8vIHRoaXMubG9hZGluZyA9IHRydWVcclxuICAgICAgICB3ZXB5LnNob3dMb2FkaW5nKHt0aXRsZTogJ+WKoOi9veS4rS4uLicsIG1hc2s6IHRydWV9KVxyXG4gICAgICAgIHRoaXMudHlwZSA9IHBhcmFtcy50eXBlXHJcbiAgICAgICAgdGhpcy5pZCA9IHBhcmFtcy5pZFxyXG4gICAgICAgIEdldCgndXNlcklkJykudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhhc0xvZ2luID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnVzZXJJZCA9IHJldFxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oYXNMb2dpbiA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMudXNlcklkID0gJydcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgIHdvcmtJZDogcGFyYW1zLmlkXHJcbiAgICAgICAgICAgIH0sICcvSW52aXRlV29yay9nZXRMaWtlbmVzc0xpc3QnKSxcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICAndXNlcklkJzogd2VweS5nZXRTdG9yYWdlU3luYygndXNlcklkJykgfHwgMCxcclxuICAgICAgICAgICAgICAgICdpbnZpdGVXb3JrSWQnOiBwYXJhbXMuaWRcclxuICAgICAgICAgICAgfSwgJy9JbnZpdGVXb3JrL2dldEluZm8nKVxyXG4gICAgICAgIF0pLnRoZW4oKFt7ZGF0YTogbGlzdH0sIHtkYXRhfV0pID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuaW52aXRlV29ya0ZlZWRiYWNrLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmludml0ZVdvcmtGZWVkYmFjay5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS50YWdBcnIgPSBpdGVtLnRhZ19zdHIuc3BsaXQoJywnKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaW50ZXJ2aWV3ZXJfbnVtID0gTnVtYmVyLnBhcnNlSW50KGl0ZW0uaW50ZXJ2aWV3ZXJfbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZW52X251bSA9IE51bWJlci5wYXJzZUludChpdGVtLmVudl9udW0pXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb25mb3JtX251bSA9IE51bWJlci5wYXJzZUludChpdGVtLmNvbmZvcm1fbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc2FsYXJ5X251bSA9IE51bWJlci5wYXJzZUludChpdGVtLnNhbGFyeV9udW0pXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5saWtlX251bSA9IE51bWJlci5wYXJzZUludChpdGVtLmxpa2VfbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY3JlYXRlX3RpbWUgPSBmb3JtYXRUaW1lKE51bWJlci5wYXJzZUludChpdGVtLmNyZWF0ZV90aW1lKSAqIDEwMDAsIDIpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IGRhdGFcclxuICAgICAgICAgICAgdGhpcy5zaW1pbGFySm9iID0gbGlzdFxyXG4gICAgICAgICAgICB0aGlzLm1hcEFwaS5nZW9jb2Rlcih7XHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBkYXRhLmNpdHlfbmFtZSArIGRhdGEuYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7cmVzdWx0OiB7IGxvY2F0aW9uIH19KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5sb24gPSBsb2NhdGlvbi5sbmdcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmxhdCA9IGxvY2F0aW9uLmxhdFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIHRoaXMubG9hZGluZyA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblVubG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy50YWdJbmRleCA9IDBcclxuICAgICAgICB0aGlzLm5hbWVJbmRleCA9IC0xXHJcbiAgICAgICAgdGhpcy5oYXNMb2dpbiA9IGZhbHNlXHJcbiAgICB9XHJcbn1cclxuIl19