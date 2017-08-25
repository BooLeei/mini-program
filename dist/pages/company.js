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
                _wepy2.default.setNavigationBarColor({
                    frontColor: '#ffffff',
                    backgroundColor: '#40c4ff'
                });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbnkuanMiXSwibmFtZXMiOlsiQ29tcGFueSIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImxvYWRpbmciLCJmb2xsb3ciLCJuYW1lSGlkZGVuIiwidGFiSW5kZXgiLCJ0YWJGaXhlZCIsInVuZm9sZCIsImNvbW1lbnQiLCJ0ZWFtRGV0YWlsIiwic2hvcERldGFpbCIsInRlYW1JbmRleCIsInNob3BJbmRleCIsImJhc2VEYXRhIiwiYWJvdXQiLCJ0ZW1wUHJvZ3Jlc3MiLCJ0ZWFtIiwic2hvcCIsImpvYiIsImNvbW1lbnRTdGFyIiwidGV4dCIsInN0YXIiLCJtYXBBcGkiLCJrZXkiLCJsb2dpbiIsImhhcyIsInVzZXJJZCIsImlkIiwicmVxdWVzdCIsImxvY2F0aW9uIiwibG9uIiwibGF0Iiwic2Nyb2xsVG9wIiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb21wdXRlZCIsImRldGFpbEFkZHJlc3MiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsImxlbmd0aCIsImFkZHJlc3MiLCJldmVudHMiLCJtZXRob2RzIiwic2hvd05hbWUiLCJ0b2dnbGVUYWIiLCJlIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiaW5kZXgiLCJwcmV2aWV3IiwiaW1nTGlzdEZ1bGwiLCJzbGlkZSIsInNob3dDb21tZW50IiwidG9hc3QiLCJjb250ZW50IiwibmF2aWdhdGVUbyIsInVybCIsImhpZGVDb21tZW50Iiwic3VyZUNvbW1lbnQiLCJQb3N0IiwidXNlckNvbXBhbnlJZCIsImJyYW5kUmVjb2duaXRpb24iLCJpbmZsdWVuY2UiLCJzY2FsZSIsInRhbGVudHMiLCJzYWxhcnkiLCJkZXZlbG9wIiwidGhlbiIsIiRhcHBseSIsImNhdGNoIiwiZXJyIiwiY2hhbmdlU3RhciIsInVuZGVmaW5lZCIsInNob3dUZWFtSW50cm8iLCJoaWRlVGVhbVBvcHVwIiwiaGlkZVNob3BQb3B1cCIsIm9wZW5NYXAiLCJvcGVuTG9jYXRpb24iLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsIm5hbWUiLCJuaWNrbmFtZSIsImNpdHlOYW1lIiwic2hvd0RldGFpbCIsImZvbGxvd0NvbXBhbnkiLCJ0eXBlIiwiaGFzT3BlcmF0ZSIsIm9iamVjdElkIiwic3RhdHVzIiwic3RvcFByb3BhZ2F0aW9uIiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJHZXQiLCJjb21wYW55VHlwZSIsIiRpbnZva2UiLCJ0aXRsZSIsInBhdGgiLCJzdWNjZXNzIiwicmV0IiwiZmFpbCIsIm9uU29ja2V0TWVzc2FnZSIsIiRwYXJlbnQiLCJnbG9iYWwiLCJjdXJWYWwiLCJwYXJhbXMiLCJzaG93TG9hZGluZyIsInd4IiwiY3JlYXRlU2VsZWN0b3JRdWVyeSIsInNlbGVjdCIsImJvdW5kaW5nQ2xpZW50UmVjdCIsInJlY3QiLCJ0b3AiLCJleGVjIiwiUHJvbWlzZSIsImFsbCIsImdldFN0b3JhZ2VTeW5jIiwiaW5mbyIsImF0dGVudGlvbk51bSIsInByb2dyZXNzTGlzdCIsInNsaWNlIiwiaXRlbSIsInllYXIiLCJ0aW1lIiwibW9udGgiLCJkYXkiLCJsYXN0Iiwic2V0TmF2aWdhdGlvbkJhckNvbG9yIiwiZnJvbnRDb2xvciIsImJhY2tncm91bmRDb2xvciIsImdlb2NvZGVyIiwicmVzdWx0IiwibG5nIiwiaGlkZUxvYWRpbmciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBSUE7Ozs7QUFHQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7OztBQVhBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7SUFRcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0I7QUFGbkIsUyxRQUtUQyxJLEdBQU87QUFDSEMscUJBQVMsS0FETjtBQUVIQyxvQkFBUSxD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S1osT0FBTCxHQUFlLEtBQWY7QUFDQSwrQkFBS2dJLHFCQUFMLENBQTJCO0FBQ3ZCQyxnQ0FBWSxTQURXO0FBRXZCQyxxQ0FBaUI7QUFGTSxpQkFBM0I7QUFJQSx1QkFBSzdELE1BQUw7QUFDQSx1QkFBS2pELE1BQUwsQ0FBWStHLFFBQVosQ0FBcUI7QUFDakI1Riw2QkFBUyxPQUFLNUIsUUFBTCxDQUFjd0UsUUFBZCxHQUF5QixPQUFLaEQsYUFEdEI7QUFFakJnRSw2QkFBUyx3QkFBNEI7QUFBQSw0QkFBaEJ4RSxRQUFnQixTQUExQnlHLE1BQTBCLENBQWhCekcsUUFBZ0I7O0FBQ2pDLCtCQUFLQSxRQUFMLENBQWNDLEdBQWQsR0FBb0JELFNBQVMwRyxHQUE3QjtBQUNBLCtCQUFLMUcsUUFBTCxDQUFjRSxHQUFkLEdBQW9CRixTQUFTRSxHQUE3QjtBQUNILHFCQUxnQjtBQU1qQndFLDBCQUFNLG1CQUFPO0FBQ1Qsc0NBQUk5QixHQUFKO0FBQ0g7QUFSZ0IsaUJBQXJCO0FBVUEsK0JBQUsrRCxXQUFMO0FBQ0gsYUFuQ0Q7QUFvQ0g7Ozs7RUFqWGdDLGVBQUtDLEk7O2tCQUFyQjVJLE8iLCJmaWxlIjoiY29tcGFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCBQcm9ncmVzcyBmcm9tICcuLi9jb21wb25lbnRzL2NvbXAtcHJvZ3Jlc3MnXHJcbi8vIGltcG9ydCBTaG9wSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL2NvbXAtc2hvcC1pdGVtJ1xyXG4vLyBpbXBvcnQgU2Nob29sSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL2NvbXAtc2Nob29sLWl0ZW0nXHJcbi8vIGltcG9ydCBQcm9kSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL2NvbXAtcHJvZC1pdGVtJ1xyXG5pbXBvcnQgSm9iSXRlbSBmcm9tICcuLi9jb21wb25lbnRzL2pvYi1saXN0LWl0ZW0nXHJcbi8vIGltcG9ydCBNb2RhbCBmcm9tICcuLi9jb21wb25lbnRzL21vZGFsLXBvcHVwJ1xyXG4vLyBpbXBvcnQgU2ltcGxlTW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9zaW1wbGUtbW9kYWwtcG9wdXAnXHJcbmltcG9ydCB7IFFRTUFQS0VZIH0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnRzJ1xyXG5pbXBvcnQge0dldH0gZnJvbSAnLi4vdXRpbHMvc3RvcmFnZSdcclxuaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdG9hc3QnXHJcbmltcG9ydCBRUU1hcFdYIGZyb20gJy4uL3V0aWxzL3FxbWFwLXd4LWpzc2RrLm1pbidcclxuaW1wb3J0IHsgUHJldmlldyB9IGZyb20gJy4uL3V0aWxzL2ltYWdlVXRpbHMnXHJcbmltcG9ydCB7bG9nfSBmcm9tICcuLi91dGlscy9sb2cnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wYW55IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WFrOWPuOS/oeaBrydcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgIGZvbGxvdzogMSxcclxuICAgICAgICBuYW1lSGlkZGVuOiB0cnVlLFxyXG4gICAgICAgIHRhYkluZGV4OiAxLFxyXG4gICAgICAgIHRhYkZpeGVkOiBmYWxzZSxcclxuICAgICAgICB1bmZvbGQ6IGZhbHNlLFxyXG4gICAgICAgIGNvbW1lbnQ6IGZhbHNlLFxyXG4gICAgICAgIHRlYW1EZXRhaWw6IGZhbHNlLFxyXG4gICAgICAgIHNob3BEZXRhaWw6IGZhbHNlLFxyXG4gICAgICAgIHRlYW1JbmRleDogMCxcclxuICAgICAgICBzaG9wSW5kZXg6IDAsXHJcbiAgICAgICAgYmFzZURhdGE6IG51bGwsXHJcbiAgICAgICAgYWJvdXQ6IG51bGwsXHJcbiAgICAgICAgdGVtcFByb2dyZXNzOiBbXSxcclxuICAgICAgICB0ZWFtOiBbXSxcclxuICAgICAgICBzaG9wOiBbXSxcclxuICAgICAgICBqb2I6IFtdLFxyXG4gICAgICAgIGNvbW1lbnRTdGFyOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICflk4HniYznn6XlkI3luqYnLFxyXG4gICAgICAgICAgICAgICAgc3RhcjogMFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn6KGM5Lia5b2x5ZON5YqbJyxcclxuICAgICAgICAgICAgICAgIHN0YXI6IDBcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+S8geS4muinhOaooScsXHJcbiAgICAgICAgICAgICAgICBzdGFyOiAwXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICflm6LpmJ/kurrmiY0nLFxyXG4gICAgICAgICAgICAgICAgc3RhcjogMFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn6Jaq6LWE56aP5YipJyxcclxuICAgICAgICAgICAgICAgIHN0YXI6IDBcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+WPkeWxlea9nOWKmycsXHJcbiAgICAgICAgICAgICAgICBzdGFyOiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgbWFwQXBpID0gbmV3IFFRTWFwV1goe1xyXG4gICAgICAgIGtleTogUVFNQVBLRVlcclxuICAgIH0pXHJcblxyXG4gICAgbG9naW4gPSB7XHJcbiAgICAgICAgaGFzOiBmYWxzZSxcclxuICAgICAgICB1c2VySWQ6ICcnLFxyXG4gICAgICAgIGlkOiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgbG9jYXRpb24gPSB7XHJcbiAgICAgICAgbG9uOiAnJyxcclxuICAgICAgICBsYXQ6ICcnXHJcbiAgICB9XHJcblxyXG4gICAgc2Nyb2xsVG9wID0gMFxyXG5cclxuICAgJHByb3BzID0ge1wiam9iLWl0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJmb3JcIjpcImpvYlwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcInt7aW5kZXh9fVwiLFwidmFsdWVcIjpcIjJcIn0sXCJ2LWJpbmQ6bGlzdEl0ZW0ub25jZVwiOntcImZvclwiOlwiam9iXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwie3tpbmRleH19XCIsXCJ2YWx1ZVwiOlwiMlwifSxcInR5cGVcIjp7XCJmb3JcIjpcImpvYlwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcInt7aW5kZXh9fVwiLFwidmFsdWVcIjpcIjJcIn19LFwicHJvZ3Jlc3NcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOml0ZW0ub25jZVwiOlwiaXRlbXNcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICdsb2FkaW5nJzogTG9hZGluZyxcclxuICAgICAgICAvLyAnY29tbWVudCc6IE1vZGFsLFxyXG4gICAgICAgICdwcm9ncmVzcyc6IFByb2dyZXNzLFxyXG4gICAgICAgIC8vICdzaG9wLWl0ZW0nOiBTaG9wSXRlbSxcclxuICAgICAgICAvLyAnc2Nob29sLWl0ZW0nOiBTY2hvb2xJdGVtLFxyXG4gICAgICAgIC8vICdwcm9kLWl0ZW0nOiBQcm9kSXRlbSxcclxuICAgICAgICAvLyAndGVhbS1tb2RhbCc6IFNpbXBsZU1vZGFsLFxyXG4gICAgICAgICdqb2ItaXRlbSc6IEpvYkl0ZW0sXHJcbiAgICAgICAgJ3RvYXN0JzogVG9hc3RcclxuICAgIH1cclxuXHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICAgIGRldGFpbEFkZHJlc3MgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hYm91dCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWJvdXQubG9jYXRpb24uc3Vic3RyaW5nKHRoaXMuYWJvdXQubG9jYXRpb24ubGFzdEluZGV4T2YoJy0nKSArIDEsIHRoaXMuYWJvdXQubG9jYXRpb24ubGVuZ3RoKSArIHRoaXMuYWJvdXQuYWRkcmVzc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cyA9IHtcclxuICAgICAgICAvLyAnY29tbWVudCc6ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGxvZyhhcmdzKVxyXG4gICAgICAgIC8vICAgICB0aGlzLmNvbW1lbnQgPSBmYWxzZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gJ2VtaXRJbmRleCc6IChpbmRleCwgZSkgPT4ge1xyXG4gICAgICAgIC8vICAgICBsb2coaW5kZXgpXHJcbiAgICAgICAgLy8gICAgIGxvZyhlKVxyXG4gICAgICAgIC8vICAgICB0aGlzLnNob3BJbmRleCA9IE51bWJlci5wYXJzZUludChpbmRleClcclxuICAgICAgICAvLyAgICAgdGhpcy5zaG9wRGV0YWlsID0gdHJ1ZVxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHNob3dOYW1lICgpIHtcclxuICAgICAgICAgICAgdGhpcy5uYW1lSGlkZGVuID0gIXRoaXMubmFtZUhpZGRlblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9nZ2xlVGFiIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFiSW5kZXggPSBOdW1iZXIucGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByZXZpZXcgKGUpIHtcclxuICAgICAgICAgICAgUHJldmlldyhlLnRhcmdldC5kYXRhc2V0LmluZGV4LCB0aGlzLmFib3V0LmltZ0xpc3RGdWxsKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2xpZGUgKCkge1xyXG4gICAgICAgICAgICB0aGlzLnVuZm9sZCA9ICF0aGlzLnVuZm9sZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd0NvbW1lbnQgKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubG9naW4uaGFzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+35YWI55m75b2VJ30pXHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnQgPSB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoaWRlQ29tbWVudCAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWVudCA9IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdXJlQ29tbWVudCAoKSB7XHJcbiAgICAgICAgICAgIC8vIOiwg+ivhOS7t+aOpeWPo1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuUG9zdCh7XHJcbiAgICAgICAgICAgICAgICB1c2VyQ29tcGFueUlkOiB0aGlzLmxvZ2luLmlkLFxyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLmxvZ2luLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgIGJyYW5kUmVjb2duaXRpb246IHRoaXMuY29tbWVudFN0YXJbMF0uc3RhcixcclxuICAgICAgICAgICAgICAgIGluZmx1ZW5jZTogdGhpcy5jb21tZW50U3RhclsxXS5zdGFyLFxyXG4gICAgICAgICAgICAgICAgc2NhbGU6IHRoaXMuY29tbWVudFN0YXJbMl0uc3RhcixcclxuICAgICAgICAgICAgICAgIHRhbGVudHM6IHRoaXMuY29tbWVudFN0YXJbM10uc3RhcixcclxuICAgICAgICAgICAgICAgIHNhbGFyeTogdGhpcy5jb21tZW50U3Rhcls0XS5zdGFyLFxyXG4gICAgICAgICAgICAgICAgZGV2ZWxvcDogdGhpcy5jb21tZW50U3Rhcls1XS5zdGFyXHJcbiAgICAgICAgICAgIH0sICcvVXNlckNvbXBhbnlBcHByYWlzZUxpc3QvYWRkJylcclxuICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfor4Tku7fmiJDlip8nfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5lcnIgPT0gMjEzMTEyMDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5oKo5bey6K+E5Lu36L+H77yM6K+3OTDlpKnlkI7lho3mnaXor4Tku7cnfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5lcnIgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5oKo6L+Y5pyq5a6M5oiQ6K+E5Lu3J30pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGFuZ2VTdGFyIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmlkICE9PSB1bmRlZmluZWQgJiYgZS50YXJnZXQuZGF0YXNldC5pbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb21tZW50U3RhcltlLnRhcmdldC5kYXRhc2V0LmlkXS5zdGFyID09PSBlLnRhcmdldC5kYXRhc2V0LmluZGV4ICsgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudFN0YXJbZS50YXJnZXQuZGF0YXNldC5pZF0uc3RhciA9IDBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21tZW50U3RhcltlLnRhcmdldC5kYXRhc2V0LmlkXS5zdGFyID0gZS50YXJnZXQuZGF0YXNldC5pbmRleCArIDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd1RlYW1JbnRybyAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy50ZWFtSW5kZXggPSBpbmRleFxyXG4gICAgICAgICAgICB0aGlzLnRlYW1EZXRhaWwgPSB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoaWRlVGVhbVBvcHVwICgpIHtcclxuICAgICAgICAgICAgdGhpcy50ZWFtRGV0YWlsID0gZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhpZGVTaG9wUG9wdXAgKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3BEZXRhaWwgPSBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3Blbk1hcCAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkub3BlbkxvY2F0aW9uKHtcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLmxvY2F0aW9uLmxhdCxcclxuICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogdGhpcy5sb2NhdGlvbi5sb24sXHJcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLmJhc2VEYXRhLm5pY2tuYW1lLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogdGhpcy5iYXNlRGF0YS5jaXR5TmFtZSArIHRoaXMuZGV0YWlsQWRkcmVzc1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd0RldGFpbCAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG9wSW5kZXggPSBOdW1iZXIucGFyc2VJbnQoaW5kZXgpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvcERldGFpbCA9IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvbGxvd0NvbXBhbnkgKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubG9naW4uaGFzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn6K+35YWI55m75b2VJ30pXHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe3VybDogJ2xvZ2luJ30pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IHRoaXMuYmFzZURhdGEuaGFzT3BlcmF0ZSA9PSAxID8gMCA6IDFcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LlBvc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLmxvZ2luLnVzZXJJZCxcclxuICAgICAgICAgICAgICAgIG9iamVjdElkOiB0aGlzLmxvZ2luLmlkLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIHN0YXR1czogdHlwZVxyXG4gICAgICAgICAgICB9LCAnL1VzZXJPcGVyYXRlL2FkZFVzZXJPcGVyYXRlJylcclxuICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJhc2VEYXRhLmhhc09wZXJhdGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICflt7Llj5bmtojlhbPms6gnfSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2VEYXRhLmhhc09wZXJhdGUgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9sbG93ID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2xsb3cgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZvbGxvdyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9sbG93ID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+W3suWFs+azqCd9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZURhdGEuaGFzT3BlcmF0ZSA9IDFcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2xsb3cgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbGxvdyA9IDFcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZm9sbG93ID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2xsb3cgPSAyXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RvcFByb3BhZ2F0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdhdGNoID0ge1xyXG4gICAgICAgIHRhYkluZGV4IChuZXdWYWwsIG9sZFZhbCkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsID4gMSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChuZXdWYWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VzZXJDb21wYW55SWQnOiB0aGlzLmJhc2VEYXRhLnVzZXJJZFxyXG4gICAgICAgICAgICAgICAgICAgIH0sICcvQ29tcGFueU1hbmFnZXIvZ2V0TGlzdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2coZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZWFtID0gZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAndXNlckNvbXBhbnlJZCc6IHRoaXMuYmFzZURhdGEudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29tcGFueVR5cGUnOiB0aGlzLmJhc2VEYXRhLmNvbXBhbnlUeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgJy9TaG9wTGlzdC9nZXRMaXN0JylcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3AgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd1c2VyQ29tcGFueUlkJzogdGhpcy5iYXNlRGF0YS51c2VySWRcclxuICAgICAgICAgICAgICAgICAgICB9LCAnL0ludml0ZVdvcmsvZ2V0TGlzdEJ5VXNlckNvbXBhbnlJZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2coZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qb2IgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5iYXNlRGF0YS5uaWNrbmFtZSxcclxuICAgICAgICAgICAgcGF0aDogYC9wYWdlcy9jb21wYW55P2lkPSR7dGhpcy5iYXNlRGF0YS51c2VySWR9YCxcclxuICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZyhyZXQpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2coZXJyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUGFnZVNjcm9sbCAoZSkge1xyXG4gICAgICAgIGlmIChlLnNjcm9sbFRvcCA+PSAzMzUpIHtcclxuICAgICAgICAgICAgdGhpcy50YWJGaXhlZCA9IHRydWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRhYkZpeGVkID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLljbjovb3lkI7muIXpmaTpgLvovpHmlbDmja5cclxuICAgICAqL1xyXG4gICAgb25VbmxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMubmFtZUhpZGRlbiA9IHRydWVcclxuICAgICAgICB0aGlzLnRhYkluZGV4ID0gMVxyXG4gICAgICAgIHRoaXMudGFiRml4ZWQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMudW5mb2xkID0gZmFsc2VcclxuICAgICAgICB0aGlzLmNvbW1lbnQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMudGVhbURldGFpbCA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5zaG9wRGV0YWlsID0gZmFsc2VcclxuICAgICAgICB0aGlzLnRlYW1JbmRleCA9IDBcclxuICAgICAgICB0aGlzLnNob3BJbmRleCA9IDBcclxuICAgICAgICB0aGlzLmJhc2VEYXRhID0gbnVsbFxyXG4gICAgICAgIHRoaXMuYWJvdXQgPSBudWxsXHJcbiAgICAgICAgdGhpcy50ZW1wUHJvZ3Jlc3MgPSBbXVxyXG4gICAgICAgIHRoaXMudGVhbSA9IFtdXHJcbiAgICAgICAgdGhpcy5zaG9wID0gW11cclxuICAgICAgICB0aGlzLmpvYiA9IFtdXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICB3ZXB5Lm9uU29ja2V0TWVzc2FnZShyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCA9IE51bWJlci5wYXJzZUludCh0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCkgKyAxXHJcbiAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfmgqjmnInmlrDmtojmga8nfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAocGFyYW1zKSB7XHJcbiAgICAgICAgLy8gdGhpcy5sb2FkaW5nID0gdHJ1ZVxyXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJ30pXHJcbiAgICAgICAgdGhpcy5sb2dpbi5pZCA9IHBhcmFtcy5pZFxyXG4gICAgICAgIEdldCgndXNlcklkJykudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luLmhhcyA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5sb2dpbi51c2VySWQgPSByZXRcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW4uaGFzID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgd3guY3JlYXRlU2VsZWN0b3JRdWVyeSgpLnNlbGVjdCgnI2ZpeGVkJykuYm91bmRpbmdDbGllbnRSZWN0KHJlY3QgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRvcCA9IHJlY3QudG9wXHJcbiAgICAgICAgfSkuZXhlYygpXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHsndXNlckNvbXBhbnlJZCc6IHBhcmFtcy5pZH0sICcvQ29tcGFueS9nZXRBYm91dCcpLFxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHsndXNlckNvbXBhbnlJZCc6IHBhcmFtcy5pZCwgJ3VzZXJJZCc6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpIHx8IDB9LCAnL0NvbXBhbnkvZ2V0SW5mbycpXHJcbiAgICAgICAgXSkudGhlbigoW3tkYXRhOiBhYm91dH0sIHtkYXRhOiBpbmZvfV0pID0+IHtcclxuICAgICAgICAgICAgbG9nKGluZm8pXHJcbiAgICAgICAgICAgIGluZm8uY29tcGFueVR5cGUgPSBOdW1iZXIucGFyc2VJbnQoaW5mby5jb21wYW55VHlwZSlcclxuICAgICAgICAgICAgaW5mby5hdHRlbnRpb25OdW0gPSBOdW1iZXIucGFyc2VJbnQoaW5mby5hdHRlbnRpb25OdW0pXHJcbiAgICAgICAgICAgIHRoaXMuYmFzZURhdGEgPSBpbmZvXHJcbiAgICAgICAgICAgIHRoaXMudGVtcFByb2dyZXNzID0gYWJvdXQucHJvZ3Jlc3NMaXN0LnNsaWNlKDAsIDMpXHJcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy50ZW1wUHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueWVhciA9IGl0ZW0udGltZS5zbGljZSgwLCA0KVxyXG4gICAgICAgICAgICAgICAgaXRlbS5tb250aCA9IGl0ZW0udGltZS5zbGljZSg0LCA2KVxyXG4gICAgICAgICAgICAgICAgaXRlbS5kYXkgPSBpdGVtLnRpbWUuc2xpY2UoNiwgOClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy50ZW1wUHJvZ3Jlc3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wUHJvZ3Jlc3NbdGhpcy50ZW1wUHJvZ3Jlc3MubGVuZ3RoIC0gMV0ubGFzdCA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFib3V0ID0gYWJvdXRcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcclxuICAgICAgICAgICAgd2VweS5zZXROYXZpZ2F0aW9uQmFyQ29sb3Ioe1xyXG4gICAgICAgICAgICAgICAgZnJvbnRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzQwYzRmZidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB0aGlzLm1hcEFwaS5nZW9jb2Rlcih7XHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiB0aGlzLmJhc2VEYXRhLmNpdHlOYW1lICsgdGhpcy5kZXRhaWxBZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHtyZXN1bHQ6IHsgbG9jYXRpb24gfX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uLmxvbiA9IGxvY2F0aW9uLmxuZ1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24ubGF0ID0gbG9jYXRpb24ubGF0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsb2coZXJyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==