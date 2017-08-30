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

var _compProgress = require('./../components/comp-progress.js');

var _compProgress2 = _interopRequireDefault(_compProgress);

var _jobListItem = require('./../components/job-list-item.js');

var _jobListItem2 = _interopRequireDefault(_jobListItem);

var _constants = require('./../utils/constants.js');

var _storage = require('./../utils/storage.js');

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _qqmapWxJssdk = require('./../utils/qqmap-wx-jssdk.min.js');

var _qqmapWxJssdk2 = _interopRequireDefault(_qqmapWxJssdk);

var _imageUtils = require('./../utils/imageUtils.js');

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import ShopItem from '../components/comp-shop-item'
// import SchoolItem from '../components/comp-school-item'
// import ProdItem from '../components/comp-prod-item'

// import Modal from '../components/modal-popup'
// import SimpleModal from '../components/simple-modal-popup'


var Company = function (_wepy$page) {
    _inherits(Company, _wepy$page);

    function Company() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Company);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Company.__proto__ || Object.getPrototypeOf(Company)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTextStyle: 'white',
            backgroundTextStyle: 'white',
            navigationBarBackgroundColor: '#40c4ff',
            navigationBarTitleText: '公司信息',
            onReachBottomDistance: 100
        }, _this.data = {
            loading: false,
            follow: 1,
            nameHidden: true,
            tabIndex: 1,
            tabFixed: false,
            unfold: false,
            comment: false,
            teamDetail: false,
            shopDetail: false,
            teamIndex: 0,
            shopIndex: 0,
            baseData: null,
            about: null,
            tempProgress: [],
            team: [],
            shop: [],
            job: [],
            commentStar: [{
                text: '品牌知名度',
                star: 0
            }, {
                text: '行业影响力',
                star: 0
            }, {
                text: '企业规模',
                star: 0
            }, {
                text: '团队人才',
                star: 0
            }, {
                text: '薪资福利',
                star: 0
            }, {
                text: '发展潜力',
                star: 0
            }]
        }, _this.mapApi = new _qqmapWxJssdk2.default({
            key: _constants.QQMAPKEY
        }), _this.login = {
            has: false,
            userId: '',
            id: ''
        }, _this.request = new _request2.default(), _this.location = {
            lon: '',
            lat: ''
        }, _this.scrollTop = 0, _this.$props = { "job-item": { "xmlns:v-bind": { "for": "job", "item": "item", "index": "index", "key": "{{index}}", "value": "2" }, "v-bind:listItem.once": { "for": "job", "item": "item", "index": "index", "key": "{{index}}", "value": "2" }, "type": { "for": "job", "item": "item", "index": "index", "key": "{{index}}", "value": "2" } }, "progress": { "xmlns:v-bind": "", "v-bind:item.once": "items" } }, _this.$events = {}, _this.components = {
            'loading': _loading2.default,
            // 'comment': Modal,
            'progress': _compProgress2.default,
            // 'shop-item': ShopItem,
            // 'school-item': SchoolItem,
            // 'prod-item': ProdItem,
            // 'team-modal': SimpleModal,
            'job-item': _jobListItem2.default,
            'toast': _toast2.default
        }, _this.computed = {
            detailAddress: function detailAddress() {
                if (this.about) {
                    return this.about.location.substring(this.about.location.lastIndexOf('-') + 1, this.about.location.length) + this.about.address;
                }
            }
        }, _this.events = {
            // 'comment': (...args) => {
            //     log(args)
            //     this.comment = false
            // },
            // 'emitIndex': (index, e) => {
            //     log(index)
            //     log(e)
            //     this.shopIndex = Number.parseInt(index)
            //     this.shopDetail = true
            // }
        }, _this.methods = {
            showName: function showName() {
                this.nameHidden = !this.nameHidden;
            },
            toggleTab: function toggleTab(e) {
                this.tabIndex = Number.parseInt(e.target.dataset.index);
            },
            preview: function preview(e) {
                (0, _imageUtils.Preview)(e.target.dataset.index, this.about.imgListFull);
            },
            slide: function slide() {
                this.unfold = !this.unfold;
            },
            showComment: function showComment() {
                if (!this.login.has) {
                    this.toast({ content: '请先登录' });
                    _wepy2.default.navigateTo({ url: 'login' });
                    return false;
                }
                this.comment = true;
            },
            hideComment: function hideComment() {
                this.comment = false;
            },
            sureComment: function sureComment() {
                var _this2 = this;

                // 调评价接口
                this.request.Post({
                    userCompanyId: this.login.id,
                    userId: this.login.userId,
                    brandRecognition: this.commentStar[0].star,
                    influence: this.commentStar[1].star,
                    scale: this.commentStar[2].star,
                    talents: this.commentStar[3].star,
                    salary: this.commentStar[4].star,
                    develop: this.commentStar[5].star
                }, '/UserCompanyAppraiseList/add').then(function (ret) {
                    _this2.toast({ content: '评价成功' });
                    _this2.comment = false;
                    _this2.$apply();
                }).catch(function (_ref2) {
                    var data = _ref2.data;

                    if (data.err == 21311201) {
                        _this2.toast({ content: '您已评价过，请90天后再来评价' });
                    } else if (data.err == -1) {
                        _this2.toast({ content: '您还未完成评价' });
                    }
                });
            },
            changeStar: function changeStar(e) {
                if (e.target.dataset.id !== undefined && e.target.dataset.index !== undefined) {
                    if (this.commentStar[e.target.dataset.id].star === e.target.dataset.index + 1) {
                        this.commentStar[e.target.dataset.id].star = 0;
                    } else {
                        this.commentStar[e.target.dataset.id].star = e.target.dataset.index + 1;
                    }
                }
            },
            showTeamIntro: function showTeamIntro(index) {
                this.teamIndex = index;
                this.teamDetail = true;
            },
            hideTeamPopup: function hideTeamPopup() {
                this.teamDetail = false;
            },
            hideShopPopup: function hideShopPopup() {
                this.shopDetail = false;
            },
            openMap: function openMap() {
                _wepy2.default.openLocation({
                    latitude: this.location.lat,
                    longitude: this.location.lon,
                    name: this.baseData.nickname,
                    address: this.baseData.cityName + this.detailAddress
                });
            },
            showDetail: function showDetail(index) {
                this.shopIndex = Number.parseInt(index);
                this.shopDetail = true;
            },
            followCompany: function followCompany() {
                var _this3 = this;

                if (!this.login.has) {
                    this.toast({ content: '请先登录' });
                    _wepy2.default.navigateTo({ url: 'login' });
                    return false;
                }
                var type = this.baseData.hasOperate == 1 ? 0 : 1;
                this.request.Post({
                    userId: this.login.userId,
                    objectId: this.login.id,
                    type: 1,
                    status: type
                }, '/UserOperate/addUserOperate').then(function (ret) {
                    if (_this3.baseData.hasOperate == 1) {
                        _this3.toast({ content: '已取消关注' });
                        _this3.baseData.hasOperate = 0;
                        if (_this3.follow == 2) {
                            _this3.follow = 1;
                        } else if (_this3.follow == 1) {
                            _this3.follow = 0;
                        } else {
                            return;
                        }
                    } else {
                        _this3.toast({ content: '已关注' });
                        _this3.baseData.hasOperate = 1;
                        if (_this3.follow == 0) {
                            _this3.follow = 1;
                        } else if (_this3.follow == 1) {
                            _this3.follow = 2;
                        } else {
                            return;
                        }
                    }
                    _this3.$apply();
                });
            },
            stopPropagation: function stopPropagation() {
                return false;
            }
        }, _this.watch = {
            tabIndex: function tabIndex(newVal, oldVal) {
                var _this4 = this;

                if (newVal > 1) {
                    switch (newVal) {
                        case 2:
                            this.request.Get({
                                'userCompanyId': this.baseData.userId
                            }, '/CompanyManager/getList').then(function (_ref3) {
                                var data = _ref3.data;

                                (0, _log.log)(data);
                                _this4.team = data;
                                _this4.$apply();
                            });
                            break;
                        case 3:
                            this.request.Get({
                                'userCompanyId': this.baseData.userId,
                                'companyType': this.baseData.companyType
                            }, '/ShopList/getList').then(function (_ref4) {
                                var data = _ref4.data;

                                (0, _log.log)(data);
                                _this4.shop = data;
                                _this4.$apply();
                            });
                            break;
                        case 4:
                            this.request.Get({
                                'userCompanyId': this.baseData.userId
                            }, '/InviteWork/getListByUserCompanyId').then(function (_ref5) {
                                var data = _ref5.data;

                                (0, _log.log)(data);
                                _this4.job = data;
                                _this4.$apply();
                            });
                            break;
                        default:
                    }
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Company, [{
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'onShareAppMessage',
        value: function onShareAppMessage() {
            return {
                title: this.baseData.nickname,
                path: '/pages/company?id=' + this.baseData.userId,
                success: function success(ret) {
                    (0, _log.log)(ret);
                },
                fail: function fail(err) {
                    (0, _log.log)(err);
                }
            };
        }
    }, {
        key: 'onPageScroll',
        value: function onPageScroll(e) {
            if (e.scrollTop >= 335) {
                this.tabFixed = true;
            } else {
                this.tabFixed = false;
            }
        }

        /**
         * 页面卸载后清除逻辑数据
         */

    }, {
        key: 'onUnload',
        value: function onUnload() {
            this.nameHidden = true;
            this.tabIndex = 1;
            this.tabFixed = false;
            this.unfold = false;
            this.comment = false;
            this.teamDetail = false;
            this.shopDetail = false;
            this.teamIndex = 0;
            this.shopIndex = 0;
            this.baseData = null;
            this.about = null;
            this.tempProgress = [];
            this.team = [];
            this.shop = [];
            this.job = [];
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this5 = this;

            _wepy2.default.onSocketMessage(function (res) {
                _this5.$parent.global.curVal = Number.parseInt(_this5.$parent.global.curVal) + 1;
                _this5.toast({ content: '您有新消息' });
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this6 = this;

            // this.loading = true
            _wepy2.default.showLoading({ title: '加载中...' });
            this.login.id = params.id;
            (0, _storage.Get)('userId').then(function (ret) {
                _this6.login.has = true;
                _this6.login.userId = ret;
                _this6.$apply();
            }).catch(function (err) {
                _this6.login.has = false;
                _this6.$apply();
            });
            wx.createSelectorQuery().select('#fixed').boundingClientRect(function (rect) {
                _this6.scrollTop = rect.top;
            }).exec();
            Promise.all([this.request.Get({ 'userCompanyId': params.id }, '/Company/getAbout'), this.request.Get({ 'userCompanyId': params.id, 'userId': _wepy2.default.getStorageSync('userId') || 0 }, '/Company/getInfo')]).then(function (_ref6) {
                var _ref7 = _slicedToArray(_ref6, 2),
                    about = _ref7[0].data,
                    info = _ref7[1].data;

                (0, _log.log)(info);
                info.companyType = Number.parseInt(info.companyType);
                info.attentionNum = Number.parseInt(info.attentionNum);
                _this6.baseData = info;
                _this6.tempProgress = about.progressList.slice(0, 3);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this6.tempProgress[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        item.year = item.time.slice(0, 4);
                        item.month = item.time.slice(4, 6);
                        item.day = item.time.slice(6, 8);
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

                if (_this6.tempProgress.length > 0) {
                    _this6.tempProgress[_this6.tempProgress.length - 1].last = true;
                }
                _this6.about = about;
                _this6.loading = false;
                _this6.$apply();
                _this6.mapApi.geocoder({
                    address: _this6.baseData.cityName + _this6.detailAddress,
                    success: function success(_ref8) {
                        var location = _ref8.result.location;

                        _this6.location.lon = location.lng;
                        _this6.location.lat = location.lat;
                    },
                    fail: function fail(err) {
                        (0, _log.log)(err);
                    }
                });
                _wepy2.default.hideLoading();
            });
        }
    }]);

    return Company;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Company , 'pages/company'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbnkuanMiXSwibmFtZXMiOlsiQ29tcGFueSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJvblJlYWNoQm90dG9tRGlzdGFuY2UiLCJkYXRhIiwibG9hZGluZyIsImZvbGxvdyIsIm5hbWVIaWRkZW4iLCJ0YWJJbmRleCIsInRhYkZpeGVkIiwidW5mb2xkIiwiY29tbWVudCIsInRlYW1EZXRhaWwiLCJzaG9wRGV0YWlsIiwidGVhbUluZGV4Iiwic2hvcEluZGV4IiwiYmFzZURhdGEiLCJhYm91dCIsInRlbXBQcm9ncmVzcyIsInRlYW0iLCJzaG9wIiwiam9iIiwiY29tbWVudFN0YXIiLCJ0ZXh0Iiwic3RhciIsIm1hcEFwaSIsImtleSIsImxvZ2luIiwiaGFzIiwidXNlcklkIiwiaWQiLCJyZXF1ZXN0IiwibG9jYXRpb24iLCJsb24iLCJsYXQiLCJzY3JvbGxUb3AiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNvbXB1dGVkIiwiZGV0YWlsQWRkcmVzcyIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwibGVuZ3RoIiwiYWRkcmVzcyIsImV2ZW50cyIsIm1ldGhvZHMiLCJzaG93TmFtZSIsInRvZ2dsZVRhYiIsImUiLCJOdW1iZXIiLCJwYXJzZUludCIsInRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsInByZXZpZXciLCJpbWdMaXN0RnVsbCIsInNsaWRlIiwic2hvd0NvbW1lbnQiLCJ0b2FzdCIsImNvbnRlbnQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiaGlkZUNvbW1lbnQiLCJzdXJlQ29tbWVudCIsIlBvc3QiLCJ1c2VyQ29tcGFueUlkIiwiYnJhbmRSZWNvZ25pdGlvbiIsImluZmx1ZW5jZSIsInNjYWxlIiwidGFsZW50cyIsInNhbGFyeSIsImRldmVsb3AiLCJ0aGVuIiwiJGFwcGx5IiwiY2F0Y2giLCJlcnIiLCJjaGFuZ2VTdGFyIiwidW5kZWZpbmVkIiwic2hvd1RlYW1JbnRybyIsImhpZGVUZWFtUG9wdXAiLCJoaWRlU2hvcFBvcHVwIiwib3Blbk1hcCIsIm9wZW5Mb2NhdGlvbiIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwibmFtZSIsIm5pY2tuYW1lIiwiY2l0eU5hbWUiLCJzaG93RGV0YWlsIiwiZm9sbG93Q29tcGFueSIsInR5cGUiLCJoYXNPcGVyYXRlIiwib2JqZWN0SWQiLCJzdGF0dXMiLCJzdG9wUHJvcGFnYXRpb24iLCJ3YXRjaCIsIm5ld1ZhbCIsIm9sZFZhbCIsIkdldCIsImNvbXBhbnlUeXBlIiwiJGludm9rZSIsInRpdGxlIiwicGF0aCIsInN1Y2Nlc3MiLCJyZXQiLCJmYWlsIiwib25Tb2NrZXRNZXNzYWdlIiwiJHBhcmVudCIsImdsb2JhbCIsImN1clZhbCIsInBhcmFtcyIsInNob3dMb2FkaW5nIiwid3giLCJjcmVhdGVTZWxlY3RvclF1ZXJ5Iiwic2VsZWN0IiwiYm91bmRpbmdDbGllbnRSZWN0IiwicmVjdCIsInRvcCIsImV4ZWMiLCJQcm9taXNlIiwiYWxsIiwiZ2V0U3RvcmFnZVN5bmMiLCJpbmZvIiwiYXR0ZW50aW9uTnVtIiwicHJvZ3Jlc3NMaXN0Iiwic2xpY2UiLCJpdGVtIiwieWVhciIsInRpbWUiLCJtb250aCIsImRheSIsImxhc3QiLCJnZW9jb2RlciIsInJlc3VsdCIsImxuZyIsImhpZGVMb2FkaW5nIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUlBOzs7O0FBR0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7QUFYQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0lBUXFCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0IsT0FEbkI7QUFFTEMsaUNBQXFCLE9BRmhCO0FBR0xDLDBDQUE4QixTQUh6QjtB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LEdBQTJCLENBQTdDLEVBQWdEeUYsSUFBaEQsR0FBdUQsSUFBdkQ7QUFDSDtBQUNELHVCQUFLbkgsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsdUJBQUtaLE9BQUwsR0FBZSxLQUFmO0FBQ0EsdUJBQUtxRSxNQUFMO0FBQ0EsdUJBQUtqRCxNQUFMLENBQVk0RyxRQUFaLENBQXFCO0FBQ2pCekYsNkJBQVMsT0FBSzVCLFFBQUwsQ0FBY3dFLFFBQWQsR0FBeUIsT0FBS2hELGFBRHRCO0FBRWpCZ0UsNkJBQVMsd0JBQTRCO0FBQUEsNEJBQWhCeEUsUUFBZ0IsU0FBMUJzRyxNQUEwQixDQUFoQnRHLFFBQWdCOztBQUNqQywrQkFBS0EsUUFBTCxDQUFjQyxHQUFkLEdBQW9CRCxTQUFTdUcsR0FBN0I7QUFDQSwrQkFBS3ZHLFFBQUwsQ0FBY0UsR0FBZCxHQUFvQkYsU0FBU0UsR0FBN0I7QUFDSCxxQkFMZ0I7QUFNakJ3RSwwQkFBTSxtQkFBTztBQUNULHNDQUFJOUIsR0FBSjtBQUNIO0FBUmdCLGlCQUFyQjtBQVVBLCtCQUFLNEQsV0FBTDtBQUNILGFBL0JEO0FBZ0NIOzs7O0VBaFhnQyxlQUFLQyxJOztrQkFBckI1SSxPIiwiZmlsZSI6ImNvbXBhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQgUHJvZ3Jlc3MgZnJvbSAnLi4vY29tcG9uZW50cy9jb21wLXByb2dyZXNzJ1xyXG4vLyBpbXBvcnQgU2hvcEl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21wLXNob3AtaXRlbSdcclxuLy8gaW1wb3J0IFNjaG9vbEl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21wLXNjaG9vbC1pdGVtJ1xyXG4vLyBpbXBvcnQgUHJvZEl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21wLXByb2QtaXRlbSdcclxuaW1wb3J0IEpvYkl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9qb2ItbGlzdC1pdGVtJ1xyXG4vLyBpbXBvcnQgTW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbC1wb3B1cCdcclxuLy8gaW1wb3J0IFNpbXBsZU1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvc2ltcGxlLW1vZGFsLXBvcHVwJ1xyXG5pbXBvcnQgeyBRUU1BUEtFWSB9IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cydcclxuaW1wb3J0IHtHZXR9IGZyb20gJy4uL3V0aWxzL3N0b3JhZ2UnXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0J1xyXG5pbXBvcnQgUVFNYXBXWCBmcm9tICcuLi91dGlscy9xcW1hcC13eC1qc3Nkay5taW4nXHJcbmltcG9ydCB7IFByZXZpZXcgfSBmcm9tICcuLi91dGlscy9pbWFnZVV0aWxzJ1xyXG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcGFueSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJyxcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnd2hpdGUnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjNDBjNGZmJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5YWs5Y+45L+h5oGvJyxcclxuICAgICAgICBvblJlYWNoQm90dG9tRGlzdGFuY2U6IDEwMFxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgZm9sbG93OiAxLFxyXG4gICAgICAgIG5hbWVIaWRkZW46IHRydWUsXHJcbiAgICAgICAgdGFiSW5kZXg6IDEsXHJcbiAgICAgICAgdGFiRml4ZWQ6IGZhbHNlLFxyXG4gICAgICAgIHVuZm9sZDogZmFsc2UsXHJcbiAgICAgICAgY29tbWVudDogZmFsc2UsXHJcbiAgICAgICAgdGVhbURldGFpbDogZmFsc2UsXHJcbiAgICAgICAgc2hvcERldGFpbDogZmFsc2UsXHJcbiAgICAgICAgdGVhbUluZGV4OiAwLFxyXG4gICAgICAgIHNob3BJbmRleDogMCxcclxuICAgICAgICBiYXNlRGF0YTogbnVsbCxcclxuICAgICAgICBhYm91dDogbnVsbCxcclxuICAgICAgICB0ZW1wUHJvZ3Jlc3M6IFtdLFxyXG4gICAgICAgIHRlYW06IFtdLFxyXG4gICAgICAgIHNob3A6IFtdLFxyXG4gICAgICAgIGpvYjogW10sXHJcbiAgICAgICAgY29tbWVudFN0YXI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+WTgeeJjOefpeWQjeW6picsXHJcbiAgICAgICAgICAgICAgICBzdGFyOiAwXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfooYzkuJrlvbHlk43lipsnLFxyXG4gICAgICAgICAgICAgICAgc3RhcjogMFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5LyB5Lia6KeE5qihJyxcclxuICAgICAgICAgICAgICAgIHN0YXI6IDBcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+WboumYn+S6uuaJjScsXHJcbiAgICAgICAgICAgICAgICBzdGFyOiAwXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfolqrotYTnpo/liKknLFxyXG4gICAgICAgICAgICAgICAgc3RhcjogMFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5Y+R5bGV5r2c5YqbJyxcclxuICAgICAgICAgICAgICAgIHN0YXI6IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXHJcbiAgICBtYXBBcGkgPSBuZXcgUVFNYXBXWCh7XHJcbiAgICAgICAga2V5OiBRUU1BUEtFWVxyXG4gICAgfSlcclxuXHJcbiAgICBsb2dpbiA9IHtcclxuICAgICAgICBoYXM6IGZhbHNlLFxyXG4gICAgICAgIHVzZXJJZDogJycsXHJcbiAgICAgICAgaWQ6ICcnXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICBsb2NhdGlvbiA9IHtcclxuICAgICAgICBsb246ICcnLFxyXG4gICAgICAgIGxhdDogJydcclxuICAgIH1cclxuXHJcbiAgICBzY3JvbGxUb3AgPSAwXHJcblxyXG4gICAkcHJvcHMgPSB7XCJqb2ItaXRlbVwiOntcInhtbG5zOnYtYmluZFwiOntcImZvclwiOlwiam9iXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwie3tpbmRleH19XCIsXCJ2YWx1ZVwiOlwiMlwifSxcInYtYmluZDpsaXN0SXRlbS5vbmNlXCI6e1wiZm9yXCI6XCJqb2JcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJ7e2luZGV4fX1cIixcInZhbHVlXCI6XCIyXCJ9LFwidHlwZVwiOntcImZvclwiOlwiam9iXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwie3tpbmRleH19XCIsXCJ2YWx1ZVwiOlwiMlwifX0sXCJwcm9ncmVzc1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6aXRlbS5vbmNlXCI6XCJpdGVtc1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgJ2xvYWRpbmcnOiBMb2FkaW5nLFxyXG4gICAgICAgIC8vICdjb21tZW50JzogTW9kYWwsXHJcbiAgICAgICAgJ3Byb2dyZXNzJzogUHJvZ3Jlc3MsXHJcbiAgICAgICAgLy8gJ3Nob3AtaXRlbSc6IFNob3BJdGVtLFxyXG4gICAgICAgIC8vICdzY2hvb2wtaXRlbSc6IFNjaG9vbEl0ZW0sXHJcbiAgICAgICAgLy8gJ3Byb2QtaXRlbSc6IFByb2RJdGVtLFxyXG4gICAgICAgIC8vICd0ZWFtLW1vZGFsJzogU2ltcGxlTW9kYWwsXHJcbiAgICAgICAgJ2pvYi1pdGVtJzogSm9iSXRlbSxcclxuICAgICAgICAndG9hc3QnOiBUb2FzdFxyXG4gICAgfVxyXG5cclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgICAgZGV0YWlsQWRkcmVzcyAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFib3V0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hYm91dC5sb2NhdGlvbi5zdWJzdHJpbmcodGhpcy5hYm91dC5sb2NhdGlvbi5sYXN0SW5kZXhPZignLScpICsgMSwgdGhpcy5hYm91dC5sb2NhdGlvbi5sZW5ndGgpICsgdGhpcy5hYm91dC5hZGRyZXNzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICAgIC8vICdjb21tZW50JzogKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAvLyAgICAgbG9nKGFyZ3MpXHJcbiAgICAgICAgLy8gICAgIHRoaXMuY29tbWVudCA9IGZhbHNlXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyAnZW1pdEluZGV4JzogKGluZGV4LCBlKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGxvZyhpbmRleClcclxuICAgICAgICAvLyAgICAgbG9nKGUpXHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2hvcEluZGV4ID0gTnVtYmVyLnBhcnNlSW50KGluZGV4KVxyXG4gICAgICAgIC8vICAgICB0aGlzLnNob3BEZXRhaWwgPSB0cnVlXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgc2hvd05hbWUgKCkge1xyXG4gICAgICAgICAgICB0aGlzLm5hbWVIaWRkZW4gPSAhdGhpcy5uYW1lSGlkZGVuXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b2dnbGVUYWIgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy50YWJJbmRleCA9IE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmluZGV4KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJldmlldyAoZSkge1xyXG4gICAgICAgICAgICBQcmV2aWV3KGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgsIHRoaXMuYWJvdXQuaW1nTGlzdEZ1bGwpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzbGlkZSAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudW5mb2xkID0gIXRoaXMudW5mb2xkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93Q29tbWVudCAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5sb2dpbi5oYXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7flhYjnmbvlvZUnfSlcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnbG9naW4nfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWVudCA9IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhpZGVDb21tZW50ICgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tZW50ID0gZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1cmVDb21tZW50ICgpIHtcclxuICAgICAgICAgICAgLy8g6LCD6K+E5Lu35o6l5Y+jXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5Qb3N0KHtcclxuICAgICAgICAgICAgICAgIHVzZXJDb21wYW55SWQ6IHRoaXMubG9naW4uaWQsXHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMubG9naW4udXNlcklkLFxyXG4gICAgICAgICAgICAgICAgYnJhbmRSZWNvZ25pdGlvbjogdGhpcy5jb21tZW50U3RhclswXS5zdGFyLFxyXG4gICAgICAgICAgICAgICAgaW5mbHVlbmNlOiB0aGlzLmNvbW1lbnRTdGFyWzFdLnN0YXIsXHJcbiAgICAgICAgICAgICAgICBzY2FsZTogdGhpcy5jb21tZW50U3RhclsyXS5zdGFyLFxyXG4gICAgICAgICAgICAgICAgdGFsZW50czogdGhpcy5jb21tZW50U3RhclszXS5zdGFyLFxyXG4gICAgICAgICAgICAgICAgc2FsYXJ5OiB0aGlzLmNvbW1lbnRTdGFyWzRdLnN0YXIsXHJcbiAgICAgICAgICAgICAgICBkZXZlbG9wOiB0aGlzLmNvbW1lbnRTdGFyWzVdLnN0YXJcclxuICAgICAgICAgICAgfSwgJy9Vc2VyQ29tcGFueUFwcHJhaXNlTGlzdC9hZGQnKVxyXG4gICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivhOS7t+aIkOWKnyd9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tZW50ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmVyciA9PSAyMTMxMTIwMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfmgqjlt7Lor4Tku7fov4fvvIzor7c5MOWkqeWQjuWGjeadpeivhOS7tyd9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmVyciA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfmgqjov5jmnKrlrozmiJDor4Tku7cnfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoYW5nZVN0YXIgKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuaWQgIT09IHVuZGVmaW5lZCAmJiBlLnRhcmdldC5kYXRhc2V0LmluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbW1lbnRTdGFyW2UudGFyZ2V0LmRhdGFzZXQuaWRdLnN0YXIgPT09IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXggKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21tZW50U3RhcltlLnRhcmdldC5kYXRhc2V0LmlkXS5zdGFyID0gMFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1lbnRTdGFyW2UudGFyZ2V0LmRhdGFzZXQuaWRdLnN0YXIgPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4ICsgMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93VGVhbUludHJvIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnRlYW1JbmRleCA9IGluZGV4XHJcbiAgICAgICAgICAgIHRoaXMudGVhbURldGFpbCA9IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhpZGVUZWFtUG9wdXAgKCkge1xyXG4gICAgICAgICAgICB0aGlzLnRlYW1EZXRhaWwgPSBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGlkZVNob3BQb3B1cCAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvcERldGFpbCA9IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcGVuTWFwICgpIHtcclxuICAgICAgICAgICAgd2VweS5vcGVuTG9jYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgbGF0aXR1ZGU6IHRoaXMubG9jYXRpb24ubGF0LFxyXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiB0aGlzLmxvY2F0aW9uLmxvbixcclxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuYmFzZURhdGEubmlja25hbWUsXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiB0aGlzLmJhc2VEYXRhLmNpdHlOYW1lICsgdGhpcy5kZXRhaWxBZGRyZXNzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93RGV0YWlsIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3BJbmRleCA9IE51bWJlci5wYXJzZUludChpbmRleClcclxuICAgICAgICAgICAgdGhpcy5zaG9wRGV0YWlsID0gdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9sbG93Q29tcGFueSAoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5sb2dpbi5oYXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor7flhYjnmbvlvZUnfSlcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7dXJsOiAnbG9naW4nfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gdGhpcy5iYXNlRGF0YS5oYXNPcGVyYXRlID09IDEgPyAwIDogMVxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuUG9zdCh7XHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMubG9naW4udXNlcklkLFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0SWQ6IHRoaXMubG9naW4uaWQsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiB0eXBlXHJcbiAgICAgICAgICAgIH0sICcvVXNlck9wZXJhdGUvYWRkVXNlck9wZXJhdGUnKVxyXG4gICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmFzZURhdGEuaGFzT3BlcmF0ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+W3suWPlua2iOWFs+azqCd9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZURhdGEuaGFzT3BlcmF0ZSA9IDBcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2xsb3cgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbGxvdyA9IDFcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZm9sbG93ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2xsb3cgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5bey5YWz5rOoJ30pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlRGF0YS5oYXNPcGVyYXRlID0gMVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvbGxvdyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9sbG93ID0gMVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5mb2xsb3cgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbGxvdyA9IDJcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wUHJvcGFnYXRpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd2F0Y2ggPSB7XHJcbiAgICAgICAgdGFiSW5kZXggKG5ld1ZhbCwgb2xkVmFsKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWwgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG5ld1ZhbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAndXNlckNvbXBhbnlJZCc6IHRoaXMuYmFzZURhdGEudXNlcklkXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgJy9Db21wYW55TWFuYWdlci9nZXRMaXN0JylcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRlYW0gPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd1c2VyQ29tcGFueUlkJzogdGhpcy5iYXNlRGF0YS51c2VySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb21wYW55VHlwZSc6IHRoaXMuYmFzZURhdGEuY29tcGFueVR5cGVcclxuICAgICAgICAgICAgICAgICAgICB9LCAnL1Nob3BMaXN0L2dldExpc3QnKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvcCA9IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VzZXJDb21wYW55SWQnOiB0aGlzLmJhc2VEYXRhLnVzZXJJZFxyXG4gICAgICAgICAgICAgICAgICAgIH0sICcvSW52aXRlV29yay9nZXRMaXN0QnlVc2VyQ29tcGFueUlkJylcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmpvYiA9IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UgKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmJhc2VEYXRhLm5pY2tuYW1lLFxyXG4gICAgICAgICAgICBwYXRoOiBgL3BhZ2VzL2NvbXBhbnk/aWQ9JHt0aGlzLmJhc2VEYXRhLnVzZXJJZH1gLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKHJldClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZyhlcnIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25QYWdlU2Nyb2xsIChlKSB7XHJcbiAgICAgICAgaWYgKGUuc2Nyb2xsVG9wID49IDMzNSkge1xyXG4gICAgICAgICAgICB0aGlzLnRhYkZpeGVkID0gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFiRml4ZWQgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmhtemdouWNuOi9veWQjua4hemZpOmAu+i+keaVsOaNrlxyXG4gICAgICovXHJcbiAgICBvblVubG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lSGlkZGVuID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMudGFiSW5kZXggPSAxXHJcbiAgICAgICAgdGhpcy50YWJGaXhlZCA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy51bmZvbGQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuY29tbWVudCA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy50ZWFtRGV0YWlsID0gZmFsc2VcclxuICAgICAgICB0aGlzLnNob3BEZXRhaWwgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMudGVhbUluZGV4ID0gMFxyXG4gICAgICAgIHRoaXMuc2hvcEluZGV4ID0gMFxyXG4gICAgICAgIHRoaXMuYmFzZURhdGEgPSBudWxsXHJcbiAgICAgICAgdGhpcy5hYm91dCA9IG51bGxcclxuICAgICAgICB0aGlzLnRlbXBQcm9ncmVzcyA9IFtdXHJcbiAgICAgICAgdGhpcy50ZWFtID0gW11cclxuICAgICAgICB0aGlzLnNob3AgPSBbXVxyXG4gICAgICAgIHRoaXMuam9iID0gW11cclxuICAgIH1cclxuXHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICAgIHdlcHkub25Tb2NrZXRNZXNzYWdlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsID0gTnVtYmVyLnBhcnNlSW50KHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsKSArIDFcclxuICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+aCqOacieaWsOa2iOaBryd9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkIChwYXJhbXMpIHtcclxuICAgICAgICAvLyB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICAgICAgd2VweS5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0uLi4nfSlcclxuICAgICAgICB0aGlzLmxvZ2luLmlkID0gcGFyYW1zLmlkXHJcbiAgICAgICAgR2V0KCd1c2VySWQnKS50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW4uaGFzID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmxvZ2luLnVzZXJJZCA9IHJldFxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2dpbi5oYXMgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3eC5jcmVhdGVTZWxlY3RvclF1ZXJ5KCkuc2VsZWN0KCcjZml4ZWQnKS5ib3VuZGluZ0NsaWVudFJlY3QocmVjdCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9wID0gcmVjdC50b3BcclxuICAgICAgICB9KS5leGVjKClcclxuICAgICAgICBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoeyd1c2VyQ29tcGFueUlkJzogcGFyYW1zLmlkfSwgJy9Db21wYW55L2dldEFib3V0JyksXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoeyd1c2VyQ29tcGFueUlkJzogcGFyYW1zLmlkLCAndXNlcklkJzogd2VweS5nZXRTdG9yYWdlU3luYygndXNlcklkJykgfHwgMH0sICcvQ29tcGFueS9nZXRJbmZvJylcclxuICAgICAgICBdKS50aGVuKChbe2RhdGE6IGFib3V0fSwge2RhdGE6IGluZm99XSkgPT4ge1xyXG4gICAgICAgICAgICBsb2coaW5mbylcclxuICAgICAgICAgICAgaW5mby5jb21wYW55VHlwZSA9IE51bWJlci5wYXJzZUludChpbmZvLmNvbXBhbnlUeXBlKVxyXG4gICAgICAgICAgICBpbmZvLmF0dGVudGlvbk51bSA9IE51bWJlci5wYXJzZUludChpbmZvLmF0dGVudGlvbk51bSlcclxuICAgICAgICAgICAgdGhpcy5iYXNlRGF0YSA9IGluZm9cclxuICAgICAgICAgICAgdGhpcy50ZW1wUHJvZ3Jlc3MgPSBhYm91dC5wcm9ncmVzc0xpc3Quc2xpY2UoMCwgMylcclxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLnRlbXBQcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgaXRlbS55ZWFyID0gaXRlbS50aW1lLnNsaWNlKDAsIDQpXHJcbiAgICAgICAgICAgICAgICBpdGVtLm1vbnRoID0gaXRlbS50aW1lLnNsaWNlKDQsIDYpXHJcbiAgICAgICAgICAgICAgICBpdGVtLmRheSA9IGl0ZW0udGltZS5zbGljZSg2LCA4KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlbXBQcm9ncmVzcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBQcm9ncmVzc1t0aGlzLnRlbXBQcm9ncmVzcy5sZW5ndGggLSAxXS5sYXN0ID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWJvdXQgPSBhYm91dFxyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIHRoaXMubWFwQXBpLmdlb2NvZGVyKHtcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IHRoaXMuYmFzZURhdGEuY2l0eU5hbWUgKyB0aGlzLmRldGFpbEFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoe3Jlc3VsdDogeyBsb2NhdGlvbiB9fSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24ubG9uID0gbG9jYXRpb24ubG5nXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5sYXQgPSBsb2NhdGlvbi5sYXRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19