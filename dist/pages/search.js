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

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

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
            'comp-item': _compListItem2.default,
            'toast': _toast2.default
        }, _this.data = {
            keyword: '',
            height: 300,
            init: false,
            hasNot: true,
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
                if (this.hasNot) {
                    return false;
                }
                this.page.index++;
                this.page.busy = true;
                if (Number.parseInt(this.type) === 1) {
                    this.searchJob(this.page.index).then(function (_ref2) {
                        var data = _ref2.data;

                        if (data.length === 0) {
                            _this2.hasNot = true;
                        }
                        _this2.listContent = [].concat(_toConsumableArray(_this2.listContent), _toConsumableArray(data));
                        _this2.$apply();
                        _this2.page.busy = false;
                    });
                } else {
                    this.searchCompany(this.page.index).then(function (_ref3) {
                        var data = _ref3.data;

                        if (data.length === 0) {
                            _this2.hasNot = true;
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

                        if (data.length < 8) {
                            _this3.hasNot = true;
                        } else {
                            _this3.hasNot = false;
                        }
                        _this3.listContent = data;
                        _this3.initPage();
                        _this3.$apply();
                    });
                } else {
                    this.searchCompany().then(function (_ref5) {
                        var data = _ref5.data;

                        if (data.length < 8) {
                            _this3.hasNot = true;
                        } else {
                            _this3.hasNot = false;
                        }
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

                        if (data.length < 8) {
                            _this4.hasNot = true;
                        } else {
                            _this4.hasNot = false;
                        }
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

                        if (data.length < 8) {
                            _this4.hasNot = true;
                        } else {
                            _this4.hasNot = false;
                        }
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

                            if (data.length < 8) {
                                _this5.hasNot = true;
                            } else {
                                _this5.hasNot = false;
                            }
                            _this5.listContent = data;
                            _this5.initPage();
                            _this5.$apply();
                        });
                    } else {
                        this.searchCompany().then(function (_ref9) {
                            var data = _ref9.data;

                            if (data.length < 8) {
                                _this5.hasNot = true;
                            } else {
                                _this5.hasNot = false;
                            }
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

                        if (data.length < 8) {
                            _this6.hasNot = true;
                        } else {
                            _this6.hasNot = false;
                        }
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

                            if (data.length < 8) {
                                _this7.hasNot = true;
                            } else {
                                _this7.hasNot = false;
                            }
                            _this7.listContent = data;
                            _this7.initPage();
                            _this7.$apply();
                        });
                    } else {
                        this.searchCompany().then(function (_ref12) {
                            var data = _ref12.data;

                            if (data.length < 8) {
                                _this7.hasNot = true;
                            } else {
                                _this7.hasNot = false;
                            }
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
            this.page.busy = false;
        }
    }, {
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this8 = this;

            _wepy2.default.onSocketMessage(function (res) {
                _this8.$parent.global.curVal = Number.parseInt(_this8.$parent.global.curVal) + 1;
                _this8.toast({ content: '您有新消息' });
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this9 = this;

            if (params.keyword) {
                this.keyword = params.keyword;
                this.searchJob().then(function (_ref13) {
                    var data = _ref13.data;

                    if (data.length < 8) {
                        _this9.hasNot = true;
                    } else {
                        _this9.hasNot = false;
                    }
                    _this9.listContent = data;
                    _this9.initPage();
                    _this9.$apply();
                });
            }
            _wepy2.default.getSystemInfo({
                success: function success(res) {
                    _this9.height = res.windowHeight - 130;
                    _this9.$apply();
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

                _this9.hotCity = data;
                _this9.cityList = data;
                _this9.provList = region;
                _this9.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRpc2FibGVTY3JvbGwiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImRhdGEiLCJrZXl3b3JkIiwiaGVpZ2h0IiwiaW5pdCIsImhhc05vdCIsImxpc3RDb250ZW50IiwiaG90RGF0YSIsInR5cGUiLCJjaGlsZHJlbiIsImNoaWxkVHlwZSIsImNvbXBhbnlUeXBlQ2hlY2tlZCIsInNhbGFyeVR5cGVDaGVja2VkIiwiZXhwZXJpZW5jZVR5cGVDaGVja2VkIiwic3RvcmVDb3VudENoZWNrZWQiLCJidXNpbmVzc1R5cGVDaGVja2VkIiwiY29tcGFueUNvbXRDaGVja2VkIiwicHJvdkNoZWNrZWQiLCJjaXR5Q2hlY2tlZCIsImhvdENpdHkiLCJwcm92TGlzdCIsImNpdHlMaXN0Iiwiam9iRGF0YSIsImNvbXBhbnlEYXRhIiwiY29tcGFueVR5cGUiLCJzYWxhcnlUeXBlIiwid29ya0V4cGVyaWVuY2UiLCJzdG9yZUNvdW50IiwiYnVzaW5lc3NUeXBlIiwiY29tcGFueUNvbXQiLCJyZXF1ZXN0IiwicGFnZSIsImluZGV4IiwiYnVzeSIsIm1ldGhvZHMiLCJwdWxsTG9hZCIsIk51bWJlciIsInBhcnNlSW50Iiwic2VhcmNoSm9iIiwidGhlbiIsImxlbmd0aCIsIiRhcHBseSIsInNlYXJjaENvbXBhbnkiLCJiYWNrIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjbGVhcktleXdvcmQiLCJnZXRLZXl3b3JkIiwiZSIsImRldGFpbCIsInZhbHVlIiwic2VhcmNoIiwiaW5pdFBhZ2UiLCJzZWFyY2hUeXBlIiwic2VsZWN0Q2hpbGRUeXBlIiwiaW5pdFNlbGVjdCIsInRhcmdldCIsImRhdGFzZXQiLCJjb250ZW50Iiwic2VsZWN0UHJvdiIsImlkIiwidW5kZWZpbmVkIiwic2VsZWN0Q2l0eSIsInNlbGVjdCIsInBhZ2VTaXplIiwiR2V0Iiwic3RyIiwiY2l0eUlkIiwid29ya0V4cGVyaWVuY2VUeXBlIiwic2hvcFR5cGUiLCJhcHByYWlzZUxldmVsIiwiJGludm9rZSIsIm9uU29ja2V0TWVzc2FnZSIsIiRwYXJlbnQiLCJnbG9iYWwiLCJjdXJWYWwiLCJ0b2FzdCIsInBhcmFtcyIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwicmVzIiwid2luZG93SGVpZ2h0IiwicmVnaW9uIiwiZ2V0U3RvcmFnZVN5bmMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInByb3ZpbmNlSWQiLCJzcGVjaWFsIiwiYWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OzswTEFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCLElBRm5CO0FBR0xDLG1DQUF1QixLQUhsQjtBQUlMQywyQkFBZTtBQUpWLFMsUUFPVkMsTSxHQUFTLEVBQUMsWUFBVyxFQUFDLGdCQUFlLEVBQUMsT0FBTSxhQUFQLEVBQXFCLFFBQU8sTUFBNUIsRUFBbUMsU0FBUSxPQUEzQyxFQUFtRCxPQUFNLFdBQXpELEVBQXFFLFNBQVEsR0FBN0UsRUFBaEIsRUFBa0csd0JBQXVCLEVBQUMsT0FBTSxhQUFQLEVBQXFCLFFBQU8sTUFBNUIsRUFBbUMsU0FBUSxPQUEzQyxFQUFtRCxPQUFNLFdBQXpELEVBQXFFLFNBQVEsR0FBN0UsRUFBekgsRUFBMk0sUUFBTyxFQUFDLE9BQU0sYUFBUCxFQUFxQixRQUFPLE1BQTVCLEVBQW1DLFNBQVEsT0FBM0MsRUFBbUQsT0FBTSxXQUF6RCxFQUFxRSxTQUFRLEdBQTdFLEVBQWxOLEVBQVosRUFBaVQsYUFBWSxFQUFDLHdCQUF1QixFQUFDLE9BQU0sYUFBUCxFQUFxQixRQUFPLE1BQTVCLEVBQW1DLFNBQVEsT0FBM0MsRUFB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QkFBWmlGLE1BQVk7O0FBQ3hCLHVCQUFLL0QsT0FBTCxHQUFlbEIsSUFBZjtBQUNBLHVCQUFLb0IsUUFBTCxHQUFnQnBCLElBQWhCO0FBQ0EsdUJBQUttQixRQUFMLEdBQWdCOEQsTUFBaEI7QUFDQSx1QkFBS3pDLE1BQUw7QUFDSCxhQU5EO0FBT0EsaUJBQUtyQyxJQUFMLEdBQVksSUFBWjtBQUNIOztBQUVEOzs7O21DQUNZO0FBQ1IsaUJBQUtGLE9BQUwsR0FBZSxFQUFmO0FBQ0EsaUJBQUtNLElBQUwsR0FBWSxDQUFaO0FBQ0EsaUJBQUtFLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxpQkFBS0osV0FBTCxHQUFtQixFQUFuQjtBQUNBLGlCQUFLSyxrQkFBTCxHQUEwQixDQUExQjtBQUNBLGlCQUFLQyxpQkFBTCxHQUF5QixDQUF6QjtBQUNBLGlCQUFLQyxxQkFBTCxHQUE2QixDQUE3QjtBQUNBLGlCQUFLQyxpQkFBTCxHQUF5QixDQUF6QjtBQUNBLGlCQUFLQyxtQkFBTCxHQUEyQixDQUEzQjtBQUNBLGlCQUFLQyxrQkFBTCxHQUEwQixDQUExQjtBQUNBLGlCQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsaUJBQUtDLFdBQUwsR0FBbUIsR0FBbkI7QUFDQSxpQkFBS2QsSUFBTCxHQUFZLEtBQVo7QUFDSDs7OztFQTFsQitCLGVBQUsyQixJOztrQkFBcEJ2QyxNIiwiZmlsZSI6InNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQgVG9hc3QgZnJvbSAnLi4vY29tcG9uZW50cy90b2FzdCdcclxuaW1wb3J0IEpvYkl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9qb2ItbGlzdC1pdGVtJ1xyXG5pbXBvcnQgQ29tcEl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21wLWxpc3QtaXRlbSdcclxuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aQnOe0oicsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgJHByb3BzID0ge1wiam9iLWl0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJmb3JcIjpcImxpc3RDb250ZW50XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwie3tpbmRleH19XCIsXCJ2YWx1ZVwiOlwiMVwifSxcInYtYmluZDpsaXN0SXRlbS5vbmNlXCI6e1wiZm9yXCI6XCJsaXN0Q29udGVudFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcInt7aW5kZXh9fVwiLFwidmFsdWVcIjpcIjFcIn0sXCJ0eXBlXCI6e1wiZm9yXCI6XCJsaXN0Q29udGVudFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcInt7aW5kZXh9fVwiLFwidmFsdWVcIjpcIjFcIn19LFwiY29tcC1pdGVtXCI6e1widi1iaW5kOmxpc3RJdGVtLm9uY2VcIjp7XCJmb3JcIjpcImxpc3RDb250ZW50XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwie3tpbmRleH19XCIsXCJ2YWx1ZVwiOlwiaXRlbVwifX19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICdqb2ItaXRlbSc6IEpvYkl0ZW0sXHJcbiAgICAgICAgJ2NvbXAtaXRlbSc6IENvbXBJdGVtLFxyXG4gICAgICAgICd0b2FzdCc6IFRvYXN0XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBrZXl3b3JkOiAnJyxcclxuICAgICAgICBoZWlnaHQ6IDMwMCxcclxuICAgICAgICBpbml0OiBmYWxzZSxcclxuICAgICAgICBoYXNOb3Q6IHRydWUsXHJcbiAgICAgICAgbGlzdENvbnRlbnQ6IFtdLFxyXG4gICAgICAgIGhvdERhdGE6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ+eDremXqOiBjOS9jScsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICfnp4HkurrmlZnnu4MnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn56eB5pWZ5Li7566hJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+engeaVmee7j+eQhid9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICfnp4HmlZnmgLvnm5EnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn5Zui6K++5pWZ57uDJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+WbouivvuS4u+euoSd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICflm6Lor77mgLvnm5EnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn5Lya57GN6ZSA5ZSuJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+S8muexjeS4u+euoSd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICfplIDllK7nu4/nkIYnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn6ZSA5ZSu5oC755uRJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+WuouacjeaUtumTtid9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICfov5DokKXnu4/nkIYnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn6Zeo5bqX5bqX6ZW/J30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+WMuuWfn+aAu+ebkSd9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICfng63pl6jmioDog70nLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAnVFJYJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ05UQyd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICdFWE9TJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ0Nyb3NzRml0J30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ01GVCd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICdDUFInfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAnTGVzbWlsbHMnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAnU1BJTk5JTkcnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAnWnVtYmEnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAnU2Fsc2F0aW9uJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ1BJTE9YSU5HJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ1BPUCBEQU5DRSd9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICfng63pl6jlhazlj7gnLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn5aiB5bCU5aOr5YGl6LqrJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+S4gOWFhumfpuW+t+WBpei6qyd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICfoiJLpgILloKHlgaXouqsnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn5rWp5rKZ5YGl6LqrJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+S5kOS9k+WBpei6qyd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICfmoqbmsI/lgaXouqsnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn576O5pel5YGl6LqrJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+Wlh+i/ueWBpei6qyd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICfotoXnuqfnjKnnjKknfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAn5LmQ5Yi75YGl6LqrJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ+aYn+WBpei6qyd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsnbmFtZSc6ICdPbmVGaXQnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAnUkFXIEZJVE5FU1MnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAnUmV2aXZlR1lNJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgeyduYW1lJzogJ1JVTk5JTkdDQVQnfSxcclxuICAgICAgICAgICAgICAgICAgICB7J25hbWUnOiAnRFDlgaXouqvlt6XkvZzlrqQnfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgIGNoaWxkVHlwZTogJycsXHJcbiAgICAgICAgY29tcGFueVR5cGVDaGVja2VkOiAwLFxyXG4gICAgICAgIHNhbGFyeVR5cGVDaGVja2VkOiAwLFxyXG4gICAgICAgIGV4cGVyaWVuY2VUeXBlQ2hlY2tlZDogMCxcclxuICAgICAgICBzdG9yZUNvdW50Q2hlY2tlZDogMCxcclxuICAgICAgICBidXNpbmVzc1R5cGVDaGVja2VkOiAwLFxyXG4gICAgICAgIGNvbXBhbnlDb210Q2hlY2tlZDogMCxcclxuICAgICAgICBwcm92Q2hlY2tlZDogJy0xJyxcclxuICAgICAgICBjaXR5Q2hlY2tlZDogJzAnLFxyXG4gICAgICAgIGhvdENpdHk6IFtdLFxyXG4gICAgICAgIHByb3ZMaXN0OiBbXSxcclxuICAgICAgICBjaXR5TGlzdDogW10sXHJcbiAgICAgICAgam9iRGF0YTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAnaW5kZXgnOiAnMTEnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5bel5L2c5Z+O5biCJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaW5kZXgnOiAnMTInLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5YWs5Y+457G75Z6LJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaW5kZXgnOiAnMTMnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn6Jaq6LWE5b6F6YGHJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaW5kZXgnOiAnMTQnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5LuO5Lia57uP6aqMJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBjb21wYW55RGF0YTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAnaW5kZXgnOiAnMjEnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5YWs5Y+457G75Z6LJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaW5kZXgnOiAnMjInLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5bqX6ZO65pWw6YePJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaW5kZXgnOiAnMjMnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn55u06JCl5Yqg55ufJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaW5kZXgnOiAnMjQnLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5YWs5Y+46K+E5Lu3J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBjb21wYW55VHlwZTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiAwLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5LiN6ZmQJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiAxLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5L+x5LmQ6YOoJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiAyLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5bel5L2c5a6kJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiAzLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn55Gc5Ly96aaGJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiA0LFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5pWZ6IKy5Z+56K6tJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiA1LFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5Zmo5qKw6K6+5aSHJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiA2LFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5aqS5L2T6LWE6K6vJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiA3LFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAn5Lya5bGVL+a0u+WKqC/otZvkuosnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDgsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfkupLogZTnvZEnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDksXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICflhbbku5YnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHNhbGFyeVR5cGU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMCxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+S4jemZkCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMSxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJzN+NUsnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDIsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICc2fjhLJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiAzLFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnOX4xMksnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDQsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICcxM34xOEsnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDUsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICcxOX4yNUsnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDYsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICcyNn4zMEsnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDcsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICczMX40MEsnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDgsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICc0MS01MEsnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHdvcmtFeHBlcmllbmNlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDAsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfkuI3pmZAnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDEsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfkuIDlubTku6XkuIsnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDIsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICcxfjLlubQnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDMsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICczfjXlubQnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDQsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICc2fjjlubQnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDUsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICc4fjEw5bm0J1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiA2LFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnMTDlubTku6XkuIonXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIHN0b3JlQ291bnQ6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMCxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+S4jemZkCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMSxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJzHlrrYnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDIsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICcyfjXlrrYnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDMsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICc2fjEw5a62J1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiA0LFxyXG4gICAgICAgICAgICAgICAgJ25hbWUnOiAnMTF+MjDlrrYnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDUsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICczNn41MOWutidcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogNixcclxuICAgICAgICAgICAgICAgICduYW1lJzogJzUxfjgw5a62J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBidXNpbmVzc1R5cGU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMCxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+S4jemZkCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMSxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+ebtOiQpSdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMixcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+WKoOebnydcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMyxcclxuICAgICAgICAgICAgICAgICduYW1lJzogJ+ebtOiQpSvliqDnm58nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIGNvbXBhbnlDb210OiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDAsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfkuI3pmZAnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDEsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICflvojmo5InXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDIsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfovoPlpb0nXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDMsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfkuIDoiKwnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDQsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICfovoPlt64nXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICdpZCc6IDUsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6ICflvojlt64nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICBzZWFyY2hKb2IgKHBhZ2UgPSAxLCBwYWdlU2l6ZSA9IDgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgIHN0cjogdGhpcy5rZXl3b3JkLFxyXG4gICAgICAgICAgICBjaXR5SWQ6IHRoaXMuY2l0eUNoZWNrZWQsXHJcbiAgICAgICAgICAgIGNvbXBhbnlUeXBlOiB0aGlzLmNvbXBhbnlUeXBlQ2hlY2tlZCxcclxuICAgICAgICAgICAgc2FsYXJ5VHlwZTogdGhpcy5zYWxhcnlUeXBlQ2hlY2tlZCxcclxuICAgICAgICAgICAgd29ya0V4cGVyaWVuY2VUeXBlOiB0aGlzLmV4cGVyaWVuY2VUeXBlQ2hlY2tlZCxcclxuICAgICAgICAgICAgcGFnZTogcGFnZSxcclxuICAgICAgICAgICAgcGFnZVNpemU6IHBhZ2VTaXplXHJcbiAgICAgICAgfSwgJy9JbnZpdGVXb3JrL3NlYXJjaEJ5V29ya05hbWUnKVxyXG4gICAgfVxyXG5cclxuICAgIHNlYXJjaENvbXBhbnkgKHBhZ2UgPSAxLCBwYWdlU2l6ZSA9IDgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LkdldCh7XHJcbiAgICAgICAgICAgIHN0cjogdGhpcy5rZXl3b3JkLFxyXG4gICAgICAgICAgICBjaXR5SWQ6ICcwJyxcclxuICAgICAgICAgICAgY29tcGFueVR5cGU6IHRoaXMuY29tcGFueVR5cGVDaGVja2VkLFxyXG4gICAgICAgICAgICBzaG9wVHlwZTogdGhpcy5zdG9yZUNvdW50Q2hlY2tlZCxcclxuICAgICAgICAgICAgYnVzaW5lc3NUeXBlOiB0aGlzLmJ1c2luZXNzVHlwZUNoZWNrZWQsXHJcbiAgICAgICAgICAgIGFwcHJhaXNlTGV2ZWw6IHRoaXMuY29tcGFueUNvbXRDaGVja2VkLFxyXG4gICAgICAgICAgICBwYWdlOiBwYWdlLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogcGFnZVNpemVcclxuICAgICAgICB9LCAnL1VzZXIvc2VhcmNoQnlOYW1lJylcclxuICAgIH1cclxuXHJcbiAgICBwYWdlID0ge1xyXG4gICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgIGhhc05vdDogZmFsc2UsXHJcbiAgICAgICAgYnVzeTogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBpbml0UGFnZSAoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlLmluZGV4ID0gMVxyXG4gICAgICAgIHRoaXMucGFnZS5idXN5ID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHB1bGxMb2FkICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZS5idXN5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNOb3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5pbmRleCsrXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5idXN5ID0gdHJ1ZVxyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KHRoaXMudHlwZSkgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoSm9iKHRoaXMucGFnZS5pbmRleCkudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RDb250ZW50ID0gWy4uLnRoaXMubGlzdENvbnRlbnQsIC4uLmRhdGFdXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5idXN5ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaENvbXBhbnkodGhpcy5wYWdlLmluZGV4KS50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdENvbnRlbnQgPSBbLi4udGhpcy5saXN0Q29udGVudCwgLi4uZGF0YV1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLmJ1c3kgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmFjayAoKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtkZWx0YTogMX0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGVhcktleXdvcmQgKCkge1xyXG4gICAgICAgICAgICB0aGlzLmtleXdvcmQgPSAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0S2V5d29yZCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmtleXdvcmQgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VhcmNoICgpIHtcclxuICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0aGlzLnR5cGUpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaEpvYigpLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA8IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RDb250ZW50ID0gZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaENvbXBhbnkoKS50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Q29udGVudCA9IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlKClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWFyY2hUeXBlICh0eXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRUeXBlID0gJydcclxuICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0aGlzLnR5cGUpID09PSBOdW1iZXIucGFyc2VJbnQodHlwZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGlzdENvbnRlbnQgPSBbXVxyXG4gICAgICAgICAgICB0aGlzLmNvbXBhbnlUeXBlQ2hlY2tlZCA9IDBcclxuICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0eXBlKSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYWxhcnlUeXBlQ2hlY2tlZCA9IDBcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwZXJpZW5jZVR5cGVDaGVja2VkID0gMFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hDb21wYW55KCkudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdENvbnRlbnQgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVDb3VudENoZWNrZWQgPSAwXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzVHlwZUNoZWNrZWQgPSAwXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBhbnlDb210Q2hlY2tlZCA9IDBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoSm9iKCkudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdENvbnRlbnQgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VsZWN0Q2hpbGRUeXBlICh0eXBlLCBpbmRleCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGlsZFR5cGUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkVHlwZSA9ICcnXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KHR5cGUpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkVHlwZSA9IHR5cGUgKyAnJyArIChpbmRleCArIDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0eXBlKSA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZFR5cGUgPSB0eXBlICsgJycgKyAoaW5kZXggKyAxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbml0U2VsZWN0IChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5d29yZCA9IGUudGFyZ2V0LmRhdGFzZXQuY29udGVudFxyXG4gICAgICAgICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludCh0aGlzLnR5cGUpID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hKb2IoKS50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Q29udGVudCA9IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaENvbXBhbnkoKS50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Q29udGVudCA9IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3RQcm92IChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmlkICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuaWQgPT0gJy0xJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvdkNoZWNrZWQgPSAnLTEnXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaXR5TGlzdCA9IHRoaXMuaG90Q2l0eVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3ZDaGVja2VkID0gZS50YXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2l0eUxpc3QgPSB0aGlzLnByb3ZMaXN0W2UudGFyZ2V0LmRhdGFzZXQuaW5kZXhdLmNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbGVjdENpdHkgKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuaWQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNpdHlDaGVja2VkID0gZS50YXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZFR5cGUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hKb2IoKS50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPCA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Q29udGVudCA9IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYWdlKClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3QgKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuaWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmNoaWxkVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnMTInOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnMjEnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGFueVR5cGVDaGVja2VkID0gZS50YXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRUeXBlID0gJydcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnMTMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2FsYXJ5VHlwZUNoZWNrZWQgPSBlLnRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZFR5cGUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlICcxNCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBlcmllbmNlVHlwZUNoZWNrZWQgPSBlLnRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZFR5cGUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlICcyMic6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yZUNvdW50Q2hlY2tlZCA9IGUudGFyZ2V0LmRhdGFzZXQuaWRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkVHlwZSA9ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgJzIzJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzVHlwZUNoZWNrZWQgPSBlLnRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZFR5cGUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlICcyNCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wYW55Q29tdENoZWNrZWQgPSBlLnRhcmdldC5kYXRhc2V0LmlkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZFR5cGUgPSAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRUeXBlID0gJydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQodGhpcy50eXBlKSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoSm9iKCkudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA8IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdENvbnRlbnQgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2UoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hDb21wYW55KCkudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA8IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdENvbnRlbnQgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBhZ2UoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0b2FzdCAoZGF0YSA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93VG9hc3QnLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgd2VweS5vblNvY2tldE1lc3NhZ2UocmVzID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwgPSBOdW1iZXIucGFyc2VJbnQodGhpcy4kcGFyZW50Lmdsb2JhbC5jdXJWYWwpICsgMVxyXG4gICAgICAgICAgICB0aGlzLnRvYXN0KHtjb250ZW50OiAn5oKo5pyJ5paw5raI5oGvJ30pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHBhcmFtcykge1xyXG4gICAgICAgIGlmIChwYXJhbXMua2V5d29yZCkge1xyXG4gICAgICAgICAgICB0aGlzLmtleXdvcmQgPSBwYXJhbXMua2V5d29yZFxyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaEpvYigpLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzTm90ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc05vdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RDb250ZW50ID0gZGF0YVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0UGFnZSgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQgLSAxMzBcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IHJlZ2lvbiA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3JlZ2lvbicpXHJcbiAgICAgICAgbGV0IGhvdENpdHkgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdob3RDaXR5JylcclxuICAgICAgICBpZiAocmVnaW9uICYmIGhvdENpdHkpIHtcclxuICAgICAgICAgICAgcmVnaW9uID0gUHJvbWlzZS5yZXNvbHZlKHJlZ2lvbilcclxuICAgICAgICAgICAgaG90Q2l0eSA9IFByb21pc2UucmVzb2x2ZSh7ZGF0YTogaG90Q2l0eX0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaG90Q2l0eSA9IHRoaXMucmVxdWVzdC5HZXQoe3Byb3ZpbmNlSWQ6IC0xfSwgJy9SZWdpb24vZ2V0Q2l0eUxpc3QnKVxyXG4gICAgICAgICAgICByZWdpb24gPSB0aGlzLnJlcXVlc3Quc3BlY2lhbCh7fSwgJy9yZWdpb24vZ2V0QWxsTGlzdCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFByb21pc2UuYWxsKFtob3RDaXR5LCByZWdpb25dKVxyXG4gICAgICAgIC50aGVuKChbe2RhdGF9LCByZWdpb25dKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaG90Q2l0eSA9IGRhdGFcclxuICAgICAgICAgICAgdGhpcy5jaXR5TGlzdCA9IGRhdGFcclxuICAgICAgICAgICAgdGhpcy5wcm92TGlzdCA9IHJlZ2lvblxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmluaXQgPSB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5riF6Zmk6aG16Z2i6YC76L6R5pWw5o2uXHJcbiAgICBvblVubG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5rZXl3b3JkID0gJydcclxuICAgICAgICB0aGlzLnR5cGUgPSAxXHJcbiAgICAgICAgdGhpcy5jaGlsZFR5cGUgPSAnJ1xyXG4gICAgICAgIHRoaXMubGlzdENvbnRlbnQgPSBbXVxyXG4gICAgICAgIHRoaXMuY29tcGFueVR5cGVDaGVja2VkID0gMFxyXG4gICAgICAgIHRoaXMuc2FsYXJ5VHlwZUNoZWNrZWQgPSAwXHJcbiAgICAgICAgdGhpcy5leHBlcmllbmNlVHlwZUNoZWNrZWQgPSAwXHJcbiAgICAgICAgdGhpcy5zdG9yZUNvdW50Q2hlY2tlZCA9IDBcclxuICAgICAgICB0aGlzLmJ1c2luZXNzVHlwZUNoZWNrZWQgPSAwXHJcbiAgICAgICAgdGhpcy5jb21wYW55Q29tdENoZWNrZWQgPSAwXHJcbiAgICAgICAgdGhpcy5wcm92Q2hlY2tlZCA9ICctMSdcclxuICAgICAgICB0aGlzLmNpdHlDaGVja2VkID0gJzAnXHJcbiAgICAgICAgdGhpcy5pbml0ID0gZmFsc2VcclxuICAgIH1cclxufVxyXG4iXX0=