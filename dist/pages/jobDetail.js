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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYkRldGFpbC5qcyJdLCJuYW1lcyI6WyJKb2JEZXRhaWwiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm9uUmVhY2hCb3R0b21EaXN0YW5jZSIsInJlcXVlc3QiLCJkYXRhIiwiaGFzTG9naW4iLCJsb2FkaW5nIiwicGFnZSIsInRhZ0luZGV4IiwibmFtZUluZGV4IiwiY29tbWVudFNsaWRlIiwic2ltaWxhckpvYiIsImxvY2F0aW9uIiwibG9uIiwibGF0IiwidHlwZSIsImlkIiwidXNlcklkIiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJtYXBBcGkiLCJrZXkiLCJjb21wdXRlZCIsInB1Ymxpc2hUaW1lIiwidmFpbGRfdGltZV9zdGFydCIsIm1ldGhvZHMiLCJjb2xsZWN0IiwidG9hc3QiLCJjb250ZW50IiwibmF2aWdhdGVUbyIsInVybCIsIk51bWJlciIsInBhcnNlSW50IiwiaGFzQ29sbGVjdCIsIlBvc3QiLCJpbnZpdGVXb3JrSWQiLCJzdGF0dXMiLCJ0aGVuIiwidG9Db21wYW55IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJyZWRpcmVjdFRvIiwidXNlckNvbXBhbnkiLCJ0b0NoYXQiLCJ0ZW1wIiwiX2lkIiwiY2hhdFVzZXJJZCIsImNoYXRVc2VyTmFtZSIsIm5pY2tuYW1lIiwiY2hhdFVzZXJIZWFkZXJJbWFnZSIsImhlYWRlckltYWdlIiwiSlNPTiIsInN0cmluZ2lmeSIsInNlbmRSZXN1bWUiLCJ1c2VyQ29tcGFueUlkIiwiY2hlY2tQZXJpc2hlciIsInNob3dNb2RhbCIsInRpdGxlIiwiY29uZmlybUNvbG9yIiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYXRjaCIsImVyciIsInNob3dUYWdJbnRybyIsImUiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiaW5kZXgiLCJzaG93TmFtZURldGFpbCIsImNvbW1lbnRMaWtlIiwiaW52aXRlV29ya0ZlZWRiYWNrSWQiLCJpbnZpdGVXb3JrRmVlZGJhY2siLCJoYXNMaWtlIiwiJGFwcGx5Iiwib3Blbk1hcCIsIm9wZW5Mb2NhdGlvbiIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwibmFtZSIsInNob3BfbmFtZSIsImFkZHJlc3MiLCJjaXR5X25hbWUiLCIkaW52b2tlIiwic2hvd0xvYWRpbmciLCJtYXNrIiwiUHJvbWlzZSIsImFsbCIsIkdldCIsIndvcmtJZCIsInBhcmFtcyIsImdldFN0b3JhZ2VTeW5jIiwibGlzdCIsImxlbmd0aCIsImZvckVhY2giLCJpdGVtIiwidGFnQXJyIiwidGFnX3N0ciIsInNwbGl0IiwiaW50ZXJ2aWV3ZXJfbnVtIiwiZW52X251bSIsImNvbmZvcm1fbnVtIiwic2FsYXJ5X251bSIsImxpa2VfbnVtIiwiY3JlYXRlX3RpbWUiLCJnZW9jb2RlciIsInJlc3VsdCIsImxuZyIsImZhaWwiLCJoaWRlTG9hZGluZyIsIndvcmtfbmFtZSIsInBhdGgiLCJyZXQiLCJvblNvY2tldE1lc3NhZ2UiLCIkcGFyZW50IiwiZ2xvYmFsIiwiY3VyVmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7OztnTUFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCLE1BRm5CO0FBR0xDLG1DQUF1QjtBQUhsQixTLFFBTVRDLE8sR0FBVSx1QixRQUtWQyxJLEdBQU87QUFDSEMsc0JBQVUsS0FEUDtBQUVIQyxxQkFBUyxLQUZOO0FBR0hDLGtCQUFNLElBSEg7QUFJSEMsc0JBQVUsQ0FKUDtBQUtIQyx1QkFBVyxDQUFDLENBTFQ7QUFNSEMsMEJBQWMsQ0FOWDtBQU9IQyx3QkFBWTtBQVBULFMsUUFVUEMsUSxHQUFXO0FBQ1BDLGlCQUFLLEVBREU7QUFFUEMsaUJBQUs7QUFGRSxTLFFBS1hDLEksR0FBTyxHLFFBQ1BDLEUs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O0FBQ0gsYUFsQ0Q7QUFtQ0g7OzttQ0FFVztBQUNSLGlCQUFLbkUsUUFBTCxHQUFnQixDQUFoQjtBQUNBLGlCQUFLQyxTQUFMLEdBQWlCLENBQUMsQ0FBbEI7QUFDQSxpQkFBS0osUUFBTCxHQUFnQixLQUFoQjtBQUNIOzs7O0VBM1RrQyxlQUFLRSxJOztrQkFBdkJULFMiLCJmaWxlIjoiam9iRGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdG9hc3QnXHJcbmltcG9ydCBKb2JJdGVtIGZyb20gJy4uL2NvbXBvbmVudHMvam9iLWxpc3QtaXRlbSdcclxuaW1wb3J0IHsgZm9ybWF0RGF5LCBmb3JtYXRUaW1lIH0gZnJvbSAnLi4vdXRpbHMvZm9ybWF0VGltZSdcclxuaW1wb3J0IHtHZXR9IGZyb20gJy4uL3V0aWxzL3N0b3JhZ2UnXHJcbmltcG9ydCB7IFFRTUFQS0VZIH0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnRzJ1xyXG5pbXBvcnQgUVFNYXBXWCBmcm9tICcuLi91dGlscy9xcW1hcC13eC1qc3Nkay5taW4nXHJcbmltcG9ydCB7IGxvZyB9IGZyb20gJy4uL3V0aWxzL2xvZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvYkRldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfogYzkvY3kv6Hmga8nLFxyXG4gICAgICAgIG9uUmVhY2hCb3R0b21EaXN0YW5jZTogMTAwXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBoYXNMb2dpbjogZmFsc2UsXHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgcGFnZTogbnVsbCxcclxuICAgICAgICB0YWdJbmRleDogMCxcclxuICAgICAgICBuYW1lSW5kZXg6IC0xLFxyXG4gICAgICAgIGNvbW1lbnRTbGlkZTogMSxcclxuICAgICAgICBzaW1pbGFySm9iOiBbXVxyXG4gICAgfVxyXG5cclxuICAgIGxvY2F0aW9uID0ge1xyXG4gICAgICAgIGxvbjogJycsXHJcbiAgICAgICAgbGF0OiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHR5cGUgPSAnMSdcclxuICAgIGlkID0gJydcclxuICAgIHVzZXJJZCA9ICcnXHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgJHByb3BzID0ge1wiam9iLWl0ZW1cIjp7XCJ2LWJpbmQ6bGlzdEl0ZW0ub25jZVwiOntcImZvclwiOlwic2ltaWxhckpvYlwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCIsXCJ2YWx1ZVwiOlwiOVwifSxcInR5cGVcIjp7XCJmb3JcIjpcInNpbWlsYXJKb2JcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwiLFwidmFsdWVcIjpcIjlcIn19LFwibG9hZGluZ1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2hvdy5zeW5jXCI6XCJsb2FkaW5nXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAnbG9hZGluZyc6IExvYWRpbmcsXHJcbiAgICAgICAgJ3RvYXN0JzogVG9hc3QsXHJcbiAgICAgICAgJ2pvYi1pdGVtJzogSm9iSXRlbVxyXG4gICAgfVxyXG5cclxuICAgIG1hcEFwaSA9IG5ldyBRUU1hcFdYKHtcclxuICAgICAgICBrZXk6IFFRTUFQS0VZXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICAgIHB1Ymxpc2hUaW1lICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdERheSh0aGlzLnBhZ2UudmFpbGRfdGltZV9zdGFydCwgJy4nKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBjb2xsZWN0ICgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0xvZ2luKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+35YWI55m75b2VJ30pXHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KHRoaXMucGFnZS5oYXNDb2xsZWN0KSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLmhhc0NvbGxlY3QgPSAwXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaGFzQ29sbGVjdCA9IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuUG9zdCh7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgaW52aXRlV29ya0lkOiB0aGlzLmlkLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnBhZ2UuaGFzQ29sbGVjdFxyXG4gICAgICAgICAgICB9LCAnL0ludml0ZVdvcmsvY29sbGVjdCcpXHJcbiAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuaGFzQ29sbGVjdCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICflt7LmlLbol48nfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+WPlua2iOaUtuiXjyd9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9Db21wYW55ICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJzMnKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7ZGVsdGE6IDJ9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJzInKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7ZGVsdGE6IDF9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHt1cmw6IGBjb21wYW55P2lkPSR7dGhpcy5wYWdlLnVzZXJDb21wYW55LmlkfWB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b0NoYXQgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNMb2dpbikge1xyXG4gICAgICAgICAgICAgICAgR2V0KCdmaW5pc2hUeXBlJykudGhlbih0eXBlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KHR5cGUpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2lkOiBOdW1iZXIucGFyc2VJbnQodGhpcy5wYWdlLnVzZXJDb21wYW55LmlkKSA8IE51bWJlci5wYXJzZUludCh0aGlzLnVzZXJJZCkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS51c2VyQ29tcGFueS5pZCArICcnICsgdGhpcy51c2VySWQgOiB0aGlzLnVzZXJJZCArICcnICsgdGhpcy5wYWdlLnVzZXJDb21wYW55LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhdFVzZXJJZDogdGhpcy5wYWdlLnVzZXJDb21wYW55LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhdFVzZXJOYW1lOiB0aGlzLnBhZ2UudXNlckNvbXBhbnkubmlja25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGF0VXNlckhlYWRlckltYWdlOiB0aGlzLnBhZ2UudXNlckNvbXBhbnkuaGVhZGVySW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBgY2hhdD90eXBlPTImdXNlcklkPSR7dGhpcy51c2VySWR9Jm1zZz0ke0pTT04uc3RyaW5naWZ5KHRlbXApfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+35YWI5a6M5ZaE566A5Y6GJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnbG9naW4nfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VuZFJlc3VtZSAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0xvZ2luKSB7XHJcbiAgICAgICAgICAgICAgICBHZXQoJ2ZpbmlzaFR5cGUnKS50aGVuKHR5cGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodHlwZSkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LlBvc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckNvbXBhbnlJZDogdGhpcy5wYWdlLnVzZXJDb21wYW55LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52aXRlV29ya0lkOiB0aGlzLnBhZ2UuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tQZXJpc2hlcjoxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICcvUmVzdW1lL3NlbmQnKS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfnoa7lrprlkJHmraTogYzkvY3mipXpgJLkvaDnmoTnroDljobvvJ8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1Db2xvcjogJyM0MGM0ZmYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LlBvc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJDb21wYW55SWQ6IHRoaXMucGFnZS51c2VyQ29tcGFueS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZpdGVXb3JrSWQ6IHRoaXMucGFnZS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAnL1Jlc3VtZS9zZW5kJykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+W3suaKlemAkid9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCh7ZGF0YTogcmVzfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5lcnIgPT0gLTMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5bey6KKr5a+55pa55ouJ6buRJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5lcnIgPT0gLTQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5a+55pa55bey6KKr5L2g5ouJ6buR77yM6K+35YWI5LuO6buR5ZCN5Y2V5Lit56e75Ye6J30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5lcnIgPT0gLTUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5bey5oqV6YCS6L+H77yMMzDlpKnlkI7lho3mnaXmipXpgJInfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+35YWI5a6M5ZaE566A5Y6GJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnbG9naW4nfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd1RhZ0ludHJvIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YWdJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFnSW5kZXggPSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdJbmRleCA9IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd05hbWVEZXRhaWwgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5hbWVJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZUluZGV4ID0gLTFcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZUluZGV4ID0gTnVtYmVyLnBhcnNlSW50KGluZGV4KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21tZW50TGlrZSAoaW5kZXgsIGlkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0xvZ2luKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuUG9zdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICBpbnZpdGVXb3JrRmVlZGJhY2tJZDogaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnBhZ2UuaW52aXRlV29ya0ZlZWRiYWNrW2luZGV4XS5oYXNMaWtlID09IDEgPyAnMCcgOiAnMSdcclxuICAgICAgICAgICAgICAgIH0sICcvSW52aXRlV29ya0ZlZWRiYWNrL2xpa2UnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UuaW52aXRlV29ya0ZlZWRiYWNrW2luZGV4XS5oYXNMaWtlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmludml0ZVdvcmtGZWVkYmFja1tpbmRleF0uaGFzTGlrZSA9IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21tZW50U2xpZGUgPSB0aGlzLmNvbW1lbnRTbGlkZSAtIDFcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaW52aXRlV29ya0ZlZWRiYWNrW2luZGV4XS5oYXNMaWtlID0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1lbnRTbGlkZSA9IHRoaXMuY29tbWVudFNsaWRlICsgMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdsb2dpbid9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcGVuTWFwICgpIHtcclxuICAgICAgICAgICAgd2VweS5vcGVuTG9jYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgbGF0aXR1ZGU6IHRoaXMubG9jYXRpb24ubGF0LFxyXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiB0aGlzLmxvY2F0aW9uLmxvbixcclxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucGFnZS5zaG9wX25hbWUsXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiB0aGlzLnBhZ2UuY2l0eV9uYW1lICsgdGhpcy5wYWdlLmFkZHJlc3NcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJywgbWFzazogdHJ1ZX0pXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgIHdvcmtJZDogcGFyYW1zLmlkXHJcbiAgICAgICAgICAgIH0sICcvSW52aXRlV29yay9nZXRMaWtlbmVzc0xpc3QnKSxcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICAndXNlcklkJzogd2VweS5nZXRTdG9yYWdlU3luYygndXNlcklkJykgfHwgMCxcclxuICAgICAgICAgICAgICAgICdpbnZpdGVXb3JrSWQnOiBwYXJhbXMuaWRcclxuICAgICAgICAgICAgfSwgJy9JbnZpdGVXb3JrL2dldEluZm8nKVxyXG4gICAgICAgIF0pLnRoZW4oKFt7ZGF0YTogbGlzdH0sIHtkYXRhfV0pID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuaW52aXRlV29ya0ZlZWRiYWNrLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmludml0ZVdvcmtGZWVkYmFjay5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS50YWdBcnIgPSBpdGVtLnRhZ19zdHIuc3BsaXQoJywnKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaW50ZXJ2aWV3ZXJfbnVtID0gTnVtYmVyLnBhcnNlSW50KGl0ZW0uaW50ZXJ2aWV3ZXJfbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZW52X251bSA9IE51bWJlci5wYXJzZUludChpdGVtLmVudl9udW0pXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb25mb3JtX251bSA9IE51bWJlci5wYXJzZUludChpdGVtLmNvbmZvcm1fbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc2FsYXJ5X251bSA9IE51bWJlci5wYXJzZUludChpdGVtLnNhbGFyeV9udW0pXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5saWtlX251bSA9IE51bWJlci5wYXJzZUludChpdGVtLmxpa2VfbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY3JlYXRlX3RpbWUgPSBmb3JtYXRUaW1lKE51bWJlci5wYXJzZUludChpdGVtLmNyZWF0ZV90aW1lKSAqIDEwMDAsIDIpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IGRhdGFcclxuICAgICAgICAgICAgdGhpcy5zaW1pbGFySm9iID0gbGlzdFxyXG4gICAgICAgICAgICB0aGlzLm1hcEFwaS5nZW9jb2Rlcih7XHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBkYXRhLmNpdHlfbmFtZSArIGRhdGEuYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7cmVzdWx0OiB7IGxvY2F0aW9uIH19KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5sb24gPSBsb2NhdGlvbi5sbmdcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmxhdCA9IGxvY2F0aW9uLmxhdFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMucGFnZS53b3JrX25hbWUsXHJcbiAgICAgICAgICAgIHBhdGg6IGAvcGFnZXMvam9iRGV0YWlsP2lkPSR7dGhpcy5wYWdlLmlkfSZ0eXBlPTFgLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKHJldClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZyhlcnIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICB3ZXB5Lm9uU29ja2V0TWVzc2FnZShyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCA9IE51bWJlci5wYXJzZUludCh0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCkgKyAxXHJcbiAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfmgqjmnInmlrDmtojmga8nfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAocGFyYW1zKSB7XHJcbiAgICAgICAgLy8gdGhpcy5sb2FkaW5nID0gdHJ1ZVxyXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJywgbWFzazogdHJ1ZX0pXHJcbiAgICAgICAgdGhpcy50eXBlID0gcGFyYW1zLnR5cGVcclxuICAgICAgICB0aGlzLmlkID0gcGFyYW1zLmlkXHJcbiAgICAgICAgR2V0KCd1c2VySWQnKS50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzTG9naW4gPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMudXNlcklkID0gcmV0XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhhc0xvZ2luID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy51c2VySWQgPSAnJ1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgd29ya0lkOiBwYXJhbXMuaWRcclxuICAgICAgICAgICAgfSwgJy9JbnZpdGVXb3JrL2dldExpa2VuZXNzTGlzdCcpLFxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgICd1c2VySWQnOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKSB8fCAwLFxyXG4gICAgICAgICAgICAgICAgJ2ludml0ZVdvcmtJZCc6IHBhcmFtcy5pZFxyXG4gICAgICAgICAgICB9LCAnL0ludml0ZVdvcmsvZ2V0SW5mbycpXHJcbiAgICAgICAgXSkudGhlbigoW3tkYXRhOiBsaXN0fSwge2RhdGF9XSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5pbnZpdGVXb3JrRmVlZGJhY2subGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuaW52aXRlV29ya0ZlZWRiYWNrLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnRhZ0FyciA9IGl0ZW0udGFnX3N0ci5zcGxpdCgnLCcpXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pbnRlcnZpZXdlcl9udW0gPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5pbnRlcnZpZXdlcl9udW0pXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5lbnZfbnVtID0gTnVtYmVyLnBhcnNlSW50KGl0ZW0uZW52X251bSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNvbmZvcm1fbnVtID0gTnVtYmVyLnBhcnNlSW50KGl0ZW0uY29uZm9ybV9udW0pXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zYWxhcnlfbnVtID0gTnVtYmVyLnBhcnNlSW50KGl0ZW0uc2FsYXJ5X251bSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmxpa2VfbnVtID0gTnVtYmVyLnBhcnNlSW50KGl0ZW0ubGlrZV9udW0pXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jcmVhdGVfdGltZSA9IGZvcm1hdFRpbWUoTnVtYmVyLnBhcnNlSW50KGl0ZW0uY3JlYXRlX3RpbWUpICogMTAwMCwgMilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wYWdlID0gZGF0YVxyXG4gICAgICAgICAgICB0aGlzLnNpbWlsYXJKb2IgPSBsaXN0XHJcbiAgICAgICAgICAgIHRoaXMubWFwQXBpLmdlb2NvZGVyKHtcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IGRhdGEuY2l0eV9uYW1lICsgZGF0YS5hZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHtyZXN1bHQ6IHsgbG9jYXRpb24gfX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmxvbiA9IGxvY2F0aW9uLmxuZ1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24ubGF0ID0gbG9jYXRpb24ubGF0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gdGhpcy5sb2FkaW5nID0gZmFsc2VcclxuICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uVW5sb2FkICgpIHtcclxuICAgICAgICB0aGlzLnRhZ0luZGV4ID0gMFxyXG4gICAgICAgIHRoaXMubmFtZUluZGV4ID0gLTFcclxuICAgICAgICB0aGlzLmhhc0xvZ2luID0gZmFsc2VcclxuICAgIH1cclxufVxyXG4iXX0=