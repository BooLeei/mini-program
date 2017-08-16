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
            loading: false,
            page: {
                // userId: wepy.getStorageSync('userId'),
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
        }, _this.$props = { "loading": { "xmlns:v-bind": "", "v-bind:show.sync": "loading" } }, _this.$events = {}, _this.components = {
            'loading': _loading2.default
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
                    url: 'resume-exp?index=' + index + '&msg=' + JSON.stringify(this.page.workList[index])
                });
            },
            editEdu: function editEdu(index) {
                this.$parent.global.schoolList = this.page.schoolList;
                this.$parent.global.schoolUpdate = false;
                _wepy2.default.navigateTo({
                    url: 'resume-edu?index=' + index + '&msg=' + JSON.stringify(this.page.schoolList[index])
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
            },
            addEdu: function addEdu() {
                this.$parent.global.schoolList = this.page.schoolList;
                this.$parent.global.schoolUpdate = false;
                _wepy2.default.navigateTo({
                    url: 'resume-edu'
                });
            },
            cancel: function cancel() {
                this.showModal({ content: '确定放弃编辑简历吗？' }).then(function (ret) {
                    _wepy2.default.navigateBack();
                });
            },
            sure: function sure() {
                // this.page.userId = wepy.getStorageSync('userId')
                this.page.userId = '294';
                this.request.Post(this.page, '/Resume/update').then(function (ret) {
                    _wepy2.default.navigateBack();
                }).catch(function (err) {
                    (0, _log.log)(err);
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
                            reject(new Error('用户取消'));
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
            if (this.$parent.global.schoolUpdate) {
                this.page.schoolList = [].concat(_toConsumableArray(this.$parent.global.schoolList));
            }
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this6 = this;

            this.loading = true;
            this.request.Get({ 'userId': 294 }, '/Resume/getInfoSelf').then(function (_ref3) {
                var data = _ref3.data;

                _this6.page = data;
                _this6.loading = false;
                _this6.$apply();
            });
        }
    }]);

    return Resume;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Resume , 'pages/resume'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZS5qcyJdLCJuYW1lcyI6WyJSZXN1bWUiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInJlcXVlc3QiLCJzdG9yYWdlIiwiY2l0eSIsImdldFN0b3JhZ2VTeW5jIiwiam9iIiwiZGF0YSIsImxvYWRpbmciLCJwYWdlIiwicmVzdW1lSWQiLCJoZWFkZXJJbWFnZSIsImhlYWRlckltYWdlRnVsbCIsIm5hbWUiLCJzZXgiLCJjaXR5SWQiLCJiaXJ0aFllYXIiLCJlZHVjYXRpb25UeXBlIiwiZWR1Y2F0aW9uVHlwZU5hbWUiLCJleHBlcmllbmNlVHlwZSIsImV4cGVyaWVuY2VUeXBlTmFtZSIsInRlbCIsIndvcmtTdGF0dXMiLCJpbnRybyIsImNvbXBhbnlUeXBlIiwiY29tcGFueVR5cGVOYW1lIiwic2FsYXJ5VHlwZSIsInNhbGFyeVR5cGVOYW1lIiwicGFyZW50V29ya0NsYXNzSWQiLCJ3b3JrQ2xhc3NJZCIsIndvcmtJZCIsInRhZ0xpc3QiLCJ3b3JrTGlzdCIsInNjaG9vbExpc3QiLCJvbGRTaG93VXJsIiwic2hvd1VybCIsImpvYkluZGV4IiwiY2l0eUluZGV4IiwiYmFzZSIsImVkdSIsImV4cCIsImxldmVsIiwic3RhdGUiLCJ0eXBlIiwidmFsdWUiLCJ0ZXh0Iiwic2FsYXJ5IiwiY2hpbGRyZW4iLCJsaXN0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb21wdXRlZCIsImFkZFRhZ1Nob3ciLCJhcnJheVdhdGNoIiwiYWRkRXhwU2hvdyIsImFkZEVkdVNob3ciLCJtZXRob2RzIiwiYmluZE5hbWUiLCJlIiwiZGV0YWlsIiwiYmluZFNleCIsImJpbmRCaXJ0aCIsImJpbmRFZHUiLCJiaW5kRXhwIiwiYmluZFBob25lIiwiYmluZFN0YXRlIiwiYmluZEludHJvIiwiYmluZFR5cGUiLCJiaW5kQ2l0eUNvbHVtbiIsImNvbHVtbiIsImJpbmRDaXR5IiwiY2l0eU5hbWUiLCJiaW5kSm9iQ29sdW1uIiwiYmluZEpvYiIsIndvcmtOYW1lIiwiaWQiLCJiaW5kU2FsYXJ5IiwicHJldmlldyIsImluZGV4IiwiZGVsSW1nIiwic3BsaWNlIiwiYWRkSW1nIiwidGhlbiIsInJldCIsInRlbXBGaWxlcyIsInNpemUiLCJ1bnNoaWZ0IiwidGVtcEZpbGVQYXRocyIsIiRhcHBseSIsInB1c2giLCJpbWFnZU5hbWUiLCJkZWxUYWciLCJzaG93TW9kYWwiLCJjb250ZW50IiwidGFyZ2V0IiwiZGF0YXNldCIsInN0YXR1cyIsImRlbEV4cCIsImRlbEVkdSIsImVkaXRUYWciLCIkcGFyZW50IiwiZ2xvYmFsIiwidGFnVXBkYXRlIiwibmF2aWdhdGVUbyIsInVybCIsIkpTT04iLCJzdHJpbmdpZnkiLCJlZGl0RXhwIiwid29ya1VwZGF0ZSIsImVkaXRFZHUiLCJzY2hvb2xVcGRhdGUiLCJhZGRUYWciLCJhZGRFeHAiLCJhZGRFZHUiLCJjYW5jZWwiLCJuYXZpZ2F0ZUJhY2siLCJzdXJlIiwidXNlcklkIiwiUG9zdCIsImNhdGNoIiwiZXJyIiwidGl0bGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNhbmNlbENvbG9yIiwiY29uZmlybUNvbG9yIiwic3VjY2VzcyIsImNvbmZpcm0iLCJFcnJvciIsImZhaWwiLCJhcnIiLCJjb3VudCIsImVudHJpZXMiLCJpdGVtIiwicGFyYW1zIiwiR2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7OzBMQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0I7QUFGbkIsUyxRQUtUQyxPLEdBQVUsdUIsUUFFVkMsTyxHQUFVO0FBQ05DLGtCQUFNLGVBQUtDLGNBQUwsQ0FBb0IsUUFBcEIsQ0FEQTtBQUVOQyxpQkFBSyxlQUFLRCxjQUFMLENBQW9CLFVBQXBCO0FBRkMsUyxRQTJCVkUsSSxHQUFPO0FBQ0hD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Q0FBYXVJLEdBQWIsQ0FBaUIsRUFBQyxVQUFVLEdBQVgsRUFBakIsRUFBa0MscUJBQWxDLEVBQ0N0RCxJQURELENBQ00saUJBQVk7QUFBQSxvQkFBVjVFLElBQVUsU0FBVkEsSUFBVTs7QUFDZCx1QkFBS0UsSUFBTCxHQUFZRixJQUFaO0FBQ0EsdUJBQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0EsdUJBQUtpRixNQUFMO0FBQ0gsYUFMRDtBQU1IOzs7O0VBNWIrQixlQUFLaEYsSTs7a0JBQXBCWCxNIiwiZmlsZSI6InJlc3VtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCB7IFByZXZpZXcsIENob29zZSwgVXBsb2FkIH0gZnJvbSAnLi4vdXRpbHMvaW1hZ2VVdGlscydcclxuaW1wb3J0IHtsb2d9IGZyb20gJy4uL3V0aWxzL2xvZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3VtZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnroDljoYnXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICBzdG9yYWdlID0ge1xyXG4gICAgICAgIGNpdHk6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3JlZ2lvbicpLFxyXG4gICAgICAgIGpvYjogd2VweS5nZXRTdG9yYWdlU3luYygnd29ya0xpc3QnKVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNb2RhbCAoe3RpdGxlID0gJ+aPkOekuicsIGNvbnRlbnQgPSAn5piv5ZCm5Yig6Zmk6K+l6YCJ6aG5J30pIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQ29sb3I6ICcjZGRkJyxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1Db2xvcjogJyM0MGM0ZmYnLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0LmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgn54K55Ye756Gu5a6aJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldC5jYW5jZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcign55So5oi35Y+W5raIJykpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgcGFnZToge1xyXG4gICAgICAgICAgICAvLyB1c2VySWQ6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpLFxyXG4gICAgICAgICAgICByZXN1bWVJZDogJycsXHJcbiAgICAgICAgICAgIGhlYWRlckltYWdlOiAnJyxcclxuICAgICAgICAgICAgaGVhZGVySW1hZ2VGdWxsOiAnJyxcclxuICAgICAgICAgICAgbmFtZTogJycsXHJcbiAgICAgICAgICAgIHNleDogJycsXHJcbiAgICAgICAgICAgIGNpdHlJZDogJycsXHJcbiAgICAgICAgICAgIGJpcnRoWWVhcjogJycsXHJcbiAgICAgICAgICAgIGVkdWNhdGlvblR5cGU6ICcnLFxyXG4gICAgICAgICAgICBlZHVjYXRpb25UeXBlTmFtZTogJycsXHJcbiAgICAgICAgICAgIGV4cGVyaWVuY2VUeXBlOiAnJyxcclxuICAgICAgICAgICAgZXhwZXJpZW5jZVR5cGVOYW1lOiAnJyxcclxuICAgICAgICAgICAgdGVsOiAnJyxcclxuICAgICAgICAgICAgd29ya1N0YXR1czogJycsXHJcbiAgICAgICAgICAgIGludHJvOiAnJyxcclxuICAgICAgICAgICAgY29tcGFueVR5cGU6ICcnLFxyXG4gICAgICAgICAgICBjb21wYW55VHlwZU5hbWU6ICcnLFxyXG4gICAgICAgICAgICBzYWxhcnlUeXBlOiAnJyxcclxuICAgICAgICAgICAgc2FsYXJ5VHlwZU5hbWU6ICcnLFxyXG4gICAgICAgICAgICBwYXJlbnRXb3JrQ2xhc3NJZDogJycsXHJcbiAgICAgICAgICAgIHdvcmtDbGFzc0lkOiAnJyxcclxuICAgICAgICAgICAgd29ya0lkOiAnJyxcclxuICAgICAgICAgICAgdGFnTGlzdDogW10sXHJcbiAgICAgICAgICAgIHdvcmtMaXN0OiBbXSxcclxuICAgICAgICAgICAgc2Nob29sTGlzdDogW10sXHJcbiAgICAgICAgICAgIG9sZFNob3dVcmw6IFtdLFxyXG4gICAgICAgICAgICBzaG93VXJsOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgam9iSW5kZXg6IFswLCAwLCAwXSxcclxuICAgICAgICBjaXR5SW5kZXg6IFswLCAwXSxcclxuICAgICAgICBiYXNlOiB7XHJcbiAgICAgICAgICAgIHNleDogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn55S3J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5aWzJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBlZHU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+Wkp+S4kydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+acrOenkSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA0LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+ehleWjqydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WNmuWjqydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WFtuS7lidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgZXhwOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMSxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICcx5bm05Lul5LiLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnMX4y5bm0J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnM3415bm0J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnNn445bm0J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnOH4xMOW5tCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJzEw5bm05Lul5LiKJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBsZXZlbDogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5Yid57qnJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5Lit57qnJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn6auY57qnJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn6LWE5rexJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5a+85biI57qnJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBzdGF0ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn56a76IGMJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5Zyo6IGMJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB0eXBlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+S/seS5kOmDqCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5bel5L2c5a6kJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfnkZzkvL3ppoYnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+aVmeiCsuWfueiurSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5Zmo5qKw6K6+5aSHJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICflqpLkvZPotYTorq8nXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+S8muWxle+8j+a0u+WKqO+8j+i1m+S6iydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogOCxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5LqS6IGU572RJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICflhbbku5YnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHNhbGFyeTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICczfjVLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICc2fjhLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICc5fjEySydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNCxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnMTN+MThLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA1LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICcxOX4yNUsnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDYsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzI2fjMwSydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnMzF+NDBLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA4LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICc0MX41MEsnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDksXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzUwS+S7peS4iidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2l0eTogW3RoaXMuc3RvcmFnZS5jaXR5LCB0aGlzLnN0b3JhZ2UuY2l0eVswXS5jaGlsZHJlbl0sXHJcbiAgICAgICAgam9iOiBbdGhpcy5zdG9yYWdlLmpvYiwgdGhpcy5zdG9yYWdlLmpvYlswXS5saXN0LCB0aGlzLnN0b3JhZ2Uuam9iWzBdLmxpc3RbMF0ud29ya0xpc3RdXHJcbiAgICB9XHJcblxyXG4gICAkcHJvcHMgPSB7XCJsb2FkaW5nXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzaG93LnN5bmNcIjpcImxvYWRpbmdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICdsb2FkaW5nJzogTG9hZGluZ1xyXG4gICAgfVxyXG5cclxuICAgIGFycmF5V2F0Y2ggKGFycikge1xyXG4gICAgICAgIGxldCBjb3VudCA9IDBcclxuICAgICAgICBmb3IgKGxldCBbaW5kZXgsIGl0ZW1dIG9mIGFyci5lbnRyaWVzKCkpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50KytcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY291bnQgPCAzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICAgIGFkZFRhZ1Nob3cgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJheVdhdGNoKHRoaXMucGFnZS50YWdMaXN0KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkRXhwU2hvdyAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFycmF5V2F0Y2godGhpcy5wYWdlLndvcmtMaXN0KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkRWR1U2hvdyAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFycmF5V2F0Y2godGhpcy5wYWdlLnNjaG9vbExpc3QpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgYmluZE5hbWUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLm5hbWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFNleCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2V4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRCaXJ0aCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuYmlydGhZZWFyID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRFZHUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmVkdWNhdGlvblR5cGUgPSB0aGlzLmJhc2UuZWR1W2UuZGV0YWlsLnZhbHVlXS52YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuZWR1Y2F0aW9uVHlwZU5hbWUgPSB0aGlzLmJhc2UuZWR1W2UuZGV0YWlsLnZhbHVlXS50ZXh0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRXhwIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5leHBlcmllbmNlVHlwZSA9IHRoaXMuYmFzZS5leHBbZS5kZXRhaWwudmFsdWVdLnZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5leHBlcmllbmNlVHlwZU5hbWUgPSB0aGlzLmJhc2UuZXhwW2UuZGV0YWlsLnZhbHVlXS50ZXh0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUGhvbmUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnRlbCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kU3RhdGUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLndvcmtTdGF0dXMgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEludHJvIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5pbnRybyA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kVHlwZSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY29tcGFueVR5cGUgPSB0aGlzLmJhc2UudHlwZVtlLmRldGFpbC52YWx1ZV0udmFsdWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNvbXBhbnlUeXBlTmFtZSA9IHRoaXMuYmFzZS50eXBlW2UuZGV0YWlsLnZhbHVlXS50ZXh0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kQ2l0eUNvbHVtbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwuY29sdW1uID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNpdHlbMV0gPSB0aGlzLmNpdHlbMF1bZS5kZXRhaWwudmFsdWVdLmNoaWxkcmVuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRDaXR5IChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2l0eUluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNpdHlOYW1lID0gdGhpcy5jaXR5WzFdW3RoaXMuY2l0eUluZGV4WzFdXS50ZXh0XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jaXR5SWQgPSB0aGlzLmNpdHlbMV1bdGhpcy5jaXR5SW5kZXhbMV1dLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kSm9iQ29sdW1uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmRldGFpbC5jb2x1bW4gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuam9iWzFdID0gdGhpcy5qb2JbMF1bZS5kZXRhaWwudmFsdWVdLmxpc3RcclxuICAgICAgICAgICAgICAgIHRoaXMuam9iWzJdID0gdGhpcy5qb2JbMF1bZS5kZXRhaWwudmFsdWVdLmxpc3RbMF0ud29ya0xpc3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwuY29sdW1uID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmpvYlsyXSA9IHRoaXMuam9iWzFdW2UuZGV0YWlsLnZhbHVlXS53b3JrTGlzdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kSm9iIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuam9iSW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uud29ya05hbWUgPSB0aGlzLmpvYlsyXVt0aGlzLmpvYkluZGV4WzJdXS5uYW1lXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5wYXJlbnRXb3JrQ2xhc3NJZCA9IHRoaXMuam9iWzBdW3RoaXMuam9iSW5kZXhbMF1dLmlkXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS53b3JrQ2xhc3NJZCA9IHRoaXMuam9iWzFdW3RoaXMuam9iSW5kZXhbMV1dLmlkXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS53b3JrSWQgPSB0aGlzLmpvYlsyXVt0aGlzLmpvYkluZGV4WzJdXS5pZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFNhbGFyeSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2FsYXJ5VHlwZSA9IHRoaXMuYmFzZS5zYWxhcnlbZS5kZXRhaWwudmFsdWVdLnZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5zYWxhcnlUeXBlTmFtZSA9IHRoaXMuYmFzZS5zYWxhcnlbZS5kZXRhaWwudmFsdWVdLnRleHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByZXZpZXcgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIFByZXZpZXcoaW5kZXgsIHRoaXMucGFnZS5zaG93VXJsKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVsSW1nIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2hvd1VybC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5vbGRTaG93VXJsLnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZEltZyAoKSB7XHJcbiAgICAgICAgICAgIENob29zZSgpLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQudGVtcEZpbGVzWzBdLnNpemUgPiAxMDI0KjEwMjQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2coJ+WbvueJh+i/h+WkpycpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2Uuc2hvd1VybC51bnNoaWZ0KHJldC50ZW1wRmlsZVBhdGhzWzBdKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgVXBsb2FkKHJldC50ZW1wRmlsZVBhdGhzWzBdLCA1KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2Uub2xkU2hvd1VybC5wdXNoKHJldC5kYXRhLmltYWdlTmFtZSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxUYWcgKGluZGV4LCBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01vZGFsKHtjb250ZW50OiAn5piv5ZCm5Yig6Zmk6K+l6K6k6K+BL+aKgOiDvSd9KVxyXG4gICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuaWQgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UudGFnTGlzdFtpbmRleF0uc3RhdHVzID0gJzAnXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS50YWdMaXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbEV4cCAoaW5kZXgsIGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TW9kYWwoe2NvbnRlbnQ6ICfmmK/lkKbliKDpmaTor6Xlt6XkvZzlsaXljoYnfSlcclxuICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmlkICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLndvcmtMaXN0W2luZGV4XS5zdGF0dXMgPSAnMCdcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLndvcmtMaXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbEVkdSAoaW5kZXgsIGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TW9kYWwoe2NvbnRlbnQ6ICfmmK/lkKbliKDpmaTor6Xlrabljobnu4/ljoYnfSlcclxuICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmlkICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLnNjaG9vbExpc3RbaW5kZXhdLnN0YXR1cyA9ICcwJ1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2Uuc2Nob29sTGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZGl0VGFnIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLnRhZ0xpc3QgPSB0aGlzLnBhZ2UudGFnTGlzdFxyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLnRhZ1VwZGF0ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdyZXN1bWUtdGFnP2dyYW5kSWQ9JyArIHRoaXMucGFnZS5wYXJlbnRXb3JrQ2xhc3NJZCArXHJcbiAgICAgICAgICAgICAgICAnJnBhcmVudElkPScgKyB0aGlzLnBhZ2Uud29ya0NsYXNzSWQgKyAnJmlkPScgKyB0aGlzLnBhZ2Uud29ya0lkICtcclxuICAgICAgICAgICAgICAgICcmaW5kZXg9JyArIGluZGV4ICsgJyZtc2c9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMucGFnZS50YWdMaXN0W2luZGV4XSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVkaXRFeHAgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwud29ya0xpc3QgPSB0aGlzLnBhZ2Uud29ya0xpc3RcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC53b3JrVXBkYXRlID0gZmFsc2VcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogJ3Jlc3VtZS1leHA/aW5kZXg9JyArIGluZGV4ICsgJyZtc2c9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMucGFnZS53b3JrTGlzdFtpbmRleF0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZGl0RWR1IChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLnNjaG9vbExpc3QgPSB0aGlzLnBhZ2Uuc2Nob29sTGlzdFxyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLnNjaG9vbFVwZGF0ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdyZXN1bWUtZWR1P2luZGV4PScgKyBpbmRleCArICcmbXNnPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnBhZ2Uuc2Nob29sTGlzdFtpbmRleF0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRUYWcgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLndvcmtJZCA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgbG9nKCfor7flhYjpgInmi6nmnJ/mnJvogYzkvY0nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC50YWdMaXN0ID0gdGhpcy5wYWdlLnRhZ0xpc3RcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC50YWdVcGRhdGUgPSBmYWxzZVxyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAncmVzdW1lLXRhZz9ncmFuZElkPScrIHRoaXMucGFnZS5wYXJlbnRXb3JrQ2xhc3NJZCArXHJcbiAgICAgICAgICAgICAgICAnJnBhcmVudElkPScgKyB0aGlzLnBhZ2Uud29ya0NsYXNzSWQgKyAnJmlkPScgKyB0aGlzLnBhZ2Uud29ya0lkXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRFeHAgKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLndvcmtMaXN0ID0gdGhpcy5wYWdlLndvcmtMaXN0XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwud29ya1VwZGF0ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdyZXN1bWUtZXhwJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkRWR1ICgpIHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5zY2hvb2xMaXN0ID0gdGhpcy5wYWdlLnNjaG9vbExpc3RcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5zY2hvb2xVcGRhdGUgPSBmYWxzZVxyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAncmVzdW1lLWVkdSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhbmNlbCAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01vZGFsKHtjb250ZW50OiAn56Gu5a6a5pS+5byD57yW6L6R566A5Y6G5ZCX77yfJ30pXHJcbiAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdXJlICgpIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5wYWdlLnVzZXJJZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS51c2VySWQgPSAnMjk0J1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuUG9zdCh0aGlzLnBhZ2UsICcvUmVzdW1lL3VwZGF0ZScpXHJcbiAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKGVycilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbC50YWdVcGRhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnRhZ0xpc3QgPSBbLi4udGhpcy4kcGFyZW50Lmdsb2JhbC50YWdMaXN0XVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbC53b3JrVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS53b3JrTGlzdCA9IFsuLi50aGlzLiRwYXJlbnQuZ2xvYmFsLndvcmtMaXN0XVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy4kcGFyZW50Lmdsb2JhbC5zY2hvb2xVcGRhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnNjaG9vbExpc3QgPSBbLi4udGhpcy4kcGFyZW50Lmdsb2JhbC5zY2hvb2xMaXN0XVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHBhcmFtcykge1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWVcclxuICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHsndXNlcklkJzogMjk0fSwgJy9SZXN1bWUvZ2V0SW5mb1NlbGYnKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlID0gZGF0YVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=