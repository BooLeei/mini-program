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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYkRldGFpbC5qcyJdLCJuYW1lcyI6WyJKb2JEZXRhaWwiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInJlcXVlc3QiLCJkYXRhIiwiaGFzTG9naW4iLCJsb2FkaW5nIiwicGFnZSIsInRhZ0luZGV4IiwibmFtZUluZGV4IiwiY29tbWVudFNsaWRlIiwic2ltaWxhckpvYiIsImxvY2F0aW9uIiwibG9uIiwibGF0IiwidHlwZSIsImlkIiwidXNlcklkIiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJtYXBBcGkiLCJrZXkiLCJjb21wdXRlZCIsInB1Ymxpc2hUaW1lIiwidmFpbGRfdGltZV9zdGFydCIsIm1ldGhvZHMiLCJjb2xsZWN0IiwidG9hc3QiLCJjb250ZW50IiwibmF2aWdhdGVUbyIsInVybCIsIk51bWJlciIsInBhcnNlSW50IiwiaGFzQ29sbGVjdCIsIlBvc3QiLCJpbnZpdGVXb3JrSWQiLCJzdGF0dXMiLCJ0aGVuIiwidG9Db21wYW55IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJyZWRpcmVjdFRvIiwidXNlckNvbXBhbnkiLCJ0b0NoYXQiLCJ0ZW1wIiwiX2lkIiwiY2hhdFVzZXJJZCIsImNoYXRVc2VyTmFtZSIsIm5pY2tuYW1lIiwiY2hhdFVzZXJIZWFkZXJJbWFnZSIsImhlYWRlckltYWdlIiwiSlNPTiIsInN0cmluZ2lmeSIsInNlbmRSZXN1bWUiLCJ1c2VyQ29tcGFueUlkIiwiY2hlY2tQZXJpc2hlciIsInNob3dNb2RhbCIsInRpdGxlIiwiY29uZmlybUNvbG9yIiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYXRjaCIsImVyciIsInNob3dUYWdJbnRybyIsImUiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiaW5kZXgiLCJzaG93TmFtZURldGFpbCIsImNvbW1lbnRMaWtlIiwiaW52aXRlV29ya0ZlZWRiYWNrSWQiLCJpbnZpdGVXb3JrRmVlZGJhY2siLCJoYXNMaWtlIiwiJGFwcGx5Iiwib3Blbk1hcCIsIm9wZW5Mb2NhdGlvbiIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwibmFtZSIsInNob3BfbmFtZSIsImFkZHJlc3MiLCJjaXR5X25hbWUiLCIkaW52b2tlIiwic2hvd0xvYWRpbmciLCJtYXNrIiwiUHJvbWlzZSIsImFsbCIsIkdldCIsIndvcmtJZCIsInBhcmFtcyIsImdldFN0b3JhZ2VTeW5jIiwibGlzdCIsImxlbmd0aCIsImZvckVhY2giLCJpdGVtIiwidGFnQXJyIiwidGFnX3N0ciIsInNwbGl0IiwiaW50ZXJ2aWV3ZXJfbnVtIiwiZW52X251bSIsImNvbmZvcm1fbnVtIiwic2FsYXJ5X251bSIsImxpa2VfbnVtIiwiY3JlYXRlX3RpbWUiLCJnZW9jb2RlciIsInJlc3VsdCIsImxuZyIsImZhaWwiLCJoaWRlTG9hZGluZyIsIndvcmtfbmFtZSIsInBhdGgiLCJyZXQiLCJvblNvY2tldE1lc3NhZ2UiLCIkcGFyZW50IiwiZ2xvYmFsIiwiY3VyVmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7OztnTUFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCO0FBRm5CLFMsUUFLVEMsTyxHQUFVLHVCLFFBS1ZDLEksR0FBTztBQUNIQyxzQkFBVSxLQURQO0FBRUhDLHFCQUFTLEtBRk47QUFHSEMsa0JBQU0sSUFISDtBQUlIQyxzQkFBVSxDQUpQO0FBS0hDLHVCQUFXLENBQUMsQ0FMVDtBQU1IQywwQkFBYyxDQU5YO0FBT0hDLHdCQUFZO0FBUFQsUyxRQVVQQyxRLEdBQVc7QUFDUEMsaUJBQUssRUFERTtBQUVQQyxpQkFBSztBQUZFLFMsUUFLWEMsSSxHQUFPLEcsUUFDUEMsRSxHQUFLLEUsUUFDTEMsTSxHQUFTLEUsUUFLVkMsTSxHQUFTLEVBQUMsWUFB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LEdBQWdCLENBQWhCO0FBQ0EsaUJBQUtDLFNBQUwsR0FBaUIsQ0FBQyxDQUFsQjtBQUNBLGlCQUFLSixRQUFMLEdBQWdCLEtBQWhCO0FBQ0g7Ozs7RUExVGtDLGVBQUtFLEk7O2tCQUF2QlIsUyIsImZpbGUiOiJqb2JEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnLi4vY29tcG9uZW50cy90b2FzdCdcclxuaW1wb3J0IEpvYkl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9qb2ItbGlzdC1pdGVtJ1xyXG5pbXBvcnQgeyBmb3JtYXREYXksIGZvcm1hdFRpbWUgfSBmcm9tICcuLi91dGlscy9mb3JtYXRUaW1lJ1xyXG5pbXBvcnQge0dldH0gZnJvbSAnLi4vdXRpbHMvc3RvcmFnZSdcclxuaW1wb3J0IHsgUVFNQVBLRVkgfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnXHJcbmltcG9ydCBRUU1hcFdYIGZyb20gJy4uL3V0aWxzL3FxbWFwLXd4LWpzc2RrLm1pbidcclxuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm9iRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iBjOS9jeS/oeaBrydcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG4gICAgdG9hc3QgKGRhdGEgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvd1RvYXN0JywgZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGhhc0xvZ2luOiBmYWxzZSxcclxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICBwYWdlOiBudWxsLFxyXG4gICAgICAgIHRhZ0luZGV4OiAwLFxyXG4gICAgICAgIG5hbWVJbmRleDogLTEsXHJcbiAgICAgICAgY29tbWVudFNsaWRlOiAxLFxyXG4gICAgICAgIHNpbWlsYXJKb2I6IFtdXHJcbiAgICB9XHJcblxyXG4gICAgbG9jYXRpb24gPSB7XHJcbiAgICAgICAgbG9uOiAnJyxcclxuICAgICAgICBsYXQ6ICcnXHJcbiAgICB9XHJcblxyXG4gICAgdHlwZSA9ICcxJ1xyXG4gICAgaWQgPSAnJ1xyXG4gICAgdXNlcklkID0gJydcclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAkcHJvcHMgPSB7XCJqb2ItaXRlbVwiOntcInYtYmluZDpsaXN0SXRlbS5vbmNlXCI6e1wiZm9yXCI6XCJzaW1pbGFySm9iXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIixcInZhbHVlXCI6XCI5XCJ9LFwidHlwZVwiOntcImZvclwiOlwic2ltaWxhckpvYlwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCIsXCJ2YWx1ZVwiOlwiOVwifX0sXCJsb2FkaW5nXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzaG93LnN5bmNcIjpcImxvYWRpbmdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICdsb2FkaW5nJzogTG9hZGluZyxcclxuICAgICAgICAndG9hc3QnOiBUb2FzdCxcclxuICAgICAgICAnam9iLWl0ZW0nOiBKb2JJdGVtXHJcbiAgICB9XHJcblxyXG4gICAgbWFwQXBpID0gbmV3IFFRTWFwV1goe1xyXG4gICAgICAgIGtleTogUVFNQVBLRVlcclxuICAgIH0pXHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgICAgcHVibGlzaFRpbWUgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0RGF5KHRoaXMucGFnZS52YWlsZF90aW1lX3N0YXJ0LCAnLicpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGNvbGxlY3QgKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzTG9naW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7flhYjnmbvlvZUnfSlcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnbG9naW4nfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodGhpcy5wYWdlLmhhc0NvbGxlY3QpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaGFzQ29sbGVjdCA9IDBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5oYXNDb2xsZWN0ID0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5Qb3N0KHtcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXHJcbiAgICAgICAgICAgICAgICBpbnZpdGVXb3JrSWQ6IHRoaXMuaWQsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRoaXMucGFnZS5oYXNDb2xsZWN0XHJcbiAgICAgICAgICAgIH0sICcvSW52aXRlV29yay9jb2xsZWN0JylcclxuICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5oYXNDb2xsZWN0ID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+W3suaUtuiXjyd9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5Y+W5raI5pS26JePJ30pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b0NvbXBhbnkgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSAnMycpIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtkZWx0YTogMn0pXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnMicpIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtkZWx0YTogMX0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe3VybDogYGNvbXBhbnk/aWQ9JHt0aGlzLnBhZ2UudXNlckNvbXBhbnkuaWR9YH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvQ2hhdCAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0xvZ2luKSB7XHJcbiAgICAgICAgICAgICAgICBHZXQoJ2ZpbmlzaFR5cGUnKS50aGVuKHR5cGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodHlwZSkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXAgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaWQ6IE51bWJlci5wYXJzZUludCh0aGlzLnBhZ2UudXNlckNvbXBhbnkuaWQpIDwgTnVtYmVyLnBhcnNlSW50KHRoaXMudXNlcklkKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLnVzZXJDb21wYW55LmlkICsgJycgKyB0aGlzLnVzZXJJZCA6IHRoaXMudXNlcklkICsgJycgKyB0aGlzLnBhZ2UudXNlckNvbXBhbnkuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGF0VXNlcklkOiB0aGlzLnBhZ2UudXNlckNvbXBhbnkuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGF0VXNlck5hbWU6IHRoaXMucGFnZS51c2VyQ29tcGFueS5uaWNrbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXRVc2VySGVhZGVySW1hZ2U6IHRoaXMucGFnZS51c2VyQ29tcGFueS5oZWFkZXJJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGBjaGF0P3R5cGU9MiZ1c2VySWQ9JHt0aGlzLnVzZXJJZH0mbXNnPSR7SlNPTi5zdHJpbmdpZnkodGVtcCl9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7flhYjlrozlloTnroDljoYnfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdsb2dpbid9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZW5kUmVzdW1lICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTG9naW4pIHtcclxuICAgICAgICAgICAgICAgIEdldCgnZmluaXNoVHlwZScpLnRoZW4odHlwZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0eXBlKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuUG9zdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyQ29tcGFueUlkOiB0aGlzLnBhZ2UudXNlckNvbXBhbnkuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZpdGVXb3JrSWQ6IHRoaXMucGFnZS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy51c2VySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1BlcmlzaGVyOjFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgJy9SZXN1bWUvc2VuZCcpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+ehruWumuWQkeatpOiBjOS9jeaKlemAkuS9oOeahOeugOWOhu+8nycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybUNvbG9yOiAnIzQwYzRmZicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuUG9zdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckNvbXBhbnlJZDogdGhpcy5wYWdlLnVzZXJDb21wYW55LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludml0ZVdvcmtJZDogdGhpcy5wYWdlLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy51c2VySWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sICcvUmVzdW1lL3NlbmQnKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5bey5oqV6YCSJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKHtkYXRhOiByZXN9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmVyciA9PSAtMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICflt7Looqvlr7nmlrnmi4npu5EnfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmVyciA9PSAtNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICflr7nmlrnlt7LooqvkvaDmi4npu5HvvIzor7flhYjku47pu5HlkI3ljZXkuK3np7vlh7onfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmVyciA9PSAtNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICflt7LmipXpgJLov4fvvIwzMOWkqeWQjuWGjeadpeaKlemAkid9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7flhYjlrozlloTnroDljoYnfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdsb2dpbid9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93VGFnSW50cm8gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhZ0luZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdJbmRleCA9IE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ0luZGV4ID0gMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93TmFtZURldGFpbCAoaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubmFtZUluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lSW5kZXggPSAtMVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lSW5kZXggPSBOdW1iZXIucGFyc2VJbnQoaW5kZXgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbW1lbnRMaWtlIChpbmRleCwgaWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTG9naW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5Qb3N0KHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIGludml0ZVdvcmtGZWVkYmFja0lkOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHRoaXMucGFnZS5pbnZpdGVXb3JrRmVlZGJhY2tbaW5kZXhdLmhhc0xpa2UgPT0gMSA/ICcwJyA6ICcxJ1xyXG4gICAgICAgICAgICAgICAgfSwgJy9JbnZpdGVXb3JrRmVlZGJhY2svbGlrZScpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5pbnZpdGVXb3JrRmVlZGJhY2tbaW5kZXhdLmhhc0xpa2UgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuaW52aXRlV29ya0ZlZWRiYWNrW2luZGV4XS5oYXNMaWtlID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1lbnRTbGlkZSA9IHRoaXMuY29tbWVudFNsaWRlIC0gMVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5pbnZpdGVXb3JrRmVlZGJhY2tbaW5kZXhdLmhhc0xpa2UgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudFNsaWRlID0gdGhpcy5jb21tZW50U2xpZGUgKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9wZW5NYXAgKCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm9wZW5Mb2NhdGlvbih7XHJcbiAgICAgICAgICAgICAgICBsYXRpdHVkZTogdGhpcy5sb2NhdGlvbi5sYXQsXHJcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6IHRoaXMubG9jYXRpb24ubG9uLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wYWdlLnNob3BfbmFtZSxcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IHRoaXMucGFnZS5jaXR5X25hbWUgKyB0aGlzLnBhZ2UuYWRkcmVzc1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaCAoKSB7XHJcbiAgICAgICAgd2VweS5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0uLi4nLCBtYXNrOiB0cnVlfSlcclxuICAgICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgd29ya0lkOiBwYXJhbXMuaWRcclxuICAgICAgICAgICAgfSwgJy9JbnZpdGVXb3JrL2dldExpa2VuZXNzTGlzdCcpLFxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgICd1c2VySWQnOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKSB8fCAwLFxyXG4gICAgICAgICAgICAgICAgJ2ludml0ZVdvcmtJZCc6IHBhcmFtcy5pZFxyXG4gICAgICAgICAgICB9LCAnL0ludml0ZVdvcmsvZ2V0SW5mbycpXHJcbiAgICAgICAgXSkudGhlbigoW3tkYXRhOiBsaXN0fSwge2RhdGF9XSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5pbnZpdGVXb3JrRmVlZGJhY2subGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuaW52aXRlV29ya0ZlZWRiYWNrLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnRhZ0FyciA9IGl0ZW0udGFnX3N0ci5zcGxpdCgnLCcpXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pbnRlcnZpZXdlcl9udW0gPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5pbnRlcnZpZXdlcl9udW0pXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5lbnZfbnVtID0gTnVtYmVyLnBhcnNlSW50KGl0ZW0uZW52X251bSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNvbmZvcm1fbnVtID0gTnVtYmVyLnBhcnNlSW50KGl0ZW0uY29uZm9ybV9udW0pXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zYWxhcnlfbnVtID0gTnVtYmVyLnBhcnNlSW50KGl0ZW0uc2FsYXJ5X251bSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmxpa2VfbnVtID0gTnVtYmVyLnBhcnNlSW50KGl0ZW0ubGlrZV9udW0pXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jcmVhdGVfdGltZSA9IGZvcm1hdFRpbWUoTnVtYmVyLnBhcnNlSW50KGl0ZW0uY3JlYXRlX3RpbWUpICogMTAwMCwgMilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wYWdlID0gZGF0YVxyXG4gICAgICAgICAgICB0aGlzLnNpbWlsYXJKb2IgPSBsaXN0XHJcbiAgICAgICAgICAgIHRoaXMubWFwQXBpLmdlb2NvZGVyKHtcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IGRhdGEuY2l0eV9uYW1lICsgZGF0YS5hZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHtyZXN1bHQ6IHsgbG9jYXRpb24gfX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmxvbiA9IGxvY2F0aW9uLmxuZ1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24ubGF0ID0gbG9jYXRpb24ubGF0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5wYWdlLndvcmtfbmFtZSxcclxuICAgICAgICAgICAgcGF0aDogYC9wYWdlcy9qb2JEZXRhaWw/aWQ9JHt0aGlzLnBhZ2UuaWR9JnR5cGU9MWAsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2cocmV0KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKGVycilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICAgIHdlcHkub25Tb2NrZXRNZXNzYWdlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsID0gTnVtYmVyLnBhcnNlSW50KHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsKSArIDFcclxuICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+aCqOacieaWsOa2iOaBryd9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkIChwYXJhbXMpIHtcclxuICAgICAgICAvLyB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICAgICAgd2VweS5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0uLi4nLCBtYXNrOiB0cnVlfSlcclxuICAgICAgICB0aGlzLnR5cGUgPSBwYXJhbXMudHlwZVxyXG4gICAgICAgIHRoaXMuaWQgPSBwYXJhbXMuaWRcclxuICAgICAgICBHZXQoJ3VzZXJJZCcpLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oYXNMb2dpbiA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy51c2VySWQgPSByZXRcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzTG9naW4gPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnVzZXJJZCA9ICcnXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgICAgIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICB3b3JrSWQ6IHBhcmFtcy5pZFxyXG4gICAgICAgICAgICB9LCAnL0ludml0ZVdvcmsvZ2V0TGlrZW5lc3NMaXN0JyksXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgJ3VzZXJJZCc6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpIHx8IDAsXHJcbiAgICAgICAgICAgICAgICAnaW52aXRlV29ya0lkJzogcGFyYW1zLmlkXHJcbiAgICAgICAgICAgIH0sICcvSW52aXRlV29yay9nZXRJbmZvJylcclxuICAgICAgICBdKS50aGVuKChbe2RhdGE6IGxpc3R9LCB7ZGF0YX1dKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmludml0ZVdvcmtGZWVkYmFjay5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5pbnZpdGVXb3JrRmVlZGJhY2suZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udGFnQXJyID0gaXRlbS50YWdfc3RyLnNwbGl0KCcsJylcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmludGVydmlld2VyX251bSA9IE51bWJlci5wYXJzZUludChpdGVtLmludGVydmlld2VyX251bSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmVudl9udW0gPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5lbnZfbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY29uZm9ybV9udW0gPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5jb25mb3JtX251bSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNhbGFyeV9udW0gPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5zYWxhcnlfbnVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubGlrZV9udW0gPSBOdW1iZXIucGFyc2VJbnQoaXRlbS5saWtlX251bSlcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNyZWF0ZV90aW1lID0gZm9ybWF0VGltZShOdW1iZXIucGFyc2VJbnQoaXRlbS5jcmVhdGVfdGltZSkgKiAxMDAwLCAyKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuc2ltaWxhckpvYiA9IGxpc3RcclxuICAgICAgICAgICAgdGhpcy5tYXBBcGkuZ2VvY29kZXIoe1xyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogZGF0YS5jaXR5X25hbWUgKyBkYXRhLmFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoe3Jlc3VsdDogeyBsb2NhdGlvbiB9fSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24ubG9uID0gbG9jYXRpb24ubG5nXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5sYXQgPSBsb2NhdGlvbi5sYXRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25VbmxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMudGFnSW5kZXggPSAwXHJcbiAgICAgICAgdGhpcy5uYW1lSW5kZXggPSAtMVxyXG4gICAgICAgIHRoaXMuaGFzTG9naW4gPSBmYWxzZVxyXG4gICAgfVxyXG59XHJcbiJdfQ==