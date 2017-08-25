'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _toast = require('./../components/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleResume = function (_wepy$page) {
    _inherits(SimpleResume, _wepy$page);

    function SimpleResume() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SimpleResume);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SimpleResume.__proto__ || Object.getPrototypeOf(SimpleResume)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '简历',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.request = new _request2.default(), _this.storage = {
            city: _wepy2.default.getStorageSync('region'),
            job: _wepy2.default.getStorageSync('workList')
        }, _this.data = {
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
            'toast': _toast2.default
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
            cancel: function cancel() {
                this.showModal({ content: '确定放弃编辑简历吗？' }).then(function (ret) {
                    _wepy2.default.reLaunch({ url: './jobs' });
                });
            },
            sure: function sure() {
                // this.page.userId = wepy.getStorageSync('userId')
                this.page.userId = '294';
                this.request.Post(this.page, '/Resume/update').then(function (ret) {
                    _wepy2.default.navigateBack();
                }).catch(function (err) {
                    log(err);
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SimpleResume, [{
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
        key: 'toast',
        value: function toast() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.$invoke('toast', 'showToast', data);
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this2 = this;

            _wepy2.default.onSocketMessage(function (res) {
                _this2.$parent.global.curVal = Number.parseInt(_this2.$parent.global.curVal) + 1;
                _this2.toast({ content: '您有新消息' });
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            this.userId = params.id;
        }
    }]);

    return SimpleResume;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(SimpleResume , 'pages/simpleResume'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpbXBsZVJlc3VtZS5qcyJdLCJuYW1lcyI6WyJTaW1wbGVSZXN1bWUiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRpc2FibGVTY3JvbGwiLCJyZXF1ZXN0Iiwic3RvcmFnZSIsImNpdHkiLCJnZXRTdG9yYWdlU3luYyIsImpvYiIsImRhdGEiLCJwYWdlIiwicmVzdW1lSWQiLCJoZWFkZXJJbWFnZSIsImhlYWRlckltYWdlRnVsbCIsIm5hbWUiLCJzZXgiLCJjaXR5SWQiLCJiaXJ0aFllYXIiLCJlZHVjYXRpb25UeXBlIiwiZWR1Y2F0aW9uVHlwZU5hbWUiLCJleHBlcmllbmNlVHlwZSIsImV4cGVyaWVuY2VUeXBlTmFtZSIsInRlbCIsIndvcmtTdGF0dXMiLCJpbnRybyIsImNvbXBhbnlUeXBlIiwiY29tcGFueVR5cGVOYW1lIiwic2FsYXJ5VHlwZSIsInNhbGFyeVR5cGVOYW1lIiwicGFyZW50V29ya0NsYXNzSWQiLCJ3b3JrQ2xhc3NJZCIsIndvcmtJZCIsInRhZ0xpc3QiLCJ3b3JrTGlzdCIsInNjaG9vbExpc3QiLCJvbGRTaG93VXJsIiwic2hvd1VybCIsImpvYkluZGV4IiwiY2l0eUluZGV4IiwiYmFzZSIsImVkdSIsImV4cCIsImxldmVsIiwic3RhdGUiLCJ0eXBlIiwidmFsdWUiLCJ0ZXh0Iiwic2FsYXJ5IiwiY2hpbGRyZW4iLCJsaXN0IiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJiaW5kTmFtZSIsImUiLCJkZXRhaWwiLCJiaW5kU2V4IiwiYmluZEJpcnRoIiwiYmluZEVkdSIsImJpbmRFeHAiLCJiaW5kUGhvbmUiLCJiaW5kU3RhdGUiLCJiaW5kSW50cm8iLCJiaW5kVHlwZSIsImJpbmRDaXR5Q29sdW1uIiwiY29sdW1uIiwiYmluZENpdHkiLCJjaXR5TmFtZSIsImJpbmRKb2JDb2x1bW4iLCJiaW5kSm9iIiwid29ya05hbWUiLCJpZCIsImJpbmRTYWxhcnkiLCJjYW5jZWwiLCJzaG93TW9kYWwiLCJjb250ZW50IiwidGhlbiIsInJlTGF1bmNoIiwidXJsIiwic3VyZSIsInVzZXJJZCIsIlBvc3QiLCJuYXZpZ2F0ZUJhY2siLCJjYXRjaCIsImxvZyIsImVyciIsInRpdGxlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjYW5jZWxDb2xvciIsImNvbmZpcm1Db2xvciIsInN1Y2Nlc3MiLCJyZXQiLCJjb25maXJtIiwiRXJyb3IiLCJmYWlsIiwiJGludm9rZSIsIm9uU29ja2V0TWVzc2FnZSIsIiRwYXJlbnQiLCJnbG9iYWwiLCJjdXJWYWwiLCJOdW1iZXIiLCJwYXJzZUludCIsInRvYXN0IiwicGFyYW1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsWTs7Ozs7Ozs7Ozs7Ozs7c01BQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QixJQUZuQjtBQUdMQyxtQ0FBdUIsS0FIbEI7QUFJTEMsMkJBQWU7QUFKVixTLFFBNkJUQyxPLEdBQVUsdUIsUUFFVkMsTyxHQUFVO0FBQ05DLGtCQUFNLGVBQUtDLGNBQUwsQ0FBb0IsUUFBcEIsQ0FEQTtBQUVOQyxpQkFBSyxlQUFLRCxjQUFMLENBQW9CLFVBQXBCO0FBRkMsUyxRQUtWRSxJLEdBQU87QUFDSEMsa0JBQU07QUFDRjtBQUNBQywwQkFBVSxFQUZSO0FBR0ZDLDZCQUFhLEVBSFg7QUFJRkMsaUNBQWlCLEVBSmY7QUFLRkMsc0JBQU0sRUFMSjtBQU1GQyxxQkFBSyxFQU5IO0FBT0ZDLHdCQUFRLEVBUE47QUFRRkMsMkJBQVcsRUFSVDtBQVNGQywrQkFBZSxFQVRiO0FBVUZDLG1DQUFtQixFQVZqQjtBQVdGQyxnQ0FBZ0IsRUFYZDtBQVlGQyxvQ0FBb0IsRUFabEI7QUFhRkMscUJBQUssRUFiSDtBQWNGQyw0QkFBWSxFQWRWO0FBZUZDLHVCQUFPLEVBZkw7QUFnQkZDLDZCQUFhLEVBaEJYO0FB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Q1pnQixtQ0FBTyxJQUFJTSxLQUFKLENBQVUsTUFBVixDQUFQO0FBQ0g7QUFDSixxQkFaVTtBQWFYQywwQkFBTSxtQkFBTztBQUNUUCwrQkFBT0osR0FBUDtBQUNIO0FBZlUsaUJBQWY7QUFpQkgsYUFsQk0sQ0FBUDtBQW1CSDs7O2dDQTBMaUI7QUFBQSxnQkFBWDNFLElBQVcsdUVBQUosRUFBSTs7QUFDZCxpQkFBS3VGLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLFdBQXRCLEVBQW1DdkYsSUFBbkM7QUFDSDs7O2lDQUVTO0FBQUE7O0FBQ04sMkJBQUt3RixlQUFMLENBQXFCLGVBQU87QUFDeEIsdUJBQUtDLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkMsTUFBcEIsR0FBNkJDLE9BQU9DLFFBQVAsQ0FBZ0IsT0FBS0osT0FBTCxDQUFhQyxNQUFiLENBQW9CQyxNQUFwQyxJQUE4QyxDQUEzRTtBQUNBLHVCQUFLRyxLQUFMLENBQVcsRUFBQzdCLFNBQVMsT0FBVixFQUFYO0FBQ0gsYUFIRDtBQUlIOzs7K0JBa0ZPOEIsTSxFQUFRO0FBQ1osaUJBQUt6QixNQUFMLEdBQWN5QixPQUFPbEMsRUFBckI7QUFDSDs7OztFQW5UcUMsZUFBSzVELEk7O2tCQUExQlosWSIsImZpbGUiOiJzaW1wbGVSZXN1bWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdG9hc3QnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGVSZXN1bWUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn566A5Y6GJyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgICAgIGRpc2FibGVTY3JvbGw6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01vZGFsICh7dGl0bGUgPSAn5o+Q56S6JywgY29udGVudCA9ICfmmK/lkKbliKDpmaTor6XpgInpobknfSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxDb2xvcjogJyNkZGQnLFxyXG4gICAgICAgICAgICAgICAgY29uZmlybUNvbG9yOiAnIzQwYzRmZicsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXQuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCfngrnlh7vnoa7lrponKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0LmNhbmNlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCfnlKjmiLflj5bmtognKSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICBzdG9yYWdlID0ge1xyXG4gICAgICAgIGNpdHk6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3JlZ2lvbicpLFxyXG4gICAgICAgIGpvYjogd2VweS5nZXRTdG9yYWdlU3luYygnd29ya0xpc3QnKVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgcGFnZToge1xyXG4gICAgICAgICAgICAvLyB1c2VySWQ6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJZCcpLFxyXG4gICAgICAgICAgICByZXN1bWVJZDogJycsXHJcbiAgICAgICAgICAgIGhlYWRlckltYWdlOiAnJyxcclxuICAgICAgICAgICAgaGVhZGVySW1hZ2VGdWxsOiAnJyxcclxuICAgICAgICAgICAgbmFtZTogJycsXHJcbiAgICAgICAgICAgIHNleDogJycsXHJcbiAgICAgICAgICAgIGNpdHlJZDogJycsXHJcbiAgICAgICAgICAgIGJpcnRoWWVhcjogJycsXHJcbiAgICAgICAgICAgIGVkdWNhdGlvblR5cGU6ICcnLFxyXG4gICAgICAgICAgICBlZHVjYXRpb25UeXBlTmFtZTogJycsXHJcbiAgICAgICAgICAgIGV4cGVyaWVuY2VUeXBlOiAnJyxcclxuICAgICAgICAgICAgZXhwZXJpZW5jZVR5cGVOYW1lOiAnJyxcclxuICAgICAgICAgICAgdGVsOiAnJyxcclxuICAgICAgICAgICAgd29ya1N0YXR1czogJycsXHJcbiAgICAgICAgICAgIGludHJvOiAnJyxcclxuICAgICAgICAgICAgY29tcGFueVR5cGU6ICcnLFxyXG4gICAgICAgICAgICBjb21wYW55VHlwZU5hbWU6ICcnLFxyXG4gICAgICAgICAgICBzYWxhcnlUeXBlOiAnJyxcclxuICAgICAgICAgICAgc2FsYXJ5VHlwZU5hbWU6ICcnLFxyXG4gICAgICAgICAgICBwYXJlbnRXb3JrQ2xhc3NJZDogJycsXHJcbiAgICAgICAgICAgIHdvcmtDbGFzc0lkOiAnJyxcclxuICAgICAgICAgICAgd29ya0lkOiAnJyxcclxuICAgICAgICAgICAgdGFnTGlzdDogW10sXHJcbiAgICAgICAgICAgIHdvcmtMaXN0OiBbXSxcclxuICAgICAgICAgICAgc2Nob29sTGlzdDogW10sXHJcbiAgICAgICAgICAgIG9sZFNob3dVcmw6IFtdLFxyXG4gICAgICAgICAgICBzaG93VXJsOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgam9iSW5kZXg6IFswLCAwLCAwXSxcclxuICAgICAgICBjaXR5SW5kZXg6IFswLCAwXSxcclxuICAgICAgICBiYXNlOiB7XHJcbiAgICAgICAgICAgIHNleDogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn55S3J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5aWzJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBlZHU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+Wkp+S4kydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+acrOenkSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA0LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+ehleWjqydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WNmuWjqydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WFtuS7lidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgZXhwOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMSxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICcx5bm05Lul5LiLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnMX4y5bm0J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnM3415bm0J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnNn445bm0J1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnOH4xMOW5tCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJzEw5bm05Lul5LiKJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBsZXZlbDogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5Yid57qnJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5Lit57qnJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn6auY57qnJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn6LWE5rexJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5a+85biI57qnJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBzdGF0ZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn56a76IGMJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAn5Zyo6IGMJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB0eXBlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+S/seS5kOmDqCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5bel5L2c5a6kJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfnkZzkvL3ppoYnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+aVmeiCsuWfueiurSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5Zmo5qKw6K6+5aSHJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICflqpLkvZPotYTorq8nXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+S8muWxle+8j+a0u+WKqO+8j+i1m+S6iydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogOCxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5LqS6IGU572RJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICflhbbku5YnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHNhbGFyeTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICczfjVLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICc2fjhLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICc5fjEySydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNCxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnMTN+MThLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA1LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICcxOX4yNUsnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDYsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzI2fjMwSydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnMzF+NDBLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA4LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICc0MX41MEsnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDksXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzUwS+S7peS4iidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2l0eTogW3RoaXMuc3RvcmFnZS5jaXR5LCB0aGlzLnN0b3JhZ2UuY2l0eVswXS5jaGlsZHJlbl0sXHJcbiAgICAgICAgam9iOiBbdGhpcy5zdG9yYWdlLmpvYiwgdGhpcy5zdG9yYWdlLmpvYlswXS5saXN0LCB0aGlzLnN0b3JhZ2Uuam9iWzBdLmxpc3RbMF0ud29ya0xpc3RdXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50cyA9IHtcclxuICAgICAgICAndG9hc3QnOiBUb2FzdFxyXG4gICAgfVxyXG5cclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICB3ZXB5Lm9uU29ja2V0TWVzc2FnZShyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCA9IE51bWJlci5wYXJzZUludCh0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCkgKyAxXHJcbiAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfmgqjmnInmlrDmtojmga8nfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgYmluZE5hbWUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLm5hbWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFNleCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2V4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRCaXJ0aCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuYmlydGhZZWFyID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRFZHUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmVkdWNhdGlvblR5cGUgPSB0aGlzLmJhc2UuZWR1W2UuZGV0YWlsLnZhbHVlXS52YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuZWR1Y2F0aW9uVHlwZU5hbWUgPSB0aGlzLmJhc2UuZWR1W2UuZGV0YWlsLnZhbHVlXS50ZXh0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRXhwIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5leHBlcmllbmNlVHlwZSA9IHRoaXMuYmFzZS5leHBbZS5kZXRhaWwudmFsdWVdLnZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5leHBlcmllbmNlVHlwZU5hbWUgPSB0aGlzLmJhc2UuZXhwW2UuZGV0YWlsLnZhbHVlXS50ZXh0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUGhvbmUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnRlbCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kU3RhdGUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLndvcmtTdGF0dXMgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEludHJvIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5pbnRybyA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kVHlwZSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY29tcGFueVR5cGUgPSB0aGlzLmJhc2UudHlwZVtlLmRldGFpbC52YWx1ZV0udmFsdWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNvbXBhbnlUeXBlTmFtZSA9IHRoaXMuYmFzZS50eXBlW2UuZGV0YWlsLnZhbHVlXS50ZXh0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kQ2l0eUNvbHVtbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwuY29sdW1uID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNpdHlbMV0gPSB0aGlzLmNpdHlbMF1bZS5kZXRhaWwudmFsdWVdLmNoaWxkcmVuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRDaXR5IChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2l0eUluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNpdHlOYW1lID0gdGhpcy5jaXR5WzFdW3RoaXMuY2l0eUluZGV4WzFdXS50ZXh0XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jaXR5SWQgPSB0aGlzLmNpdHlbMV1bdGhpcy5jaXR5SW5kZXhbMV1dLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kSm9iQ29sdW1uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmRldGFpbC5jb2x1bW4gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuam9iWzFdID0gdGhpcy5qb2JbMF1bZS5kZXRhaWwudmFsdWVdLmxpc3RcclxuICAgICAgICAgICAgICAgIHRoaXMuam9iWzJdID0gdGhpcy5qb2JbMF1bZS5kZXRhaWwudmFsdWVdLmxpc3RbMF0ud29ya0xpc3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwuY29sdW1uID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmpvYlsyXSA9IHRoaXMuam9iWzFdW2UuZGV0YWlsLnZhbHVlXS53b3JrTGlzdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kSm9iIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuam9iSW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uud29ya05hbWUgPSB0aGlzLmpvYlsyXVt0aGlzLmpvYkluZGV4WzJdXS5uYW1lXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5wYXJlbnRXb3JrQ2xhc3NJZCA9IHRoaXMuam9iWzBdW3RoaXMuam9iSW5kZXhbMF1dLmlkXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS53b3JrQ2xhc3NJZCA9IHRoaXMuam9iWzFdW3RoaXMuam9iSW5kZXhbMV1dLmlkXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS53b3JrSWQgPSB0aGlzLmpvYlsyXVt0aGlzLmpvYkluZGV4WzJdXS5pZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFNhbGFyeSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2FsYXJ5VHlwZSA9IHRoaXMuYmFzZS5zYWxhcnlbZS5kZXRhaWwudmFsdWVdLnZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5zYWxhcnlUeXBlTmFtZSA9IHRoaXMuYmFzZS5zYWxhcnlbZS5kZXRhaWwudmFsdWVdLnRleHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhbmNlbCAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01vZGFsKHtjb250ZW50OiAn56Gu5a6a5pS+5byD57yW6L6R566A5Y6G5ZCX77yfJ30pXHJcbiAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHt1cmw6ICcuL2pvYnMnfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1cmUgKCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnBhZ2UudXNlcklkID0gd2VweS5nZXRTdG9yYWdlU3luYygndXNlcklkJylcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnVzZXJJZCA9ICcyOTQnXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5Qb3N0KHRoaXMucGFnZSwgJy9SZXN1bWUvdXBkYXRlJylcclxuICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2coZXJyKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHBhcmFtcykge1xyXG4gICAgICAgIHRoaXMudXNlcklkID0gcGFyYW1zLmlkXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==