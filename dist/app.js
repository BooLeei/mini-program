'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _storage = require('./utils/storage.js');

var _socket = require('./utils/socket.js');

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
            pages: ['pages/jobs', 'pages/login', 'pages/mine', 'pages/chatList', 'pages/chat', 'pages/resume', 'pages/companys', 'pages/allRecomend', 'pages/toggleCity', 'pages/classify', 'pages/search', 'pages/jobDetail', 'pages/company', 'pages/allProgress', 'pages/allShopJobs', 'pages/introduction', 'pages/resume-tag', 'pages/resume-exp', 'pages/resume-edu', 'pages/collect', 'pages/follow', 'pages/progress', 'pages/comment', 'pages/simpleResume', 'pages/setting', 'pages/account-setting', 'pages/account-tel', 'pages/account-password', 'pages/interest'],
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
            },
            initVal: 0,
            curVal: 0
        };
        _this.Request = new _request2.default();
        _this.intervalSocket = 0;

        _this.use('requestfix');
        return _this;
    }

    _createClass(_default, [{
        key: 'onLaunch',
        value: function onLaunch() {
            var _this2 = this;

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
            (0, _storage.Get)('topChat').catch(function () {
                (0, _storage.Set)('topChat', []);
            });
            (0, _storage.Get)('hotCity').catch(function () {
                setTimeout(function () {
                    _this2.Request.Get({ provinceId: -1 }, '/Region/getCityList').then(function (ret) {
                        return _wepy2.default.setStorageSync('hotCity', ret.data);
                    });
                }, 3000);
            });
            (0, _storage.Get)('workList').catch(function () {
                setTimeout(function () {
                    _this2.Request.Get({}, '/Work/getWorkList').then(function (ret) {
                        return _wepy2.default.setStorageSync('workList', ret.data);
                    });
                }, 3500);
            });
            (0, _storage.Get)('region').catch(function () {
                setTimeout(function () {
                    _this2.Request.special({}, '/region/getAllList').then(function (ret) {
                        return _wepy2.default.setStorageSync('region', ret);
                    });
                }, 4000);
            });
        }
    }, {
        key: 'restartSocket',
        value: function restartSocket(id) {
            (0, _socket.Create)();
            (0, _socket.OnOpen)().then(function () {
                console.log('open success');
                (0, _socket.Init)(id);
            }).catch(function () {
                console.log('open fali');
            });
        }
    }, {
        key: 'keepSocket',
        value: function keepSocket(id) {
            var _this3 = this;

            this.restartSocket(id);
            this.intervalSocket = setInterval(function () {
                if (_this3.global.curVal != _this3.global.initVal) {
                    _this3.global.initVal = _this3.global.curVal;
                } else {
                    _this3.restartSocket(id);
                    _this3.global.initVal = _this3.global.curVal;
                }
            }, 50000);
        }
    }, {
        key: 'clearSocket',
        value: function clearSocket() {
            clearInterval(this.intervalSocket);
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            var _this4 = this;

            (0, _storage.Get)('userId').then(function (id) {
                _this4.keepSocket(id);
            }).catch(function () {});
        }
    }, {
        key: 'onHide',
        value: function onHide() {
            var _this5 = this;

            (0, _storage.Get)('userId').then(function (ret) {
                _this5.clearSocket();
                _this5.global.initVal = 0;
                _this5.global.curVal = 0;
                (0, _socket.Close)().then(function () {
                    console.log('close success');
                }).catch(function () {
                    console.log('close fail');
                });
            }).catch(function () {});
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWwiLCJ1c2VySW5mbyIsImxvY2F0aW9uIiwiY2hvb3NlIiwiaW5pdFZhbCIsImN1clZhbCIsIlJlcXVlc3QiLCJpbnRlcnZhbFNvY2tldCIsInVzZSIsImdldExvY2F0aW9uIiwic3VjY2VzcyIsInJlcXVlc3QiLCJ1cmwiLCJyZXQiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImRhdGEiLCJyZXN1bHQiLCJhZGRyZXNzX2NvbXBvbmVudCIsImNpdHkiLCJHZXQiLCJjaXR5TmFtZSIsInN1YnN0ciIsImxlbmd0aCIsInRoZW4iLCJPYmplY3QiLCJhc3NpZ24iLCJoYXMiLCJjYXRjaCIsInNldFRpbWVvdXQiLCJwcm92aW5jZUlkIiwic2V0U3RvcmFnZVN5bmMiLCJzcGVjaWFsIiwiaWQiLCJjb25zb2xlIiwibG9nIiwicmVzdGFydFNvY2tldCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImtlZXBTb2NrZXQiLCJjbGVhclNvY2tldCIsImNiIiwidGhhdCIsImdldFVzZXJJbmZvIiwicmVzIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUE0Rkksd0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxjQXpGZkEsTUF5RmUsR0F6Rk47QUFDTEMs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QUFNO0FBQ1hNLDRCQUFRQyxHQUFSLENBQVksWUFBWjtBQUNILGlCQUpEO0FBS0gsYUFURCxFQVNHUCxLQVRILENBU1MsWUFBTSxDQUFFLENBVGpCO0FBVUg7OztvQ0FFV2EsRSxFQUFJO0FBQ1osZ0JBQU1DLE9BQU8sSUFBYjtBQUNBLGdCQUFJLEtBQUsxQyxNQUFMLENBQVlDLFFBQWhCLEVBQTBCO0FBQ3RCLHVCQUFPLEtBQUtELE1BQUwsQ0FBWUMsUUFBbkI7QUFDSDtBQUNELDJCQUFLMEMsV0FBTCxDQUFpQjtBQUNiakMsdUJBRGEsbUJBQ0prQyxHQURJLEVBQ0M7QUFDVkYseUJBQUsxQyxNQUFMLENBQVlDLFFBQVosR0FBdUIyQyxJQUFJM0MsUUFBM0I7QUFDQXdDLDBCQUFNQSxHQUFHRyxJQUFJM0MsUUFBUCxDQUFOO0FBQ0g7QUFKWSxhQUFqQjtBQU1IOzs7O0VBck13QixlQUFLNEMsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQge0dldCwgU2V0fSBmcm9tICcuL3V0aWxzL3N0b3JhZ2UnXHJcbmltcG9ydCB7Q3JlYXRlLCBPbk9wZW4sIEluaXQsIENsb3NlfSBmcm9tICcuL3V0aWxzL3NvY2tldCdcclxuaW1wb3J0IHsgUVFNQVBLRVkgfSBmcm9tICcuL3V0aWxzL2NvbnN0YW50cydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIHBhZ2VzOiBbXHJcbiAgICAgICAgICAgICdwYWdlcy9qb2JzJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2xvZ2luJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL21pbmUnLFxyXG4gICAgICAgICAgICAncGFnZXMvY2hhdExpc3QnLFxyXG4gICAgICAgICAgICAncGFnZXMvY2hhdCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9yZXN1bWUnLFxyXG4gICAgICAgICAgICAncGFnZXMvY29tcGFueXMnLFxyXG4gICAgICAgICAgICAncGFnZXMvYWxsUmVjb21lbmQnLFxyXG4gICAgICAgICAgICAncGFnZXMvdG9nZ2xlQ2l0eScsXHJcbiAgICAgICAgICAgICdwYWdlcy9jbGFzc2lmeScsXHJcbiAgICAgICAgICAgICdwYWdlcy9zZWFyY2gnLFxyXG4gICAgICAgICAgICAncGFnZXMvam9iRGV0YWlsJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2NvbXBhbnknLFxyXG4gICAgICAgICAgICAncGFnZXMvYWxsUHJvZ3Jlc3MnLFxyXG4gICAgICAgICAgICAncGFnZXMvYWxsU2hvcEpvYnMnLFxyXG4gICAgICAgICAgICAncGFnZXMvaW50cm9kdWN0aW9uJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3Jlc3VtZS10YWcnLFxyXG4gICAgICAgICAgICAncGFnZXMvcmVzdW1lLWV4cCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9yZXN1bWUtZWR1JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2NvbGxlY3QnLFxyXG4gICAgICAgICAgICAncGFnZXMvZm9sbG93JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3Byb2dyZXNzJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2NvbW1lbnQnLFxyXG4gICAgICAgICAgICAncGFnZXMvc2ltcGxlUmVzdW1lJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3NldHRpbmcnLFxyXG4gICAgICAgICAgICAncGFnZXMvYWNjb3VudC1zZXR0aW5nJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2FjY291bnQtdGVsJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2FjY291bnQtcGFzc3dvcmQnLFxyXG4gICAgICAgICAgICAncGFnZXMvaW50ZXJlc3QnXHJcbiAgICAgICAgXSxcclxuICAgICAgICB3aW5kb3c6IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5YGl6Lqr5rGC6IGMJyxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2YyZjJmNScsXHJcbiAgICAgICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGFiQmFyOiB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAnI2FhYScsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkQ29sb3I6ICcjNDBjNGZmJyxcclxuICAgICAgICAgICAgYm9yZGVyU3R5bGU6ICdibGFjaycsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxyXG4gICAgICAgICAgICBsaXN0OiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9qb2JzJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn6IGM5L2NJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJy4vaW1hZ2Uvam9icy10YWIucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnLi9pbWFnZS9qb2JzLXRhYi1obC5wbmcnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jb21wYW55cycsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+WFrOWPuCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICcuL2ltYWdlL2NvbXBhbnlzLXRhYi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuL2ltYWdlL2NvbXBhbnlzLXRhYi1obC5wbmcnXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhdGg6ICdwYWdlcy9jaGF0TGlzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+a2iOaBrycsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICcuL2ltYWdlL21zZy10YWIucG5nJyxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnLi9pbWFnZS9tc2ctdGFiLWhsLnBuZydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL21pbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfmiJEnLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnLi9pbWFnZS9taW5lLXRhYi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuL2ltYWdlL21pbmUtdGFiLWhsLnBuZydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnbG9iYWwgPSB7XHJcbiAgICAgICAgdXNlckluZm86IG51bGwsXHJcbiAgICAgICAgbG9jYXRpb246IHtcclxuICAgICAgICAgICAgJ2hhcyc6IGZhbHNlLFxyXG4gICAgICAgICAgICAncmVnaW9uX2lkJzogJzAnLFxyXG4gICAgICAgICAgICAncmVnaW9uX25hbWUnOiAn5YWo5Zu9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hvb3NlOiB7XHJcbiAgICAgICAgICAgICdzZWxlY3RQcm92JzogJzAnLFxyXG4gICAgICAgICAgICAncmVnaW9uX2lkJzogJzAnLFxyXG4gICAgICAgICAgICAncmVnaW9uX25hbWUnOiAn5YWo5Zu9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdFZhbDogMCxcclxuICAgICAgICBjdXJWYWw6IDBcclxuICAgIH1cclxuXHJcbiAgICBSZXF1ZXN0ID0gbmV3IFJlcXVlc3QoKVxyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG4gICAgfVxyXG5cclxuICAgIG9uTGF1bmNoKCkge1xyXG4gICAgICAgIHdlcHkuZ2V0TG9jYXRpb24oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBodHRwczovL2FwaXMubWFwLnFxLmNvbS93cy9nZW9jb2Rlci92MS8/bG9jYXRpb249JHtyZXQubGF0aXR1ZGV9LCR7cmV0LmxvbmdpdHVkZX0ma2V5PSR7UVFNQVBLRVl9YCxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJldC5kYXRhLnJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudC5jaXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLlJlcXVlc3QuR2V0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpdHlOYW1lOiByZXQuZGF0YS5yZXN1bHQuYWRkcmVzc19jb21wb25lbnQuY2l0eS5zdWJzdHIoMCwgcmV0LmRhdGEucmVzdWx0LmFkZHJlc3NfY29tcG9uZW50LmNpdHkubGVuZ3RoIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgJy9SZWdpb24vZ2V0Q2l0eUlkQnlDaXR5TmFtZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZ2xvYmFsLmxvY2F0aW9uLCByZXQuZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9iamVjdC5hc3NpZ24odGhpcy5nbG9iYWwuY2hvb3NlLCByZXQuZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFsLmxvY2F0aW9uLmhhcyA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBHZXQoJ3RvcENoYXQnKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIFNldCgndG9wQ2hhdCcsIFtdKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgR2V0KCdob3RDaXR5JykuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVxdWVzdC5HZXQoe3Byb3ZpbmNlSWQ6IC0xfSwgJy9SZWdpb24vZ2V0Q2l0eUxpc3QnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHdlcHkuc2V0U3RvcmFnZVN5bmMoJ2hvdENpdHknLCByZXQuZGF0YSkpXHJcbiAgICAgICAgICAgIH0sIDMwMDApXHJcbiAgICAgICAgfSlcclxuICAgICAgICBHZXQoJ3dvcmtMaXN0JykuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVxdWVzdC5HZXQoe30sICcvV29yay9nZXRXb3JrTGlzdCcpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXQgPT4gd2VweS5zZXRTdG9yYWdlU3luYygnd29ya0xpc3QnLCByZXQuZGF0YSkpXHJcbiAgICAgICAgICAgIH0sIDM1MDApXHJcbiAgICAgICAgfSlcclxuICAgICAgICBHZXQoJ3JlZ2lvbicpLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlcXVlc3Quc3BlY2lhbCh7fSwgJy9yZWdpb24vZ2V0QWxsTGlzdCcpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXQgPT4gd2VweS5zZXRTdG9yYWdlU3luYygncmVnaW9uJywgcmV0KSlcclxuICAgICAgICAgICAgfSwgNDAwMClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RhcnRTb2NrZXQgKGlkKSB7XHJcbiAgICAgICAgQ3JlYXRlKClcclxuICAgICAgICBPbk9wZW4oKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ29wZW4gc3VjY2VzcycpXHJcbiAgICAgICAgICAgIEluaXQoaWQpXHJcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb3BlbiBmYWxpJylcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGludGVydmFsU29ja2V0ID0gMFxyXG5cclxuICAgIGtlZXBTb2NrZXQgKGlkKSB7XHJcbiAgICAgICAgdGhpcy5yZXN0YXJ0U29ja2V0KGlkKVxyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWxTb2NrZXQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbC5jdXJWYWwgIT0gdGhpcy5nbG9iYWwuaW5pdFZhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWwuaW5pdFZhbCA9IHRoaXMuZ2xvYmFsLmN1clZhbFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0YXJ0U29ja2V0KGlkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWwuaW5pdFZhbCA9IHRoaXMuZ2xvYmFsLmN1clZhbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgNTAwMDApXHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJTb2NrZXQgKCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbFNvY2tldClcclxuICAgIH1cclxuXHJcbiAgICBvblNob3cgKCkge1xyXG4gICAgICAgIEdldCgndXNlcklkJykudGhlbihpZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMua2VlcFNvY2tldChpZClcclxuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7fSlcclxuICAgIH1cclxuXHJcbiAgICBvbkhpZGUgKCkge1xyXG4gICAgICAgIEdldCgndXNlcklkJykudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyU29ja2V0KClcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWwuaW5pdFZhbCA9IDBcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWwuY3VyVmFsID0gMFxyXG4gICAgICAgICAgICBDbG9zZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nsb3NlIHN1Y2Nlc3MnKVxyXG4gICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY2xvc2UgZmFpbCcpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4ge30pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlckluZm8oY2IpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICAgIGlmICh0aGlzLmdsb2JhbC51c2VySW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nbG9iYWwudXNlckluZm9cclxuICAgICAgICB9XHJcbiAgICAgICAgd2VweS5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5nbG9iYWwudXNlckluZm8gPSByZXMudXNlckluZm9cclxuICAgICAgICAgICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19