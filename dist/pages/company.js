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
        }), _this.request = new _request2.default(), _this.location = {
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
            'job-item': _jobListItem2.default
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
                this.comment = true;
            },
            hideComment: function hideComment() {
                this.comment = false;
            },
            sureComment: function sureComment() {
                // 调评价接口
                this.comment = false;
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
            stopPropagation: function stopPropagation() {
                return false;
            }
        }, _this.watch = {
            tabIndex: function tabIndex(newVal, oldVal) {
                var _this2 = this;

                if (newVal > 1) {
                    switch (newVal) {
                        case 2:
                            this.request.Get({
                                'userCompanyId': this.baseData.userId
                            }, '/CompanyManager/getList').then(function (_ref2) {
                                var data = _ref2.data;

                                (0, _log.log)(data);
                                _this2.team = data;
                                _this2.$apply();
                            });
                            break;
                        case 3:
                            this.request.Get({
                                'userCompanyId': this.baseData.userId,
                                'companyType': this.baseData.companyType
                            }, '/ShopList/getList').then(function (_ref3) {
                                var data = _ref3.data;

                                (0, _log.log)(data);
                                _this2.shop = data;
                                _this2.$apply();
                            });
                            break;
                        case 4:
                            this.request.Get({
                                'userCompanyId': this.baseData.userId
                            }, '/InviteWork/getListByUserCompanyId').then(function (_ref4) {
                                var data = _ref4.data;

                                (0, _log.log)(data);
                                _this2.job = data;
                                _this2.$apply();
                            });
                            break;
                        default:
                    }
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Company, [{
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
            var _this3 = this;

            this.loading = true;
            wx.createSelectorQuery().select('#fixed').boundingClientRect(function (rect) {
                _this3.scrollTop = rect.top;
            }).exec();
            Promise.all([this.request.Get({ 'userCompanyId': params.id }, '/Company/getAbout'), this.request.Get({ 'userCompanyId': params.id, 'userId': _wepy2.default.getStorageSync('userId') || 0 }, '/Company/getInfo')]).then(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 2),
                    about = _ref6[0].data,
                    info = _ref6[1].data;

                (0, _log.log)(info);
                info.companyType = Number.parseInt(info.companyType);
                _this3.baseData = info;
                _this3.tempProgress = about.progressList.slice(0, 3);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this3.tempProgress[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

                if (_this3.tempProgress.length > 0) {
                    _this3.tempProgress[_this3.tempProgress.length - 1].last = true;
                }
                _this3.about = about;
                _this3.loading = false;
                _wepy2.default.setNavigationBarColor({
                    frontColor: '#ffffff',
                    backgroundColor: '#40c4ff'
                });
                _this3.$apply();
                _this3.mapApi.geocoder({
                    address: _this3.baseData.cityName + _this3.detailAddress,
                    success: function success(_ref7) {
                        var location = _ref7.result.location;

                        _this3.location.lon = location.lng;
                        _this3.location.lat = location.lat;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBhbnkuanMiXSwibmFtZXMiOlsiQ29tcGFueSIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImxvYWRpbmciLCJuYW1lSGlkZGVuIiwidGFiSW5kZXgiLCJ0YWJGaXhlZCIsInVuZm9sZCIsImNvbW1lbnQiLCJ0ZWFtRGV0YWlsIiwic2hvcERldGFpbCIsInRlYW1JbmRleCIsInNob3BJbmRleCIsImJhc2VEYXRhIiwiYWJvdXQiLCJ0ZW1wUHJvZ3Jlc3MiLCJ0ZWFtIiwic2hvcCIsImpvYiIsImNvbW1lbnRTdGFyIiwidGV4dCIsInN0YXIiLCJtYXBBcGkiLCJrZXkiLCJyZXF1ZXN0IiwibG9jYXRpb24iLCJsb24iLCJsYXQiLCJzY3JvbGxUb3AiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNvbXB1dGVkIiwiZGV0YWlsQWRkcmVzcyIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwibGVuZ3RoIiwiYWRkcmVzcyIsImV2ZW50cyIsIm1ldGhvZHMiLCJzaG93TmFtZSIsInRvZ2dsZVRhYiIsImUiLCJOdW1iZXIiLCJwYXJzZUludCIsInRhcmdldCIsImRhdGFzZXQiLCJpbmRleCIsInByZXZpZXciLCJpbWdMaXN0RnVsbCIsInNsaWRlIiwic2hvd0NvbW1lbnQiLCJoaWRlQ29tbWVudCIsInN1cmVDb21tZW50IiwiY2hhbmdlU3RhciIsImlkIiwidW5kZWZpbmVkIiwic2hvd1RlYW1JbnRybyIsImhpZGVUZWFtUG9wdXAiLCJoaWRlU2hvcFBvcHVwIiwib3Blbk1hcCIsIm9wZW5Mb2NhdGlvbiIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwibmFtZSIsIm5pY2tuYW1lIiwiY2l0eU5hbWUiLCJzaG93RGV0YWlsIiwic3RvcFByb3BhZ2F0aW9uIiwid2F0Y2giLCJuZXdWYWwiLCJvbGRWYWwiLCJHZXQiLCJ1c2VySWQiLCJ0aGVuIiwiJGFwcGx5IiwiY29tcGFueVR5cGUiLCJ0aXRsZSIsInBhdGgiLCJzdWNjZXNzIiwicmV0IiwiZmFpbCIsImVyciIsInBhcmFtcyIsInd4IiwiY3JlYXRlU2VsZWN0b3JRdWVyeSIsInNlbGVjdCIsImJvdW5kaW5nQ2xpZW50UmVjdCIsInJlY3QiLCJ0b3AiLCJleGVjIiwiUHJvbWlzZSIsImFsbCIsImdldFN0b3JhZ2VTeW5jIiwiaW5mbyIsInByb2dyZXNzTGlzdCIsInNsaWNlIiwiaXRlbSIsInllYXIiLCJ0aW1lIiwibW9udGgiLCJkYXkiLCJsYXN0Iiwic2V0TmF2aWdhdGlvbkJhckNvbG9yIiwiZnJvbnRDb2xvciIsImJhY2tncm91bmRDb2xvciIsImdlb2NvZGVyIiwicmVzdWx0IiwibG5nIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUlBOzs7O0FBR0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7O0FBVEE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztJQU1xQkEsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QjtBQUZuQixTLFFBS1RDLEksR0FBTztBQUNIQyxxQkFBUyxLQUROO0FBRUhDLHdCQUFZLElBRlQ7QUFHSEMsc0JBQVUsQ0FIUDtBQUlIQyxzQkFBVSxLQUpQO0FBS0hDLG9CQUFRLEtBTEw7QUFNSEMscUJBQVMsS0FOTjtBQU9IQyx3QkFBWSxLQVBUO0FBUUhDLHdCQUFZLEtBUlQ7QUFTSEMsdUJBQVcsQ0FUUjtBQVVIQyx1QkFBVyxDQVZSO0FBV0hDLHNCQUFVLElBWFA7QUFZSEMsbUJBQU8sSUFaSjtBQWFIQywwQkFBYyxFQWJYO0FBY0hDLGtCQUFNLEVBZEg7QUFlSEMsa0JBQU0sRUFmSDtBQWdCSEMsaUJBQUssRUFoQkY7QUFpQkhDLHlCQUFhLENBQ1Q7QUFDSUMsc0JBQU0sT0FEVjtBQUVJQyxzQkFBTTtBQUZWLGFBRFMsRUFJTjtBQUNDRCxzQkFBTSxPQURQO0FBRUNDLHNCQUFNO0FBRlAsYUFKTSxFQU9OO0FBQ0NELHNCQUFNLE1BRFA7QUFFQ0Msc0JBQU07QUFGUCxhQVBNLEVBVU47QUFDQ0Qsc0JBQU0sTUFEUDtBQUVDQyxzQkFBTTtBQUZQLGFBVk0sRUFhTjtBQUNDRCxzQkFBTSxNQURQO0FBRUNDLHNCQUFNO0FBRlAsYUFiTSxFQWdCTjtBQUNDRCxzQkFBTSxNQURQO0FBRUNDLHNCQUFNO0FBRlAsYUFoQk07QUFqQlYsUyxRQXdDUEMsTSxHQUFTLDJCQUFZO0FBQ2pCQztBQURpQixTQUFaLEMsUUFJVEMsTyxHQUFVLHVCLFFBRVZDLFEsR0FBVztBQUNQQyxpQkFBSyxFQURFO0FBRVBDLGlCQUFLO0FBRkUsUyxRQUtYQyxTLEdBQVksQyxRQUViQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMsZ0JBQWUsRUFBQyxPQUFNLEtBQVAsRUFBYSxRQUFPLE1BQXBCLEVBQTJCLFNBQVEsT0FBbkMsRUFBMkMsT0FBTSxXQUFqRCxFQUE2RCxTQUFRLEdBQXJFLEVBQWhCLEVBQTBGLHdCQUF1QixFQUFDLE9BQU0sS0FBUCxFQUFhLFFBQU8sTUFBcEIsRUFBMkIsU0FBUSxPQUFuQyxFQUEyQyxPQUFNLFdBQWpELEVBQTZELFNBQVEsR0FBckUsRUFBakgsRUFBMkwsUUFBTyxFQUFDLE9BQU0sS0FBUCxFQUFhLFFBQU8sTUFBcEIsRUFBMkIsU0FBUSxPQUFuQyxFQUEyQyxPQUFNLFdBQWpELEVBQTZELFNBQVEsR0FBckUsRUFBbE0sRUFBWixFQUF5UixXQUFVLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsb0JBQW1CLFNBQXRDLEVBQW5TLEVBQW9WLFlBQVcsRUFBQyxnQkFBZSxFQUFoQixFQUFtQixvQkFBbUIsT0FBdEMsRUFBL1YsRSxRQUNaQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDTix3Q0FETTtBQUVOO0FBQ0EsOENBSE07QUFJTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUk0sUyxRQVdWQyxRLEdBQVc7QUFDUEMseUJBRE8sMkJBQ1U7QUFDYixvQkFBSSxLQUFLbkIsS0FBVCxFQUFnQjtBQUNaLDJCQUFPLEtBQUtBLEtBQUwsQ0FBV1csUUFBWCxDQUFvQlMsU0FBcEIsQ0FBOEIsS0FBS3BCLEtBQUwsQ0FBV1csUUFBWCxDQUFvQlUsV0FBcEIsQ0FBZ0MsR0FBaEMsSUFBdUMsQ0FBckUsRUFBd0UsS0FBS3JCLEtBQUwsQ0FBV1csUUFBWCxDQUFvQlcsTUFBNUYsSUFBc0csS0FBS3RCLEtBQUwsQ0FBV3VCLE9BQXhIO0FBQ0g7QUFDSjtBQUxNLFMsUUFRWEMsTSxHQUFTO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWSyxTLFFBYVRDLE8sR0FBVTtBQUNOQyxvQkFETSxzQkFDTTtBQUNSLHFCQUFLcEMsVUFBTCxHQUFrQixDQUFDLEtBQUtBLFVBQXhCO0FBQ0gsYUFISztBQUlOcUMscUJBSk0scUJBSUtDLENBSkwsRUFJUTtBQUNWLHFCQUFLckMsUUFBTCxHQUFnQnNDLE9BQU9DLFFBQVAsQ0FBZ0JGLEVBQUVHLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQkMsS0FBakMsQ0FBaEI7QUFDSCxhQU5LO0FBT05DLG1CQVBNLG1CQU9HTixDQVBILEVBT007QUFDUix5Q0FBUUEsRUFBRUcsTUFBRixDQUFTQyxPQUFULENBQWlCQyxLQUF6QixFQUFnQyxLQUFLakMsS0FBTCxDQUFXbUMsV0FBM0M7QUFDSCxhQVRLO0FBVU5DLGlCQVZNLG1CQVVHO0FBQ0wscUJBQUszQyxNQUFMLEdBQWMsQ0FBQyxLQUFLQSxNQUFwQjtBQUNILGFBWks7QUFhTjRDLHVCQWJNLHlCQWFTO0FBQ1gscUJBQUszQyxPQUFMLEdBQWUsSUFBZjtBQUNILGFBZks7QUFnQk40Qyx1QkFoQk0seUJBZ0JTO0FBQ1gscUJBQUs1QyxPQUFMLEdBQWUsS0FBZjtBQUNILGFBbEJLO0FBbUJONkMsdUJBbkJNLHlCQW1CUztBQUNYO0FBQ0EscUJBQUs3QyxPQUFMLEdBQWUsS0FBZjtBQUNILGFBdEJLO0FBdUJOOEMsc0JBdkJNLHNCQXVCTVosQ0F2Qk4sRUF1QlM7QUFDWCxvQkFBSUEsRUFBRUcsTUFBRixDQUFTQyxPQUFULENBQWlCUyxFQUFqQixLQUF3QkMsU0FBeEIsSUFBcUNkLEVBQUVHLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQkMsS0FBakIsS0FBMkJTLFNBQXBFLEVBQStFO0FBQzNFLHdCQUFJLEtBQUtyQyxXQUFMLENBQWlCdUIsRUFBRUcsTUFBRixDQUFTQyxPQUFULENBQWlCUyxFQUFsQyxFQUFzQ2xDLElBQXRDLEtBQStDcUIsRUFBRUcsTUFBRixDQUFTQyxPQUFULENBQWlCQyxLQUFqQixHQUF5QixDQUE1RSxFQUErRTtBQUMzRSw2QkFBSzVCLFdBQUwsQ0FBaUJ1QixFQUFFRyxNQUFGLENBQVNDLE9BQVQsQ0FBaUJTLEVBQWxDLEVBQXNDbEMsSUFBdEMsR0FBNkMsQ0FBN0M7QUFDSCxxQkFGRCxNQUVPO0FBQ0gsNkJBQUtGLFdBQUwsQ0FBaUJ1QixFQUFFRyxNQUFGLENBQVNDLE9BQVQsQ0FBaUJTLEVBQWxDLEVBQXNDbEMsSUFBdEMsR0FBNkNxQixFQUFFRyxNQUFGLENBQVNDLE9BQVQsQ0FBaUJDLEtBQWpCLEdBQXlCLENBQXRFO0FBQ0g7QUFDSjtBQUNKLGFBL0JLO0FBZ0NOVSx5QkFoQ00seUJBZ0NTVixLQWhDVCxFQWdDZ0I7QUFDbEIscUJBQUtwQyxTQUFMLEdBQWlCb0MsS0FBakI7QUFDQSxxQkFBS3RDLFVBQUwsR0FBa0IsSUFBbEI7QUFDSCxhQW5DSztBQW9DTmlELHlCQXBDTSwyQkFvQ1c7QUFDYixxQkFBS2pELFVBQUwsR0FBa0IsS0FBbEI7QUFDSCxhQXRDSztBQXVDTmtELHlCQXZDTSwyQkF1Q1c7QUFDYixxQkFBS2pELFVBQUwsR0FBa0IsS0FBbEI7QUFDSCxhQXpDSztBQTBDTmtELG1CQTFDTSxxQkEwQ0s7QUFDUCwrQkFBS0MsWUFBTCxDQUFrQjtBQUNkQyw4QkFBVSxLQUFLckMsUUFBTCxDQUFjRSxHQURWO0FBRWRvQywrQkFBVyxLQUFLdEMsUUFBTCxDQUFjQyxHQUZYO0FBR2RzQywwQkFBTSxLQUFLbkQsUUFBTCxDQUFjb0QsUUFITjtBQUlkNUIsNkJBQVMsS0FBS3hCLFFBQUwsQ0FBY3FELFFBQWQsR0FBeUIsS0FBS2pDO0FBSnpCLGlCQUFsQjtBQU1ILGFBakRLO0FBa0ROa0Msc0JBbERNLHNCQWtETXBCLEtBbEROLEVBa0RhO0FBQ2YscUJBQUtuQyxTQUFMLEdBQWlCK0IsT0FBT0MsUUFBUCxDQUFnQkcsS0FBaEIsQ0FBakI7QUFDQSxxQkFBS3JDLFVBQUwsR0FBa0IsSUFBbEI7QUFDSCxhQXJESztBQXNETjBELDJCQXRETSw2QkFzRGE7QUFDZix1QkFBTyxLQUFQO0FBQ0g7QUF4REssUyxRQTJEVkMsSyxHQUFRO0FBQ0poRSxvQkFESSxvQkFDTWlFLE1BRE4sRUFDY0MsTUFEZCxFQUNzQjtBQUFBOztBQUN0QixvQkFBSUQsU0FBUyxDQUFiLEVBQWdCO0FBQ1osNEJBQVFBLE1BQVI7QUFDQSw2QkFBSyxDQUFMO0FBQ0ksaUNBQUs5QyxPQUFMLENBQWFnRCxHQUFiLENBQWlCO0FBQ2IsaURBQWlCLEtBQUszRCxRQUFMLENBQWM0RDtBQURsQiw2QkFBakIsRUFFRyx5QkFGSCxFQUdDQyxJQUhELENBR00saUJBQVk7QUFBQSxvQ0FBVnhFLElBQVUsU0FBVkEsSUFBVTs7QUFDZCw4Q0FBSUEsSUFBSjtBQUNBLHVDQUFLYyxJQUFMLEdBQVlkLElBQVo7QUFDQSx1Q0FBS3lFLE1BQUw7QUFDSCw2QkFQRDtBQVFBO0FBQ0osNkJBQUssQ0FBTDtBQUNJLGlDQUFLbkQsT0FBTCxDQUFhZ0QsR0FBYixDQUFpQjtBQUNiLGlEQUFpQixLQUFLM0QsUUFBTCxDQUFjNEQsTUFEbEI7QUFFYiwrQ0FBZSxLQUFLNUQsUUFBTCxDQUFjK0Q7QUFGaEIsNkJBQWpCLEVBR0csbUJBSEgsRUFJQ0YsSUFKRCxDQUlNLGlCQUFZO0FBQUEsb0NBQVZ4RSxJQUFVLFNBQVZBLElBQVU7O0FBQ2QsOENBQUlBLElBQUo7QUFDQSx1Q0FBS2UsSUFBTCxHQUFZZixJQUFaO0FBQ0EsdUNBQUt5RSxNQUFMO0FBQ0gsNkJBUkQ7QUFTQTtBQUNKLDZCQUFLLENBQUw7QUFDSSxpQ0FBS25ELE9BQUwsQ0FBYWdELEdBQWIsQ0FBaUI7QUFDYixpREFBaUIsS0FBSzNELFFBQUwsQ0FBYzREO0FBRGxCLDZCQUFqQixFQUVHLG9DQUZILEVBR0NDLElBSEQsQ0FHTSxpQkFBWTtBQUFBLG9DQUFWeEUsSUFBVSxTQUFWQSxJQUFVOztBQUNkLDhDQUFJQSxJQUFKO0FBQ0EsdUNBQUtnQixHQUFMLEdBQVdoQixJQUFYO0FBQ0EsdUNBQUt5RSxNQUFMO0FBQ0gsNkJBUEQ7QUFRQTtBQUNKO0FBaENBO0FBa0NIO0FBQ0o7QUF0Q0csUzs7Ozs7NENBeUNhO0FBQ2pCLG1CQUFPO0FBQ0hFLHVCQUFPLEtBQUtoRSxRQUFMLENBQWNvRCxRQURsQjtBQUVIYSw2Q0FBMkIsS0FBS2pFLFFBQUwsQ0FBYzRELE1BRnRDO0FBR0hNLHlCQUFTLHNCQUFPO0FBQ1osa0NBQUlDLEdBQUo7QUFDSCxpQkFMRTtBQU1IQyxzQkFBTSxtQkFBTztBQUNULGtDQUFJQyxHQUFKO0FBQ0g7QUFSRSxhQUFQO0FBVUg7OztxQ0FFYXhDLEMsRUFBRztBQUNiLGdCQUFJQSxFQUFFZCxTQUFGLElBQWUsR0FBbkIsRUFBd0I7QUFDcEIscUJBQUt0QixRQUFMLEdBQWdCLElBQWhCO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUtBLFFBQUwsR0FBZ0IsS0FBaEI7QUFDSDtBQUNKOztBQUVEOzs7Ozs7bUNBR1k7QUFDUixpQkFBS0YsVUFBTCxHQUFrQixJQUFsQjtBQUNBLGlCQUFLQyxRQUFMLEdBQWdCLENBQWhCO0FBQ0EsaUJBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxpQkFBS0MsTUFBTCxHQUFjLEtBQWQ7QUFDQSxpQkFBS0MsT0FBTCxHQUFlLEtBQWY7QUFDQSxpQkFBS0MsVUFBTCxHQUFrQixLQUFsQjtBQUNBLGlCQUFLQyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsaUJBQUtDLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxpQkFBS0MsU0FBTCxHQUFpQixDQUFqQjtBQUNBLGlCQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsaUJBQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0EsaUJBQUtDLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxpQkFBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxpQkFBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxpQkFBS0MsR0FBTCxHQUFXLEVBQVg7QUFDSDs7OytCQUVPaUUsTSxFQUFRO0FBQUE7O0FBQ1osaUJBQUtoRixPQUFMLEdBQWUsSUFBZjtBQUNBaUYsZUFBR0MsbUJBQUgsR0FBeUJDLE1BQXpCLENBQWdDLFFBQWhDLEVBQTBDQyxrQkFBMUMsQ0FBNkQsZ0JBQVE7QUFDakUsdUJBQUszRCxTQUFMLEdBQWlCNEQsS0FBS0MsR0FBdEI7QUFDSCxhQUZELEVBRUdDLElBRkg7QUFHQUMsb0JBQVFDLEdBQVIsQ0FBWSxDQUNSLEtBQUtwRSxPQUFMLENBQWFnRCxHQUFiLENBQWlCLEVBQUMsaUJBQWlCVyxPQUFPNUIsRUFBekIsRUFBakIsRUFBK0MsbUJBQS9DLENBRFEsRUFFUixLQUFLL0IsT0FBTCxDQUFhZ0QsR0FBYixDQUFpQixFQUFDLGlCQUFpQlcsT0FBTzVCLEVBQXpCLEVBQTZCLFVBQVUsZUFBS3NDLGNBQUwsQ0FBb0IsUUFBcEIsS0FBaUMsQ0FBeEUsRUFBakIsRUFBNkYsa0JBQTdGLENBRlEsQ0FBWixFQUdHbkIsSUFISCxDQUdRLGlCQUFtQztBQUFBO0FBQUEsb0JBQTFCNUQsS0FBMEIsWUFBaENaLElBQWdDO0FBQUEsb0JBQVg0RixJQUFXLFlBQWpCNUYsSUFBaUI7O0FBQ3ZDLDhCQUFJNEYsSUFBSjtBQUNBQSxxQkFBS2xCLFdBQUwsR0FBbUJqQyxPQUFPQyxRQUFQLENBQWdCa0QsS0FBS2xCLFdBQXJCLENBQW5CO0FBQ0EsdUJBQUsvRCxRQUFMLEdBQWdCaUYsSUFBaEI7QUFDQSx1QkFBSy9FLFlBQUwsR0FBb0JELE1BQU1pRixZQUFOLENBQW1CQyxLQUFuQixDQUF5QixDQUF6QixFQUE0QixDQUE1QixDQUFwQjtBQUp1QztBQUFBO0FBQUE7O0FBQUE7QUFLdkMseUNBQWlCLE9BQUtqRixZQUF0Qiw4SEFBb0M7QUFBQSw0QkFBM0JrRixJQUEyQjs7QUFDaENBLDZCQUFLQyxJQUFMLEdBQVlELEtBQUtFLElBQUwsQ0FBVUgsS0FBVixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFaO0FBQ0FDLDZCQUFLRyxLQUFMLEdBQWFILEtBQUtFLElBQUwsQ0FBVUgsS0FBVixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFiO0FBQ0FDLDZCQUFLSSxHQUFMLEdBQVdKLEtBQUtFLElBQUwsQ0FBVUgsS0FBVixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFYO0FBQ0g7QUFUc0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFVdkMsb0JBQUksT0FBS2pGLFlBQUwsQ0FBa0JxQixNQUFsQixHQUEyQixDQUEvQixFQUFrQztBQUM5QiwyQkFBS3JCLFlBQUwsQ0FBa0IsT0FBS0EsWUFBTCxDQUFrQnFCLE1BQWxCLEdBQTJCLENBQTdDLEVBQWdEa0UsSUFBaEQsR0FBdUQsSUFBdkQ7QUFDSDtBQUNELHVCQUFLeEYsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsdUJBQUtYLE9BQUwsR0FBZSxLQUFmO0FBQ0EsK0JBQUtvRyxxQkFBTCxDQUEyQjtBQUN2QkMsZ0NBQVksU0FEVztBQUV2QkMscUNBQWlCO0FBRk0saUJBQTNCO0FBSUEsdUJBQUs5QixNQUFMO0FBQ0EsdUJBQUtyRCxNQUFMLENBQVlvRixRQUFaLENBQXFCO0FBQ2pCckUsNkJBQVMsT0FBS3hCLFFBQUwsQ0FBY3FELFFBQWQsR0FBeUIsT0FBS2pDLGFBRHRCO0FBRWpCOEMsNkJBQVMsd0JBQTRCO0FBQUEsNEJBQWhCdEQsUUFBZ0IsU0FBMUJrRixNQUEwQixDQUFoQmxGLFFBQWdCOztBQUNqQywrQkFBS0EsUUFBTCxDQUFjQyxHQUFkLEdBQW9CRCxTQUFTbUYsR0FBN0I7QUFDQSwrQkFBS25GLFFBQUwsQ0FBY0UsR0FBZCxHQUFvQkYsU0FBU0UsR0FBN0I7QUFDSCxxQkFMZ0I7QUFNakJzRCwwQkFBTSxtQkFBTztBQUNULHNDQUFJQyxHQUFKO0FBQ0g7QUFSZ0IsaUJBQXJCO0FBVUgsYUFqQ0Q7QUFrQ0g7Ozs7RUFsUmdDLGVBQUsyQixJOztrQkFBckIvRyxPIiwiZmlsZSI6ImNvbXBhbnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQgUHJvZ3Jlc3MgZnJvbSAnLi4vY29tcG9uZW50cy9jb21wLXByb2dyZXNzJ1xyXG4vLyBpbXBvcnQgU2hvcEl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21wLXNob3AtaXRlbSdcclxuLy8gaW1wb3J0IFNjaG9vbEl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21wLXNjaG9vbC1pdGVtJ1xyXG4vLyBpbXBvcnQgUHJvZEl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21wLXByb2QtaXRlbSdcclxuaW1wb3J0IEpvYkl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9qb2ItbGlzdC1pdGVtJ1xyXG4vLyBpbXBvcnQgTW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbC1wb3B1cCdcclxuLy8gaW1wb3J0IFNpbXBsZU1vZGFsIGZyb20gJy4uL2NvbXBvbmVudHMvc2ltcGxlLW1vZGFsLXBvcHVwJ1xyXG5pbXBvcnQgeyBRUU1BUEtFWSB9IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cydcclxuaW1wb3J0IFFRTWFwV1ggZnJvbSAnLi4vdXRpbHMvcXFtYXAtd3gtanNzZGsubWluJ1xyXG5pbXBvcnQgeyBQcmV2aWV3IH0gZnJvbSAnLi4vdXRpbHMvaW1hZ2VVdGlscydcclxuaW1wb3J0IHtsb2d9IGZyb20gJy4uL3V0aWxzL2xvZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBhbnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5YWs5Y+45L+h5oGvJ1xyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgbmFtZUhpZGRlbjogdHJ1ZSxcclxuICAgICAgICB0YWJJbmRleDogMSxcclxuICAgICAgICB0YWJGaXhlZDogZmFsc2UsXHJcbiAgICAgICAgdW5mb2xkOiBmYWxzZSxcclxuICAgICAgICBjb21tZW50OiBmYWxzZSxcclxuICAgICAgICB0ZWFtRGV0YWlsOiBmYWxzZSxcclxuICAgICAgICBzaG9wRGV0YWlsOiBmYWxzZSxcclxuICAgICAgICB0ZWFtSW5kZXg6IDAsXHJcbiAgICAgICAgc2hvcEluZGV4OiAwLFxyXG4gICAgICAgIGJhc2VEYXRhOiBudWxsLFxyXG4gICAgICAgIGFib3V0OiBudWxsLFxyXG4gICAgICAgIHRlbXBQcm9ncmVzczogW10sXHJcbiAgICAgICAgdGVhbTogW10sXHJcbiAgICAgICAgc2hvcDogW10sXHJcbiAgICAgICAgam9iOiBbXSxcclxuICAgICAgICBjb21tZW50U3RhcjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5ZOB54mM55+l5ZCN5bqmJyxcclxuICAgICAgICAgICAgICAgIHN0YXI6IDBcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+ihjOS4muW9seWTjeWKmycsXHJcbiAgICAgICAgICAgICAgICBzdGFyOiAwXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICfkvIHkuJrop4TmqKEnLFxyXG4gICAgICAgICAgICAgICAgc3RhcjogMFxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiAn5Zui6Zif5Lq65omNJyxcclxuICAgICAgICAgICAgICAgIHN0YXI6IDBcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ+iWqui1hOemj+WIqScsXHJcbiAgICAgICAgICAgICAgICBzdGFyOiAwXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICflj5HlsZXmvZzlipsnLFxyXG4gICAgICAgICAgICAgICAgc3RhcjogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIG1hcEFwaSA9IG5ldyBRUU1hcFdYKHtcclxuICAgICAgICBrZXk6IFFRTUFQS0VZXHJcbiAgICB9KVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgbG9jYXRpb24gPSB7XHJcbiAgICAgICAgbG9uOiAnJyxcclxuICAgICAgICBsYXQ6ICcnXHJcbiAgICB9XHJcblxyXG4gICAgc2Nyb2xsVG9wID0gMFxyXG5cclxuICAgJHByb3BzID0ge1wiam9iLWl0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJmb3JcIjpcImpvYlwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcInt7aW5kZXh9fVwiLFwidmFsdWVcIjpcIjJcIn0sXCJ2LWJpbmQ6bGlzdEl0ZW0ub25jZVwiOntcImZvclwiOlwiam9iXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwie3tpbmRleH19XCIsXCJ2YWx1ZVwiOlwiMlwifSxcInR5cGVcIjp7XCJmb3JcIjpcImpvYlwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcInt7aW5kZXh9fVwiLFwidmFsdWVcIjpcIjJcIn19LFwibG9hZGluZ1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2hvdy5zeW5jXCI6XCJsb2FkaW5nXCJ9LFwicHJvZ3Jlc3NcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOml0ZW0ub25jZVwiOlwiaXRlbXNcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICdsb2FkaW5nJzogTG9hZGluZyxcclxuICAgICAgICAvLyAnY29tbWVudCc6IE1vZGFsLFxyXG4gICAgICAgICdwcm9ncmVzcyc6IFByb2dyZXNzLFxyXG4gICAgICAgIC8vICdzaG9wLWl0ZW0nOiBTaG9wSXRlbSxcclxuICAgICAgICAvLyAnc2Nob29sLWl0ZW0nOiBTY2hvb2xJdGVtLFxyXG4gICAgICAgIC8vICdwcm9kLWl0ZW0nOiBQcm9kSXRlbSxcclxuICAgICAgICAvLyAndGVhbS1tb2RhbCc6IFNpbXBsZU1vZGFsLFxyXG4gICAgICAgICdqb2ItaXRlbSc6IEpvYkl0ZW1cclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgICBkZXRhaWxBZGRyZXNzICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWJvdXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFib3V0LmxvY2F0aW9uLnN1YnN0cmluZyh0aGlzLmFib3V0LmxvY2F0aW9uLmxhc3RJbmRleE9mKCctJykgKyAxLCB0aGlzLmFib3V0LmxvY2F0aW9uLmxlbmd0aCkgKyB0aGlzLmFib3V0LmFkZHJlc3NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICAgLy8gJ2NvbW1lbnQnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIC8vICAgICBsb2coYXJncylcclxuICAgICAgICAvLyAgICAgdGhpcy5jb21tZW50ID0gZmFsc2VcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vICdlbWl0SW5kZXgnOiAoaW5kZXgsIGUpID0+IHtcclxuICAgICAgICAvLyAgICAgbG9nKGluZGV4KVxyXG4gICAgICAgIC8vICAgICBsb2coZSlcclxuICAgICAgICAvLyAgICAgdGhpcy5zaG9wSW5kZXggPSBOdW1iZXIucGFyc2VJbnQoaW5kZXgpXHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2hvcERldGFpbCA9IHRydWVcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBzaG93TmFtZSAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZUhpZGRlbiA9ICF0aGlzLm5hbWVIaWRkZW5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvZ2dsZVRhYiAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRhYkluZGV4ID0gTnVtYmVyLnBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcmV2aWV3IChlKSB7XHJcbiAgICAgICAgICAgIFByZXZpZXcoZS50YXJnZXQuZGF0YXNldC5pbmRleCwgdGhpcy5hYm91dC5pbWdMaXN0RnVsbClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNsaWRlICgpIHtcclxuICAgICAgICAgICAgdGhpcy51bmZvbGQgPSAhdGhpcy51bmZvbGRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNob3dDb21tZW50ICgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tZW50ID0gdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGlkZUNvbW1lbnQgKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnQgPSBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VyZUNvbW1lbnQgKCkge1xyXG4gICAgICAgICAgICAvLyDosIPor4Tku7fmjqXlj6NcclxuICAgICAgICAgICAgdGhpcy5jb21tZW50ID0gZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoYW5nZVN0YXIgKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuaWQgIT09IHVuZGVmaW5lZCAmJiBlLnRhcmdldC5kYXRhc2V0LmluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbW1lbnRTdGFyW2UudGFyZ2V0LmRhdGFzZXQuaWRdLnN0YXIgPT09IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXggKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21tZW50U3RhcltlLnRhcmdldC5kYXRhc2V0LmlkXS5zdGFyID0gMFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1lbnRTdGFyW2UudGFyZ2V0LmRhdGFzZXQuaWRdLnN0YXIgPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4ICsgMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93VGVhbUludHJvIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnRlYW1JbmRleCA9IGluZGV4XHJcbiAgICAgICAgICAgIHRoaXMudGVhbURldGFpbCA9IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhpZGVUZWFtUG9wdXAgKCkge1xyXG4gICAgICAgICAgICB0aGlzLnRlYW1EZXRhaWwgPSBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGlkZVNob3BQb3B1cCAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvcERldGFpbCA9IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcGVuTWFwICgpIHtcclxuICAgICAgICAgICAgd2VweS5vcGVuTG9jYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgbGF0aXR1ZGU6IHRoaXMubG9jYXRpb24ubGF0LFxyXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiB0aGlzLmxvY2F0aW9uLmxvbixcclxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuYmFzZURhdGEubmlja25hbWUsXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiB0aGlzLmJhc2VEYXRhLmNpdHlOYW1lICsgdGhpcy5kZXRhaWxBZGRyZXNzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaG93RGV0YWlsIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3BJbmRleCA9IE51bWJlci5wYXJzZUludChpbmRleClcclxuICAgICAgICAgICAgdGhpcy5zaG9wRGV0YWlsID0gdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RvcFByb3BhZ2F0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdhdGNoID0ge1xyXG4gICAgICAgIHRhYkluZGV4IChuZXdWYWwsIG9sZFZhbCkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsID4gMSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChuZXdWYWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VzZXJDb21wYW55SWQnOiB0aGlzLmJhc2VEYXRhLnVzZXJJZFxyXG4gICAgICAgICAgICAgICAgICAgIH0sICcvQ29tcGFueU1hbmFnZXIvZ2V0TGlzdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2coZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZWFtID0gZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAndXNlckNvbXBhbnlJZCc6IHRoaXMuYmFzZURhdGEudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29tcGFueVR5cGUnOiB0aGlzLmJhc2VEYXRhLmNvbXBhbnlUeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgJy9TaG9wTGlzdC9nZXRMaXN0JylcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3AgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd1c2VyQ29tcGFueUlkJzogdGhpcy5iYXNlRGF0YS51c2VySWRcclxuICAgICAgICAgICAgICAgICAgICB9LCAnL0ludml0ZVdvcmsvZ2V0TGlzdEJ5VXNlckNvbXBhbnlJZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2coZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qb2IgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5iYXNlRGF0YS5uaWNrbmFtZSxcclxuICAgICAgICAgICAgcGF0aDogYC9wYWdlcy9jb21wYW55P2lkPSR7dGhpcy5iYXNlRGF0YS51c2VySWR9YCxcclxuICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZyhyZXQpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2coZXJyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUGFnZVNjcm9sbCAoZSkge1xyXG4gICAgICAgIGlmIChlLnNjcm9sbFRvcCA+PSAzMzUpIHtcclxuICAgICAgICAgICAgdGhpcy50YWJGaXhlZCA9IHRydWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRhYkZpeGVkID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLljbjovb3lkI7muIXpmaTpgLvovpHmlbDmja5cclxuICAgICAqL1xyXG4gICAgb25VbmxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMubmFtZUhpZGRlbiA9IHRydWVcclxuICAgICAgICB0aGlzLnRhYkluZGV4ID0gMVxyXG4gICAgICAgIHRoaXMudGFiRml4ZWQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMudW5mb2xkID0gZmFsc2VcclxuICAgICAgICB0aGlzLmNvbW1lbnQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMudGVhbURldGFpbCA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5zaG9wRGV0YWlsID0gZmFsc2VcclxuICAgICAgICB0aGlzLnRlYW1JbmRleCA9IDBcclxuICAgICAgICB0aGlzLnNob3BJbmRleCA9IDBcclxuICAgICAgICB0aGlzLmJhc2VEYXRhID0gbnVsbFxyXG4gICAgICAgIHRoaXMuYWJvdXQgPSBudWxsXHJcbiAgICAgICAgdGhpcy50ZW1wUHJvZ3Jlc3MgPSBbXVxyXG4gICAgICAgIHRoaXMudGVhbSA9IFtdXHJcbiAgICAgICAgdGhpcy5zaG9wID0gW11cclxuICAgICAgICB0aGlzLmpvYiA9IFtdXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkIChwYXJhbXMpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICAgICAgd3guY3JlYXRlU2VsZWN0b3JRdWVyeSgpLnNlbGVjdCgnI2ZpeGVkJykuYm91bmRpbmdDbGllbnRSZWN0KHJlY3QgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRvcCA9IHJlY3QudG9wXHJcbiAgICAgICAgfSkuZXhlYygpXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHsndXNlckNvbXBhbnlJZCc6IHBhcmFtcy5pZH0sICcvQ29tcGFueS9nZXRBYm91dCcpLFxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHsndXNlckNvbXBhbnlJZCc6IHBhcmFtcy5pZCwgJ3VzZXJJZCc6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpIHx8IDB9LCAnL0NvbXBhbnkvZ2V0SW5mbycpXHJcbiAgICAgICAgXSkudGhlbigoW3tkYXRhOiBhYm91dH0sIHtkYXRhOiBpbmZvfV0pID0+IHtcclxuICAgICAgICAgICAgbG9nKGluZm8pXHJcbiAgICAgICAgICAgIGluZm8uY29tcGFueVR5cGUgPSBOdW1iZXIucGFyc2VJbnQoaW5mby5jb21wYW55VHlwZSlcclxuICAgICAgICAgICAgdGhpcy5iYXNlRGF0YSA9IGluZm9cclxuICAgICAgICAgICAgdGhpcy50ZW1wUHJvZ3Jlc3MgPSBhYm91dC5wcm9ncmVzc0xpc3Quc2xpY2UoMCwgMylcclxuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLnRlbXBQcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgaXRlbS55ZWFyID0gaXRlbS50aW1lLnNsaWNlKDAsIDQpXHJcbiAgICAgICAgICAgICAgICBpdGVtLm1vbnRoID0gaXRlbS50aW1lLnNsaWNlKDQsIDYpXHJcbiAgICAgICAgICAgICAgICBpdGVtLmRheSA9IGl0ZW0udGltZS5zbGljZSg2LCA4KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlbXBQcm9ncmVzcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBQcm9ncmVzc1t0aGlzLnRlbXBQcm9ncmVzcy5sZW5ndGggLSAxXS5sYXN0ID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWJvdXQgPSBhYm91dFxyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICB3ZXB5LnNldE5hdmlnYXRpb25CYXJDb2xvcih7XHJcbiAgICAgICAgICAgICAgICBmcm9udENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjNDBjNGZmJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIHRoaXMubWFwQXBpLmdlb2NvZGVyKHtcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IHRoaXMuYmFzZURhdGEuY2l0eU5hbWUgKyB0aGlzLmRldGFpbEFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoe3Jlc3VsdDogeyBsb2NhdGlvbiB9fSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24ubG9uID0gbG9jYXRpb24ubG5nXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhdGlvbi5sYXQgPSBsb2NhdGlvbi5sYXRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiBlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=