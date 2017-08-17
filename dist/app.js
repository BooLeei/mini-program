'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _constants = require('./utils/constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
    _inherits(_default, _wepy$app);

    function _default() {
        _classCallCheck(this, _default);

        var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

        _this.config = {
            pages: ['pages/jobs', 'pages/login', 'pages/mine', 'pages/resume', 'pages/companys', 'pages/allRecomend', 'pages/chatList', 'pages/toggleCity', 'pages/classify', 'pages/search', 'pages/jobDetail', 'pages/company', 'pages/allProgress', 'pages/allShopJobs', 'pages/introduction', 'pages/followCompany', 'pages/resume-tag', 'pages/resume-exp', 'pages/resume-edu', 'pages/collect', 'pages/follow', 'pages/progress', 'pages/comment', 'pages/simpleResume'],
            window: {
                backgroundTextStyle: 'light',
                navigationBarBackgroundColor: '#fff',
                navigationBarTitleText: '健身求职',
                navigationBarTextStyle: 'black',
                backgroundColor: '#f2f2f5',
                enablePullDownRefresh: true
            },
            tabBar: {
                color: '#aaa',
                selectedColor: '#40c4ff',
                borderStyle: 'black',
                backgroundColor: '#fff',
                list: [{
                    pagePath: 'pages/jobs',
                    text: '职位',
                    iconPath: './image/jobs-tab.png',
                    selectedIconPath: './image/jobs-tab-hl.png'
                }, {
                    pagePath: 'pages/companys',
                    text: '公司',
                    iconPath: './image/companys-tab.png',
                    selectedIconPath: './image/companys-tab-hl.png'
                }, {
                    pagePath: 'pages/chatList',
                    text: '消息',
                    iconPath: './image/msg-tab.png',
                    selectedIconPath: './image/msg-tab-hl.png'
                }, {
                    pagePath: 'pages/mine',
                    text: '我',
                    iconPath: './image/mine-tab.png',
                    selectedIconPath: './image/mine-tab-hl.png'
                }]
            }
        };
        _this.global = {
            userInfo: null,
            location: {
                'has': false,
                'region_id': '0',
                'region_name': '全国'
            },
            choose: {
                'selectProv': '0',
                'region_id': '0',
                'region_name': '全国'
            }
        };
        _this.Request = new _request2.default();

        _this.use('requestfix');
        return _this;
    }

    _createClass(_default, [{
        key: 'onLaunch',
        value: function onLaunch() {
            var _this2 = this;

            console.log(_constants.QQMAPKEY);
            _wepy2.default.getLocation({
                success: function success(ret) {
                    _wepy2.default.request({
                        url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + ret.latitude + ',' + ret.longitude + '&key=' + _constants.QQMAPKEY,
                        success: function success(ret) {
                            if (!ret.data.result.address_component.city) {
                                return false;
                            }
                            _this2.Request.Get({
                                cityName: ret.data.result.address_component.city.substr(0, ret.data.result.address_component.city.length - 1)
                            }, '/Region/getCityIdByCityName').then(function (ret) {
                                Object.assign(_this2.global.location, ret.data);
                                // Object.assign(this.global.choose, ret.data)
                                _this2.global.location.has = true;
                            });
                        }
                    });
                }
            });

            if (!_wepy2.default.getStorageSync('hotCity')) {
                setTimeout(function () {
                    _this2.Request.Get({ provinceId: -1 }, '/Region/getCityList').then(function (ret) {
                        return _wepy2.default.setStorageSync('hotCity', ret.data);
                    });
                }, 3000);
            }

            if (!_wepy2.default.getStorageSync('workList')) {
                setTimeout(function () {
                    _this2.Request.Get({}, '/Work/getWorkList').then(function (ret) {
                        return _wepy2.default.setStorageSync('workList', ret.data);
                    });
                }, 3500);
            }
            if (!_wepy2.default.getStorageSync('region')) {
                setTimeout(function () {
                    _this2.Request.special({}, '/region/getAllList').then(function (ret) {
                        return _wepy2.default.setStorageSync('region', ret);
                    });
                }, 4000);
            }
        }
    }, {
        key: 'getUserInfo',
        value: function getUserInfo(cb) {
            var that = this;
            if (this.global.userInfo) {
                return this.global.userInfo;
            }
            _wepy2.default.getUserInfo({
                success: function success(res) {
                    that.global.userInfo = res.userInfo;
                    cb && cb(res.userInfo);
                }
            });
        }
    }]);

    return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, undefined));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWwiLCJ1c2VySW5mbyIsImxvY2F0aW9uIiwiY2hvb3NlIiwiUmVxdWVzdCIsInVzZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRMb2NhdGlvbiIsInN1Y2Nlc3MiLCJyZXF1ZXN0IiwidXJsIiwicmV0IiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJkYXRhIiwicmVzdWx0IiwiYWRkcmVzc19jb21wb25lbnQiLCJjaXR5IiwiR2V0IiwiY2l0eU5hbWUiLCJzdWJzdHIiLCJsZW5ndGgiLCJ0aGVuIiwiT2JqZWN0IiwiYXNzaWduIiwiaGFzIiwiZ2V0U3RvcmFnZVN5bmMiLCJzZXRUaW1lb3V0IiwicHJvdmluY2VJZCIsInNldFN0b3JhZ2VTeW5jIiwic3BlY2lhbCIsImNiIiwidGhhdCIsImdldFVzZXJJbmZvIiwicmVzIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFxRkksd0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxjQWxGZkEsTUFrRmUsR0FsRk47QUFDTEMsbUJBQU8sQ0FDSCxZQURHLEVBRUgsYUFGRyxFQUdILFlBSEcsRUFJSCxjQUpHLEVBS0gsZ0JBTEcsRUFNSCxtQkFORyxFQU9ILGdCQVBHLEVBUUgsa0JBUkcsRUFTSCxnQkFURyxFQVVILGNBVkcsRUFXSCxp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anMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQgeyBRUU1BUEtFWSB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnRzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgcGFnZXM6IFtcclxuICAgICAgICAgICAgJ3BhZ2VzL2pvYnMnLFxyXG4gICAgICAgICAgICAncGFnZXMvbG9naW4nLFxyXG4gICAgICAgICAgICAncGFnZXMvbWluZScsXHJcbiAgICAgICAgICAgICdwYWdlcy9yZXN1bWUnLFxyXG4gICAgICAgICAgICAncGFnZXMvY29tcGFueXMnLFxyXG4gICAgICAgICAgICAncGFnZXMvYWxsUmVjb21lbmQnLFxyXG4gICAgICAgICAgICAncGFnZXMvY2hhdExpc3QnLFxyXG4gICAgICAgICAgICAncGFnZXMvdG9nZ2xlQ2l0eScsXHJcbiAgICAgICAgICAgICdwYWdlcy9jbGFzc2lmeScsXHJcbiAgICAgICAgICAgICdwYWdlcy9zZWFyY2gnLFxyXG4gICAgICAgICAgICAncGFnZXMvam9iRGV0YWlsJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2NvbXBhbnknLFxyXG4gICAgICAgICAgICAncGFnZXMvYWxsUHJvZ3Jlc3MnLFxyXG4gICAgICAgICAgICAncGFnZXMvYWxsU2hvcEpvYnMnLFxyXG4gICAgICAgICAgICAncGFnZXMvaW50cm9kdWN0aW9uJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2ZvbGxvd0NvbXBhbnknLFxyXG4gICAgICAgICAgICAncGFnZXMvcmVzdW1lLXRhZycsXHJcbiAgICAgICAgICAgICdwYWdlcy9yZXN1bWUtZXhwJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3Jlc3VtZS1lZHUnLFxyXG4gICAgICAgICAgICAncGFnZXMvY29sbGVjdCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9mb2xsb3cnLFxyXG4gICAgICAgICAgICAncGFnZXMvcHJvZ3Jlc3MnLFxyXG4gICAgICAgICAgICAncGFnZXMvY29tbWVudCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9zaW1wbGVSZXN1bWUnXHJcbiAgICAgICAgXSxcclxuICAgICAgICB3aW5kb3c6IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5YGl6Lqr5rGC6IGMJyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2YyZjJmNScsXHJcbiAgICAgICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGFiQmFyOiB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAnI2FhYScsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkQ29sb3I6ICcjNDBjNGZmJyxcclxuICAgICAgICAgICAgYm9yZGVyU3R5bGU6ICdibGFjaycsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICAgICAgICBsaXN0OiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9qb2JzJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn6IGM5L2NJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJy4vaW1hZ2Uvam9icy10YWIucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnLi9pbWFnZS9qb2JzLXRhYi1obC5wbmcnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jb21wYW55cycsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+WFrOWPuCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICcuL2ltYWdlL2NvbXBhbnlzLXRhYi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuL2ltYWdlL2NvbXBhbnlzLXRhYi1obC5wbmcnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jaGF0TGlzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+a2iOaBrycsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICcuL2ltYWdlL21zZy10YWIucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnLi9pbWFnZS9tc2ctdGFiLWhsLnBuZydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL21pbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfmiJEnLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnLi9pbWFnZS9taW5lLXRhYi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuL2ltYWdlL21pbmUtdGFiLWhsLnBuZydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnbG9iYWwgPSB7XHJcbiAgICAgICAgdXNlckluZm86IG51bGwsXHJcbiAgICAgICAgbG9jYXRpb246IHtcclxuICAgICAgICAgICAgJ2hhcyc6IGZhbHNlLFxyXG4gICAgICAgICAgICAncmVnaW9uX2lkJzogJzAnLFxyXG4gICAgICAgICAgICAncmVnaW9uX25hbWUnOiAn5YWo5Zu9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hvb3NlOiB7XHJcbiAgICAgICAgICAgICdzZWxlY3RQcm92JzogJzAnLFxyXG4gICAgICAgICAgICAncmVnaW9uX2lkJzogJzAnLFxyXG4gICAgICAgICAgICAncmVnaW9uX25hbWUnOiAn5YWo5Zu9J1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBSZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG4gICAgfVxyXG5cclxuICAgIG9uTGF1bmNoKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFFRTUFQS0VZKVxyXG4gICAgICAgIHdlcHkuZ2V0TG9jYXRpb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBodHRwczovL2FwaXMubWFwLnFxLmNvbS93cy9nZW9jb2Rlci92MS8/bG9jYXRpb249JHtyZXQubGF0aXR1ZGV9LCR7cmV0LmxvbmdpdHVkZX0ma2V5PSR7UVFNQVBLRVl9YCxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJldC5kYXRhLnJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudC5jaXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHlOYW1lOiByZXQuZGF0YS5yZXN1bHQuYWRkcmVzc19jb21wb25lbnQuY2l0eS5zdWJzdHIoMCwgcmV0LmRhdGEucmVzdWx0LmFkZHJlc3NfY29tcG9uZW50LmNpdHkubGVuZ3RoIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgJy9SZWdpb24vZ2V0Q2l0eUlkQnlDaXR5TmFtZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZ2xvYmFsLmxvY2F0aW9uLCByZXQuZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9iamVjdC5hc3NpZ24odGhpcy5nbG9iYWwuY2hvb3NlLCByZXQuZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsLmxvY2F0aW9uLmhhcyA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaWYgKCF3ZXB5LmdldFN0b3JhZ2VTeW5jKCdob3RDaXR5JykpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlcXVlc3QuR2V0KHtwcm92aW5jZUlkOiAtMX0sICcvUmVnaW9uL2dldENpdHlMaXN0JylcclxuICAgICAgICAgICAgICAgIC50aGVuKHJldCA9PiB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdob3RDaXR5JywgcmV0LmRhdGEpKVxyXG4gICAgICAgICAgICB9LCAzMDAwKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF3ZXB5LmdldFN0b3JhZ2VTeW5jKCd3b3JrTGlzdCcpKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZXF1ZXN0LkdldCh7fSwgJy9Xb3JrL2dldFdvcmtMaXN0JylcclxuICAgICAgICAgICAgICAgIC50aGVuKHJldCA9PiB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd3b3JrTGlzdCcsIHJldC5kYXRhKSlcclxuICAgICAgICAgICAgfSwgMzUwMClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF3ZXB5LmdldFN0b3JhZ2VTeW5jKCdyZWdpb24nKSkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVxdWVzdC5zcGVjaWFsKHt9LCAnL3JlZ2lvbi9nZXRBbGxMaXN0JylcclxuICAgICAgICAgICAgICAgIC50aGVuKHJldCA9PiB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdyZWdpb24nLCByZXQpKVxyXG4gICAgICAgICAgICB9LCA0MDAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VySW5mbyhjYikge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgaWYgKHRoaXMuZ2xvYmFsLnVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdsb2JhbC51c2VySW5mb1xyXG4gICAgICAgIH1cclxuICAgICAgICB3ZXB5LmdldFVzZXJJbmZvKHtcclxuICAgICAgICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lmdsb2JhbC51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gICAgICAgICAgICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=