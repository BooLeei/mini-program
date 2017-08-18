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
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this6 = this;

            this.request.Get({ 'userId': this.userId }, '/Resume/getInfoSelf').then(function (_ref3) {
                var data = _ref3.data;

                _this6.page = data;
                _wepy2.default.stopPullDownRefresh();
                _this6.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this7 = this;

            this.loading = true;
            this.userId = params.id;
            this.request.Get({ 'userId': params.id }, '/Resume/getInfoSelf').then(function (_ref4) {
                var data = _ref4.data;

                _this7.page = data;
                _this7.loading = false;
                _this7.$apply();
            });
        }
    }]);

    return Resume;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Resume , 'pages/resume'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZS5qcyJdLCJuYW1lcyI6WyJSZXN1bWUiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInJlcXVlc3QiLCJzdG9yYWdlIiwiY2l0eSIsImdldFN0b3JhZ2VTeW5jIiwiam9iIiwiZGF0YSIsImxvYWRpbmciLCJwYWdlIiwicmVzdW1lSWQiLCJoZWFkZXJJbWFnZSIsImhlYWRlckltYWdlRnVsbCIsIm5hbWUiLCJzZXgiLCJjaXR5SWQiLCJiaXJ0aFllYXIiLCJlZHVjYXRpb25UeXBlIiwiZWR1Y2F0aW9uVHlwZU5hbWUiLCJleHBlcmllbmNlVHlwZSIsImV4cGVyaWVuY2VUeXBlTmFtZSIsInRlbCIsIndvcmtTdGF0dXMiLCJpbnRybyIsImNvbXBhbnlUeXBlIiwiY29tcGFueVR5cGVOYW1lIiwic2FsYXJ5VHlwZSIsInNhbGFyeVR5cGVOYW1lIiwicGFyZW50V29ya0NsYXNzSWQiLCJ3b3JrQ2xhc3NJZCIsIndvcmtJZCIsInRhZ0xpc3QiLCJ3b3JrTGlzdCIsInNjaG9vbExpc3QiLCJvbGRTaG93VXJsIiwic2hvd1VybCIsImpvYkluZGV4IiwiY2l0eUluZGV4IiwiYmFzZSIsImVkdSIsImV4cCIsImxldmVsIiwic3RhdGUiLCJ0eXBlIiwidmFsdWUiLCJ0ZXh0Iiwic2FsYXJ5IiwiY2hpbGRyZW4iLCJsaXN0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJ1c2VySWQiLCJjb21wdXRlZCIsImFkZFRhZ1Nob3ciLCJhcnJheVdhdGNoIiwiYWRkRXhwU2hvdyIsImFkZEVkdVNob3ciLCJtZXRob2RzIiwiYmluZE5hbWUiLCJlIiwiZGV0YWlsIiwiYmluZFNleCIsImJpbmRCaXJ0aCIsImJpbmRFZHUiLCJiaW5kRXhwIiwiYmluZFBob25lIiwiYmluZFN0YXRlIiwiYmluZEludHJvIiwiYmluZFR5cGUiLCJiaW5kQ2l0eUNvbHVtbiIsImNvbHVtbiIsImJpbmRDaXR5IiwiY2l0eU5hbWUiLCJiaW5kSm9iQ29sdW1uIiwiYmluZEpvYiIsIndvcmtOYW1lIiwiaWQiLCJiaW5kU2FsYXJ5IiwicHJldmlldyIsImluZGV4IiwiZGVsSW1nIiwic3BsaWNlIiwiYWRkSW1nIiwidGhlbiIsInJldCIsInRlbXBGaWxlcyIsInNpemUiLCJ1bnNoaWZ0IiwidGVtcEZpbGVQYXRocyIsIiRhcHBseSIsInB1c2giLCJpbWFnZU5hbWUiLCJkZWxUYWciLCJzaG93TW9kYWwiLCJjb250ZW50IiwidGFyZ2V0IiwiZGF0YXNldCIsInN0YXR1cyIsImRlbEV4cCIsImRlbEVkdSIsImVkaXRUYWciLCIkcGFyZW50IiwiZ2xvYmFsIiwidGFnVXBkYXRlIiwibmF2aWdhdGVUbyIsInVybCIsIkpTT04iLCJzdHJpbmdpZnkiLCJlZGl0RXhwIiwid29ya1VwZGF0ZSIsImVkaXRFZHUiLCJzY2hvb2xVcGRhdGUiLCJhZGRUYWciLCJhZGRFeHAiLCJhZGRFZHUiLCJjYW5jZWwiLCJuYXZpZ2F0ZUJhY2siLCJzdXJlIiwiUG9zdCIsImNhdGNoIiwiZXJyIiwidGl0bGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNhbmNlbENvbG9yIiwiY29uZmlybUNvbG9yIiwic3VjY2VzcyIsImNvbmZpcm0iLCJFcnJvciIsImZhaWwiLCJhcnIiLCJjb3VudCIsImVudHJpZXMiLCJpdGVtIiwiR2V0Iiwic3RvcFB1bGxEb3duUmVmcmVzaCIsInBhcmFtcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OzswTEFDakJDLE0sR0FBUztBQUNMQyxpQ0FBcUIsTUFEaEI7QUFFTEMsb0NBQXdCO0FBRm5CLFMsUUFLVEMsTyxHQUFVLHVCLFFBRVZDLE8sR0FBVTtBQUNOQyxrQkFBTSxlQUFLQyxjQUFMLENBQW9CLFFBQXBCLENBREE7QUFFTkMsaUJBQUssZUFBS0QsY0FBTCxDQUFvQixVQUFwQjtBQUZD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Sy9CLE9BQUwsQ0FBYXNJLEdBQWIsQ0FBaUIsRUFBQyxVQUFVLEtBQUtwRixNQUFoQixFQUFqQixFQUEwQyxxQkFBMUMsRUFDQ2dDLElBREQsQ0FDTSxpQkFBWTtBQUFBLG9CQUFWN0UsSUFBVSxTQUFWQSxJQUFVOztBQUNkLHVCQUFLRSxJQUFMLEdBQVlGLElBQVo7QUFDQSwrQkFBS2tJLG1CQUFMO0FBQ0EsdUJBQUsvQyxNQUFMO0FBQ0gsYUFMRDtBQU1IOzs7K0JBRU9nRCxNLEVBQVE7QUFBQTs7QUFDWixpQkFBS2xJLE9BQUwsR0FBZSxJQUFmO0FBQ0EsaUJBQUs0QyxNQUFMLEdBQWNzRixPQUFPN0QsRUFBckI7QUFDQSxpQkFBSzNFLE9BQUwsQ0FBYXNJLEdBQWIsQ0FBaUIsRUFBQyxVQUFVRSxPQUFPN0QsRUFBbEIsRUFBakIsRUFBd0MscUJBQXhDLEVBQ0NPLElBREQsQ0FDTSxpQkFBWTtBQUFBLG9CQUFWN0UsSUFBVSxTQUFWQSxJQUFVOztBQUNkLHVCQUFLRSxJQUFMLEdBQVlGLElBQVo7QUFDQSx1QkFBS0MsT0FBTCxHQUFlLEtBQWY7QUFDQSx1QkFBS2tGLE1BQUw7QUFDSCxhQUxEO0FBTUg7Ozs7RUF4YytCLGVBQUtqRixJOztrQkFBcEJYLE0iLCJmaWxlIjoicmVzdW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBMb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IHsgUHJldmlldywgQ2hvb3NlLCBVcGxvYWQgfSBmcm9tICcuLi91dGlscy9pbWFnZVV0aWxzJ1xyXG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzdW1lIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eugOWOhidcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG5cclxuICAgIHN0b3JhZ2UgPSB7XHJcbiAgICAgICAgY2l0eTogd2VweS5nZXRTdG9yYWdlU3luYygncmVnaW9uJyksXHJcbiAgICAgICAgam9iOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd3b3JrTGlzdCcpXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01vZGFsICh7dGl0bGUgPSAn5o+Q56S6JywgY29udGVudCA9ICfmmK/lkKbliKDpmaTor6XpgInpobknfSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxDb2xvcjogJyNkZGQnLFxyXG4gICAgICAgICAgICAgICAgY29uZmlybUNvbG9yOiAnIzQwYzRmZicsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXQuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCfngrnlh7vnoa7lrponKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0LmNhbmNlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCfnlKjmiLflj5bmtognKSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICBwYWdlOiB7XHJcbiAgICAgICAgICAgIC8vIHVzZXJJZDogd2VweS5nZXRTdG9yYWdlU3luYygndXNlcklkJyksXHJcbiAgICAgICAgICAgIHJlc3VtZUlkOiAnJyxcclxuICAgICAgICAgICAgaGVhZGVySW1hZ2U6ICcnLFxyXG4gICAgICAgICAgICBoZWFkZXJJbWFnZUZ1bGw6ICcnLFxyXG4gICAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgICAgc2V4OiAnJyxcclxuICAgICAgICAgICAgY2l0eUlkOiAnJyxcclxuICAgICAgICAgICAgYmlydGhZZWFyOiAnJyxcclxuICAgICAgICAgICAgZWR1Y2F0aW9uVHlwZTogJycsXHJcbiAgICAgICAgICAgIGVkdWNhdGlvblR5cGVOYW1lOiAnJyxcclxuICAgICAgICAgICAgZXhwZXJpZW5jZVR5cGU6ICcnLFxyXG4gICAgICAgICAgICBleHBlcmllbmNlVHlwZU5hbWU6ICcnLFxyXG4gICAgICAgICAgICB0ZWw6ICcnLFxyXG4gICAgICAgICAgICB3b3JrU3RhdHVzOiAnJyxcclxuICAgICAgICAgICAgaW50cm86ICcnLFxyXG4gICAgICAgICAgICBjb21wYW55VHlwZTogJycsXHJcbiAgICAgICAgICAgIGNvbXBhbnlUeXBlTmFtZTogJycsXHJcbiAgICAgICAgICAgIHNhbGFyeVR5cGU6ICcnLFxyXG4gICAgICAgICAgICBzYWxhcnlUeXBlTmFtZTogJycsXHJcbiAgICAgICAgICAgIHBhcmVudFdvcmtDbGFzc0lkOiAnJyxcclxuICAgICAgICAgICAgd29ya0NsYXNzSWQ6ICcnLFxyXG4gICAgICAgICAgICB3b3JrSWQ6ICcnLFxyXG4gICAgICAgICAgICB0YWdMaXN0OiBbXSxcclxuICAgICAgICAgICAgd29ya0xpc3Q6IFtdLFxyXG4gICAgICAgICAgICBzY2hvb2xMaXN0OiBbXSxcclxuICAgICAgICAgICAgb2xkU2hvd1VybDogW10sXHJcbiAgICAgICAgICAgIHNob3dVcmw6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBqb2JJbmRleDogWzAsIDAsIDBdLFxyXG4gICAgICAgIGNpdHlJbmRleDogWzAsIDBdLFxyXG4gICAgICAgIGJhc2U6IHtcclxuICAgICAgICAgICAgc2V4OiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMCxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICfnlLcnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMSxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICflpbMnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGVkdTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5aSn5LiTJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5pys56eRJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn56GV5aOrJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5Y2a5aOrJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5YW25LuWJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBleHA6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJzHlubTku6XkuIsnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMixcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICcxfjLlubQnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMyxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICczfjXlubQnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogNCxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICc2fjjlubQnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogNSxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICc4fjEw5bm0J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDYsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnMTDlubTku6XkuIonXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGxldmVsOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMSxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICfliJ3nuqcnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMixcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICfkuK3nuqcnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMyxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICfpq5jnuqcnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogNCxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICfotYTmt7EnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogNSxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICflr7zluIjnuqcnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHN0YXRlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMCxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICfnprvogYwnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMSxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICflnKjogYwnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHR5cGU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5L+x5LmQ6YOoJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICflt6XkvZzlrqQnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+eRnOS8vemmhidcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNCxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5pWZ6IKy5Z+56K6tJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA1LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICflmajmorDorr7lpIcnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDYsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+WqkuS9k+i1hOiurydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5Lya5bGV77yP5rS75Yqo77yP6LWb5LqLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA4LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfkupLogZTnvZEnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDksXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+WFtuS7lidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgc2FsYXJ5OiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzN+NUsnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzZ+OEsnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzl+MTJLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICcxM34xOEsnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzE5fjI1SydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnMjZ+MzBLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA3LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICczMX40MEsnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDgsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzQxfjUwSydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogOSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnNTBL5Lul5LiKJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaXR5OiBbdGhpcy5zdG9yYWdlLmNpdHksIHRoaXMuc3RvcmFnZS5jaXR5WzBdLmNoaWxkcmVuXSxcclxuICAgICAgICBqb2I6IFt0aGlzLnN0b3JhZ2Uuam9iLCB0aGlzLnN0b3JhZ2Uuam9iWzBdLmxpc3QsIHRoaXMuc3RvcmFnZS5qb2JbMF0ubGlzdFswXS53b3JrTGlzdF1cclxuICAgIH1cclxuXHJcbiAgICRwcm9wcyA9IHtcImxvYWRpbmdcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnNob3cuc3luY1wiOlwibG9hZGluZ1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgJ2xvYWRpbmcnOiBMb2FkaW5nXHJcbiAgICB9XHJcblxyXG4gICAgdXNlcklkID0gJydcclxuXHJcbiAgICBhcnJheVdhdGNoIChhcnIpIHtcclxuICAgICAgICBsZXQgY291bnQgPSAwXHJcbiAgICAgICAgZm9yIChsZXQgW2luZGV4LCBpdGVtXSBvZiBhcnIuZW50cmllcygpKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLnN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvdW50IDwgMykge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgICBhZGRUYWdTaG93ICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXlXYXRjaCh0aGlzLnBhZ2UudGFnTGlzdClcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZEV4cFNob3cgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJheVdhdGNoKHRoaXMucGFnZS53b3JrTGlzdClcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZEVkdVNob3cgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJheVdhdGNoKHRoaXMucGFnZS5zY2hvb2xMaXN0KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGJpbmROYW1lIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5uYW1lID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRTZXggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnNleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kQmlydGggKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmJpcnRoWWVhciA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRWR1IChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5lZHVjYXRpb25UeXBlID0gdGhpcy5iYXNlLmVkdVtlLmRldGFpbC52YWx1ZV0udmFsdWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmVkdWNhdGlvblR5cGVOYW1lID0gdGhpcy5iYXNlLmVkdVtlLmRldGFpbC52YWx1ZV0udGV4dFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEV4cCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuZXhwZXJpZW5jZVR5cGUgPSB0aGlzLmJhc2UuZXhwW2UuZGV0YWlsLnZhbHVlXS52YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuZXhwZXJpZW5jZVR5cGVOYW1lID0gdGhpcy5iYXNlLmV4cFtlLmRldGFpbC52YWx1ZV0udGV4dFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFBob25lIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS50ZWwgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFN0YXRlIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS53b3JrU3RhdHVzID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRJbnRybyAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuaW50cm8gPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFR5cGUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNvbXBhbnlUeXBlID0gdGhpcy5iYXNlLnR5cGVbZS5kZXRhaWwudmFsdWVdLnZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jb21wYW55VHlwZU5hbWUgPSB0aGlzLmJhc2UudHlwZVtlLmRldGFpbC52YWx1ZV0udGV4dFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZENpdHlDb2x1bW4gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUuZGV0YWlsLmNvbHVtbiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaXR5WzFdID0gdGhpcy5jaXR5WzBdW2UuZGV0YWlsLnZhbHVlXS5jaGlsZHJlblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kQ2l0eSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNpdHlJbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jaXR5TmFtZSA9IHRoaXMuY2l0eVsxXVt0aGlzLmNpdHlJbmRleFsxXV0udGV4dFxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY2l0eUlkID0gdGhpcy5jaXR5WzFdW3RoaXMuY2l0eUluZGV4WzFdXS52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEpvYkNvbHVtbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwuY29sdW1uID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmpvYlsxXSA9IHRoaXMuam9iWzBdW2UuZGV0YWlsLnZhbHVlXS5saXN0XHJcbiAgICAgICAgICAgICAgICB0aGlzLmpvYlsyXSA9IHRoaXMuam9iWzBdW2UuZGV0YWlsLnZhbHVlXS5saXN0WzBdLndvcmtMaXN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGUuZGV0YWlsLmNvbHVtbiA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5qb2JbMl0gPSB0aGlzLmpvYlsxXVtlLmRldGFpbC52YWx1ZV0ud29ya0xpc3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEpvYiAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmpvYkluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLndvcmtOYW1lID0gdGhpcy5qb2JbMl1bdGhpcy5qb2JJbmRleFsyXV0ubmFtZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UucGFyZW50V29ya0NsYXNzSWQgPSB0aGlzLmpvYlswXVt0aGlzLmpvYkluZGV4WzBdXS5pZFxyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uud29ya0NsYXNzSWQgPSB0aGlzLmpvYlsxXVt0aGlzLmpvYkluZGV4WzFdXS5pZFxyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uud29ya0lkID0gdGhpcy5qb2JbMl1bdGhpcy5qb2JJbmRleFsyXV0uaWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRTYWxhcnkgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnNhbGFyeVR5cGUgPSB0aGlzLmJhc2Uuc2FsYXJ5W2UuZGV0YWlsLnZhbHVlXS52YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2FsYXJ5VHlwZU5hbWUgPSB0aGlzLmJhc2Uuc2FsYXJ5W2UuZGV0YWlsLnZhbHVlXS50ZXh0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcmV2aWV3IChpbmRleCkge1xyXG4gICAgICAgICAgICBQcmV2aWV3KGluZGV4LCB0aGlzLnBhZ2Uuc2hvd1VybClcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbEltZyAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnNob3dVcmwuc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uub2xkU2hvd1VybC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRJbWcgKCkge1xyXG4gICAgICAgICAgICBDaG9vc2UoKS50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0LnRlbXBGaWxlc1swXS5zaXplID4gMTAyNCoxMDI0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nKCflm77niYfov4flpKcnKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlLnNob3dVcmwudW5zaGlmdChyZXQudGVtcEZpbGVQYXRoc1swXSlcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgICAgICAgIFVwbG9hZChyZXQudGVtcEZpbGVQYXRoc1swXSwgNSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLm9sZFNob3dVcmwucHVzaChyZXQuZGF0YS5pbWFnZU5hbWUpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVsVGFnIChpbmRleCwgZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNb2RhbCh7Y29udGVudDogJ+aYr+WQpuWIoOmZpOivpeiupOivgS/mioDog70nfSlcclxuICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LmlkICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLnRhZ0xpc3RbaW5kZXhdLnN0YXR1cyA9ICcwJ1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UudGFnTGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxFeHAgKGluZGV4LCBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01vZGFsKHtjb250ZW50OiAn5piv5ZCm5Yig6Zmk6K+l5bel5L2c5bGl5Y6GJ30pXHJcbiAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5pZCAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS53b3JrTGlzdFtpbmRleF0uc3RhdHVzID0gJzAnXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS53b3JrTGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxFZHUgKGluZGV4LCBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01vZGFsKHtjb250ZW50OiAn5piv5ZCm5Yig6Zmk6K+l5a2m5Y6G57uP5Y6GJ30pXHJcbiAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5pZCAhPSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZS5zY2hvb2xMaXN0W2luZGV4XS5zdGF0dXMgPSAnMCdcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlLnNjaG9vbExpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWRpdFRhZyAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC50YWdMaXN0ID0gdGhpcy5wYWdlLnRhZ0xpc3RcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC50YWdVcGRhdGUgPSBmYWxzZVxyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAncmVzdW1lLXRhZz9ncmFuZElkPScgKyB0aGlzLnBhZ2UucGFyZW50V29ya0NsYXNzSWQgK1xyXG4gICAgICAgICAgICAgICAgJyZwYXJlbnRJZD0nICsgdGhpcy5wYWdlLndvcmtDbGFzc0lkICsgJyZpZD0nICsgdGhpcy5wYWdlLndvcmtJZCArXHJcbiAgICAgICAgICAgICAgICAnJmluZGV4PScgKyBpbmRleCArICcmbXNnPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnBhZ2UudGFnTGlzdFtpbmRleF0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlZGl0RXhwIChpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLndvcmtMaXN0ID0gdGhpcy5wYWdlLndvcmtMaXN0XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwud29ya1VwZGF0ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdyZXN1bWUtZXhwP2luZGV4PScgKyBpbmRleCArICcmbXNnPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnBhZ2Uud29ya0xpc3RbaW5kZXhdKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWRpdEVkdSAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5zY2hvb2xMaXN0ID0gdGhpcy5wYWdlLnNjaG9vbExpc3RcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC5zY2hvb2xVcGRhdGUgPSBmYWxzZVxyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAncmVzdW1lLWVkdT9pbmRleD0nICsgaW5kZXggKyAnJm1zZz0nICsgSlNPTi5zdHJpbmdpZnkodGhpcy5wYWdlLnNjaG9vbExpc3RbaW5kZXhdKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkVGFnICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZS53b3JrSWQgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGxvZygn6K+35YWI6YCJ5oup5pyf5pyb6IGM5L2NJylcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwudGFnTGlzdCA9IHRoaXMucGFnZS50YWdMaXN0XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwudGFnVXBkYXRlID0gZmFsc2VcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogJ3Jlc3VtZS10YWc/Z3JhbmRJZD0nKyB0aGlzLnBhZ2UucGFyZW50V29ya0NsYXNzSWQgK1xyXG4gICAgICAgICAgICAgICAgJyZwYXJlbnRJZD0nICsgdGhpcy5wYWdlLndvcmtDbGFzc0lkICsgJyZpZD0nICsgdGhpcy5wYWdlLndvcmtJZFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkRXhwICgpIHtcclxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbC53b3JrTGlzdCA9IHRoaXMucGFnZS53b3JrTGlzdFxyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLndvcmtVcGRhdGUgPSBmYWxzZVxyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAncmVzdW1lLWV4cCdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZEVkdSAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuc2Nob29sTGlzdCA9IHRoaXMucGFnZS5zY2hvb2xMaXN0XHJcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5nbG9iYWwuc2Nob29sVXBkYXRlID0gZmFsc2VcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogJ3Jlc3VtZS1lZHUnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYW5jZWwgKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNb2RhbCh7Y29udGVudDogJ+ehruWumuaUvuW8g+e8lui+keeugOWOhuWQl++8nyd9KVxyXG4gICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VyZSAoKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMucGFnZS51c2VySWQgPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UudXNlcklkID0gdGhpcy51c2VySWRcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LlBvc3QodGhpcy5wYWdlLCAnL1Jlc3VtZS91cGRhdGUnKVxyXG4gICAgICAgICAgICAudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGxvZyhlcnIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdyAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWwudGFnVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS50YWdMaXN0ID0gWy4uLnRoaXMuJHBhcmVudC5nbG9iYWwudGFnTGlzdF1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWwud29ya1VwZGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uud29ya0xpc3QgPSBbLi4udGhpcy4kcGFyZW50Lmdsb2JhbC53b3JrTGlzdF1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5nbG9iYWwuc2Nob29sVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5zY2hvb2xMaXN0ID0gWy4uLnRoaXMuJHBhcmVudC5nbG9iYWwuc2Nob29sTGlzdF1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25QdWxsRG93blJlZnJlc2ggKCkge1xyXG4gICAgICAgIHRoaXMucmVxdWVzdC5HZXQoeyd1c2VySWQnOiB0aGlzLnVzZXJJZH0sICcvUmVzdW1lL2dldEluZm9TZWxmJylcclxuICAgICAgICAudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IGRhdGFcclxuICAgICAgICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKClcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkIChwYXJhbXMpIHtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXHJcbiAgICAgICAgdGhpcy51c2VySWQgPSBwYXJhbXMuaWRcclxuICAgICAgICB0aGlzLnJlcXVlc3QuR2V0KHsndXNlcklkJzogcGFyYW1zLmlkfSwgJy9SZXN1bWUvZ2V0SW5mb1NlbGYnKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlID0gZGF0YVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=