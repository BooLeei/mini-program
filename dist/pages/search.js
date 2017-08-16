'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _jobListItem = require('./../components/job-list-item.js');

var _jobListItem2 = _interopRequireDefault(_jobListItem);

var _compListItem = require('./../components/comp-list-item.js');

var _compListItem2 = _interopRequireDefault(_compListItem);

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_wepy$page) {
    _inherits(Search, _wepy$page);

    function Search() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Search);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '搜索',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.$props = { "job-item": { "xmlns:v-bind": { "for": "listContent", "item": "item", "index": "index", "key": "{{index}}", "value": "1" }, "v-bind:listItem.once": { "for": "listContent", "item": "item", "index": "index", "key": "{{index}}", "value": "1" }, "type": { "for": "listContent", "item": "item", "index": "index", "key": "{{index}}", "value": "1" } }, "comp-item": { "v-bind:listItem.once": { "for": "listContent", "item": "item", "index": "index", "key": "{{index}}", "value": "item" } } }, _this.$events = {}, _this.components = {
            'job-item': _jobListItem2.default,
            'comp-item': _compListItem2.default
        }, _this.data = {
            keyword: '',
            height: 300,
            init: false,
            listContent: [],
            hotData: [{
                type: '热门职位',
                children: [{ 'name': '私人教练' }, { 'name': '私教主管' }, { 'name': '私教经理' }, { 'name': '私教总监' }, { 'name': '团课教练' }, { 'name': '团课主管' }, { 'name': '团课总监' }, { 'name': '会籍销售' }, { 'name': '会籍主管' }, { 'name': '销售经理' }, { 'name': '销售总监' }, { 'name': '客服收银' }, { 'name': '运营经理' }, { 'name': '门店店长' }, { 'name': '区域总监' }]
            }, {
                type: '热门技能',
                children: [{ 'name': 'TRX' }, { 'name': 'NTC' }, { 'name': 'EXOS' }, { 'name': 'CrossFit' }, { 'name': 'MFT' }, { 'name': 'CPR' }, { 'name': 'Lesmills' }, { 'name': 'SPINNING' }, { 'name': 'Zumba' }, { 'name': 'Salsation' }, { 'name': 'PILOXING' }, { 'name': 'POP DANCE' }]
            }, {
                type: '热门公司',
                children: [{ 'name': '威尔士健身' }, { 'name': '一兆韦德健身' }, { 'name': '舒适堡健身' }, { 'name': '浩沙健身' }, { 'name': '乐体健身' }, { 'name': '梦氏健身' }, { 'name': '美日健身' }, { 'name': '奇迹健身' }, { 'name': '超级猩猩' }, { 'name': '乐刻健身' }, { 'name': '星健身' }, { 'name': 'OneFit' }, { 'name': 'RAW FITNESS' }, { 'name': 'ReviveGYM' }, { 'name': 'RUNNINGCAT' }, { 'name': 'DP健身工作室' }]
            }],
            type: 1,
            childType: '',
            companyTypeChecked: 0,
            salaryTypeChecked: 0,
            experienceTypeChecked: 0,
            storeCountChecked: 0,
            businessTypeChecked: 0,
            companyComtChecked: 0,
            provChecked: '-1',
            cityChecked: '0',
            hotCity: [],
            provList: [],
            cityList: [],
            jobData: [{
                'index': '11',
                'name': '工作城市'
            }, {
                'index': '12',
                'name': '公司类型'
            }, {
                'index': '13',
                'name': '薪资待遇'
            }, {
                'index': '14',
                'name': '从业经验'
            }],
            companyData: [{
                'index': '21',
                'name': '公司类型'
            }, {
                'index': '22',
                'name': '店铺数量'
            }, {
                'index': '23',
                'name': '直营加盟'
            }, {
                'index': '24',
                'name': '公司评价'
            }],
            companyType: [{
                'id': 0,
                'name': '不限'
            }, {
                'id': 1,
                'name': '俱乐部'
            }, {
                'id': 2,
                'name': '工作室'
            }, {
                'id': 3,
                'name': '瑜伽馆'
            }, {
                'id': 4,
                'name': '教育培训'
            }, {
                'id': 5,
                'name': '器械设备'
            }, {
                'id': 6,
                'name': '媒体资讯'
            }, {
                'id': 7,
                'name': '会展/活动/赛事'
            }, {
                'id': 8,
                'name': '互联网'
            }, {
                'id': 9,
                'name': '其他'
            }],
            salaryType: [{
                'id': 0,
                'name': '不限'
            }, {
                'id': 1,
                'name': '3~5K'
            }, {
                'id': 2,
                'name': '6~8K'
            }, {
                'id': 3,
                'name': '9~12K'
            }, {
                'id': 4,
                'name': '13~18K'
            }, {
                'id': 5,
                'name': '19~25K'
            }, {
                'id': 6,
                'name': '26~30K'
            }, {
                'id': 7,
                'name': '31~40K'
            }, {
                'id': 8,
                'name': '41-50K'
            }],
            workExperience: [{
                'id': 0,
                'name': '不限'
            }, {
                'id': 1,
                'name': '一年以下'
            }, {
                'id': 2,
                'name': '1~2年'
            }, {
                'id': 3,
                'name': '3~5年'
            }, {
                'id': 4,
                'name': '6~8年'
            }, {
                'id': 5,
                'name': '8~10年'
            }, {
                'id': 6,
                'name': '10年以上'
            }],
            storeCount: [{
                'id': 0,
                'name': '不限'
            }, {
                'id': 1,
                'name': '1家'
            }, {
                'id': 2,
                'name': '2~5家'
            }, {
                'id': 3,
                'name': '6~10家'
            }, {
                'id': 4,
                'name': '11~20家'
            }, {
                'id': 5,
                'name': '36~50家'
            }, {
                'id': 6,
                'name': '51~80家'
            }],
            businessType: [{
                'id': 0,
                'name': '不限'
            }, {
                'id': 1,
                'name': '直营'
            }, {
                'id': 2,
                'name': '加盟'
            }, {
                'id': 3,
                'name': '直营+加盟'
            }],
            companyComt: [{
                'id': 0,
                'name': '不限'
            }, {
                'id': 1,
                'name': '很棒'
            }, {
                'id': 2,
                'name': '较好'
            }, {
                'id': 3,
                'name': '一般'
            }, {
                'id': 4,
                'name': '较差'
            }, {
                'id': 5,
                'name': '很差'
            }]
        }, _this.request = new _request2.default(), _this.page = {
            index: 1,
            hasNot: false,
            busy: false
        }, _this.methods = {
            pullLoad: function pullLoad() {
                var _this2 = this;

                if (this.page.busy) {
                    return false;
                }
                if (this.page.hasNot) {
                    return false;
                }
                this.page.index++;
                this.page.busy = true;
                if (Number.parseInt(this.type) === 1) {
                    this.searchJob(this.page.index).then(function (_ref2) {
                        var data = _ref2.data;

                        if (data.length === 0) {
                            _this2.page.hasNot = true;
                        }
                        _this2.listContent = [].concat(_toConsumableArray(_this2.listContent), _toConsumableArray(data));
                        _this2.$apply();
                        _this2.page.busy = false;
                    });
                } else {
                    this.searchCompany(this.page.index).then(function (_ref3) {
                        var data = _ref3.data;

                        if (data.length === 0) {
                            _this2.page.hasNot = true;
                        }
                        _this2.listContent = [].concat(_toConsumableArray(_this2.listContent), _toConsumableArray(data));
                        _this2.$apply();
                        _this2.page.busy = false;
                    });
                }
            },
            back: function back() {
                _wepy2.default.navigateBack({ delta: 1 });
            },
            clearKeyword: function clearKeyword() {
                this.keyword = '';
            },
            getKeyword: function getKeyword(e) {
                this.keyword = e.detail.value;
            },
            search: function search() {
                var _this3 = this;

                if (Number.parseInt(this.type) === 1) {
                    this.searchJob().then(function (_ref4) {
                        var data = _ref4.data;

                        (0, _log.log)(data);
                        _this3.listContent = data;
                        _this3.initPage();
                        _this3.$apply();
                    });
                } else {
                    this.searchCompany().then(function (_ref5) {
                        var data = _ref5.data;

                        (0, _log.log)(data);
                        _this3.listContent = data;
                        _this3.initPage();
                        _this3.$apply();
                    });
                }
            },
            searchType: function searchType(type) {
                var _this4 = this;

                this.childType = '';
                if (Number.parseInt(this.type) === Number.parseInt(type)) {
                    return false;
                } else {
                    this.type = type;
                }
                this.listContent = [];
                this.companyTypeChecked = 0;
                if (Number.parseInt(type) === 2) {
                    this.salaryTypeChecked = 0;
                    this.experienceTypeChecked = 0;
                    this.searchCompany().then(function (_ref6) {
                        var data = _ref6.data;

                        (0, _log.log)(data);
                        _this4.listContent = data;
                        _this4.initPage();
                        _this4.$apply();
                    });
                } else {
                    this.storeCountChecked = 0;
                    this.businessTypeChecked = 0;
                    this.companyComtChecked = 0;
                    this.searchJob().then(function (_ref7) {
                        var data = _ref7.data;

                        (0, _log.log)(data);
                        _this4.listContent = data;
                        _this4.initPage();
                        _this4.$apply();
                    });
                }
            },
            selectChildType: function selectChildType(type, index) {
                if (this.childType !== '') {
                    this.childType = '';
                    return false;
                }
                if (Number.parseInt(type) === 1) {
                    this.childType = type + '' + (index + 1);
                }
                if (Number.parseInt(type) === 2) {
                    this.childType = type + '' + (index + 1);
                }
            },
            initSelect: function initSelect(e) {
                var _this5 = this;

                if (e.target.dataset.content) {
                    this.keyword = e.target.dataset.content;
                    if (Number.parseInt(this.type) === 1) {
                        this.searchJob().then(function (_ref8) {
                            var data = _ref8.data;

                            (0, _log.log)(data);
                            _this5.listContent = data;
                            _this5.initPage();
                            _this5.$apply();
                        });
                    } else {
                        this.searchCompany().then(function (_ref9) {
                            var data = _ref9.data;

                            (0, _log.log)(data);
                            _this5.listContent = data;
                            _this5.initPage();
                            _this5.$apply();
                        });
                    }
                }
            },
            selectProv: function selectProv(e) {
                if (e.target.dataset.id != undefined) {
                    if (e.target.dataset.id == '-1') {
                        this.provChecked = '-1';
                        this.cityList = this.hotCity;
                    } else {
                        this.provChecked = e.target.dataset.id;
                        this.cityList = this.provList[e.target.dataset.index].children;
                    }
                }
            },
            selectCity: function selectCity(e) {
                var _this6 = this;

                if (e.target.dataset.id != undefined) {
                    this.cityChecked = e.target.dataset.id;
                    this.childType = '';
                    this.searchJob().then(function (_ref10) {
                        var data = _ref10.data;

                        (0, _log.log)(data);
                        _this6.listContent = data;
                        _this6.initPage();
                        _this6.$apply();
                    });
                }
            },
            select: function select(e) {
                var _this7 = this;

                if (e.target.dataset.id !== undefined) {
                    switch (this.childType) {
                        case '12':
                        case '21':
                            this.companyTypeChecked = e.target.dataset.id;
                            this.childType = '';
                            break;
                        case '13':
                            this.salaryTypeChecked = e.target.dataset.id;
                            this.childType = '';
                            break;
                        case '14':
                            this.experienceTypeChecked = e.target.dataset.id;
                            this.childType = '';
                            break;
                        case '22':
                            this.storeCountChecked = e.target.dataset.id;
                            this.childType = '';
                            break;
                        case '23':
                            this.businessTypeChecked = e.target.dataset.id;
                            this.childType = '';
                            break;
                        case '24':
                            this.companyComtChecked = e.target.dataset.id;
                            this.childType = '';
                            break;
                        default:
                            this.childType = '';
                    }
                    if (Number.parseInt(this.type) === 1) {
                        this.searchJob().then(function (_ref11) {
                            var data = _ref11.data;

                            (0, _log.log)(data);
                            _this7.listContent = data;
                            _this7.initPage();
                            _this7.$apply();
                        });
                    } else {
                        this.searchCompany().then(function (_ref12) {
                            var data = _ref12.data;

                            (0, _log.log)(data);
                            _this7.listContent = data;
                            _this7.initPage();
                            _this7.$apply();
                        });
                    }
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Search, [{
        key: 'searchJob',
        value: function searchJob() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

            return this.request.Get({
                str: this.keyword,
                cityId: this.cityChecked,
                companyType: this.companyTypeChecked,
                salaryType: this.salaryTypeChecked,
                workExperienceType: this.experienceTypeChecked,
                page: page,
                pageSize: pageSize
            }, '/InviteWork/searchByWorkName');
        }
    }, {
        key: 'searchCompany',
        value: function searchCompany() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

            return this.request.Get({
                str: this.keyword,
                cityId: '0',
                companyType: this.companyTypeChecked,
                shopType: this.storeCountChecked,
                businessType: this.businessTypeChecked,
                appraiseLevel: this.companyComtChecked,
                page: page,
                pageSize: pageSize
            }, '/User/searchByName');
        }
    }, {
        key: 'initPage',
        value: function initPage() {
            this.page.index = 1;
            this.page.hasNot = false;
            this.page.busy = false;
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this8 = this;

            if (params.keyword) {
                this.keyword = params.keyword;
                this.searchJob().then(function (_ref13) {
                    var data = _ref13.data;

                    _this8.listContent = data;
                    _this8.initPage();
                    _this8.$apply();
                });
            }
            _wepy2.default.getSystemInfo({
                success: function success(res) {
                    _this8.height = res.windowHeight - 143;
                    _this8.$apply();
                }
            });
            var region = _wepy2.default.getStorageSync('region');
            var hotCity = _wepy2.default.getStorageSync('hotCity');
            if (region && hotCity) {
                region = Promise.resolve(region);
                hotCity = Promise.resolve({ data: hotCity });
            } else {
                hotCity = this.request.Get({ provinceId: -1 }, '/Region/getCityList');
                region = this.request.special({}, '/region/getAllList');
            }
            Promise.all([hotCity, region]).then(function (_ref14) {
                var _ref15 = _slicedToArray(_ref14, 2),
                    data = _ref15[0].data,
                    region = _ref15[1];

                _this8.hotCity = data;
                _this8.cityList = data;
                _this8.provList = region;
                _this8.$apply();
            });
            this.init = true;
        }

        // 清除页面逻辑数据

    }, {
        key: 'onUnload',
        value: function onUnload() {
            this.keyword = '';
            this.type = 1;
            this.childType = '';
            this.listContent = [];
            this.companyTypeChecked = 0;
            this.salaryTypeChecked = 0;
            this.experienceTypeChecked = 0;
            this.storeCountChecked = 0;
            this.businessTypeChecked = 0;
            this.companyComtChecked = 0;
            this.provChecked = '-1';
            this.cityChecked = '0';
            this.init = false;
        }
    }]);

    return Search;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Search , 'pages/search'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRpc2FibGVTY3JvbGwiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImRhdGEiLCJrZXl3b3JkIiwiaGVpZ2h0IiwiaW5pdCIsImxpc3RDb250ZW50IiwiaG90RGF0YSIsInR5cGUiLCJjaGlsZHJlbiIsImNoaWxkVHlwZSIsImNvbXBhbnlUeXBlQ2hlY2tlZCIsInNhbGFyeVR5cGVDaGVja2VkIiwiZXhwZXJpZW5jZVR5cGVDaGVja2VkIiwic3RvcmVDb3VudENoZWNrZWQiLCJidXNpbmVzc1R5cGVDaGVja2VkIiwiY29tcGFueUNvbXRDaGVja2VkIiwicHJvdkNoZWNrZWQiLCJjaXR5Q2hlY2tlZCIsImhvdENpdHkiLCJwcm92TGlzdCIsImNpdHlMaXN0Iiwiam9iRGF0YSIsImNvbXBhbnlEYXRhIiwiY29tcGFueVR5cGUiLCJzYWxhcnlUeXBlIiwid29ya0V4cGVyaWVuY2UiLCJzdG9yZUNvdW50IiwiYnVzaW5lc3NUeXBlIiwiY29tcGFueUNvbXQiLCJyZXF1ZXN0IiwicGFnZSIsImluZGV4IiwiaGFzTm90IiwiYnVzeSIsIm1ldGhvZHMiLCJwdWxsTG9hZCIsIk51bWJlciIsInBhcnNlSW50Iiwic2VhcmNoSm9iIiwidGhlbiIsImxlbmd0aCIsIiRhcHBseSIsInNlYXJjaENvbXBhbnkiLCJiYWNrIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjbGVhcktleXdvcmQiLCJnZXRLZXl3b3JkIiwiZSIsImRldGFpbCIsInZhbHVlIiwic2VhcmNoIiwiaW5pdFBhZ2UiLCJzZWFyY2hUeXBlIiwic2VsZWN0Q2hpbGRUeXBlIiwiaW5pdFNlbGVjdCIsInRhcmdldCIsImRhdGFzZXQiLCJjb250ZW50Iiwic2VsZWN0UHJvdiIsImlkIiwidW5kZWZpbmVkIiwic2VsZWN0Q2l0eSIsInNlbGVjdCIsInBhZ2VTaXplIiwiR2V0Iiwic3RyIiwiY2l0eUlkIiwid29ya0V4cGVyaWVuY2VUeXBlIiwic2hvcFR5cGUiLCJhcHByYWlzZUxldmVsIiwicGFyYW1zIiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJ3aW5kb3dIZWlnaHQiLCJyZWdpb24iLCJnZXRTdG9yYWdlU3luYyIsIlByb21pc2UiLCJyZXNvbHZlIiwicHJvdmluY2VJZCIsInNwZWNpYWwiLCJhbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OzswTEFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCLElBRm5CO0FBR0xDLG1DQUF1QixLQUhsQjtBQUlMQywyQkFBZTtBQUpWLFMsUUFPVkMsTSxHQUFTLEVBQUMsWUFBVyxFQUFDLGdCQUFlLEVBQUMsT0FBTSxhQUFQLEVBQXFCLFFBQU8sTUFBNUIsRUFBbUMsU0FBUSxPQUEzQyxFQUFtRCxPQUFNLFdBQXpELEVBQXFFLFNBQVEsR0FBN0UsRUFBaEIsRUFBa0csd0JBQXVCLEVBQUMsT0FBTSxhQUFQLEVBQXFCLFFBQU8sTUFBNUIsRUFBbUMsU0FBUSxPQUEzQyxFQUFtRCxPQUFNLFdBQXpELEVBQXFFLFNBQVEsR0FBN0UsRUFBekgsRUFBMk0sUUFBTyxFQUFDLE9BQU0sYUFBUCxFQUFxQixRQUFPLE1BQTVCLEVBQW1DLFNBQVEsT0FBM0MsRUFBbUQsT0FBTSxXQUF6RCxFQUFxRSxTQUFRLEdBQTdFLEVBQWxOLEVBQVosRUFBaVQsYUFBWSxFQUFDLHdCQUF1QixFQUFDLE9BQU0sYUFBUCxFQUFxQixRQUFPLE1BQTVCLEVBQW1DLFNBQVEsT0FBM0MsRUFBbUQsT0FBTSxXQUF6RCxFQUFxRSxTQUFRLE1BQTdFLEVBQXhCLEVBQTdULEUsUUFDWkMsTyxHQUFVLEUsUUFDVEMsVSxHQUFh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LENBQTFCO0FBQ0EsaUJBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxpQkFBS0MsV0FBTCxHQUFtQixHQUFuQjtBQUNBLGlCQUFLYixJQUFMLEdBQVksS0FBWjtBQUNIOzs7O0VBcmlCK0IsZUFBSzBCLEk7O2tCQUFwQnRDLE0iLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCBKb2JJdGVtIGZyb20gJy4uL2NvbXBvbmVudHMvam9iLWxpc3QtaXRlbSdcclxuaW1wb3J0IENvbXBJdGVtIGZyb20gJy4uL2NvbXBvbmVudHMvY29tcC1saXN0LWl0ZW0nXHJcbmltcG9ydCB7IGxvZyB9IGZyb20gJy4uL3V0aWxzL2xvZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmkJzntKInLFxyXG4gICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXHJcbiAgICAgICAgZGlzYWJsZVNjcm9sbDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICRwcm9wcyA9IHtcImpvYi1pdGVtXCI6e1wieG1sbnM6di1iaW5kXCI6e1wiZm9yXCI6XCJsaXN0Q29udGVudFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcInt7aW5kZXh9fVwiLFwidmFsdWVcIjpcIjFcIn0sXCJ2LWJpbmQ6bGlzdEl0ZW0ub25jZVwiOntcImZvclwiOlwibGlzdENvbnRlbnRcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJ7e2luZGV4fX1cIixcInZhbHVlXCI6XCIxXCJ9LFwidHlwZVwiOntcImZvclwiOlwibGlzdENvbnRlbnRcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJ7e2luZGV4fX1cIixcInZhbHVlXCI6XCIxXCJ9fSxcImNvbXAtaXRlbVwiOntcInYtYmluZDpsaXN0SXRlbS5vbmNlXCI6e1wiZm9yXCI6XCJsaXN0Q29udGVudFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcInt7aW5kZXh9fVwiLFwidmFsdWVcIjpcIml0ZW1cIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICAnam9iLWl0ZW0nOiBKb2JJdGVtLFxyXG4gICAgICAgICdjb21wLWl0ZW0nOiBDb21wSXRlbVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAga2V5d29yZDogJycsXHJcbiAgICAgICAgaGVpZ2h0OiAzMDAsXHJcbiAgICAgICAgaW5pdDogZmFsc2UsXHJcbiAgICAgICAgbGlzdENvbnRlbnQ6IFtdLFxyXG4gICAgICAgIGhvdERhdGE6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ+eDremXqOiBjOS9jScsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICfnp4HkurrmlZnnu4MnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn56eB5pWZ5Li7566hJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+engeaVmee7j+eQhid9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICfnp4HmlZnmgLvnm5EnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn5Zui6K++5pWZ57uDJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+WbouivvuS4u+euoSd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICflm6Lor77mgLvnm5EnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn5Lya57GN6ZSA5ZSuJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+S8muexjeS4u+euoSd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICfplIDllK7nu4/nkIYnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn6ZSA5ZSu5oC755uRJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+WuouacjeaUtumTtid9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICfov5DokKXnu4/nkIYnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn6Zeo5bqX5bqX6ZW/J30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+WMuuWfn+aAu+ebkSd9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICfng63pl6jmioDog70nLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAnVFJYJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ05UQyd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICdFWE9TJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ0Nyb3NzRml0J30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ01GVCd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICdDUFInfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAnTGVzbWlsbHMnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAnU1BJTk5JTkcnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAnWnVtYmEnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAnU2Fsc2F0aW9uJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ1BJTE9YSU5HJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ1BPUCBEQU5DRSd9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICfng63pl6jlhazlj7gnLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn5aiB5bCU5aOr5YGl6LqrJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+S4gOWFhumfpuW+t+WBpei6qyd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICfoiJLpgILloKHlgaXouqsnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn5rWp5rKZ5YGl6LqrJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+S5kOS9k+WBpei6qyd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICfmoqbmsI/lgaXouqsnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn576O5pel5YGl6LqrJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+Wlh+i/ueWBpei6qyd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICfotoXnuqfnjKnnjKknfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn5LmQ5Yi75YGl6LqrJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+aYn+WBpei6qyd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICdPbmVGaXQnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAnUkFXIEZJVE5FU1MnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAnUmV2aXZlR1lNJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ1JVTk5JTkdDQVQnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAnRFDlgaXouqvlt6XkvZzlrqQnfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgIGNoaWxkVHlwZTogJycsXHJcbiAgICAgICAgY29tcGFueVR5cGVDaGVja2VkOiAwLFxyXG4gICAgICAgIHNhbGFyeVR5cGVDaGVja2VkOiAwLFxyXG4gICAgICAgIGV4cGVyaWVuY2VUeXBlQ2hlY2tlZDogMCxcclxuICAgICAgICBzdG9yZUNvdW50Q2hlY2tlZDogMCxcclxuICAgICAgICBidXNpbmVzc1R5cGVDaGVja2VkOiAwLFxyXG4gICAgICAgIGNvbXBhbnlDb210Q2hlY2tlZDogMCxcclxuICAgICAgICBwcm92Q2hlY2tlZDogJy0xJyxcclxuICAgICAgICBjaXR5Q2hlY2tlZDogJzAnLFxyXG4gICAgICAgIGhvdENpdHk6IFtdLFxyXG4gICAgICAgIHByb3ZMaXN0OiBbXSxcclxuICAgICAgICBjaXR5TGlzdDogW10sXHJcbiAgICAgICAgam9iRGF0YTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAnaW5kZXgnOiAnMTEnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5bel5L2c5Z+O5biCJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaW5kZXgnOiAnMTInLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5YWs5Y+457G75Z6LJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaW5kZXgnOiAnMTMnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn6Jaq6LWE5b6F6YGHJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaW5kZXgnOiAnMTQnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5LuO5Lia57uP6aqMJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBjb21wYW55RGF0YTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAnaW5kZXgnOiAnMjEnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5YWs5Y+457G75Z6LJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaW5kZXgnOiAnMjInLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5bqX6ZO65pWw6YePJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaW5kZXgnOiAnMjMnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn55u06JCl5Yqg55ufJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaW5kZXgnOiAnMjQnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5YWs5Y+46K+E5Lu3J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBjb21wYW55VHlwZTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiAwLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5LiN6ZmQJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiAxLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5L+x5LmQ6YOoJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiAyLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5bel5L2c5a6kJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiAzLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn55Gc5Ly96aaGJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiA0LFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5pWZ6IKy5Z+56K6tJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiA1LFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5Zmo5qKw6K6+5aSHJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiA2LFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5aqS5L2T6LWE6K6vJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiA3LFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5Lya5bGVL+a0u+WKqC/otZvkuosnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDgsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfkupLogZTnvZEnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDksXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICflhbbku5YnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHNhbGFyeVR5cGU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMCxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+S4jemZkCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMSxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJzN+NUsnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDIsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICc2fjhLJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiAzLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnOX4xMksnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDQsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICcxM34xOEsnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDUsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICcxOX4yNUsnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDYsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICcyNn4zMEsnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDcsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICczMX40MEsnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDgsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICc0MS01MEsnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHdvcmtFeHBlcmllbmNlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDAsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfkuI3pmZAnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDEsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfkuIDlubTku6XkuIsnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDIsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICcxfjLlubQnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDMsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICczfjXlubQnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDQsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICc2fjjlubQnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDUsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICc4fjEw5bm0J1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiA2LFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnMTDlubTku6XkuIonXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHN0b3JlQ291bnQ6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMCxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+S4jemZkCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMSxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJzHlrrYnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDIsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICcyfjXlrrYnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDMsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICc2fjEw5a62J1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiA0LFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnMTF+MjDlrrYnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDUsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICczNn41MOWutidcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogNixcclxuICAgICAgICAgICAgICAgICduYW1lJzogJzUxfjgw5a62J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBidXNpbmVzc1R5cGU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMCxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+S4jemZkCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMSxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+ebtOiQpSdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMixcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+WKoOebnydcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMyxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+ebtOiQpSvliqDnm58nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIGNvbXBhbnlDb210OiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDAsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfkuI3pmZAnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDEsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICflvojmo5InXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDIsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfovoPlpb0nXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDMsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfkuIDoiKwnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDQsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfovoPlt64nXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDUsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICflvojlt64nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICBzZWFyY2hKb2IgKHBhZ2UgPSAxLCBwYWdlU2l6ZSA9IDgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgIHN0cjogdGhpcy5rZXl3b3JkLFxyXG4gICAgICAgICAgICBjaXR5SWQ6IHRoaXMuY2l0eUNoZWNrZWQsXHJcbiAgICAgICAgICAgIGNvbXBhbnlUeXBlOiB0aGlzLmNvbXBhbnlUeXBlQ2hlY2tlZCxcclxuICAgICAgICAgICAgc2FsYXJ5VHlwZTogdGhpcy5zYWxhcnlUeXBlQ2hlY2tlZCxcclxuICAgICAgICAgICAgd29ya0V4cGVyaWVuY2VUeXBlOiB0aGlzLmV4cGVyaWVuY2VUeXBlQ2hlY2tlZCxcclxuICAgICAgICAgICAgcGFnZTogcGFnZSxcclxuICAgICAgICAgICAgcGFnZVNpemU6IHBhZ2VTaXplXHJcbiAgICAgICAgfSwgJy9JbnZpdGVXb3JrL3NlYXJjaEJ5V29ya05hbWUnKVxyXG4gICAgfVxyXG5cclxuICAgIHNlYXJjaENvbXBhbnkgKHBhZ2UgPSAxLCBwYWdlU2l6ZSA9IDgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgIHN0cjogdGhpcy5rZXl3b3JkLFxyXG4gICAgICAgICAgICBjaXR5SWQ6ICcwJyxcclxuICAgICAgICAgICAgY29tcGFueVR5cGU6IHRoaXMuY29tcGFueVR5cGVDaGVja2VkLFxyXG4gICAgICAgICAgICBzaG9wVHlwZTogdGhpcy5zdG9yZUNvdW50Q2hlY2tlZCxcclxuICAgICAgICAgICAgYnVzaW5lc3NUeXBlOiB0aGlzLmJ1c2luZXNzVHlwZUNoZWNrZWQsXHJcbiAgICAgICAgICAgIGFwcHJhaXNlTGV2ZWw6IHRoaXMuY29tcGFueUNvbXRDaGVja2VkLFxyXG4gICAgICAgICAgICBwYWdlOiBwYWdlLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogcGFnZVNpemVcclxuICAgICAgICB9LCAnL1VzZXIvc2VhcmNoQnlOYW1lJylcclxuICAgIH1cclxuXHJcbiAgICBwYWdlID0ge1xyXG4gICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgIGhhc05vdDogZmFsc2UsXHJcbiAgICAgICAgYnVzeTogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBpbml0UGFnZSAoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlLmluZGV4ID0gMVxyXG4gICAgICAgIHRoaXMucGFnZS5oYXNOb3QgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMucGFnZS5idXN5ID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHB1bGxMb2FkICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5idXN5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLmhhc05vdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wYWdlLmluZGV4KytcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmJ1c3kgPSB0cnVlXHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodGhpcy50eXBlKSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hKb2IodGhpcy5wYWdlLmluZGV4KS50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmhhc05vdCA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Q29udGVudCA9IFsuLi50aGlzLmxpc3RDb250ZW50LCAuLi5kYXRhXVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UuYnVzeSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hDb21wYW55KHRoaXMucGFnZS5pbmRleCkudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5oYXNOb3QgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdENvbnRlbnQgPSBbLi4udGhpcy5saXN0Q29udGVudCwgLi4uZGF0YV1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmJ1c3kgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmFjayAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtkZWx0YTogMX0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGVhcktleXdvcmQgKCkge1xyXG4gICAgICAgICAgICB0aGlzLmtleXdvcmQgPSAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0S2V5d29yZCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmtleXdvcmQgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VhcmNoICgpIHtcclxuICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0aGlzLnR5cGUpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaEpvYigpLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdENvbnRlbnQgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQ29tcGFueSgpLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdENvbnRlbnQgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VhcmNoVHlwZSAodHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkVHlwZSA9ICcnXHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodGhpcy50eXBlKSA9PT0gTnVtYmVyLnBhcnNlSW50KHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxpc3RDb250ZW50ID0gW11cclxuICAgICAgICAgICAgdGhpcy5jb21wYW55VHlwZUNoZWNrZWQgPSAwXHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodHlwZSkgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2FsYXJ5VHlwZUNoZWNrZWQgPSAwXHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2VUeXBlQ2hlY2tlZCA9IDBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQ29tcGFueSgpLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdENvbnRlbnQgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVDb3VudENoZWNrZWQgPSAwXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzVHlwZUNoZWNrZWQgPSAwXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBhbnlDb210Q2hlY2tlZCA9IDBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoSm9iKCkudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Q29udGVudCA9IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlKClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3RDaGlsZFR5cGUgKHR5cGUsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkVHlwZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRUeXBlID0gJydcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodHlwZSkgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRUeXBlID0gdHlwZSArICcnICsgKGluZGV4ICsgMSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KHR5cGUpID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkVHlwZSA9IHR5cGUgKyAnJyArIChpbmRleCArIDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXRTZWxlY3QgKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXl3b3JkID0gZS50YXJnZXQuZGF0YXNldC5jb250ZW50XHJcbiAgICAgICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KHRoaXMudHlwZSkgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaEpvYigpLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2coZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Q29udGVudCA9IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaENvbXBhbnkoKS50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdENvbnRlbnQgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2UoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VsZWN0UHJvdiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5pZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmlkID09ICctMScpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3ZDaGVja2VkID0gJy0xJ1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2l0eUxpc3QgPSB0aGlzLmhvdENpdHlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm92Q2hlY2tlZCA9IGUudGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNpdHlMaXN0ID0gdGhpcy5wcm92TGlzdFtlLnRhcmdldC5kYXRhc2V0LmluZGV4XS5jaGlsZHJlblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3RDaXR5IChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmlkICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaXR5Q2hlY2tlZCA9IGUudGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRUeXBlID0gJydcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoSm9iKCkudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Q29udGVudCA9IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlKClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3QgKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuaWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmNoaWxkVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnMTInOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnMjEnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGFueVR5cGVDaGVja2VkID0gZS50YXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRUeXBlID0gJydcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnMTMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2FsYXJ5VHlwZUNoZWNrZWQgPSBlLnRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZFR5cGUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlICcxNCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBlcmllbmNlVHlwZUNoZWNrZWQgPSBlLnRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZFR5cGUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlICcyMic6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yZUNvdW50Q2hlY2tlZCA9IGUudGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkVHlwZSA9ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgJzIzJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzVHlwZUNoZWNrZWQgPSBlLnRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZFR5cGUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlICcyNCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wYW55Q29tdENoZWNrZWQgPSBlLnRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZFR5cGUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRUeXBlID0gJydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodGhpcy50eXBlKSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoSm9iKCkudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RDb250ZW50ID0gZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQ29tcGFueSgpLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2coZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Q29udGVudCA9IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAocGFyYW1zKSB7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5rZXl3b3JkKSB7XHJcbiAgICAgICAgICAgIHRoaXMua2V5d29yZCA9IHBhcmFtcy5rZXl3b3JkXHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSm9iKCkudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RDb250ZW50ID0gZGF0YVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZSgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQgLSAxNDNcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IHJlZ2lvbiA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3JlZ2lvbicpXHJcbiAgICAgICAgbGV0IGhvdENpdHkgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdob3RDaXR5JylcclxuICAgICAgICBpZiAocmVnaW9uICYmIGhvdENpdHkpIHtcclxuICAgICAgICAgICAgcmVnaW9uID0gUHJvbWlzZS5yZXNvbHZlKHJlZ2lvbilcclxuICAgICAgICAgICAgaG90Q2l0eSA9IFByb21pc2UucmVzb2x2ZSh7ZGF0YTogaG90Q2l0eX0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaG90Q2l0eSA9IHRoaXMucmVxdWVzdC5HZXQoe3Byb3ZpbmNlSWQ6IC0xfSwgJy9SZWdpb24vZ2V0Q2l0eUxpc3QnKVxyXG4gICAgICAgICAgICByZWdpb24gPSB0aGlzLnJlcXVlc3Quc3BlY2lhbCh7fSwgJy9yZWdpb24vZ2V0QWxsTGlzdCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFByb21pc2UuYWxsKFtob3RDaXR5LCByZWdpb25dKVxyXG4gICAgICAgIC50aGVuKChbe2RhdGF9LCByZWdpb25dKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaG90Q2l0eSA9IGRhdGFcclxuICAgICAgICAgICAgdGhpcy5jaXR5TGlzdCA9IGRhdGFcclxuICAgICAgICAgICAgdGhpcy5wcm92TGlzdCA9IHJlZ2lvblxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmluaXQgPSB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5riF6Zmk6aG16Z2i6YC76L6R5pWw5o2uXHJcbiAgICBvblVubG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5rZXl3b3JkID0gJydcclxuICAgICAgICB0aGlzLnR5cGUgPSAxXHJcbiAgICAgICAgdGhpcy5jaGlsZFR5cGUgPSAnJ1xyXG4gICAgICAgIHRoaXMubGlzdENvbnRlbnQgPSBbXVxyXG4gICAgICAgIHRoaXMuY29tcGFueVR5cGVDaGVja2VkID0gMFxyXG4gICAgICAgIHRoaXMuc2FsYXJ5VHlwZUNoZWNrZWQgPSAwXHJcbiAgICAgICAgdGhpcy5leHBlcmllbmNlVHlwZUNoZWNrZWQgPSAwXHJcbiAgICAgICAgdGhpcy5zdG9yZUNvdW50Q2hlY2tlZCA9IDBcclxuICAgICAgICB0aGlzLmJ1c2luZXNzVHlwZUNoZWNrZWQgPSAwXHJcbiAgICAgICAgdGhpcy5jb21wYW55Q29tdENoZWNrZWQgPSAwXHJcbiAgICAgICAgdGhpcy5wcm92Q2hlY2tlZCA9ICctMSdcclxuICAgICAgICB0aGlzLmNpdHlDaGVja2VkID0gJzAnXHJcbiAgICAgICAgdGhpcy5pbml0ID0gZmFsc2VcclxuICAgIH1cclxufVxyXG4iXX0=