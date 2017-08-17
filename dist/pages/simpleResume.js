'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
        key: 'onLoad',
        value: function onLoad(params) {
            this.userId = params.id;
        }
    }]);

    return SimpleResume;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(SimpleResume , 'pages/simpleResume'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpbXBsZVJlc3VtZS5qcyJdLCJuYW1lcyI6WyJTaW1wbGVSZXN1bWUiLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImRpc2FibGVTY3JvbGwiLCJyZXF1ZXN0Iiwic3RvcmFnZSIsImNpdHkiLCJnZXRTdG9yYWdlU3luYyIsImpvYiIsImRhdGEiLCJwYWdlIiwicmVzdW1lSWQiLCJoZWFkZXJJbWFnZSIsImhlYWRlckltYWdlRnVsbCIsIm5hbWUiLCJzZXgiLCJjaXR5SWQiLCJiaXJ0aFllYXIiLCJlZHVjYXRpb25UeXBlIiwiZWR1Y2F0aW9uVHlwZU5hbWUiLCJleHBlcmllbmNlVHlwZSIsImV4cGVyaWVuY2VUeXBlTmFtZSIsInRlbCIsIndvcmtTdGF0dXMiLCJpbnRybyIsImNvbXBhbnlUeXBlIiwiY29tcGFueVR5cGVOYW1lIiwic2FsYXJ5VHlwZSIsInNhbGFyeVR5cGVOYW1lIiwicGFyZW50V29ya0NsYXNzSWQiLCJ3b3JrQ2xhc3NJZCIsIndvcmtJZCIsInRhZ0xpc3QiLCJ3b3JrTGlzdCIsInNjaG9vbExpc3QiLCJvbGRTaG93VXJsIiwic2hvd1VybCIsImpvYkluZGV4IiwiY2l0eUluZGV4IiwiYmFzZSIsImVkdSIsImV4cCIsImxldmVsIiwic3RhdGUiLCJ0eXBlIiwidmFsdWUiLCJ0ZXh0Iiwic2FsYXJ5IiwiY2hpbGRyZW4iLCJsaXN0IiwibWV0aG9kcyIsImJpbmROYW1lIiwiZSIsImRldGFpbCIsImJpbmRTZXgiLCJiaW5kQmlydGgiLCJiaW5kRWR1IiwiYmluZEV4cCIsImJpbmRQaG9uZSIsImJpbmRTdGF0ZSIsImJpbmRJbnRybyIsImJpbmRUeXBlIiwiYmluZENpdHlDb2x1bW4iLCJjb2x1bW4iLCJiaW5kQ2l0eSIsImNpdHlOYW1lIiwiYmluZEpvYkNvbHVtbiIsImJpbmRKb2IiLCJ3b3JrTmFtZSIsImlkIiwiYmluZFNhbGFyeSIsImNhbmNlbCIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJ0aGVuIiwicmVMYXVuY2giLCJ1cmwiLCJzdXJlIiwidXNlcklkIiwiUG9zdCIsIm5hdmlnYXRlQmFjayIsImNhdGNoIiwibG9nIiwiZXJyIiwidGl0bGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNhbmNlbENvbG9yIiwiY29uZmlybUNvbG9yIiwic3VjY2VzcyIsInJldCIsImNvbmZpcm0iLCJFcnJvciIsImZhaWwiLCJwYXJhbXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsWTs7Ozs7Ozs7Ozs7Ozs7c01BQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QixJQUZuQjtBQUdMQyxtQ0FBdUIsS0FIbEI7QUFJTEMsMkJBQWU7QUFKVixTLFFBNkJUQyxPLEdBQVUsdUIsUUFFVkMsTyxHQUFVO0FBQ05DLGtCQUFNLGVBQUtDLGNBQUwsQ0FBb0IsUUFBcEIsQ0FEQTtBQUVOQyxpQkFBSyxlQUFLRCxjQUFMLENBQW9CLFVBQXBCO0FBRkMsUyxRQUtWRSxJLEdBQU87QUFDSEMsa0JBQU07QUFDRjtBQUNBQywwQkFBVSxFQUZSO0FBR0ZDLDZCQUFhLEVBSFg7QUFJRkMsaUNBQWlCLEVBSmY7QUFLRkMsc0JBQU0sRUFMSjtBQU1GQyxxQkFBSyxFQU5IO0FBT0ZDLHdCQUFRLEVBUE47QUFRRkMsMkJBQVcsRUFSVDtBQVNGQywrQkFBZSxFQVRiO0FBVUZDLG1DQUFtQixFQVZqQjtBQVdGQyxnQ0FBZ0IsRUFYZDtBQVlGQyxvQ0FBb0IsRUFabEI7QUFhRkMscUJBQUssRUFiSDtBQWNGQyw0QkFBWSxFQWRWO0FBZUZDLHVCQUFPLEVBZkw7QUFnQkZDLDZCQUFhLEVBaEJYO0FBaUJGQyxpQ0FBaUIsRUFqQmY7QUFrQkZDLDRCQUFZLEVBbEJWO0FBbUJGQyxnQ0FBZ0IsRUFuQmQ7QUFvQkZDLG1DQUFtQixFQXBCakI7QUFxQkZDLDZCQUFhLEVBckJYO0FBc0JGQyx3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c1FPWSxNLEVBQVE7QUFDWixpQkFBS2pCLE1BQUwsR0FBY2lCLE9BQU8xQixFQUFyQjtBQUNIOzs7O0VBcFNxQyxlQUFLM0QsSTs7a0JBQTFCWixZIiwiZmlsZSI6InNpbXBsZVJlc3VtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltcGxlUmVzdW1lIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eugOWOhicsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNb2RhbCAoe3RpdGxlID0gJ+aPkOekuicsIGNvbnRlbnQgPSAn5piv5ZCm5Yig6Zmk6K+l6YCJ6aG5J30pIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQ29sb3I6ICcjZGRkJyxcclxuICAgICAgICAgICAgICAgIGNvbmZpcm1Db2xvcjogJyM0MGM0ZmYnLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0LmNvbmZpcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgn54K55Ye756Gu5a6aJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldC5jYW5jZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcign55So5oi35Y+W5raIJykpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgc3RvcmFnZSA9IHtcclxuICAgICAgICBjaXR5OiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdyZWdpb24nKSxcclxuICAgICAgICBqb2I6IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3dvcmtMaXN0JylcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHBhZ2U6IHtcclxuICAgICAgICAgICAgLy8gdXNlcklkOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd1c2VySWQnKSxcclxuICAgICAgICAgICAgcmVzdW1lSWQ6ICcnLFxyXG4gICAgICAgICAgICBoZWFkZXJJbWFnZTogJycsXHJcbiAgICAgICAgICAgIGhlYWRlckltYWdlRnVsbDogJycsXHJcbiAgICAgICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgICAgICBzZXg6ICcnLFxyXG4gICAgICAgICAgICBjaXR5SWQ6ICcnLFxyXG4gICAgICAgICAgICBiaXJ0aFllYXI6ICcnLFxyXG4gICAgICAgICAgICBlZHVjYXRpb25UeXBlOiAnJyxcclxuICAgICAgICAgICAgZWR1Y2F0aW9uVHlwZU5hbWU6ICcnLFxyXG4gICAgICAgICAgICBleHBlcmllbmNlVHlwZTogJycsXHJcbiAgICAgICAgICAgIGV4cGVyaWVuY2VUeXBlTmFtZTogJycsXHJcbiAgICAgICAgICAgIHRlbDogJycsXHJcbiAgICAgICAgICAgIHdvcmtTdGF0dXM6ICcnLFxyXG4gICAgICAgICAgICBpbnRybzogJycsXHJcbiAgICAgICAgICAgIGNvbXBhbnlUeXBlOiAnJyxcclxuICAgICAgICAgICAgY29tcGFueVR5cGVOYW1lOiAnJyxcclxuICAgICAgICAgICAgc2FsYXJ5VHlwZTogJycsXHJcbiAgICAgICAgICAgIHNhbGFyeVR5cGVOYW1lOiAnJyxcclxuICAgICAgICAgICAgcGFyZW50V29ya0NsYXNzSWQ6ICcnLFxyXG4gICAgICAgICAgICB3b3JrQ2xhc3NJZDogJycsXHJcbiAgICAgICAgICAgIHdvcmtJZDogJycsXHJcbiAgICAgICAgICAgIHRhZ0xpc3Q6IFtdLFxyXG4gICAgICAgICAgICB3b3JrTGlzdDogW10sXHJcbiAgICAgICAgICAgIHNjaG9vbExpc3Q6IFtdLFxyXG4gICAgICAgICAgICBvbGRTaG93VXJsOiBbXSxcclxuICAgICAgICAgICAgc2hvd1VybDogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIGpvYkluZGV4OiBbMCwgMCwgMF0sXHJcbiAgICAgICAgY2l0eUluZGV4OiBbMCwgMF0sXHJcbiAgICAgICAgYmFzZToge1xyXG4gICAgICAgICAgICBzZXg6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+eUtydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WlsydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgZWR1OiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMixcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICflpKfkuJMnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMyxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICfmnKznp5EnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogNCxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICfnoZXlo6snXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogNSxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICfljZrlo6snXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogMSxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICflhbbku5YnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGV4cDogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICd2YWx1ZSc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHQnOiAnMeW5tOS7peS4iydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJzF+MuW5tCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJzN+NeW5tCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA0LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJzZ+OOW5tCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJzh+MTDlubQnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJzogNixcclxuICAgICAgICAgICAgICAgICAgICAndGV4dCc6ICcxMOW5tOS7peS4iidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgbGV2ZWw6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WInee6pydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+S4ree6pydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+mrmOe6pydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA0LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+i1hOa3sSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WvvOW4iOe6pydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgc3RhdGU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+emu+iBjCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0JzogJ+WcqOiBjCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgdHlwZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfkv7HkuZDpg6gnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+W3peS9nOWupCdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn55Gc5Ly96aaGJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfmlZnogrLln7norq0nXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+WZqOaisOiuvuWkhydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5aqS5L2T6LWE6K6vJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA3LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfkvJrlsZXvvI/mtLvliqjvvI/otZvkuosnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDgsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+S6kuiBlOe9kSdcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogOSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5YW25LuWJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBzYWxhcnk6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnM341SydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnNn44SydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnOX4xMksnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzEzfjE4SydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogNSxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnMTl+MjVLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICcyNn4zMEsnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJzMxfjQwSydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogOCxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnNDF+NTBLJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiA5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICc1MEvku6XkuIonXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNpdHk6IFt0aGlzLnN0b3JhZ2UuY2l0eSwgdGhpcy5zdG9yYWdlLmNpdHlbMF0uY2hpbGRyZW5dLFxyXG4gICAgICAgIGpvYjogW3RoaXMuc3RvcmFnZS5qb2IsIHRoaXMuc3RvcmFnZS5qb2JbMF0ubGlzdCwgdGhpcy5zdG9yYWdlLmpvYlswXS5saXN0WzBdLndvcmtMaXN0XVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgYmluZE5hbWUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLm5hbWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFNleCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2V4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRCaXJ0aCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuYmlydGhZZWFyID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRFZHUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmVkdWNhdGlvblR5cGUgPSB0aGlzLmJhc2UuZWR1W2UuZGV0YWlsLnZhbHVlXS52YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuZWR1Y2F0aW9uVHlwZU5hbWUgPSB0aGlzLmJhc2UuZWR1W2UuZGV0YWlsLnZhbHVlXS50ZXh0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRXhwIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5leHBlcmllbmNlVHlwZSA9IHRoaXMuYmFzZS5leHBbZS5kZXRhaWwudmFsdWVdLnZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5leHBlcmllbmNlVHlwZU5hbWUgPSB0aGlzLmJhc2UuZXhwW2UuZGV0YWlsLnZhbHVlXS50ZXh0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUGhvbmUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnRlbCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kU3RhdGUgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlLndvcmtTdGF0dXMgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZEludHJvIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5pbnRybyA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kVHlwZSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UuY29tcGFueVR5cGUgPSB0aGlzLmJhc2UudHlwZVtlLmRldGFpbC52YWx1ZV0udmFsdWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNvbXBhbnlUeXBlTmFtZSA9IHRoaXMuYmFzZS50eXBlW2UuZGV0YWlsLnZhbHVlXS50ZXh0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kQ2l0eUNvbHVtbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwuY29sdW1uID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNpdHlbMV0gPSB0aGlzLmNpdHlbMF1bZS5kZXRhaWwudmFsdWVdLmNoaWxkcmVuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRDaXR5IChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2l0eUluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgICAgdGhpcy5wYWdlLmNpdHlOYW1lID0gdGhpcy5jaXR5WzFdW3RoaXMuY2l0eUluZGV4WzFdXS50ZXh0XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5jaXR5SWQgPSB0aGlzLmNpdHlbMV1bdGhpcy5jaXR5SW5kZXhbMV1dLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kSm9iQ29sdW1uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmRldGFpbC5jb2x1bW4gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuam9iWzFdID0gdGhpcy5qb2JbMF1bZS5kZXRhaWwudmFsdWVdLmxpc3RcclxuICAgICAgICAgICAgICAgIHRoaXMuam9iWzJdID0gdGhpcy5qb2JbMF1bZS5kZXRhaWwudmFsdWVdLmxpc3RbMF0ud29ya0xpc3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZS5kZXRhaWwuY29sdW1uID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmpvYlsyXSA9IHRoaXMuam9iWzFdW2UuZGV0YWlsLnZhbHVlXS53b3JrTGlzdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kSm9iIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuam9iSW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uud29ya05hbWUgPSB0aGlzLmpvYlsyXVt0aGlzLmpvYkluZGV4WzJdXS5uYW1lXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5wYXJlbnRXb3JrQ2xhc3NJZCA9IHRoaXMuam9iWzBdW3RoaXMuam9iSW5kZXhbMF1dLmlkXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS53b3JrQ2xhc3NJZCA9IHRoaXMuam9iWzFdW3RoaXMuam9iSW5kZXhbMV1dLmlkXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS53b3JrSWQgPSB0aGlzLmpvYlsyXVt0aGlzLmpvYkluZGV4WzJdXS5pZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFNhbGFyeSAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uuc2FsYXJ5VHlwZSA9IHRoaXMuYmFzZS5zYWxhcnlbZS5kZXRhaWwudmFsdWVdLnZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5zYWxhcnlUeXBlTmFtZSA9IHRoaXMuYmFzZS5zYWxhcnlbZS5kZXRhaWwudmFsdWVdLnRleHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhbmNlbCAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01vZGFsKHtjb250ZW50OiAn56Gu5a6a5pS+5byD57yW6L6R566A5Y6G5ZCX77yfJ30pXHJcbiAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHt1cmw6ICcuL2pvYnMnfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1cmUgKCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnBhZ2UudXNlcklkID0gd2VweS5nZXRTdG9yYWdlU3luYygndXNlcklkJylcclxuICAgICAgICAgICAgdGhpcy5wYWdlLnVzZXJJZCA9ICcyOTQnXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5Qb3N0KHRoaXMucGFnZSwgJy9SZXN1bWUvdXBkYXRlJylcclxuICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2coZXJyKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHBhcmFtcykge1xyXG4gICAgICAgIHRoaXMudXNlcklkID0gcGFyYW1zLmlkXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==