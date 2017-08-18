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
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '公司信息'
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
        }, _this.scrollTop = 0, _this.$props = { "job-item": { "xmlns:v-bind": { "for": "job", "item": "item", "index": "index", "key": "{{index}}", "value": "2" }, "v-bind:listItem.once": { "for": "job", "item": "item", "index": "index", "key": "{{index}}", "value": "2" }, "type": { "for": "job", "item": "item", "index": "index", "key": "{{index}}", "value": "2" } }, "loading": { "xmlns:v-bind": "", "v-bind:show.sync": "loading" }, "progress": { "xmlns:v-bind": "", "v-bind:item.once": "items" } }, _this.$events = {}, _this.components = {
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
                }).catch(function (err) {
                    if (err.err == 21311201) {
                        _this2.toast({ content: '您已评价过，请90天后再来评价' });
                    } else if (err.err == -1) {
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
                            }, '/CompanyManager/getList').then(function (_ref2) {
                                var data = _ref2.data;

                                (0, _log.log)(data);
                                _this4.team = data;
                                _this4.$apply();
                            });
                            break;
                        case 3:
                            this.request.Get({
                                'userCompanyId': this.baseData.userId,
                                'companyType': this.baseData.companyType
                            }, '/ShopList/getList').then(function (_ref3) {
                                var data = _ref3.data;

                                (0, _log.log)(data);
                                _this4.shop = data;
                                _this4.$apply();
                            });
                            break;
                        case 4:
                            this.request.Get({
                                'userCompanyId': this.baseData.userId
                            }, '/InviteWork/getListByUserCompanyId').then(function (_ref4) {
                                var data = _ref4.data;

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
        key: 'onLoad',
        value: function onLoad(params) {
            var _this5 = this;

            this.loading = true;
            this.login.id = params.id;
            (0, _storage.Get)('userId').then(function (ret) {
                _this5.login.has = true;
                _this5.login.userId = ret;
                _this5.$apply();
            }).catch(function (err) {
                _this5.login.has = false;
                _this5.$apply();
            });
            wx.createSelectorQuery().select('#fixed').boundingClientRect(function (rect) {
                _this5.scrollTop = rect.top;
            }).exec();
            Promise.all([this.request.Get({ 'userCompanyId': params.id }, '/Company/getAbout'), this.request.Get({ 'userCompanyId': params.id, 'userId': _wepy2.default.getStorageSync('userId') || 0 }, '/Company/getInfo')]).then(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 2),
                    about = _ref6[0].data,
                    info = _ref6[1].data;

                (0, _log.log)(info);
                info.companyType = Number.parseInt(info.companyType);
                info.attentionNum = Number.parseInt(info.attentionNum);
                _this5.baseData = info;
                _this5.tempProgress = about.progressList.slice(0, 3);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this5.tempProgress[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

                if (_this5.tempProgress.length > 0) {
                    _this5.tempProgress[_this5.tempProgress.length - 1].last = true;
                }
                _this5.about = about;
                _this5.loading = false;
                _wepy2.default.setNavigationBarColor({
                    frontColor: '#ffffff',
                    backgroundColor: '#40c4ff'
                });
                _this5.$apply();
                _this5.mapApi.geocoder({
                    address: _this5.baseData.cityName + _this5.detailAddress,
                    success: function success(_ref7) {
                        var location = _ref7.result.location;

                        _this5.location.lon = location.lng;
                        _this5.location.lat = location.lat;
                    },
                    fail: function fail(err) {
                        (0, _log.log)(err);
                    }
                });
            });
        }
    }]);

    return Company;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Company , 'pages/company'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbnkuanMiXSwibmFtZXMiOlsiQ29tcGFueSIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImxvYWRpbmciLCJmb2xsb3ciLCJuYW1lSGlkZGVuIiwidGFiSW5kZXgiLCJ0YWJGaXhlZCIsInVuZm9sZCIsImNvbW1lbnQiLCJ0ZWFtRGV0YWlsIiwic2hvcERldGFpbCIsInRlYW1JbmRleCIsInNob3BJbmRleCIsImJhc2VEYXRhIiwiYWJvdXQiLCJ0ZW1wUHJvZ3Jlc3MiLCJ0ZWFtIiwic2hvcCIsImpvYiIsImNvbW1lbnRTdGFyIiwidGV4dCIsInN0YXIiLCJtYXBBcGkiLCJrZXkiLCJsb2dpbiIsImhhcyIsInVzZXJJZCIsImlkIiwicmVxdWVzdCIsImxvY2F0aW9uIiwibG9uIiwibGF0Iiwic2Nyb2xsVG9wIiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb21wdXRlZCIsImRldGFpbEFkZHJlc3MiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsImxlbmd0aCIsImFkZHJlc3MiLCJldmVudHMiLCJtZXRob2RzIiwic2hvd05hbWUiLCJ0b2dnbGVUYWIiLCJlIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiaW5kZXgiLCJwcmV2aWV3IiwiaW1nTGlzdEZ1bGwiLCJzbGlkZSIsInNob3dDb21tZW50IiwidG9hc3QiLCJjb250ZW50IiwibmF2aWdhdGVUbyIsInVybCIsImhpZGVDb21tZW50Iiwic3VyZUNvbW1lbnQiLCJQb3N0IiwidXNlckNvbXBhbnlJZCIsImJyYW5kUmVjb2duaXRpb24iLCJpbmZsdWVuY2UiLCJzY2FsZSIsInRhbGVudHMiLCJzYWxhcnkiLCJkZXZlbG9wIiwidGhlbiIsIiRhcHBseSIsImNhdGNoIiwiZXJyIiwiY2hhbmdlU3RhciIsInVuZGVmaW5lZCIsInNob3dUZWFtSW50cm8iLCJoaWRlVGVhbVBvcHVwIiwiaGlkZVNob3BQb3B1cCIsIm9wZW5NYXAiLCJvcGVuTG9jYXRpb24iLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsIm5hbWUiLCJuaWNrbmFtZSIsImNpdHlOYW1lIiwic2hvd0RldGFpbCIsImZvbGxvd0NvbXBhbnkiLCJ0eXBlIiwiaGFzT3BlcmF0ZSIsIm9iamVjdElkIiwic3RhdHVzIiwic3RvcFByb3BhZ2F0aW9uIiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJHZXQiLCJjb21wYW55VHlwZSIsIiRpbnZva2UiLCJ0aXRsZSIsInBhdGgiLCJzdWNjZXNzIiwicmV0IiwiZmFpbCIsInBhcmFtcyIsInd4IiwiY3JlYXRlU2VsZWN0b3JRdWVyeSIsInNlbGVjdCIsImJvdW5kaW5nQ2xpZW50UmVjdCIsInJlY3QiLCJ0b3AiLCJleGVjIiwiUHJvbWlzZSIsImFsbCIsImdldFN0b3JhZ2VTeW5jIiwiaW5mbyIsImF0dGVudGlvbk51bSIsInByb2dyZXNzTGlzdCIsInNsaWNlIiwiaXRlbSIsInllYXIiLCJ0aW1lIiwibW9udGgiLCJkYXkiLCJsYXN0Iiwic2V0TmF2aWdhdGlvbkJhckNvbG9yIiwiZnJvbnRDb2xvciIsImJhY2tncm91bmRDb2xvciIsImdlb2NvZGVyIiwicmVzdWx0IiwibG5nIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUlBOzs7O0FBR0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7QUFYQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0lBUXFCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCO0FBRm5CLFMsUUFLVEMsSSxHQUFPO0FBQ0hDLHFCQUFTLEtBRE47QUFFSEMsb0JBQVEsQ0FGTDtBQUdIQyx3QkFBWSxJQUhUO0FBSUhDLHNCQUFVLENBSlA7QUFLSEMsc0JBQVUsS0FMUDtBQU1IQyxvQkFBUSxLQU5MO0FB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QWQsR0FBb0JELFNBQVNxRyxHQUE3QjtBQUNBLCtCQUFLckcsUUFBTCxDQUFjRSxHQUFkLEdBQW9CRixTQUFTRSxHQUE3QjtBQUNILHFCQUxnQjtBQU1qQndFLDBCQUFNLG1CQUFPO0FBQ1Qsc0NBQUk5QixHQUFKO0FBQ0g7QUFSZ0IsaUJBQXJCO0FBVUgsYUFsQ0Q7QUFtQ0g7Ozs7RUF4V2dDLGVBQUswRCxJOztrQkFBckJ0SSxPIiwiZmlsZSI6ImNvbXBhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQgUHJvZ3Jlc3MgZnJvbSAnLi4vY29tcG9uZW50cy9jb21wLXByb2dyZXNzJ1xyXG4vLyBpbXBvcnQgU2hvcEl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21wLXNob3AtaXRlbSdcclxuLy8gaW1wb3J0IFNjaG9vbEl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21wLXNjaG9vbC1pdGVtJ1xyXG4vLyBpbXBvcnQgUHJvZEl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21wLXByb2QtaXRlbSdcclxuaW1wb3J0IEpvYkl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9qb2ItbGlzdC1pdGVtJ1xyXG4vLyBpbXBvcnQgTW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbC1wb3B1cCdcclxuLy8gaW1wb3J0IFNpbXBsZU1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvc2ltcGxlLW1vZGFsLXBvcHVwJ1xyXG5pbXBvcnQgeyBRUU1BUEtFWSB9IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cydcclxuaW1wb3J0IHtHZXR9IGZyb20gJy4uL3V0aWxzL3N0b3JhZ2UnXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0J1xyXG5pbXBvcnQgUVFNYXBXWCBmcm9tICcuLi91dGlscy9xcW1hcC13eC1qc3Nkay5taW4nXHJcbmltcG9ydCB7IFByZXZpZXcgfSBmcm9tICcuLi91dGlscy9pbWFnZVV0aWxzJ1xyXG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcGFueSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflhazlj7jkv6Hmga8nXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICBmb2xsb3c6IDEsXHJcbiAgICAgICAgbmFtZUhpZGRlbjogdHJ1ZSxcclxuICAgICAgICB0YWJJbmRleDogMSxcclxuICAgICAgICB0YWJGaXhlZDogZmFsc2UsXHJcbiAgICAgICAgdW5mb2xkOiBmYWxzZSxcclxuICAgICAgICBjb21tZW50OiBmYWxzZSxcclxuICAgICAgICB0ZWFtRGV0YWlsOiBmYWxzZSxcclxuICAgICAgICBzaG9wRGV0YWlsOiBmYWxzZSxcclxuICAgICAgICB0ZWFtSW5kZXg6IDAsXHJcbiAgICAgICAgc2hvcEluZGV4OiAwLFxyXG4gICAgICAgIGJhc2VEYXRhOiBudWxsLFxyXG4gICAgICAgIGFib3V0OiBudWxsLFxyXG4gICAgICAgIHRlbXBQcm9ncmVzczogW10sXHJcbiAgICAgICAgdGVhbTogW10sXHJcbiAgICAgICAgc2hvcDogW10sXHJcbiAgICAgICAgam9iOiBbXSxcclxuICAgICAgICBjb21tZW50U3RhcjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5ZOB54mM55+l5ZCN5bqmJyxcclxuICAgICAgICAgICAgICAgIHN0YXI6IDBcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+ihjOS4muW9seWTjeWKmycsXHJcbiAgICAgICAgICAgICAgICBzdGFyOiAwXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfkvIHkuJrop4TmqKEnLFxyXG4gICAgICAgICAgICAgICAgc3RhcjogMFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5Zui6Zif5Lq65omNJyxcclxuICAgICAgICAgICAgICAgIHN0YXI6IDBcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+iWqui1hOemj+WIqScsXHJcbiAgICAgICAgICAgICAgICBzdGFyOiAwXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICflj5HlsZXmvZzlipsnLFxyXG4gICAgICAgICAgICAgICAgc3RhcjogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIG1hcEFwaSA9IG5ldyBRUU1hcFdYKHtcclxuICAgICAgICBrZXk6IFFRTUFQS0VZXHJcbiAgICB9KVxyXG5cclxuICAgIGxvZ2luID0ge1xyXG4gICAgICAgIGhhczogZmFsc2UsXHJcbiAgICAgICAgdXNlcklkOiAnJyxcclxuICAgICAgICBpZDogJydcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG5cclxuICAgIGxvY2F0aW9uID0ge1xyXG4gICAgICAgIGxvbjogJycsXHJcbiAgICAgICAgbGF0OiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHNjcm9sbFRvcCA9IDBcclxuXHJcbiAgICRwcm9wcyA9IHtcImpvYi1pdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1wiZm9yXCI6XCJqb2JcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJ7e2luZGV4fX1cIixcInZhbHVlXCI6XCIyXCJ9LFwidi1iaW5kOmxpc3RJdGVtLm9uY2VcIjp7XCJmb3JcIjpcImpvYlwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcInt7aW5kZXh9fVwiLFwidmFsdWVcIjpcIjJcIn0sXCJ0eXBlXCI6e1wiZm9yXCI6XCJqb2JcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJ7e2luZGV4fX1cIixcInZhbHVlXCI6XCIyXCJ9fSxcImxvYWRpbmdcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnNob3cuc3luY1wiOlwibG9hZGluZ1wifSxcInByb2dyZXNzXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDppdGVtLm9uY2VcIjpcIml0ZW1zXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAnbG9hZGluZyc6IExvYWRpbmcsXHJcbiAgICAgICAgLy8gJ2NvbW1lbnQnOiBNb2RhbCxcclxuICAgICAgICAncHJvZ3Jlc3MnOiBQcm9ncmVzcyxcclxuICAgICAgICAvLyAnc2hvcC1pdGVtJzogU2hvcEl0ZW0sXHJcbiAgICAgICAgLy8gJ3NjaG9vbC1pdGVtJzogU2Nob29sSXRlbSxcclxuICAgICAgICAvLyAncHJvZC1pdGVtJzogUHJvZEl0ZW0sXHJcbiAgICAgICAgLy8gJ3RlYW0tbW9kYWwnOiBTaW1wbGVNb2RhbCxcclxuICAgICAgICAnam9iLWl0ZW0nOiBKb2JJdGVtLFxyXG4gICAgICAgICd0b2FzdCc6IFRvYXN0XHJcbiAgICB9XHJcblxyXG4gICAgdG9hc3QgKGRhdGEgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvd1RvYXN0JywgZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgICBkZXRhaWxBZGRyZXNzICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWJvdXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFib3V0LmxvY2F0aW9uLnN1YnN0cmluZyh0aGlzLmFib3V0LmxvY2F0aW9uLmxhc3RJbmRleE9mKCctJykgKyAxLCB0aGlzLmFib3V0LmxvY2F0aW9uLmxlbmd0aCkgKyB0aGlzLmFib3V0LmFkZHJlc3NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICAgLy8gJ2NvbW1lbnQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIC8vICAgICBsb2coYXJncylcclxuICAgICAgICAvLyAgICAgdGhpcy5jb21tZW50ID0gZmFsc2VcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vICdlbWl0SW5kZXgnOiAoaW5kZXgsIGUpID0+IHtcclxuICAgICAgICAvLyAgICAgbG9nKGluZGV4KVxyXG4gICAgICAgIC8vICAgICBsb2coZSlcclxuICAgICAgICAvLyAgICAgdGhpcy5zaG9wSW5kZXggPSBOdW1iZXIucGFyc2VJbnQoaW5kZXgpXHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2hvcERldGFpbCA9IHRydWVcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBzaG93TmFtZSAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZUhpZGRlbiA9ICF0aGlzLm5hbWVIaWRkZW5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvZ2dsZVRhYiAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRhYkluZGV4ID0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcmV2aWV3IChlKSB7XHJcbiAgICAgICAgICAgIFByZXZpZXcoZS50YXJnZXQuZGF0YXNldC5pbmRleCwgdGhpcy5hYm91dC5pbWdMaXN0RnVsbClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNsaWRlICgpIHtcclxuICAgICAgICAgICAgdGhpcy51bmZvbGQgPSAhdGhpcy51bmZvbGRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNob3dDb21tZW50ICgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxvZ2luLmhhcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+ivt+WFiOeZu+W9lSd9KVxyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHt1cmw6ICdsb2dpbid9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb21tZW50ID0gdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGlkZUNvbW1lbnQgKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnQgPSBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VyZUNvbW1lbnQgKCkge1xyXG4gICAgICAgICAgICAvLyDosIPor4Tku7fmjqXlj6NcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LlBvc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXNlckNvbXBhbnlJZDogdGhpcy5sb2dpbi5pZCxcclxuICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy5sb2dpbi51c2VySWQsXHJcbiAgICAgICAgICAgICAgICBicmFuZFJlY29nbml0aW9uOiB0aGlzLmNvbW1lbnRTdGFyWzBdLnN0YXIsXHJcbiAgICAgICAgICAgICAgICBpbmZsdWVuY2U6IHRoaXMuY29tbWVudFN0YXJbMV0uc3RhcixcclxuICAgICAgICAgICAgICAgIHNjYWxlOiB0aGlzLmNvbW1lbnRTdGFyWzJdLnN0YXIsXHJcbiAgICAgICAgICAgICAgICB0YWxlbnRzOiB0aGlzLmNvbW1lbnRTdGFyWzNdLnN0YXIsXHJcbiAgICAgICAgICAgICAgICBzYWxhcnk6IHRoaXMuY29tbWVudFN0YXJbNF0uc3RhcixcclxuICAgICAgICAgICAgICAgIGRldmVsb3A6IHRoaXMuY29tbWVudFN0YXJbNV0uc3RhclxyXG4gICAgICAgICAgICB9LCAnL1VzZXJDb21wYW55QXBwcmFpc2VMaXN0L2FkZCcpXHJcbiAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+E5Lu35oiQ5YqfJ30pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1lbnQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIuZXJyID09IDIxMzExMjAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+aCqOW3suivhOS7t+i/h++8jOivtzkw5aSp5ZCO5YaN5p2l6K+E5Lu3J30pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVyci5lcnIgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5oKo6L+Y5pyq5a6M5oiQ6K+E5Lu3J30pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGFuZ2VTdGFyIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmlkICE9PSB1bmRlZmluZWQgJiYgZS50YXJnZXQuZGF0YXNldC5pbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb21tZW50U3RhcltlLnRhcmdldC5kYXRhc2V0LmlkXS5zdGFyID09PSBlLnRhcmdldC5kYXRhc2V0LmluZGV4ICsgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudFN0YXJbZS50YXJnZXQuZGF0YXNldC5pZF0uc3RhciA9IDBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21tZW50U3RhcltlLnRhcmdldC5kYXRhc2V0LmlkXS5zdGFyID0gZS50YXJnZXQuZGF0YXNldC5pbmRleCArIDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd1RlYW1JbnRybyAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy50ZWFtSW5kZXggPSBpbmRleFxyXG4gICAgICAgICAgICB0aGlzLnRlYW1EZXRhaWwgPSB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoaWRlVGVhbVBvcHVwICgpIHtcclxuICAgICAgICAgICAgdGhpcy50ZWFtRGV0YWlsID0gZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhpZGVTaG9wUG9wdXAgKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3BEZXRhaWwgPSBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3Blbk1hcCAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkub3BlbkxvY2F0aW9uKHtcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLmxvY2F0aW9uLmxhdCxcclxuICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogdGhpcy5sb2NhdGlvbi5sb24sXHJcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmJhc2VEYXRhLm5pY2tuYW1lLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogdGhpcy5iYXNlRGF0YS5jaXR5TmFtZSArIHRoaXMuZGV0YWlsQWRkcmVzc1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd0RldGFpbCAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG9wSW5kZXggPSBOdW1iZXIucGFyc2VJbnQoaW5kZXgpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvcERldGFpbCA9IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvbGxvd0NvbXBhbnkgKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubG9naW4uaGFzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+35YWI55m75b2VJ30pXHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IHRoaXMuYmFzZURhdGEuaGFzT3BlcmF0ZSA9PSAxID8gMCA6IDFcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LlBvc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLmxvZ2luLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgIG9iamVjdElkOiB0aGlzLmxvZ2luLmlkLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIHN0YXR1czogdHlwZVxyXG4gICAgICAgICAgICB9LCAnL1VzZXJPcGVyYXRlL2FkZFVzZXJPcGVyYXRlJylcclxuICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJhc2VEYXRhLmhhc09wZXJhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICflt7Llj5bmtojlhbPms6gnfSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VEYXRhLmhhc09wZXJhdGUgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9sbG93ID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2xsb3cgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZvbGxvdyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9sbG93ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+W3suWFs+azqCd9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZURhdGEuaGFzT3BlcmF0ZSA9IDFcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2xsb3cgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbGxvdyA9IDFcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZm9sbG93ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2xsb3cgPSAyXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RvcFByb3BhZ2F0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdhdGNoID0ge1xyXG4gICAgICAgIHRhYkluZGV4IChuZXdWYWwsIG9sZFZhbCkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsID4gMSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChuZXdWYWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VzZXJDb21wYW55SWQnOiB0aGlzLmJhc2VEYXRhLnVzZXJJZFxyXG4gICAgICAgICAgICAgICAgICAgIH0sICcvQ29tcGFueU1hbmFnZXIvZ2V0TGlzdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2coZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZWFtID0gZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAndXNlckNvbXBhbnlJZCc6IHRoaXMuYmFzZURhdGEudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29tcGFueVR5cGUnOiB0aGlzLmJhc2VEYXRhLmNvbXBhbnlUeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgJy9TaG9wTGlzdC9nZXRMaXN0JylcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3AgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd1c2VyQ29tcGFueUlkJzogdGhpcy5iYXNlRGF0YS51c2VySWRcclxuICAgICAgICAgICAgICAgICAgICB9LCAnL0ludml0ZVdvcmsvZ2V0TGlzdEJ5VXNlckNvbXBhbnlJZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2coZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qb2IgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5iYXNlRGF0YS5uaWNrbmFtZSxcclxuICAgICAgICAgICAgcGF0aDogYC9wYWdlcy9jb21wYW55P2lkPSR7dGhpcy5iYXNlRGF0YS51c2VySWR9YCxcclxuICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZyhyZXQpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2coZXJyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUGFnZVNjcm9sbCAoZSkge1xyXG4gICAgICAgIGlmIChlLnNjcm9sbFRvcCA+PSAzMzUpIHtcclxuICAgICAgICAgICAgdGhpcy50YWJGaXhlZCA9IHRydWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRhYkZpeGVkID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLljbjovb3lkI7muIXpmaTpgLvovpHmlbDmja5cclxuICAgICAqL1xyXG4gICAgb25VbmxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMubmFtZUhpZGRlbiA9IHRydWVcclxuICAgICAgICB0aGlzLnRhYkluZGV4ID0gMVxyXG4gICAgICAgIHRoaXMudGFiRml4ZWQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMudW5mb2xkID0gZmFsc2VcclxuICAgICAgICB0aGlzLmNvbW1lbnQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMudGVhbURldGFpbCA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5zaG9wRGV0YWlsID0gZmFsc2VcclxuICAgICAgICB0aGlzLnRlYW1JbmRleCA9IDBcclxuICAgICAgICB0aGlzLnNob3BJbmRleCA9IDBcclxuICAgICAgICB0aGlzLmJhc2VEYXRhID0gbnVsbFxyXG4gICAgICAgIHRoaXMuYWJvdXQgPSBudWxsXHJcbiAgICAgICAgdGhpcy50ZW1wUHJvZ3Jlc3MgPSBbXVxyXG4gICAgICAgIHRoaXMudGVhbSA9IFtdXHJcbiAgICAgICAgdGhpcy5zaG9wID0gW11cclxuICAgICAgICB0aGlzLmpvYiA9IFtdXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkIChwYXJhbXMpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5sb2dpbi5pZCA9IHBhcmFtcy5pZFxyXG4gICAgICAgIEdldCgndXNlcklkJykudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luLmhhcyA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5sb2dpbi51c2VySWQgPSByZXRcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW4uaGFzID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgd3guY3JlYXRlU2VsZWN0b3JRdWVyeSgpLnNlbGVjdCgnI2ZpeGVkJykuYm91bmRpbmdDbGllbnRSZWN0KHJlY3QgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRvcCA9IHJlY3QudG9wXHJcbiAgICAgICAgfSkuZXhlYygpXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHsndXNlckNvbXBhbnlJZCc6IHBhcmFtcy5pZH0sICcvQ29tcGFueS9nZXRBYm91dCcpLFxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHsndXNlckNvbXBhbnlJZCc6IHBhcmFtcy5pZCwgJ3VzZXJJZCc6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpIHx8IDB9LCAnL0NvbXBhbnkvZ2V0SW5mbycpXHJcbiAgICAgICAgXSkudGhlbigoW3tkYXRhOiBhYm91dH0sIHtkYXRhOiBpbmZvfV0pID0+IHtcclxuICAgICAgICAgICAgbG9nKGluZm8pXHJcbiAgICAgICAgICAgIGluZm8uY29tcGFueVR5cGUgPSBOdW1iZXIucGFyc2VJbnQoaW5mby5jb21wYW55VHlwZSlcclxuICAgICAgICAgICAgaW5mby5hdHRlbnRpb25OdW0gPSBOdW1iZXIucGFyc2VJbnQoaW5mby5hdHRlbnRpb25OdW0pXHJcbiAgICAgICAgICAgIHRoaXMuYmFzZURhdGEgPSBpbmZvXHJcbiAgICAgICAgICAgIHRoaXMudGVtcFByb2dyZXNzID0gYWJvdXQucHJvZ3Jlc3NMaXN0LnNsaWNlKDAsIDMpXHJcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy50ZW1wUHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueWVhciA9IGl0ZW0udGltZS5zbGljZSgwLCA0KVxyXG4gICAgICAgICAgICAgICAgaXRlbS5tb250aCA9IGl0ZW0udGltZS5zbGljZSg0LCA2KVxyXG4gICAgICAgICAgICAgICAgaXRlbS5kYXkgPSBpdGVtLnRpbWUuc2xpY2UoNiwgOClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy50ZW1wUHJvZ3Jlc3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wUHJvZ3Jlc3NbdGhpcy50ZW1wUHJvZ3Jlc3MubGVuZ3RoIC0gMV0ubGFzdCA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFib3V0ID0gYWJvdXRcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcclxuICAgICAgICAgICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyQ29sb3Ioe1xyXG4gICAgICAgICAgICAgICAgZnJvbnRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzQwYzRmZidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB0aGlzLm1hcEFwaS5nZW9jb2Rlcih7XHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiB0aGlzLmJhc2VEYXRhLmNpdHlOYW1lICsgdGhpcy5kZXRhaWxBZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHtyZXN1bHQ6IHsgbG9jYXRpb24gfX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmxvbiA9IGxvY2F0aW9uLmxuZ1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24ubGF0ID0gbG9jYXRpb24ubGF0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsb2coZXJyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19