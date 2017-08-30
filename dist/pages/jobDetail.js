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
            navigationBarTitleText: '职位信息',
            onReachBottomDistance: 100
        }, _this.request = new _request2.default(), _this.data = {
            hasLogin: false,
            loading: false,
            showAllComment: false,
            page: null,
            tagIndex: 0,
            nameIndex: -1,
            similarJob: []
        }, _this.location = {
            lon: '',
            lat: ''
        }, _this.type = '1', _this.id = '', _this.userId = 0, _this.$props = { "job-item": { "v-bind:listItem.once": { "for": "similarJob", "item": "item", "index": "index", "key": "index", "value": "9" }, "type": { "for": "similarJob", "item": "item", "index": "index", "key": "index", "value": "9" } }, "loading": { "xmlns:v-bind": "", "v-bind:show.sync": "loading" } }, _this.$events = {}, _this.components = {
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
                    _wepy2.default.redirectTo({ url: 'company?id=' + this.page.userCompany.id });
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
            toAllComment: function toAllComment() {
                _wepy2.default.navigateTo({
                    url: 'allComment?userId=' + this.userId + '&workId=' + this.id
                });
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
                            _this5.page.inviteWorkFeedback[index].commentSlide = _this5.page.inviteWorkFeedback[index].commentSlide - 1;
                        } else {
                            _this5.page.inviteWorkFeedback[index].hasLike = 1;
                            _this5.page.inviteWorkFeedback[index].commentSlide = _this5.page.inviteWorkFeedback[index].commentSlide + 1;
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
                workId: this.id
            }, '/InviteWork/getLikenessList'), this.request.Get({
                'userId': _wepy2.default.getStorageSync('userId') || 0,
                'inviteWorkId': this.id
            }, '/InviteWork/getInfo')]).then(function (_ref4) {
                var _ref5 = _slicedToArray(_ref4, 2),
                    list = _ref5[0].data,
                    data = _ref5[1].data;

                if (data.inviteWorkFeedback.length != 0) {
                    if (data.inviteWorkFeedback.length > 3) {
                        _this6.showAllComment = true;
                        data.inviteWorkFeedback = data.inviteWorkFeedback.splice(0, 3);
                    }
                    data.inviteWorkFeedback.forEach(function (item) {
                        if (item.tag_str.length != 0) {
                            item.tagArr = item.tag_str.split(',');
                        } else {
                            item.tagArr = [];
                        }
                        item.interviewer_num = Number.parseInt(item.interviewer_num);
                        item.env_num = Number.parseInt(item.env_num);
                        item.conform_num = Number.parseInt(item.conform_num);
                        item.salary_num = Number.parseInt(item.salary_num);
                        item.like_num = Number.parseInt(item.like_num);
                        item.create_time = (0, _formatTime.formatTime)(Number.parseInt(item.create_time) * 1000, 2);
                        item.commentSlide = 1;
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
                _wepy2.default.stopPullDownRefresh();
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
                _this8.userId = 0;
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
                    if (data.inviteWorkFeedback.length > 3) {
                        _this8.showAllComment = true;
                        data.inviteWorkFeedback = data.inviteWorkFeedback.splice(0, 3);
                    }
                    data.inviteWorkFeedback.forEach(function (item) {
                        if (item.tag_str.length != 0) {
                            item.tagArr = item.tag_str.split(',');
                        } else {
                            item.tagArr = [];
                        }
                        item.interviewer_num = Number.parseInt(item.interviewer_num);
                        item.env_num = Number.parseInt(item.env_num);
                        item.conform_num = Number.parseInt(item.conform_num);
                        item.salary_num = Number.parseInt(item.salary_num);
                        item.like_num = Number.parseInt(item.like_num);
                        item.create_time = (0, _formatTime.formatTime)(Number.parseInt(item.create_time) * 1000, 2);
                        item.commentSlide = 1;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYkRldGFpbC5qcyJdLCJuYW1lcyI6WyJKb2JEZXRhaWwiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsInJlcXVlc3QiLCJkYXRhIiwiaGFzTG9naW4iLCJsb2FkaW5nIiwic2hvd0FsbENvbW1lbnQiLCJwYWdlIiwidGFnSW5kZXgiLCJuYW1lSW5kZXgiLCJzaW1pbGFySm9iIiwibG9jYXRpb24iLCJsb24iLCJsYXQiLCJ0eXBlIiwiaWQiLCJ1c2VySWQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm1hcEFwaSIsImtleSIsImNvbXB1dGVkIiwicHVibGlzaFRpbWUiLCJ2YWlsZF90aW1lX3N0YXJ0IiwibWV0aG9kcyIsImNvbGxlY3QiLCJ0b2FzdCIsImNvbnRlbnQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJoYXNDb2xsZWN0IiwiUG9zdCIsImludml0ZVdvcmtJZCIsInN0YXR1cyIsInRoZW4iLCJ0b0NvbXBhbnkiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsInJlZGlyZWN0VG8iLCJ1c2VyQ29tcGFueSIsInRvQ2hhdCIsInRlbXAiLCJfaWQiLCJjaGF0VXNlcklkIiwiY2hhdFVzZXJOYW1lIiwibmlja25hbWUiLCJjaGF0VXNlckhlYWRlckltYWdlIiwiaGVhZGVySW1hZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwidG9BbGxDb21tZW50Iiwic2VuZFJlc3VtZSIsInVzZXJDb21wYW55SWQiLCJjaGVja1BlcmlzaGVyIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb25maXJtQ29sb3IiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImNhdGNoIiwiZXJyIiwic2hvd1RhZ0ludHJvIiwiZSIsInRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsInNob3dOYW1lRGV0YWlsIiwiY29tbWVudExpa2UiLCJpbnZpdGVXb3JrRmVlZGJhY2tJZCIsImludml0ZVdvcmtGZWVkYmFjayIsImhhc0xpa2UiLCJjb21tZW50U2xpZGUiLCIkYXBwbHkiLCJvcGVuTWFwIiwib3BlbkxvY2F0aW9uIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJuYW1lIiwic2hvcF9uYW1lIiwiYWRkcmVzcyIsImNpdHlfbmFtZSIsIiRpbnZva2UiLCJzaG93TG9hZGluZyIsIm1hc2siLCJQcm9taXNlIiwiYWxsIiwiR2V0Iiwid29ya0lkIiwiZ2V0U3RvcmFnZVN5bmMiLCJsaXN0IiwibGVuZ3RoIiwic3BsaWNlIiwiZm9yRWFjaCIsIml0ZW0iLCJ0YWdfc3RyIiwidGFnQXJyIiwic3BsaXQiLCJpbnRlcnZpZXdlcl9udW0iLCJlbnZfbnVtIiwiY29uZm9ybV9udW0iLCJzYWxhcnlfbnVtIiwibGlrZV9udW0iLCJjcmVhdGVfdGltZSIsImdlb2NvZGVyIiwicmVzdWx0IiwibG5nIiwiZmFpbCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJoaWRlTG9hZGluZyIsIndvcmtfbmFtZSIsInBhdGgiLCJyZXQiLCJvblNvY2tldE1lc3NhZ2UiLCIkcGFyZW50IiwiZ2xvYmFsIiwiY3VyVmFsIiwicGFyYW1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7OztnTUFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCLE1BRm5CO0FBR0xDLG1DQUF1QjtBQUhsQixTLFFBTVRDLE8sR0FBVSx1QixRQUtWQyxJLEdBQU87QUFDSEMsc0JBQVUsS0FEUDtBQUVIQyxxQkFBUyxLQUZOO0FBR0hDLDRCQUFnQixLQUhiO0FBSUhDLGtCQUFNLElBSkg7QUFLSEMsc0JBQVUsQ0FMUDtBQU1IQyx1QkFBVyxDQUFDLENBTlQ7QUFPSEMsd0JBQVk7QUFQVCxTLFFBVVBDLFEs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QmlHLDBCQUFNLG1CQUFPLENBQ1o7QUFQZ0IsaUJBQXJCO0FBU0E7QUFDQSwrQkFBS0UsV0FBTDtBQUNBLHVCQUFLcEMsTUFBTDtBQUNILGFBM0NEO0FBNENIOzs7bUNBRVc7QUFDUixpQkFBS3BFLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxpQkFBS0MsU0FBTCxHQUFpQixDQUFDLENBQWxCO0FBQ0EsaUJBQUtMLFFBQUwsR0FBZ0IsS0FBaEI7QUFDSDs7OztFQW5Wa0MsZUFBS0csSTs7a0JBQXZCVixTIiwiZmlsZSI6ImpvYkRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0J1xyXG5pbXBvcnQgSm9iSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL2pvYi1saXN0LWl0ZW0nXHJcbmltcG9ydCB7IGZvcm1hdERheSwgZm9ybWF0VGltZSB9IGZyb20gJy4uL3V0aWxzL2Zvcm1hdFRpbWUnXHJcbmltcG9ydCB7R2V0fSBmcm9tICcuLi91dGlscy9zdG9yYWdlJ1xyXG5pbXBvcnQgeyBRUU1BUEtFWSB9IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cydcclxuaW1wb3J0IFFRTWFwV1ggZnJvbSAnLi4vdXRpbHMvcXFtYXAtd3gtanNzZGsubWluJ1xyXG5pbXBvcnQgeyBsb2cgfSBmcm9tICcuLi91dGlscy9sb2cnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2JEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6IGM5L2N5L+h5oGvJyxcclxuICAgICAgICBvblJlYWNoQm90dG9tRGlzdGFuY2U6IDEwMFxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgaGFzTG9naW46IGZhbHNlLFxyXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgIHNob3dBbGxDb21tZW50OiBmYWxzZSxcclxuICAgICAgICBwYWdlOiBudWxsLFxyXG4gICAgICAgIHRhZ0luZGV4OiAwLFxyXG4gICAgICAgIG5hbWVJbmRleDogLTEsXHJcbiAgICAgICAgc2ltaWxhckpvYjogW11cclxuICAgIH1cclxuXHJcbiAgICBsb2NhdGlvbiA9IHtcclxuICAgICAgICBsb246ICcnLFxyXG4gICAgICAgIGxhdDogJydcclxuICAgIH1cclxuXHJcbiAgICB0eXBlID0gJzEnXHJcbiAgICBpZCA9ICcnXHJcbiAgICB1c2VySWQgPSAwXHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgJHByb3BzID0ge1wiam9iLWl0ZW1cIjp7XCJ2LWJpbmQ6bGlzdEl0ZW0ub25jZVwiOntcImZvclwiOlwic2ltaWxhckpvYlwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCIsXCJ2YWx1ZVwiOlwiOVwifSxcInR5cGVcIjp7XCJmb3JcIjpcInNpbWlsYXJKb2JcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwiLFwidmFsdWVcIjpcIjlcIn19LFwibG9hZGluZ1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2hvdy5zeW5jXCI6XCJsb2FkaW5nXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAnbG9hZGluZyc6IExvYWRpbmcsXHJcbiAgICAgICAgJ3RvYXN0JzogVG9hc3QsXHJcbiAgICAgICAgJ2pvYi1pdGVtJzogSm9iSXRlbVxyXG4gICAgfVxyXG5cclxuICAgIG1hcEFwaSA9IG5ldyBRUU1hcFdYKHtcclxuICAgICAgICBrZXk6IFFRTUFQS0VZXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICAgIHB1Ymxpc2hUaW1lICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdERheSh0aGlzLnBhZ2UudmFpbGRfdGltZV9zdGFydCwgJy4nKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBjb2xsZWN0ICgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0xvZ2luKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+35YWI55m75b2VJ30pXHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KHRoaXMucGFnZS5oYXNDb2xsZWN0KSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmhhc0NvbGxlY3QgPSAwXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaGFzQ29sbGVjdCA9IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuUG9zdCh7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgaW52aXRlV29ya0lkOiB0aGlzLmlkLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnBhZ2UuaGFzQ29sbGVjdFxyXG4gICAgICAgICAgICB9LCAnL0ludml0ZVdvcmsvY29sbGVjdCcpXHJcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuaGFzQ29sbGVjdCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICflt7LmlLbol48nfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+WPlua2iOaUtuiXjyd9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9Db21wYW55ICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJzMnKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7ZGVsdGE6IDJ9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJzInKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7ZGVsdGE6IDF9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHt1cmw6IGBjb21wYW55P2lkPSR7dGhpcy5wYWdlLnVzZXJDb21wYW55LmlkfWB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b0NoYXQgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNMb2dpbikge1xyXG4gICAgICAgICAgICAgICAgR2V0KCdmaW5pc2hUeXBlJykudGhlbih0eXBlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KHR5cGUpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2lkOiBOdW1iZXIucGFyc2VJbnQodGhpcy5wYWdlLnVzZXJDb21wYW55LmlkKSA8IE51bWJlci5wYXJzZUludCh0aGlzLnVzZXJJZCkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS51c2VyQ29tcGFueS5pZCArICcnICsgdGhpcy51c2VySWQgOiB0aGlzLnVzZXJJZCArICcnICsgdGhpcy5wYWdlLnVzZXJDb21wYW55LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhdFVzZXJJZDogdGhpcy5wYWdlLnVzZXJDb21wYW55LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhdFVzZXJOYW1lOiB0aGlzLnBhZ2UudXNlckNvbXBhbnkubmlja25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGF0VXNlckhlYWRlckltYWdlOiB0aGlzLnBhZ2UudXNlckNvbXBhbnkuaGVhZGVySW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBgY2hhdD90eXBlPTImdXNlcklkPSR7dGhpcy51c2VySWR9Jm1zZz0ke0pTT04uc3RyaW5naWZ5KHRlbXApfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+35YWI5a6M5ZaE566A5Y6GJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnbG9naW4nfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9BbGxDb21tZW50ICgpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogYGFsbENvbW1lbnQ/dXNlcklkPSR7dGhpcy51c2VySWR9JndvcmtJZD0ke3RoaXMuaWR9YFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VuZFJlc3VtZSAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0xvZ2luKSB7XHJcbiAgICAgICAgICAgICAgICBHZXQoJ2ZpbmlzaFR5cGUnKS50aGVuKHR5cGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodHlwZSkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LlBvc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckNvbXBhbnlJZDogdGhpcy5wYWdlLnVzZXJDb21wYW55LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52aXRlV29ya0lkOiB0aGlzLnBhZ2UuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tQZXJpc2hlcjoxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICcvUmVzdW1lL3NlbmQnKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfnoa7lrprlkJHmraTogYzkvY3mipXpgJLkvaDnmoTnroDljobvvJ8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1Db2xvcjogJyM0MGM0ZmYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LlBvc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJDb21wYW55SWQ6IHRoaXMucGFnZS51c2VyQ29tcGFueS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZpdGVXb3JrSWQ6IHRoaXMucGFnZS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAnL1Jlc3VtZS9zZW5kJykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+W3suaKlemAkid9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCh7ZGF0YTogcmVzfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnIgPT0gLTMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5bey6KKr5a+55pa55ouJ6buRJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5lcnIgPT0gLTQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5a+55pa55bey6KKr5L2g5ouJ6buR77yM6K+35YWI5LuO6buR5ZCN5Y2V5Lit56e75Ye6J30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5lcnIgPT0gLTUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5bey5oqV6YCS6L+H77yMMzDlpKnlkI7lho3mnaXmipXpgJInfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+35YWI5a6M5ZaE566A5Y6GJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnbG9naW4nfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd1RhZ0ludHJvIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YWdJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFnSW5kZXggPSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdJbmRleCA9IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd05hbWVEZXRhaWwgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5hbWVJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZUluZGV4ID0gLTFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZUluZGV4ID0gTnVtYmVyLnBhcnNlSW50KGluZGV4KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21tZW50TGlrZSAoaW5kZXgsIGlkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0xvZ2luKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuUG9zdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICBpbnZpdGVXb3JrRmVlZGJhY2tJZDogaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnBhZ2UuaW52aXRlV29ya0ZlZWRiYWNrW2luZGV4XS5oYXNMaWtlID09IDEgPyAnMCcgOiAnMSdcclxuICAgICAgICAgICAgICAgIH0sICcvSW52aXRlV29ya0ZlZWRiYWNrL2xpa2UnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuaW52aXRlV29ya0ZlZWRiYWNrW2luZGV4XS5oYXNMaWtlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmludml0ZVdvcmtGZWVkYmFja1tpbmRleF0uaGFzTGlrZSA9IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmludml0ZVdvcmtGZWVkYmFja1tpbmRleF0uY29tbWVudFNsaWRlID0gdGhpcy5wYWdlLmludml0ZVdvcmtGZWVkYmFja1tpbmRleF0uY29tbWVudFNsaWRlIC0gMVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5pbnZpdGVXb3JrRmVlZGJhY2tbaW5kZXhdLmhhc0xpa2UgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5pbnZpdGVXb3JrRmVlZGJhY2tbaW5kZXhdLmNvbW1lbnRTbGlkZSA9IHRoaXMucGFnZS5pbnZpdGVXb3JrRmVlZGJhY2tbaW5kZXhdLmNvbW1lbnRTbGlkZSArIDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnbG9naW4nfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3Blbk1hcCAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkub3BlbkxvY2F0aW9uKHtcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLmxvY2F0aW9uLmxhdCxcclxuICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogdGhpcy5sb2NhdGlvbi5sb24sXHJcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnBhZ2Uuc2hvcF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogdGhpcy5wYWdlLmNpdHlfbmFtZSArIHRoaXMucGFnZS5hZGRyZXNzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgICB3ZXB5LnNob3dMb2FkaW5nKHt0aXRsZTogJ+WKoOi9veS4rS4uLicsIG1hc2s6IHRydWV9KVxyXG4gICAgICAgIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICB3b3JrSWQ6IHRoaXMuaWRcclxuICAgICAgICAgICAgfSwgJy9JbnZpdGVXb3JrL2dldExpa2VuZXNzTGlzdCcpLFxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgICd1c2VySWQnOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKSB8fCAwLFxyXG4gICAgICAgICAgICAgICAgJ2ludml0ZVdvcmtJZCc6IHRoaXMuaWRcclxuICAgICAgICAgICAgfSwgJy9JbnZpdGVXb3JrL2dldEluZm8nKVxyXG4gICAgICAgIF0pLnRoZW4oKFt7ZGF0YTogbGlzdH0sIHtkYXRhfV0pID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuaW52aXRlV29ya0ZlZWRiYWNrLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5pbnZpdGVXb3JrRmVlZGJhY2subGVuZ3RoID4gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FsbENvbW1lbnQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5pbnZpdGVXb3JrRmVlZGJhY2sgPSBkYXRhLmludml0ZVdvcmtGZWVkYmFjay5zcGxpY2UoMCwgMylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRhdGEuaW52aXRlV29ya0ZlZWRiYWNrLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50YWdfc3RyLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udGFnQXJyID0gaXRlbS50YWdfc3RyLnNwbGl0KCcsJylcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnRhZ0FyciA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaW50ZXJ2aWV3ZXJfbnVtID0gTnVtYmVyLnBhcnNlSW50KGl0ZW0uaW50ZXJ2aWV3ZXJfbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZW52X251bSA9IE51bWJlci5wYXJzZUludChpdGVtLmVudl9udW0pXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb25mb3JtX251bSA9IE51bWJlci5wYXJzZUludChpdGVtLmNvbmZvcm1fbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc2FsYXJ5X251bSA9IE51bWJlci5wYXJzZUludChpdGVtLnNhbGFyeV9udW0pXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5saWtlX251bSA9IE51bWJlci5wYXJzZUludChpdGVtLmxpa2VfbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY3JlYXRlX3RpbWUgPSBmb3JtYXRUaW1lKE51bWJlci5wYXJzZUludChpdGVtLmNyZWF0ZV90aW1lKSAqIDEwMDAsIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb21tZW50U2xpZGUgPSAxXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IGRhdGFcclxuICAgICAgICAgICAgdGhpcy5zaW1pbGFySm9iID0gbGlzdFxyXG4gICAgICAgICAgICB0aGlzLm1hcEFwaS5nZW9jb2Rlcih7XHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBkYXRhLmNpdHlfbmFtZSArIGRhdGEuYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7cmVzdWx0OiB7IGxvY2F0aW9uIH19KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5sb24gPSBsb2NhdGlvbi5sbmdcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmxhdCA9IGxvY2F0aW9uLmxhdFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMucGFnZS53b3JrX25hbWUsXHJcbiAgICAgICAgICAgIHBhdGg6IGAvcGFnZXMvam9iRGV0YWlsP2lkPSR7dGhpcy5wYWdlLmlkfSZ0eXBlPTFgLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKHJldClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZyhlcnIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICB3ZXB5Lm9uU29ja2V0TWVzc2FnZShyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCA9IE51bWJlci5wYXJzZUludCh0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCkgKyAxXHJcbiAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfmgqjmnInmlrDmtojmga8nfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAocGFyYW1zKSB7XHJcbiAgICAgICAgLy8gdGhpcy5sb2FkaW5nID0gdHJ1ZVxyXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJywgbWFzazogdHJ1ZX0pXHJcbiAgICAgICAgdGhpcy50eXBlID0gcGFyYW1zLnR5cGVcclxuICAgICAgICB0aGlzLmlkID0gcGFyYW1zLmlkXHJcbiAgICAgICAgR2V0KCd1c2VySWQnKS50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzTG9naW4gPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMudXNlcklkID0gcmV0XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhhc0xvZ2luID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy51c2VySWQgPSAwXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgICAgIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICB3b3JrSWQ6IHBhcmFtcy5pZFxyXG4gICAgICAgICAgICB9LCAnL0ludml0ZVdvcmsvZ2V0TGlrZW5lc3NMaXN0JyksXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgJ3VzZXJJZCc6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpIHx8IDAsXHJcbiAgICAgICAgICAgICAgICAnaW52aXRlV29ya0lkJzogcGFyYW1zLmlkXHJcbiAgICAgICAgICAgIH0sICcvSW52aXRlV29yay9nZXRJbmZvJylcclxuICAgICAgICBdKS50aGVuKChbe2RhdGE6IGxpc3R9LCB7ZGF0YX1dKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmludml0ZVdvcmtGZWVkYmFjay5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuaW52aXRlV29ya0ZlZWRiYWNrLmxlbmd0aCA+IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dBbGxDb21tZW50ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaW52aXRlV29ya0ZlZWRiYWNrID0gZGF0YS5pbnZpdGVXb3JrRmVlZGJhY2suc3BsaWNlKDAsIDMpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkYXRhLmludml0ZVdvcmtGZWVkYmFjay5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udGFnX3N0ci5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnRhZ0FyciA9IGl0ZW0udGFnX3N0ci5zcGxpdCgnLCcpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS50YWdBcnIgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmludGVydmlld2VyX251bSA9IE51bWJlci5wYXJzZUludChpdGVtLmludGVydmlld2VyX251bSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmVudl9udW0gPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5lbnZfbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY29uZm9ybV9udW0gPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5jb25mb3JtX251bSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNhbGFyeV9udW0gPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5zYWxhcnlfbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubGlrZV9udW0gPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5saWtlX251bSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNyZWF0ZV90aW1lID0gZm9ybWF0VGltZShOdW1iZXIucGFyc2VJbnQoaXRlbS5jcmVhdGVfdGltZSkgKiAxMDAwLCAyKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY29tbWVudFNsaWRlID0gMVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuc2ltaWxhckpvYiA9IGxpc3RcclxuICAgICAgICAgICAgdGhpcy5tYXBBcGkuZ2VvY29kZXIoe1xyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogZGF0YS5jaXR5X25hbWUgKyBkYXRhLmFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoe3Jlc3VsdDogeyBsb2NhdGlvbiB9fSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24ubG9uID0gbG9jYXRpb24ubG5nXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5sYXQgPSBsb2NhdGlvbi5sYXRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25VbmxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMudGFnSW5kZXggPSAwXHJcbiAgICAgICAgdGhpcy5uYW1lSW5kZXggPSAtMVxyXG4gICAgICAgIHRoaXMuaGFzTG9naW4gPSBmYWxzZVxyXG4gICAgfVxyXG59XHJcbiJdfQ==