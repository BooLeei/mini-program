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

var _imageUtils = require('./../utils/imageUtils.js');

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resume = function (_wepy$page) {
    _inherits(Resume, _wepy$page);

    function Resume() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Resume);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Resume.__proto__ || Object.getPrototypeOf(Resume)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '简历'
        }, _this.request = new _request2.default(), _this.storage = {
            city: _wepy2.default.getStorageSync('region'),
            job: _wepy2.default.getStorageSync('workList')
        }, _this.data = {
            initCity: true,
            initJob: true,
            page: {
                resumeId: '',
                headerImage: '',
                headerImageFull: '',
                name: '',
                sex: '',
                cityId: '',
                birthYear: '',
                educationType: '',
                educationTypeName: '',
                experienceType: '',
                experienceTypeName: '',
                tel: '',
                workStatus: '',
                intro: '',
                companyType: '',
                companyTypeName: '',
                salaryType: '',
                salaryTypeName: '',
                parentWorkClassId: '',
                workClassId: '',
                workId: '',
                tagList: [],
                workList: [],
                schoolList: [],
                oldShowUrl: [],
                showUrl: []
            },
            jobIndex: [0, 0, 0],
            cityIndex: [0, 0],
            base: {
                sex: [{
                    'value': 0,
                    'text': '男'
                }, {
                    'value': 1,
                    'text': '女'
                }],
                edu: [{
                    'value': 2,
                    'text': '大专'
                }, {
                    'value': 3,
                    'text': '本科'
                }, {
                    'value': 4,
                    'text': '硕士'
                }, {
                    'value': 5,
                    'text': '博士'
                }, {
                    'value': 1,
                    'text': '其他'
                }],
                exp: [{
                    'value': 1,
                    'text': '1年以下'
                }, {
                    'value': 2,
                    'text': '1~2年'
                }, {
                    'value': 3,
                    'text': '3~5年'
                }, {
                    'value': 4,
                    'text': '6~8年'
                }, {
                    'value': 5,
                    'text': '8~10年'
                }, {
                    'value': 6,
                    'text': '10年以上'
                }],
                level: [{
                    'value': 1,
                    'text': '初级'
                }, {
                    'value': 2,
                    'text': '中级'
                }, {
                    'value': 3,
                    'text': '高级'
                }, {
                    'value': 4,
                    'text': '资深'
                }, {
                    'value': 5,
                    'text': '导师级'
                }],
                state: [{
                    'value': 0,
                    'text': '离职'
                }, {
                    'value': 1,
                    'text': '在职'
                }],
                type: [{
                    value: 1,
                    text: '俱乐部'
                }, {
                    value: 2,
                    text: '工作室'
                }, {
                    value: 3,
                    text: '瑜伽馆'
                }, {
                    value: 4,
                    text: '教育培训'
                }, {
                    value: 5,
                    text: '器械设备'
                }, {
                    value: 6,
                    text: '媒体资讯'
                }, {
                    value: 7,
                    text: '会展／活动／赛事'
                }, {
                    value: 8,
                    text: '互联网'
                }, {
                    value: 9,
                    text: '其他'
                }],
                salary: [{
                    value: 1,
                    text: '3~5K'
                }, {
                    value: 2,
                    text: '6~8K'
                }, {
                    value: 3,
                    text: '9~12K'
                }, {
                    value: 4,
                    text: '13~18K'
                }, {
                    value: 5,
                    text: '19~25K'
                }, {
                    value: 6,
                    text: '26~30K'
                }, {
                    value: 7,
                    text: '31~40K'
                }, {
                    value: 8,
                    text: '41~50K'
                }, {
                    value: 9,
                    text: '50K以上'
                }]
            },
            city: [_this.storage.city, _this.storage.city[0].children],
            job: [_this.storage.job, _this.storage.job[0].list, _this.storage.job[0].list[0].workList]
        }, _this.computed = {
            addTagShow: function addTagShow() {
                return this.arrayWatch(this.page.tagList);
            },
            addExpShow: function addExpShow() {
                return this.arrayWatch(this.page.workList);
            },
            addEduShow: function addEduShow() {
                return this.arrayWatch(this.page.schoolList);
            }
        }, _this.methods = {
            bindName: function bindName(e) {
                this.page.name = e.detail.value;
            },
            bindSex: function bindSex(e) {
                this.page.sex = e.detail.value;
            },
            bindBirth: function bindBirth(e) {
                this.page.birthYear = e.detail.value;
            },
            bindEdu: function bindEdu(e) {
                this.page.educationType = this.base.edu[e.detail.value].value;
                this.page.educationTypeName = this.base.edu[e.detail.value].text;
            },
            bindExp: function bindExp(e) {
                this.page.experienceType = this.base.exp[e.detail.value].value;
                this.page.experienceTypeName = this.base.exp[e.detail.value].text;
            },
            bindPhone: function bindPhone(e) {
                this.page.tel = e.detail.value;
            },
            bindState: function bindState(e) {
                this.page.workStatus = e.detail.value;
            },
            bindIntro: function bindIntro(e) {
                this.page.intro = e.detail.value;
            },
            bindType: function bindType(e) {
                this.page.companyType = this.base.type[e.detail.value].value;
                this.page.companyTypeName = this.base.type[e.detail.value].text;
            },
            bindCityColumn: function bindCityColumn(e) {
                if (e.detail.column === 0) {
                    this.city[1] = this.city[0][e.detail.value].children;
                }
            },
            bindCity: function bindCity(e) {
                this.cityIndex = e.detail.value;
                this.page.cityName = this.city[1][this.cityIndex[1]].text;
                this.page.cityId = this.city[1][this.cityIndex[1]].value;
            },
            bindJobColumn: function bindJobColumn(e) {
                if (e.detail.column === 0) {
                    this.job[1] = this.job[0][e.detail.value].list;
                    this.job[2] = this.job[0][e.detail.value].list[0].workList;
                }
                if (e.detail.column === 1) {
                    this.job[2] = this.job[1][e.detail.value].workList;
                }
            },
            bindJob: function bindJob(e) {
                this.jobIndex = e.detail.value;
                this.page.workName = this.job[2][this.jobIndex[2]].name;
                this.page.parentWorkClassId = this.job[0][this.jobIndex[0]].id;
                this.page.workClassId = this.job[1][this.jobIndex[1]].id;
                this.page.workId = this.job[2][this.jobIndex[2]].id;
            },
            bindSalary: function bindSalary(e) {
                this.page.salaryType = this.base.salary[e.detail.value].value;
                this.page.salaryTypeName = this.base.salary[e.detail.value].text;
            },
            preview: function preview(index) {
                (0, _imageUtils.Preview)(index, this.page.showUrl);
            },
            delImg: function delImg(index) {
                this.page.showUrl.splice(index, 1);
                this.page.oldShowUrl.splice(index, 1);
            },
            addImg: function addImg() {
                var _this2 = this;

                (0, _imageUtils.Choose)().then(function (ret) {
                    if (ret.tempFiles[0].size > 1024 * 1024) {
                        (0, _log.log)('图片过大');
                        return;
                    }
                    _this2.page.showUrl.unshift(ret.tempFilePaths[0]);
                    _this2.$apply();
                    (0, _imageUtils.Upload)(ret.tempFilePaths[0], 5).then(function (ret) {
                        _this2.page.oldShowUrl.push(ret.data.imageName);
                    });
                });
            },
            delTag: function delTag(index, e) {
                var _this3 = this;

                this.showModal({ content: '是否删除该认证/技能' }).then(function (ret) {
                    if (e.target.dataset.id != '') {
                        _this3.page.tagList[index].status = '0';
                    } else {
                        _this3.page.tagList.splice(index, 1);
                    }
                    _this3.$apply();
                });
            },
            delExp: function delExp(index, e) {
                var _this4 = this;

                this.showModal({ content: '是否删除该工作履历' }).then(function (ret) {
                    if (e.target.dataset.id != '') {
                        _this4.page.workList[index].status = '0';
                    } else {
                        _this4.page.workList.splice(index, 1);
                    }
                    _this4.$apply();
                });
            },
            delEdu: function delEdu(index, e) {
                var _this5 = this;

                this.showModal({ content: '是否删除该学历经历' }).then(function (ret) {
                    if (e.target.dataset.id != '') {
                        _this5.page.schoolList[index].status = '0';
                    } else {
                        _this5.page.schoolList.splice(index, 1);
                    }
                    _this5.$apply();
                });
            },
            editTag: function editTag(index) {
                this.$parent.global.tagList = this.page.tagList;
                this.$parent.global.tagUpdate = false;
                _wepy2.default.navigateTo({
                    url: 'resume-tag?grandId=' + this.page.parentWorkClassId + '&parentId=' + this.page.workClassId + '&id=' + this.page.workId + '&index=' + index + '&msg=' + JSON.stringify(this.page.tagList[index])
                });
            },
            editExp: function editExp(index) {
                this.$parent.global.workList = this.page.workList;
                this.$parent.global.workUpdate = false;
                _wepy2.default.navigateTo({
                    url: 'resume-exp?index=' + index + '&msg=' + JSON.stringify(this.page.tagList[index])
                });
            },
            addTag: function addTag() {
                if (this.page.workId == '') {
                    (0, _log.log)('请先选择期望职位');
                    return false;
                }
                this.$parent.global.tagList = this.page.tagList;
                this.$parent.global.tagUpdate = false;
                _wepy2.default.navigateTo({
                    url: 'resume-tag?grandId=' + this.page.parentWorkClassId + '&parentId=' + this.page.workClassId + '&id=' + this.page.workId
                });
            },
            addExp: function addExp() {
                this.$parent.global.workList = this.page.workList;
                this.$parent.global.workUpdate = false;
                _wepy2.default.navigateTo({
                    url: 'resume-exp'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Resume, [{
        key: 'showModal',
        value: function showModal(_ref2) {
            var _ref2$title = _ref2.title,
                title = _ref2$title === undefined ? '提示' : _ref2$title,
                _ref2$content = _ref2.content,
                content = _ref2$content === undefined ? '是否删除该选项' : _ref2$content;

            return new Promise(function (resolve, reject) {
                _wepy2.default.showModal({
                    title: title,
                    content: content,
                    cancelColor: '#ddd',
                    confirmColor: '#40c4ff',
                    success: function success(ret) {
                        if (ret.confirm) {
                            resolve('点击确定');
                        }
                        if (ret.cancel) {
                            reject('用户取消');
                        }
                    },
                    fail: function fail(err) {
                        reject(err);
                    }
                });
            });
        }
    }, {
        key: 'arrayWatch',
        value: function arrayWatch(arr) {
            var count = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = arr.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        index = _step$value[0],
                        item = _step$value[1];

                    if (item.status == 1) {
                        count++;
                    }
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

            if (count < 3) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            if (this.$parent.global.tagUpdate) {
                this.page.tagList = [].concat(_toConsumableArray(this.$parent.global.tagList));
            }
            if (this.$parent.global.workUpdate) {
                this.page.workList = [].concat(_toConsumableArray(this.$parent.global.workList));
            }
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this6 = this;

            this.request.Get({ 'userId': 294 }, '/Resume/getInfoSelf').then(function (_ref3) {
                var data = _ref3.data;

                (0, _log.log)(data);
                _this6.page = data;
                _this6.$apply();
            });
        }
    }]);

    return Resume;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Resume , 'pages/resume'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZS5qcyJdLCJuYW1lcyI6WyJSZXN1bWUiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInJlcXVlc3QiLCJzdG9yYWdlIiwiY2l0eSIsImdldFN0b3JhZ2VTeW5jIiwiam9iIiwiZGF0YSIsImluaXRDaXR5IiwiaW5pdEpvYiIsInBhZ2UiLCJyZXN1bWVJZCIsImhlYWRlckltYWdlIiwiaGVhZGVySW1hZ2VGdWxsIiwibmFtZSIsInNleCIsImNpdHlJZCIsImJpcnRoWWVhciIsImVkdWNhdGlvblR5cGUiLCJlZHVjYXRpb25UeXBlTmFtZSIsImV4cGVyaWVuY2VUeXBlIiwiZXhwZXJpZW5jZVR5cGVOYW1lIiwidGVsIiwid29ya1N0YXR1cyIsImludHJvIiwiY29tcGFueVR5cGUiLCJjb21wYW55VHlwZU5hbWUiLCJzYWxhcnlUeXBlIiwic2FsYXJ5VHlwZU5hbWUiLCJwYXJlbnRXb3JrQ2xhc3NJZCIsIndvcmtDbGFzc0lkIiwid29ya0lkIiwidGFnTGlzdCIsIndvcmtMaXN0Iiwic2Nob29sTGlzdCIsIm9sZFNob3dVcmwiLCJzaG93VXJsIiwiam9iSW5kZXgiLCJjaXR5SW5kZXgiLCJiYXNlIiwiZWR1IiwiZXhwIiwibGV2ZWwiLCJzdGF0ZSIsInR5cGUiLCJ2YWx1ZSIsInRleHQiLCJzYWxhcnkiLCJjaGlsZHJlbiIsImxpc3QiLCJjb21wdXRlZCIsImFkZFRhZ1Nob3ciLCJhcnJheVdhdGNoIiwiYWRkRXhwU2hvdyIsImFkZEVkdVNob3ciLCJtZXRob2RzIiwiYmluZE5hbWUiLCJlIiwiZGV0YWlsIiwiYmluZFNleCIsImJpbmRCaXJ0aCIsImJpbmRFZHUiLCJiaW5kRXhwIiwiYmluZFBob25lIiwiYmluZFN0YXRlIiwiYmluZEludHJvIiwiYmluZFR5cGUiLCJiaW5kQ2l0eUNvbHVtbiIsImNvbHVtbiIsImJpbmRDaXR5IiwiY2l0eU5hbWUiLCJiaW5kSm9iQ29sdW1uIiwiYmluZEpvYiIsIndvcmtOYW1lIiwiaWQiLCJiaW5kU2FsYXJ5IiwicHJldmlldyIsImluZGV4IiwiZGVsSW1nIiwic3BsaWNlIiwiYWRkSW1nIiwidGhlbiIsInJldCIsInRlbXBGaWxlcyIsInNpemUiLCJ1bnNoaWZ0IiwidGVtcEZpbGVQYXRocyIsIiRhcHBseSIsInB1c2giLCJpbWFnZU5hbWUiLCJkZWxUYWciLCJzaG93TW9kYWwiLCJjb250ZW50IiwidGFyZ2V0IiwiZGF0YXNldCIsInN0YXR1cyIsImRlbEV4cCIsImRlbEVkdSIsImVkaXRUYWciLCIkcGFyZW50IiwiZ2xvYmFsIiwidGFnVXBkYXRlIiwibmF2aWdhdGVUbyIsInVybCIsIkpTT04iLCJzdHJpbmdpZnkiLCJlZGl0RXhwIiwid29ya1VwZGF0ZSIsImFkZFRhZyIsImFkZEV4cCIsInRpdGxlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjYW5jZWxDb2xvciIsImNvbmZpcm1Db2xvciIsInN1Y2Nlc3MiLCJjb25maXJtIiwiY2FuY2VsIiwiZmFpbCIsImVyciIsImFyciIsImNvdW50IiwiZW50cmllcyIsIml0ZW0iLCJwYXJhbXMiLCJHZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7OzBMQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0I7QUFGbkIsUyxRQUtUQyxPLEdBQVUsdUIsUUFFVkMsTyxHQUFVO0FBQ05DLGtCQUFNLGVBQUtDLGNBQUwsQ0FBb0IsUUFBcEIsQ0FEQTtBQUVOQyxpQkFBSyxlQUFLRCxjQUFMLENBQW9CLFVBQXBCO0FBRkMsUyxRQTJCVkUsSSxHQUFPO0FBQ0hDLHNCQUFVLElBRFA7QUFFSEMscUJBQVMsSUFGTjtBQUdIQyxrQkFBTTtBQUNGQywwQkFBVSxFQURSO0FBRUZDLDZCQUFhLEVBRlg7QUFHRkMsaUNBQWlCLEVBSGY7QUFJRkMsc0JBQU0sRUFKSjtBQUtGQyxx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QUNsQjJCO0FBQ0g7QUFDSjtBQU5ZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBT2IsZ0JBQUlBLFFBQVEsQ0FBWixFQUFlO0FBQ1gsdUJBQU8sSUFBUDtBQUNILGFBRkQsTUFFTztBQUNILHVCQUFPLEtBQVA7QUFDSDtBQUNKOzs7aUNBc0tTO0FBQ04sZ0JBQUksS0FBS3ZCLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkMsU0FBeEIsRUFBbUM7QUFDL0IscUJBQUszRixJQUFMLENBQVVzQixPQUFWLGdDQUF3QixLQUFLbUUsT0FBTCxDQUFhQyxNQUFiLENBQW9CcEUsT0FBNUM7QUFDSDtBQUNELGdCQUFJLEtBQUttRSxPQUFMLENBQWFDLE1BQWIsQ0FBb0JPLFVBQXhCLEVBQW9DO0FBQ2hDLHFCQUFLakcsSUFBTCxDQUFVdUIsUUFBVixnQ0FBeUIsS0FBS2tFLE9BQUwsQ0FBYUMsTUFBYixDQUFvQm5FLFFBQTdDO0FBQ0g7QUFDSjs7OytCQUVPNEYsTSxFQUFRO0FBQUE7O0FBQ1osaUJBQUszSCxPQUFMLENBQWE0SCxHQUFiLENBQWlCLEVBQUMsVUFBVSxHQUFYLEVBQWpCLEVBQWtDLHFCQUFsQyxFQUNDN0MsSUFERCxDQUNNLGlCQUFZO0FBQUEsb0JBQVYxRSxJQUFVLFNBQVZBLElBQVU7O0FBQ2QsOEJBQUlBLElBQUo7QUFDQSx1QkFBS0csSUFBTCxHQUFZSCxJQUFaO0FBQ0EsdUJBQUtnRixNQUFMO0FBQ0gsYUFMRDtBQU1IOzs7O0VBblorQixlQUFLN0UsSTs7a0JBQXBCWixNIiwiZmlsZSI6InJlc3VtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQgeyBQcmV2aWV3LCBDaG9vc2UsIFVwbG9hZCB9IGZyb20gJy4uL3V0aWxzL2ltYWdlVXRpbHMnXHJcbmltcG9ydCB7bG9nfSBmcm9tICcuLi91dGlscy9sb2cnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXN1bWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn566A5Y6GJ1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgc3RvcmFnZSA9IHtcclxuICAgICAgICBjaXR5OiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdyZWdpb24nKSxcclxuICAgICAgICBqb2I6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3dvcmtMaXN0JylcclxuICAgIH1cclxuXHJcbiAgICBzaG93TW9kYWwgKHt0aXRsZSA9ICfmj5DnpLonLCBjb250ZW50ID0gJ+aYr+WQpuWIoOmZpOivpemAiemhuSd9KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogY29udGVudCxcclxuICAgICAgICAgICAgICAgIGNhbmNlbENvbG9yOiAnI2RkZCcsXHJcbiAgICAgICAgICAgICAgICBjb25maXJtQ29sb3I6ICcjNDBjNGZmJyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldC5jb25maXJtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ+eCueWHu+ehruWumicpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXQuY2FuY2VsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgn55So5oi35Y+W5raIJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBpbml0Q2l0eTogdHJ1ZSxcclxuICAgICAgICBpbml0Sm9iOiB0cnVlLFxyXG4gICAgICAgIHBhZ2U6IHtcclxuICAgICAgICAgICAgcmVzdW1lSWQ6ICcnLFxyXG4gICAgICAgICAgICBoZWFkZXJJbWFnZTogJycsXHJcbiAgICAgICAgICAgIGhlYWRlckltYWdlRnVsbDogJycsXHJcbiAgICAgICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgICAgICBzZXg6ICcnLFxyXG4gICAgICAgICAgICBjaXR5SWQ6ICcnLFxyXG4gICAgICAgICAgICBiaXJ0aFllYXI6ICcnLFxyXG4gICAgICAgICAgICBlZHVjYXRpb25UeXBlOiAnJyxcclxuICAgICAgICAgICAgZWR1Y2F0aW9uVHlwZU5hbWU6ICcnLFxyXG4gICAgICAgICAgICBleHBlcmllbmNlVHlwZTogJycsXHJcbiAgICAgICAgICAgIGV4cGVyaWVuY2VUeXBlTmFtZTogJycsXHJcbiAgICAgICAgICAgIHRlbDogJycsXHJcbiAgICAgICAgICAgIHdvcmtTdGF0dXM6ICcnLFxyXG4gICAgICAgICAgICBpbnRybzogJycsXHJcbiAgICAgICAgICAgIGNvbXBhbnlUeXBlOiAnJyxcclxuICAgICAgICAgICAgY29tcGFueVR5cGVOYW1lOiAnJyxcclxuICAgICAgICAgICAgc2FsYXJ5VHlwZTogJycsXHJcbiAgICAgICAgICAgIHNhbGFyeVR5cGVOYW1lOiAnJyxcclxuICAgICAgICAgICAgcGFyZW50V29ya0NsYXNzSWQ6ICcnLFxyXG4gICAgICAgICAgICB3b3JrQ2xhc3NJZDogJycsXHJcbiAgICAgICAgICAgIHdvcmtJZDogJycsXHJcbiAgICAgICAgICAgIHRhZ0xpc3Q6IFtdLFxyXG4gICAgICAgICAgICB3b3JrTGlzdDogW10sXHJcbiAgICAgICAgICAgIHNjaG9vbExpc3Q6IFtdLFxyXG4gICAgICAgICAgICBvbGRTaG93VXJsOiBbXSxcclxuICAgICAgICAgICAgc2hvd1VybDogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIGpvYkluZGV4OiBbMCwgMCwgMF0sXHJcbiAgICAgICAgY2l0eUluZGV4OiBbMCwgMF0sXHJcbiAgICAgICAgYmFzZToge1xyXG4gICAgICAgICAgICBzZXg6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+eUtydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WlsydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgZWR1OiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMixcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICflpKfkuJMnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMyxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICfmnKznp5EnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogNCxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICfnoZXlo6snXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogNSxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICfljZrlo6snXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMSxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICflhbbku5YnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGV4cDogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnMeW5tOS7peS4iydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJzF+MuW5tCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJzN+NeW5tCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA0LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJzZ+OOW5tCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJzh+MTDlubQnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogNixcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICcxMOW5tOS7peS4iidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgbGV2ZWw6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WInee6pydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+S4ree6pydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+mrmOe6pydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA0LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+i1hOa3sSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WvvOW4iOe6pydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgc3RhdGU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+emu+iBjCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WcqOiBjCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgdHlwZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfkv7HkuZDpg6gnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+W3peS9nOWupCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn55Gc5Ly96aaGJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfmlZnogrLln7norq0nXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+WZqOaisOiuvuWkhydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5aqS5L2T6LWE6K6vJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA3LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfkvJrlsZXvvI/mtLvliqjvvI/otZvkuosnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDgsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+S6kuiBlOe9kSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogOSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5YW25LuWJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBzYWxhcnk6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnM341SydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnNn44SydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnOX4xMksnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzEzfjE4SydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnMTl+MjVLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICcyNn4zMEsnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzMxfjQwSydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogOCxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnNDF+NTBLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICc1MEvku6XkuIonXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaXR5OiBbdGhpcy5zdG9yYWdlLmNpdHksIHRoaXMuc3RvcmFnZS5jaXR5WzBdLmNoaWxkcmVuXSxcclxuICAgICAgICBqb2I6IFt0aGlzLnN0b3JhZ2Uuam9iLCB0aGlzLnN0b3JhZ2Uuam9iWzBdLmxpc3QsIHRoaXMuc3RvcmFnZS5qb2JbMF0ubGlzdFswXS53b3JrTGlzdF0sXHJcbiAgICB9XHJcblxyXG4gICAgYXJyYXlXYXRjaCAoYXJyKSB7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMFxyXG4gICAgICAgIGZvciAobGV0IFtpbmRleCwgaXRlbV0gb2YgYXJyLmVudHJpZXMoKSkge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5zdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY291bnQrK1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3VudCA8IDMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgICAgYWRkVGFnU2hvdyAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFycmF5V2F0Y2godGhpcy5wYWdlLnRhZ0xpc3QpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRFeHBTaG93ICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXlXYXRjaCh0aGlzLnBhZ2Uud29ya0xpc3QpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRFZHVTaG93ICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXlXYXRjaCh0aGlzLnBhZ2Uuc2Nob29sTGlzdClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBiaW5kTmFtZSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UubmFtZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kU2V4IChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5zZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEJpcnRoIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5iaXJ0aFllYXIgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEVkdSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuZWR1Y2F0aW9uVHlwZSA9IHRoaXMuYmFzZS5lZHVbZS5kZXRhaWwudmFsdWVdLnZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5lZHVjYXRpb25UeXBlTmFtZSA9IHRoaXMuYmFzZS5lZHVbZS5kZXRhaWwudmFsdWVdLnRleHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRFeHAgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmV4cGVyaWVuY2VUeXBlID0gdGhpcy5iYXNlLmV4cFtlLmRldGFpbC52YWx1ZV0udmFsdWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmV4cGVyaWVuY2VUeXBlTmFtZSA9IHRoaXMuYmFzZS5leHBbZS5kZXRhaWwudmFsdWVdLnRleHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRQaG9uZSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UudGVsID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRTdGF0ZSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uud29ya1N0YXR1cyA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kSW50cm8gKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmludHJvID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRUeXBlIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jb21wYW55VHlwZSA9IHRoaXMuYmFzZS50eXBlW2UuZGV0YWlsLnZhbHVlXS52YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY29tcGFueVR5cGVOYW1lID0gdGhpcy5iYXNlLnR5cGVbZS5kZXRhaWwudmFsdWVdLnRleHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRDaXR5Q29sdW1uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmRldGFpbC5jb2x1bW4gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2l0eVsxXSA9IHRoaXMuY2l0eVswXVtlLmRldGFpbC52YWx1ZV0uY2hpbGRyZW5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZENpdHkgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5jaXR5SW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY2l0eU5hbWUgPSB0aGlzLmNpdHlbMV1bdGhpcy5jaXR5SW5kZXhbMV1dLnRleHRcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNpdHlJZCA9IHRoaXMuY2l0eVsxXVt0aGlzLmNpdHlJbmRleFsxXV0udmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRKb2JDb2x1bW4gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUuZGV0YWlsLmNvbHVtbiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5qb2JbMV0gPSB0aGlzLmpvYlswXVtlLmRldGFpbC52YWx1ZV0ubGlzdFxyXG4gICAgICAgICAgICAgICAgdGhpcy5qb2JbMl0gPSB0aGlzLmpvYlswXVtlLmRldGFpbC52YWx1ZV0ubGlzdFswXS53b3JrTGlzdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlLmRldGFpbC5jb2x1bW4gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuam9iWzJdID0gdGhpcy5qb2JbMV1bZS5kZXRhaWwudmFsdWVdLndvcmtMaXN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRKb2IgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5qb2JJbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS53b3JrTmFtZSA9IHRoaXMuam9iWzJdW3RoaXMuam9iSW5kZXhbMl1dLm5hbWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnBhcmVudFdvcmtDbGFzc0lkID0gdGhpcy5qb2JbMF1bdGhpcy5qb2JJbmRleFswXV0uaWRcclxuICAgICAgICAgICAgdGhpcy5wYWdlLndvcmtDbGFzc0lkID0gdGhpcy5qb2JbMV1bdGhpcy5qb2JJbmRleFsxXV0uaWRcclxuICAgICAgICAgICAgdGhpcy5wYWdlLndvcmtJZCA9IHRoaXMuam9iWzJdW3RoaXMuam9iSW5kZXhbMl1dLmlkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kU2FsYXJ5IChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5zYWxhcnlUeXBlID0gdGhpcy5iYXNlLnNhbGFyeVtlLmRldGFpbC52YWx1ZV0udmFsdWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnNhbGFyeVR5cGVOYW1lID0gdGhpcy5iYXNlLnNhbGFyeVtlLmRldGFpbC52YWx1ZV0udGV4dFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJldmlldyAoaW5kZXgpIHtcclxuICAgICAgICAgICAgUHJldmlldyhpbmRleCwgdGhpcy5wYWdlLnNob3dVcmwpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxJbWcgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5zaG93VXJsLnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgdGhpcy5wYWdlLm9sZFNob3dVcmwuc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkSW1nICgpIHtcclxuICAgICAgICAgICAgQ2hvb3NlKCkudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldC50ZW1wRmlsZXNbMF0uc2l6ZSA+IDEwMjQqMTAyNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZygn5Zu+54mH6L+H5aSnJylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZS5zaG93VXJsLnVuc2hpZnQocmV0LnRlbXBGaWxlUGF0aHNbMF0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICBVcGxvYWQocmV0LnRlbXBGaWxlUGF0aHNbMF0sIDUpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5vbGRTaG93VXJsLnB1c2gocmV0LmRhdGEuaW1hZ2VOYW1lKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbFRhZyAoaW5kZXgsIGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TW9kYWwoe2NvbnRlbnQ6ICfmmK/lkKbliKDpmaTor6XorqTor4Ev5oqA6IO9J30pXHJcbiAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5pZCAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS50YWdMaXN0W2luZGV4XS5zdGF0dXMgPSAnMCdcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLnRhZ0xpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVsRXhwIChpbmRleCwgZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNb2RhbCh7Y29udGVudDogJ+aYr+WQpuWIoOmZpOivpeW3peS9nOWxpeWOhid9KVxyXG4gICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuaWQgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2Uud29ya0xpc3RbaW5kZXhdLnN0YXR1cyA9ICcwJ1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2Uud29ya0xpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVsRWR1IChpbmRleCwgZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNb2RhbCh7Y29udGVudDogJ+aYr+WQpuWIoOmZpOivpeWtpuWOhue7j+WOhid9KVxyXG4gICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuaWQgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2Uuc2Nob29sTGlzdFtpbmRleF0uc3RhdHVzID0gJzAnXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5zY2hvb2xMaXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVkaXRUYWcgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwudGFnTGlzdCA9IHRoaXMucGFnZS50YWdMaXN0XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwudGFnVXBkYXRlID0gZmFsc2VcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogJ3Jlc3VtZS10YWc/Z3JhbmRJZD0nICsgdGhpcy5wYWdlLnBhcmVudFdvcmtDbGFzc0lkXHJcbiAgICAgICAgICAgICAgICArICcmcGFyZW50SWQ9JysgdGhpcy5wYWdlLndvcmtDbGFzc0lkICsgJyZpZD0nICsgdGhpcy5wYWdlLndvcmtJZFxyXG4gICAgICAgICAgICAgICAgKyAnJmluZGV4PScgKyBpbmRleCArICcmbXNnPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnBhZ2UudGFnTGlzdFtpbmRleF0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZGl0RXhwIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLndvcmtMaXN0ID0gdGhpcy5wYWdlLndvcmtMaXN0XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwud29ya1VwZGF0ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdyZXN1bWUtZXhwP2luZGV4PScgKyBpbmRleCArICcmbXNnPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnBhZ2UudGFnTGlzdFtpbmRleF0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRUYWcgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLndvcmtJZCA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgbG9nKCfor7flhYjpgInmi6nmnJ/mnJvogYzkvY0nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC50YWdMaXN0ID0gdGhpcy5wYWdlLnRhZ0xpc3RcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC50YWdVcGRhdGUgPSBmYWxzZVxyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAncmVzdW1lLXRhZz9ncmFuZElkPScrIHRoaXMucGFnZS5wYXJlbnRXb3JrQ2xhc3NJZFxyXG4gICAgICAgICAgICAgICAgKycmcGFyZW50SWQ9JysgdGhpcy5wYWdlLndvcmtDbGFzc0lkICsnJmlkPScrIHRoaXMucGFnZS53b3JrSWRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZEV4cCAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwud29ya0xpc3QgPSB0aGlzLnBhZ2Uud29ya0xpc3RcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC53b3JrVXBkYXRlID0gZmFsc2VcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogJ3Jlc3VtZS1leHAnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWwudGFnVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS50YWdMaXN0ID0gWy4uLnRoaXMuJHBhcmVudC5nbG9iYWwudGFnTGlzdF1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWwud29ya1VwZGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uud29ya0xpc3QgPSBbLi4udGhpcy4kcGFyZW50Lmdsb2JhbC53b3JrTGlzdF1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkIChwYXJhbXMpIHtcclxuICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHsndXNlcklkJzogMjk0fSwgJy9SZXN1bWUvZ2V0SW5mb1NlbGYnKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgbG9nKGRhdGEpXHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IGRhdGFcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19