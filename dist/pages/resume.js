'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

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
        }, _this.components = {
            'loading': _loading2.default,
            'toast': _toast2.default
        }, _this.userId = '', _this.computed = {
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
                this.page.userId = this.userId;
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
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this6 = this;

            _wepy2.default.onSocketMessage(function (res) {
                _this6.$parent.global.curVal = Number.parseInt(_this6.$parent.global.curVal) + 1;
                _this6.toast({ content: '您有新消息' });
            });
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
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this7 = this;

            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            this.request.Get({ 'userId': this.userId }, '/Resume/getInfoSelf').then(function (_ref3) {
                var data = _ref3.data;

                _this7.page = data;
                _this7.$apply();
                _wepy2.default.stopPullDownRefresh();
                _wepy2.default.hideLoading();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this8 = this;

            // this.loading = true
            _wepy2.default.showLoading({ title: '加载中...', mask: true });
            this.userId = params.id;
            this.request.Get({ 'userId': params.id }, '/Resume/getInfoSelf').then(function (_ref4) {
                var data = _ref4.data;

                _this8.page = data;
                // this.loading = false
                _wepy2.default.hideLoading();
                _this8.$apply();
            });
        }
    }]);

    return Resume;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Resume , 'pages/resume'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZS5qcyJdLCJuYW1lcyI6WyJSZXN1bWUiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInJlcXVlc3QiLCJzdG9yYWdlIiwiY2l0eSIsImdldFN0b3JhZ2VTeW5jIiwiam9iIiwiZGF0YSIsImxvYWRpbmciLCJwYWdlIiwicmVzdW1lSWQiLCJoZWFkZXJJbWFnZSIsImhlYWRlckltYWdlRnVsbCIsIm5hbWUiLCJzZXgiLCJjaXR5SWQiLCJiaXJ0aFllYXIiLCJlZHVjYXRpb25UeXBlIiwiZWR1Y2F0aW9uVHlwZU5hbWUiLCJleHBlcmllbmNlVHlwZSIsImV4cGVyaWVuY2VUeXBlTmFtZSIsInRlbCIsIndvcmtTdGF0dXMiLCJpbnRybyIsImNvbXBhbnlUeXBlIiwiY29tcGFueVR5cGVOYW1lIiwic2FsYXJ5VHlwZSIsInNhbGFyeVR5cGVOYW1lIiwicGFyZW50V29ya0NsYXNzSWQiLCJ3b3JrQ2xhc3NJZCIsIndvcmtJZCIsInRhZ0xpc3QiLCJ3b3JrTGlzdCIsInNjaG9vbExpc3QiLCJvbGRTaG93VXJsIiwic2hvd1VybCIsImpvYkluZGV4IiwiY2l0eUluZGV4IiwiYmFzZSIsImVkdSIsImV4cCIsImxldmVsIiwic3RhdGUiLCJ0eXBlIiwidmFsdWUiLCJ0ZXh0Iiwic2FsYXJ5IiwiY2hpbGRyZW4iLCJsaXN0IiwiY29tcG9uZW50cyIsInVzZXJJZCIsImNvbXB1dGVkIiwiYWRkVGFnU2hvdyIsImFycmF5V2F0Y2giLCJhZGRFeHBTaG93IiwiYWRkRWR1U2hvdyIsIm1ldGhvZHMiLCJiaW5kTmFtZSIsImUiLCJkZXRhaWwiLCJiaW5kU2V4IiwiYmluZEJpcnRoIiwiYmluZEVkdSIsImJpbmRFeHAiLCJiaW5kUGhvbmUiLCJiaW5kU3RhdGUiLCJiaW5kSW50cm8iLCJiaW5kVHlwZSIsImJpbmRDaXR5Q29sdW1uIiwiY29sdW1uIiwiYmluZENpdHkiLCJjaXR5TmFtZSIsImJpbmRKb2JDb2x1bW4iLCJiaW5kSm9iIiwid29ya05hbWUiLCJpZCIsImJpbmRTYWxhcnkiLCJwcmV2aWV3IiwiaW5kZXgiLCJkZWxJbWciLCJzcGxpY2UiLCJhZGRJbWciLCJ0aGVuIiwicmV0IiwidGVtcEZpbGVzIiwic2l6ZSIsInVuc2hpZnQiLCJ0ZW1wRmlsZVBhdGhzIiwiJGFwcGx5IiwicHVzaCIsImltYWdlTmFtZSIsImRlbFRhZyIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJ0YXJnZXQiLCJkYXRhc2V0Iiwic3RhdHVzIiwiZGVsRXhwIiwiZGVsRWR1IiwiZWRpdFRhZyIsIiRwYXJlbnQiLCJnbG9iYWwiLCJ0YWdVcGRhdGUiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiSlNPTiIsInN0cmluZ2lmeSIsImVkaXRFeHAiLCJ3b3JrVXBkYXRlIiwiZWRpdEVkdSIsInNjaG9vbFVwZGF0ZSIsImFkZFRhZyIsImFkZEV4cCIsImFkZEVkdSIsImNhbmNlbCIsIm5hdmlnYXRlQmFjayIsInN1cmUiLCJQb3N0IiwiY2F0Y2giLCJlcnIiLCJ0aXRsZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2FuY2VsQ29sb3IiLCJjb25maXJtQ29sb3IiLCJzdWNjZXNzIiwiY29uZmlybSIsIkVycm9yIiwiZmFpbCIsImFyciIsImNvdW50IiwiZW50cmllcyIsIml0ZW0iLCIkaW52b2tlIiwib25Tb2NrZXRNZXNzYWdlIiwiY3VyVmFsIiwiTnVtYmVyIiwicGFyc2VJbnQiLCJ0b2FzdCIsInNob3dMb2FkaW5nIiwibWFzayIsIkdldCIsInN0b3BQdWxsRG93blJlZnJlc2giLCJoaWRlTG9hZGluZyIsInBhcmFtcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7OzBMQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0I7QUFGbkIsUyxRQUtUQyxPLEdBQVUsdUIsUUFF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QSx1QkFBS3hELE1BQUw7QUFDSCxhQU5EO0FBT0g7Ozs7RUFuZCtCLGVBQUsvRSxJOztrQkFBcEJYLE0iLCJmaWxlIjoicmVzdW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBUb2FzdCBmcm9tICcuLi9jb21wb25lbnRzL3RvYXN0J1xyXG5pbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCB7IFByZXZpZXcsIENob29zZSwgVXBsb2FkIH0gZnJvbSAnLi4vdXRpbHMvaW1hZ2VVdGlscydcclxuaW1wb3J0IHtsb2d9IGZyb20gJy4uL3V0aWxzL2xvZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3VtZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnroDljoYnXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICBzdG9yYWdlID0ge1xyXG4gICAgICAgIGNpdHk6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3JlZ2lvbicpLFxyXG4gICAgICAgIGpvYjogd2VweS5nZXRTdG9yYWdlU3luYygnd29ya0xpc3QnKVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNb2RhbCAoe3RpdGxlID0gJ+aPkOekuicsIGNvbnRlbnQgPSAn5piv5ZCm5Yig6Zmk6K+l6YCJ6aG5J30pIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQ29sb3I6ICcjZGRkJyxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1Db2xvcjogJyM0MGM0ZmYnLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0LmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgn54K55Ye756Gu5a6aJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldC5jYW5jZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcign55So5oi35Y+W5raIJykpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgcGFnZToge1xyXG4gICAgICAgICAgICAvLyB1c2VySWQ6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpLFxyXG4gICAgICAgICAgICByZXN1bWVJZDogJycsXHJcbiAgICAgICAgICAgIGhlYWRlckltYWdlOiAnJyxcclxuICAgICAgICAgICAgaGVhZGVySW1hZ2VGdWxsOiAnJyxcclxuICAgICAgICAgICAgbmFtZTogJycsXHJcbiAgICAgICAgICAgIHNleDogJycsXHJcbiAgICAgICAgICAgIGNpdHlJZDogJycsXHJcbiAgICAgICAgICAgIGJpcnRoWWVhcjogJycsXHJcbiAgICAgICAgICAgIGVkdWNhdGlvblR5cGU6ICcnLFxyXG4gICAgICAgICAgICBlZHVjYXRpb25UeXBlTmFtZTogJycsXHJcbiAgICAgICAgICAgIGV4cGVyaWVuY2VUeXBlOiAnJyxcclxuICAgICAgICAgICAgZXhwZXJpZW5jZVR5cGVOYW1lOiAnJyxcclxuICAgICAgICAgICAgdGVsOiAnJyxcclxuICAgICAgICAgICAgd29ya1N0YXR1czogJycsXHJcbiAgICAgICAgICAgIGludHJvOiAnJyxcclxuICAgICAgICAgICAgY29tcGFueVR5cGU6ICcnLFxyXG4gICAgICAgICAgICBjb21wYW55VHlwZU5hbWU6ICcnLFxyXG4gICAgICAgICAgICBzYWxhcnlUeXBlOiAnJyxcclxuICAgICAgICAgICAgc2FsYXJ5VHlwZU5hbWU6ICcnLFxyXG4gICAgICAgICAgICBwYXJlbnRXb3JrQ2xhc3NJZDogJycsXHJcbiAgICAgICAgICAgIHdvcmtDbGFzc0lkOiAnJyxcclxuICAgICAgICAgICAgd29ya0lkOiAnJyxcclxuICAgICAgICAgICAgdGFnTGlzdDogW10sXHJcbiAgICAgICAgICAgIHdvcmtMaXN0OiBbXSxcclxuICAgICAgICAgICAgc2Nob29sTGlzdDogW10sXHJcbiAgICAgICAgICAgIG9sZFNob3dVcmw6IFtdLFxyXG4gICAgICAgICAgICBzaG93VXJsOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgam9iSW5kZXg6IFswLCAwLCAwXSxcclxuICAgICAgICBjaXR5SW5kZXg6IFswLCAwXSxcclxuICAgICAgICBiYXNlOiB7XHJcbiAgICAgICAgICAgIHNleDogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn55S3J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5aWzJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBlZHU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+Wkp+S4kydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+acrOenkSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA0LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+ehleWjqydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WNmuWjqydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WFtuS7lidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgZXhwOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMSxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICcx5bm05Lul5LiLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnMX4y5bm0J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnM3415bm0J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnNn445bm0J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnOH4xMOW5tCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJzEw5bm05Lul5LiKJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBsZXZlbDogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5Yid57qnJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5Lit57qnJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn6auY57qnJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn6LWE5rexJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5a+85biI57qnJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBzdGF0ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn56a76IGMJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5Zyo6IGMJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB0eXBlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+S/seS5kOmDqCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5bel5L2c5a6kJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfnkZzkvL3ppoYnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+aVmeiCsuWfueiurSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5Zmo5qKw6K6+5aSHJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICflqpLkvZPotYTorq8nXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+S8muWxle+8j+a0u+WKqO+8j+i1m+S6iydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogOCxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5LqS6IGU572RJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICflhbbku5YnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHNhbGFyeTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICczfjVLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICc2fjhLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICc5fjEySydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNCxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnMTN+MThLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA1LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICcxOX4yNUsnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDYsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzI2fjMwSydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnMzF+NDBLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA4LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICc0MX41MEsnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDksXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzUwS+S7peS4iidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2l0eTogW3RoaXMuc3RvcmFnZS5jaXR5LCB0aGlzLnN0b3JhZ2UuY2l0eVswXS5jaGlsZHJlbl0sXHJcbiAgICAgICAgam9iOiBbdGhpcy5zdG9yYWdlLmpvYiwgdGhpcy5zdG9yYWdlLmpvYlswXS5saXN0LCB0aGlzLnN0b3JhZ2Uuam9iWzBdLmxpc3RbMF0ud29ya0xpc3RdXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgICAnbG9hZGluZyc6IExvYWRpbmcsXHJcbiAgICAgICAgJ3RvYXN0JzogVG9hc3RcclxuICAgIH1cclxuXHJcbiAgICB1c2VySWQgPSAnJ1xyXG5cclxuICAgIGFycmF5V2F0Y2ggKGFycikge1xyXG4gICAgICAgIGxldCBjb3VudCA9IDBcclxuICAgICAgICBmb3IgKGxldCBbaW5kZXgsIGl0ZW1dIG9mIGFyci5lbnRyaWVzKCkpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50KytcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY291bnQgPCAzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICAgIGFkZFRhZ1Nob3cgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJheVdhdGNoKHRoaXMucGFnZS50YWdMaXN0KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkRXhwU2hvdyAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFycmF5V2F0Y2godGhpcy5wYWdlLndvcmtMaXN0KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkRWR1U2hvdyAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFycmF5V2F0Y2godGhpcy5wYWdlLnNjaG9vbExpc3QpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgYmluZE5hbWUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLm5hbWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFNleCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2V4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRCaXJ0aCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuYmlydGhZZWFyID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRFZHUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmVkdWNhdGlvblR5cGUgPSB0aGlzLmJhc2UuZWR1W2UuZGV0YWlsLnZhbHVlXS52YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuZWR1Y2F0aW9uVHlwZU5hbWUgPSB0aGlzLmJhc2UuZWR1W2UuZGV0YWlsLnZhbHVlXS50ZXh0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRXhwIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5leHBlcmllbmNlVHlwZSA9IHRoaXMuYmFzZS5leHBbZS5kZXRhaWwudmFsdWVdLnZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5leHBlcmllbmNlVHlwZU5hbWUgPSB0aGlzLmJhc2UuZXhwW2UuZGV0YWlsLnZhbHVlXS50ZXh0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUGhvbmUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnRlbCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kU3RhdGUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLndvcmtTdGF0dXMgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEludHJvIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5pbnRybyA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kVHlwZSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY29tcGFueVR5cGUgPSB0aGlzLmJhc2UudHlwZVtlLmRldGFpbC52YWx1ZV0udmFsdWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNvbXBhbnlUeXBlTmFtZSA9IHRoaXMuYmFzZS50eXBlW2UuZGV0YWlsLnZhbHVlXS50ZXh0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kQ2l0eUNvbHVtbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwuY29sdW1uID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNpdHlbMV0gPSB0aGlzLmNpdHlbMF1bZS5kZXRhaWwudmFsdWVdLmNoaWxkcmVuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRDaXR5IChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2l0eUluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNpdHlOYW1lID0gdGhpcy5jaXR5WzFdW3RoaXMuY2l0eUluZGV4WzFdXS50ZXh0XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jaXR5SWQgPSB0aGlzLmNpdHlbMV1bdGhpcy5jaXR5SW5kZXhbMV1dLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kSm9iQ29sdW1uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmRldGFpbC5jb2x1bW4gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuam9iWzFdID0gdGhpcy5qb2JbMF1bZS5kZXRhaWwudmFsdWVdLmxpc3RcclxuICAgICAgICAgICAgICAgIHRoaXMuam9iWzJdID0gdGhpcy5qb2JbMF1bZS5kZXRhaWwudmFsdWVdLmxpc3RbMF0ud29ya0xpc3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwuY29sdW1uID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmpvYlsyXSA9IHRoaXMuam9iWzFdW2UuZGV0YWlsLnZhbHVlXS53b3JrTGlzdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kSm9iIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuam9iSW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uud29ya05hbWUgPSB0aGlzLmpvYlsyXVt0aGlzLmpvYkluZGV4WzJdXS5uYW1lXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5wYXJlbnRXb3JrQ2xhc3NJZCA9IHRoaXMuam9iWzBdW3RoaXMuam9iSW5kZXhbMF1dLmlkXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS53b3JrQ2xhc3NJZCA9IHRoaXMuam9iWzFdW3RoaXMuam9iSW5kZXhbMV1dLmlkXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS53b3JrSWQgPSB0aGlzLmpvYlsyXVt0aGlzLmpvYkluZGV4WzJdXS5pZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFNhbGFyeSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2FsYXJ5VHlwZSA9IHRoaXMuYmFzZS5zYWxhcnlbZS5kZXRhaWwudmFsdWVdLnZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5zYWxhcnlUeXBlTmFtZSA9IHRoaXMuYmFzZS5zYWxhcnlbZS5kZXRhaWwudmFsdWVdLnRleHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByZXZpZXcgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIFByZXZpZXcoaW5kZXgsIHRoaXMucGFnZS5zaG93VXJsKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVsSW1nIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2hvd1VybC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5vbGRTaG93VXJsLnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZEltZyAoKSB7XHJcbiAgICAgICAgICAgIENob29zZSgpLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQudGVtcEZpbGVzWzBdLnNpemUgPiAxMDI0KjEwMjQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2coJ+WbvueJh+i/h+WkpycpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2Uuc2hvd1VybC51bnNoaWZ0KHJldC50ZW1wRmlsZVBhdGhzWzBdKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgVXBsb2FkKHJldC50ZW1wRmlsZVBhdGhzWzBdLCA1KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2Uub2xkU2hvd1VybC5wdXNoKHJldC5kYXRhLmltYWdlTmFtZSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxUYWcgKGluZGV4LCBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01vZGFsKHtjb250ZW50OiAn5piv5ZCm5Yig6Zmk6K+l6K6k6K+BL+aKgOiDvSd9KVxyXG4gICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQuaWQgIT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UudGFnTGlzdFtpbmRleF0uc3RhdHVzID0gJzAnXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS50YWdMaXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbEV4cCAoaW5kZXgsIGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TW9kYWwoe2NvbnRlbnQ6ICfmmK/lkKbliKDpmaTor6Xlt6XkvZzlsaXljoYnfSlcclxuICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmlkICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLndvcmtMaXN0W2luZGV4XS5zdGF0dXMgPSAnMCdcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLndvcmtMaXN0LnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbEVkdSAoaW5kZXgsIGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93TW9kYWwoe2NvbnRlbnQ6ICfmmK/lkKbliKDpmaTor6Xlrabljobnu4/ljoYnfSlcclxuICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmlkICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLnNjaG9vbExpc3RbaW5kZXhdLnN0YXR1cyA9ICcwJ1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2Uuc2Nob29sTGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZGl0VGFnIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLnRhZ0xpc3QgPSB0aGlzLnBhZ2UudGFnTGlzdFxyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLnRhZ1VwZGF0ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdyZXN1bWUtdGFnP2dyYW5kSWQ9JyArIHRoaXMucGFnZS5wYXJlbnRXb3JrQ2xhc3NJZCArXHJcbiAgICAgICAgICAgICAgICAnJnBhcmVudElkPScgKyB0aGlzLnBhZ2Uud29ya0NsYXNzSWQgKyAnJmlkPScgKyB0aGlzLnBhZ2Uud29ya0lkICtcclxuICAgICAgICAgICAgICAgICcmaW5kZXg9JyArIGluZGV4ICsgJyZtc2c9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMucGFnZS50YWdMaXN0W2luZGV4XSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVkaXRFeHAgKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwud29ya0xpc3QgPSB0aGlzLnBhZ2Uud29ya0xpc3RcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC53b3JrVXBkYXRlID0gZmFsc2VcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogJ3Jlc3VtZS1leHA/aW5kZXg9JyArIGluZGV4ICsgJyZtc2c9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMucGFnZS53b3JrTGlzdFtpbmRleF0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZGl0RWR1IChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLnNjaG9vbExpc3QgPSB0aGlzLnBhZ2Uuc2Nob29sTGlzdFxyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLnNjaG9vbFVwZGF0ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdyZXN1bWUtZWR1P2luZGV4PScgKyBpbmRleCArICcmbXNnPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnBhZ2Uuc2Nob29sTGlzdFtpbmRleF0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRUYWcgKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlLndvcmtJZCA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgbG9nKCfor7flhYjpgInmi6nmnJ/mnJvogYzkvY0nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC50YWdMaXN0ID0gdGhpcy5wYWdlLnRhZ0xpc3RcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC50YWdVcGRhdGUgPSBmYWxzZVxyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAncmVzdW1lLXRhZz9ncmFuZElkPScrIHRoaXMucGFnZS5wYXJlbnRXb3JrQ2xhc3NJZCArXHJcbiAgICAgICAgICAgICAgICAnJnBhcmVudElkPScgKyB0aGlzLnBhZ2Uud29ya0NsYXNzSWQgKyAnJmlkPScgKyB0aGlzLnBhZ2Uud29ya0lkXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRFeHAgKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLndvcmtMaXN0ID0gdGhpcy5wYWdlLndvcmtMaXN0XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwud29ya1VwZGF0ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdyZXN1bWUtZXhwJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkRWR1ICgpIHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5zY2hvb2xMaXN0ID0gdGhpcy5wYWdlLnNjaG9vbExpc3RcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5zY2hvb2xVcGRhdGUgPSBmYWxzZVxyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAncmVzdW1lLWVkdSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhbmNlbCAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01vZGFsKHtjb250ZW50OiAn56Gu5a6a5pS+5byD57yW6L6R566A5Y6G5ZCX77yfJ30pXHJcbiAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdXJlICgpIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5wYWdlLnVzZXJJZCA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS51c2VySWQgPSB0aGlzLnVzZXJJZFxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QuUG9zdCh0aGlzLnBhZ2UsICcvUmVzdW1lL3VwZGF0ZScpXHJcbiAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9nKGVycilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG9hc3QgKGRhdGEgPSB7fSkge1xyXG4gICAgICAgIHRoaXMuJGludm9rZSgndG9hc3QnLCAnc2hvd1RvYXN0JywgZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICAgIHdlcHkub25Tb2NrZXRNZXNzYWdlKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsID0gTnVtYmVyLnBhcnNlSW50KHRoaXMuJHBhcmVudC5nbG9iYWwuY3VyVmFsKSArIDFcclxuICAgICAgICAgICAgdGhpcy50b2FzdCh7Y29udGVudDogJ+aCqOacieaWsOa2iOaBryd9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWwudGFnVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS50YWdMaXN0ID0gWy4uLnRoaXMuJHBhcmVudC5nbG9iYWwudGFnTGlzdF1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWwud29ya1VwZGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uud29ya0xpc3QgPSBbLi4udGhpcy4kcGFyZW50Lmdsb2JhbC53b3JrTGlzdF1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWwuc2Nob29sVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5zY2hvb2xMaXN0ID0gWy4uLnRoaXMuJHBhcmVudC5nbG9iYWwuc2Nob29sTGlzdF1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJywgbWFzazogdHJ1ZX0pXHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0LkdldCh7J3VzZXJJZCc6IHRoaXMudXNlcklkfSwgJy9SZXN1bWUvZ2V0SW5mb1NlbGYnKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlID0gZGF0YVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkIChwYXJhbXMpIHtcclxuICAgICAgICAvLyB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICAgICAgd2VweS5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0uLi4nLCBtYXNrOiB0cnVlfSlcclxuICAgICAgICB0aGlzLnVzZXJJZCA9IHBhcmFtcy5pZFxyXG4gICAgICAgIHRoaXMucmVxdWVzdC5HZXQoeyd1c2VySWQnOiBwYXJhbXMuaWR9LCAnL1Jlc3VtZS9nZXRJbmZvU2VsZicpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBkYXRhXHJcbiAgICAgICAgICAgIC8vIHRoaXMubG9hZGluZyA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=