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
            pages: ['pages/chatList', 'pages/chat', 'pages/jobs', 'pages/login', 'pages/mine', 'pages/resume', 'pages/companys', 'pages/allRecomend', 'pages/toggleCity', 'pages/classify', 'pages/search', 'pages/jobDetail', 'pages/company', 'pages/allProgress', 'pages/allShopJobs', 'pages/introduction', 'pages/resume-tag', 'pages/resume-exp', 'pages/resume-edu', 'pages/collect', 'pages/follow', 'pages/progress', 'pages/comment', 'pages/simpleResume', 'pages/setting'],
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
            (0, _storage.Get)('userId').then(function (ret) {
                (0, _socket.Create)().catch(function (err) {
                    console.log(err);
                });
                (0, _socket.OnOpen)().then(function (innerRet) {
                    (0, _socket.Init)(ret);
                }).catch(function (err) {
                    console.log(err);
                });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWwiLCJ1c2VySW5mbyIsImxvY2F0aW9uIiwiY2hvb3NlIiwiUmVxdWVzdCIsInVzZSIsImdldExvY2F0aW9uIiwic3VjY2VzcyIsInJlcXVlc3QiLCJ1cmwiLCJyZXQiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImRhdGEiLCJyZXN1bHQiLCJhZGRyZXNzX2NvbXBvbmVudCIsImNpdHkiLCJHZXQiLCJjaXR5TmFtZSIsInN1YnN0ciIsImxlbmd0aCIsInRoZW4iLCJPYmplY3QiLCJhc3NpZ24iLCJoYXMiLCJjYXRjaCIsImNvbnNvbGUiLCJsb2ciLCJlcnIiLCJzZXRUaW1lb3V0IiwicHJvdmluY2VJZCIsInNldFN0b3JhZ2VTeW5jIiwic3BlY2lhbCIsImNiIiwidGhhdCIsImdldFVzZXJJbmZvIiwicmVzIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFzRkksd0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxjQW5GZkEsTUFtRmUsR0FuRk47QUFDTEMsbUJBQU8sQ0FDSCxnQkFERyxFQUVILFlBRkcsRUFHSCxZQUhHLEVBSUgsYUFKRyxFQUtILFlBTEcsRUFNSCxjQU5HLEVBT0gsZ0JBUEcsRUFRSCxtQkFSRyxFQVNILGtCQVRHLEVBVUgsZ0JB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QU1DLE9BQU8sSUFBYjtBQUNBLGdCQUFJLEtBQUtsQyxNQUFMLENBQVlDLFFBQWhCLEVBQTBCO0FBQ3RCLHVCQUFPLEtBQUtELE1BQUwsQ0FBWUMsUUFBbkI7QUFDSDtBQUNELDJCQUFLa0MsV0FBTCxDQUFpQjtBQUNiNUIsdUJBRGEsbUJBQ0o2QixHQURJLEVBQ0M7QUFDVkYseUJBQUtsQyxNQUFMLENBQVlDLFFBQVosR0FBdUJtQyxJQUFJbkMsUUFBM0I7QUFDQWdDLDBCQUFNQSxHQUFHRyxJQUFJbkMsUUFBUCxDQUFOO0FBQ0g7QUFKWSxhQUFqQjtBQU1IOzs7O0VBMUp3QixlQUFLb0MsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQge0dldCwgU2V0fSBmcm9tICcuL3V0aWxzL3N0b3JhZ2UnXHJcbmltcG9ydCB7Q3JlYXRlLCBPbk9wZW4sIEluaXR9IGZyb20gJy4vdXRpbHMvc29ja2V0J1xyXG5pbXBvcnQgeyBRUU1BUEtFWSB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnRzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgcGFnZXM6IFtcclxuICAgICAgICAgICAgJ3BhZ2VzL2NoYXRMaXN0JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2NoYXQnLFxyXG4gICAgICAgICAgICAncGFnZXMvam9icycsXHJcbiAgICAgICAgICAgICdwYWdlcy9sb2dpbicsXHJcbiAgICAgICAgICAgICdwYWdlcy9taW5lJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3Jlc3VtZScsXHJcbiAgICAgICAgICAgICdwYWdlcy9jb21wYW55cycsXHJcbiAgICAgICAgICAgICdwYWdlcy9hbGxSZWNvbWVuZCcsXHJcbiAgICAgICAgICAgICdwYWdlcy90b2dnbGVDaXR5JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2NsYXNzaWZ5JyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3NlYXJjaCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9qb2JEZXRhaWwnLFxyXG4gICAgICAgICAgICAncGFnZXMvY29tcGFueScsXHJcbiAgICAgICAgICAgICdwYWdlcy9hbGxQcm9ncmVzcycsXHJcbiAgICAgICAgICAgICdwYWdlcy9hbGxTaG9wSm9icycsXHJcbiAgICAgICAgICAgICdwYWdlcy9pbnRyb2R1Y3Rpb24nLFxyXG4gICAgICAgICAgICAncGFnZXMvcmVzdW1lLXRhZycsXHJcbiAgICAgICAgICAgICdwYWdlcy9yZXN1bWUtZXhwJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3Jlc3VtZS1lZHUnLFxyXG4gICAgICAgICAgICAncGFnZXMvY29sbGVjdCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9mb2xsb3cnLFxyXG4gICAgICAgICAgICAncGFnZXMvcHJvZ3Jlc3MnLFxyXG4gICAgICAgICAgICAncGFnZXMvY29tbWVudCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9zaW1wbGVSZXN1bWUnLFxyXG4gICAgICAgICAgICAncGFnZXMvc2V0dGluZydcclxuICAgICAgICBdLFxyXG4gICAgICAgIHdpbmRvdzoge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflgaXouqvmsYLogYwnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjJmMmY1JyxcclxuICAgICAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0YWJCYXI6IHtcclxuICAgICAgICAgICAgY29sb3I6ICcjYWFhJyxcclxuICAgICAgICAgICAgc2VsZWN0ZWRDb2xvcjogJyM0MGM0ZmYnLFxyXG4gICAgICAgICAgICBib3JkZXJTdHlsZTogJ2JsYWNrJyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgICAgIGxpc3Q6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2pvYnMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfogYzkvY0nLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnLi9pbWFnZS9qb2JzLXRhYi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuL2ltYWdlL2pvYnMtdGFiLWhsLnBuZydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NvbXBhbnlzJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5YWs5Y+4JyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJy4vaW1hZ2UvY29tcGFueXMtdGFiLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy4vaW1hZ2UvY29tcGFueXMtdGFiLWhsLnBuZydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NoYXRMaXN0JyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5raI5oGvJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJy4vaW1hZ2UvbXNnLXRhYi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuL2ltYWdlL21zZy10YWItaGwucG5nJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvbWluZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+aIkScsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICcuL2ltYWdlL21pbmUtdGFiLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy4vaW1hZ2UvbWluZS10YWItaGwucG5nJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdsb2JhbCA9IHtcclxuICAgICAgICB1c2VySW5mbzogbnVsbCxcclxuICAgICAgICBsb2NhdGlvbjoge1xyXG4gICAgICAgICAgICAnaGFzJzogZmFsc2UsXHJcbiAgICAgICAgICAgICdyZWdpb25faWQnOiAnMCcsXHJcbiAgICAgICAgICAgICdyZWdpb25fbmFtZSc6ICflhajlm70nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaG9vc2U6IHtcclxuICAgICAgICAgICAgJ3NlbGVjdFByb3YnOiAnMCcsXHJcbiAgICAgICAgICAgICdyZWdpb25faWQnOiAnMCcsXHJcbiAgICAgICAgICAgICdyZWdpb25fbmFtZSc6ICflhajlm70nXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXHJcbiAgICB9XHJcblxyXG4gICAgb25MYXVuY2goKSB7XHJcbiAgICAgICAgd2VweS5nZXRMb2NhdGlvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogYGh0dHBzOi8vYXBpcy5tYXAucXEuY29tL3dzL2dlb2NvZGVyL3YxLz9sb2NhdGlvbj0ke3JldC5sYXRpdHVkZX0sJHtyZXQubG9uZ2l0dWRlfSZrZXk9JHtRUU1BUEtFWX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmV0LmRhdGEucmVzdWx0LmFkZHJlc3NfY29tcG9uZW50LmNpdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eU5hbWU6IHJldC5kYXRhLnJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudC5jaXR5LnN1YnN0cigwLCByZXQuZGF0YS5yZXN1bHQuYWRkcmVzc19jb21wb25lbnQuY2l0eS5sZW5ndGggLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAnL1JlZ2lvbi9nZXRDaXR5SWRCeUNpdHlOYW1lJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5nbG9iYWwubG9jYXRpb24sIHJldC5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT2JqZWN0LmFzc2lnbih0aGlzLmdsb2JhbC5jaG9vc2UsIHJldC5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWwubG9jYXRpb24uaGFzID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIEdldCgndXNlcklkJykudGhlbihyZXQgPT4ge1xyXG4gICAgICAgICAgICBDcmVhdGUoKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBPbk9wZW4oKS50aGVuKGlubmVyUmV0ID0+IHtcclxuICAgICAgICAgICAgICAgIEluaXQocmV0KVxyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgR2V0KCd0b3BDaGF0JykuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBTZXQoJ3RvcENoYXQnLCBbXSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIEdldCgnaG90Q2l0eScpLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlcXVlc3QuR2V0KHtwcm92aW5jZUlkOiAtMX0sICcvUmVnaW9uL2dldENpdHlMaXN0JylcclxuICAgICAgICAgICAgICAgIC50aGVuKHJldCA9PiB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdob3RDaXR5JywgcmV0LmRhdGEpKVxyXG4gICAgICAgICAgICB9LCAzMDAwKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgR2V0KCd3b3JrTGlzdCcpLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlcXVlc3QuR2V0KHt9LCAnL1dvcmsvZ2V0V29ya0xpc3QnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3dvcmtMaXN0JywgcmV0LmRhdGEpKVxyXG4gICAgICAgICAgICB9LCAzNTAwKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgR2V0KCdyZWdpb24nKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZXF1ZXN0LnNwZWNpYWwoe30sICcvcmVnaW9uL2dldEFsbExpc3QnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3JlZ2lvbicsIHJldCkpXHJcbiAgICAgICAgICAgIH0sIDQwMDApXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VySW5mbyhjYikge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgaWYgKHRoaXMuZ2xvYmFsLnVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdsb2JhbC51c2VySW5mb1xyXG4gICAgICAgIH1cclxuICAgICAgICB3ZXB5LmdldFVzZXJJbmZvKHtcclxuICAgICAgICAgICAgc3VjY2VzcyAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lmdsb2JhbC51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gICAgICAgICAgICAgICAgY2IgJiYgY2IocmVzLnVzZXJJbmZvKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=