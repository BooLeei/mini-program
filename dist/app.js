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
            pages: ['pages/jobs', 'pages/mine', 'pages/resume', 'pages/companys', 'pages/allRecomend', 'pages/chatList', 'pages/toggleCity', 'pages/classify', 'pages/search', 'pages/jobDetail', 'pages/company', 'pages/allProgress', 'pages/allShopJobs', 'pages/introduction', 'pages/followCompany', 'pages/resume-tag', 'pages/resume-exp', 'pages/resume-edu', 'pages/collect', 'pages/follow', 'pages/progress', 'pages/comment'],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJ0YWJCYXIiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJib3JkZXJTdHlsZSIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJnbG9iYWwiLCJ1c2VySW5mbyIsImxvY2F0aW9uIiwiY2hvb3NlIiwiUmVxdWVzdCIsInVzZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRMb2NhdGlvbiIsInN1Y2Nlc3MiLCJyZXF1ZXN0IiwidXJsIiwicmV0IiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJHZXQiLCJjaXR5TmFtZSIsImRhdGEiLCJyZXN1bHQiLCJhZGRyZXNzX2NvbXBvbmVudCIsImNpdHkiLCJzdWJzdHIiLCJsZW5ndGgiLCJ0aGVuIiwiT2JqZWN0IiwiYXNzaWduIiwiaGFzIiwiZ2V0U3RvcmFnZVN5bmMiLCJzZXRUaW1lb3V0IiwicHJvdmluY2VJZCIsInNldFN0b3JhZ2VTeW5jIiwic3BlY2lhbCIsImNiIiwidGhhdCIsImdldFVzZXJJbmZvIiwicmVzIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFtRkksd0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxjQWhGZkEsTUFnRmUsR0FoRk47QUFDTEMsbUJBQU8sQ0FDSCxZQURHLEVBRUgsWUFGRyxFQUdILGNBSEcsRUFJSCxnQkFKRyxFQUtILG1CQUxHLEVBTUgsZ0JBTkcsRUFPSCxrQkFQRyxFQVFILGdCQVJHLEVBU0gsY0FURyxFQVVILGlCQVZHLEVBV0gs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LGdCQUFJLENBQUMsZUFBS1UsY0FBTCxDQUFvQixVQUFwQixDQUFMLEVBQXNDO0FBQ2xDQywyQkFBVyxZQUFNO0FBQ2IsMkJBQUt4QixPQUFMLENBQWFXLEdBQWIsQ0FBaUIsRUFBakIsRUFBcUIsbUJBQXJCLEVBQ0NRLElBREQsQ0FDTTtBQUFBLCtCQUFPLGVBQUtPLGNBQUwsQ0FBb0IsVUFBcEIsRUFBZ0NsQixJQUFJSyxJQUFwQyxDQUFQO0FBQUEscUJBRE47QUFFSCxpQkFIRCxFQUdHLElBSEg7QUFJSDtBQUNELGdCQUFJLENBQUMsZUFBS1UsY0FBTCxDQUFvQixRQUFwQixDQUFMLEVBQW9DO0FBQ2hDQywyQkFBVyxZQUFNO0FBQ2IsMkJBQUt4QixPQUFMLENBQWEyQixPQUFiLENBQXFCLEVBQXJCLEVBQXlCLG9CQUF6QixFQUNDUixJQURELENBQ007QUFBQSwrQkFBTyxlQUFLTyxjQUFMLENBQW9CLFFBQXBCLEVBQThCbEIsR0FBOUIsQ0FBUDtBQUFBLHFCQUROO0FBRUgsaUJBSEQsRUFHRyxJQUhIO0FBSUg7QUFDSjs7O29DQUVXb0IsRSxFQUFJO0FBQ1osZ0JBQU1DLE9BQU8sSUFBYjtBQUNBLGdCQUFJLEtBQUtqQyxNQUFMLENBQVlDLFFBQWhCLEVBQTBCO0FBQ3RCLHVCQUFPLEtBQUtELE1BQUwsQ0FBWUMsUUFBbkI7QUFDSDtBQUNELDJCQUFLaUMsV0FBTCxDQUFpQjtBQUNiekIsdUJBRGEsbUJBQ0owQixHQURJLEVBQ0M7QUFDVkYseUJBQUtqQyxNQUFMLENBQVlDLFFBQVosR0FBdUJrQyxJQUFJbEMsUUFBM0I7QUFDQStCLDBCQUFNQSxHQUFHRyxJQUFJbEMsUUFBUCxDQUFOO0FBQ0g7QUFKWSxhQUFqQjtBQU1IOzs7O0VBMUl3QixlQUFLbUMsRyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi91dGlscy9yZXF1ZXN0J1xyXG5pbXBvcnQgeyBRUU1BUEtFWSB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnRzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgcGFnZXM6IFtcclxuICAgICAgICAgICAgJ3BhZ2VzL2pvYnMnLFxyXG4gICAgICAgICAgICAncGFnZXMvbWluZScsXHJcbiAgICAgICAgICAgICdwYWdlcy9yZXN1bWUnLFxyXG4gICAgICAgICAgICAncGFnZXMvY29tcGFueXMnLFxyXG4gICAgICAgICAgICAncGFnZXMvYWxsUmVjb21lbmQnLFxyXG4gICAgICAgICAgICAncGFnZXMvY2hhdExpc3QnLFxyXG4gICAgICAgICAgICAncGFnZXMvdG9nZ2xlQ2l0eScsXHJcbiAgICAgICAgICAgICdwYWdlcy9jbGFzc2lmeScsXHJcbiAgICAgICAgICAgICdwYWdlcy9zZWFyY2gnLFxyXG4gICAgICAgICAgICAncGFnZXMvam9iRGV0YWlsJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2NvbXBhbnknLFxyXG4gICAgICAgICAgICAncGFnZXMvYWxsUHJvZ3Jlc3MnLFxyXG4gICAgICAgICAgICAncGFnZXMvYWxsU2hvcEpvYnMnLFxyXG4gICAgICAgICAgICAncGFnZXMvaW50cm9kdWN0aW9uJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL2ZvbGxvd0NvbXBhbnknLFxyXG4gICAgICAgICAgICAncGFnZXMvcmVzdW1lLXRhZycsXHJcbiAgICAgICAgICAgICdwYWdlcy9yZXN1bWUtZXhwJyxcclxuICAgICAgICAgICAgJ3BhZ2VzL3Jlc3VtZS1lZHUnLFxyXG4gICAgICAgICAgICAncGFnZXMvY29sbGVjdCcsXHJcbiAgICAgICAgICAgICdwYWdlcy9mb2xsb3cnLFxyXG4gICAgICAgICAgICAncGFnZXMvcHJvZ3Jlc3MnLFxyXG4gICAgICAgICAgICAncGFnZXMvY29tbWVudCdcclxuICAgICAgICBdLFxyXG4gICAgICAgIHdpbmRvdzoge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflgaXouqvmsYLogYwnLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnYmxhY2snLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZjJmMmY1JyxcclxuICAgICAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0YWJCYXI6IHtcclxuICAgICAgICAgICAgY29sb3I6ICcjYWFhJyxcclxuICAgICAgICAgICAgc2VsZWN0ZWRDb2xvcjogJyM0MGM0ZmYnLFxyXG4gICAgICAgICAgICBib3JkZXJTdHlsZTogJ2JsYWNrJyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgICAgIGxpc3Q6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2pvYnMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICfogYzkvY0nLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25QYXRoOiAnLi9pbWFnZS9qb2JzLXRhYi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuL2ltYWdlL2pvYnMtdGFiLWhsLnBuZydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NvbXBhbnlzJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5YWs5Y+4JyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJy4vaW1hZ2UvY29tcGFueXMtdGFiLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy4vaW1hZ2UvY29tcGFueXMtdGFiLWhsLnBuZydcclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGF0aDogJ3BhZ2VzL2NoYXRMaXN0JyxcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn5raI5oGvJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uUGF0aDogJy4vaW1hZ2UvbXNnLXRhYi5wbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICcuL2ltYWdlL21zZy10YWItaGwucG5nJ1xyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvbWluZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+aIkScsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblBhdGg6ICcuL2ltYWdlL21pbmUtdGFiLnBuZycsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJy4vaW1hZ2UvbWluZS10YWItaGwucG5nJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdsb2JhbCA9IHtcclxuICAgICAgICB1c2VySW5mbzogbnVsbCxcclxuICAgICAgICBsb2NhdGlvbjoge1xyXG4gICAgICAgICAgICAnaGFzJzogZmFsc2UsXHJcbiAgICAgICAgICAgICdyZWdpb25faWQnOiAnMCcsXHJcbiAgICAgICAgICAgICdyZWdpb25fbmFtZSc6ICflhajlm70nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaG9vc2U6IHtcclxuICAgICAgICAgICAgJ3NlbGVjdFByb3YnOiAnMCcsXHJcbiAgICAgICAgICAgICdyZWdpb25faWQnOiAnMCcsXHJcbiAgICAgICAgICAgICdyZWdpb25fbmFtZSc6ICflhajlm70nXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLnVzZSgncmVxdWVzdGZpeCcpXHJcbiAgICB9XHJcblxyXG4gICAgb25MYXVuY2goKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coUVFNQVBLRVkpXHJcbiAgICAgICAgd2VweS5nZXRMb2NhdGlvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogYGh0dHBzOi8vYXBpcy5tYXAucXEuY29tL3dzL2dlb2NvZGVyL3YxLz9sb2NhdGlvbj0ke3JldC5sYXRpdHVkZX0sJHtyZXQubG9uZ2l0dWRlfSZrZXk9JHtRUU1BUEtFWX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuUmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2l0eU5hbWU6IHJldC5kYXRhLnJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudC5jaXR5LnN1YnN0cigwLCByZXQuZGF0YS5yZXN1bHQuYWRkcmVzc19jb21wb25lbnQuY2l0eS5sZW5ndGggLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAnL1JlZ2lvbi9nZXRDaXR5SWRCeUNpdHlOYW1lJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5nbG9iYWwubG9jYXRpb24sIHJldC5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT2JqZWN0LmFzc2lnbih0aGlzLmdsb2JhbC5jaG9vc2UsIHJldC5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nbG9iYWwubG9jYXRpb24uaGFzID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBpZiAoIXdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2hvdENpdHknKSkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVxdWVzdC5HZXQoe3Byb3ZpbmNlSWQ6IC0xfSwgJy9SZWdpb24vZ2V0Q2l0eUxpc3QnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHdlcHkuc2V0U3RvcmFnZVN5bmMoJ2hvdENpdHknLCByZXQuZGF0YSkpXHJcbiAgICAgICAgICAgIH0sIDMwMDApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3dvcmtMaXN0JykpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlcXVlc3QuR2V0KHt9LCAnL1dvcmsvZ2V0V29ya0xpc3QnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3dvcmtMaXN0JywgcmV0LmRhdGEpKVxyXG4gICAgICAgICAgICB9LCAzNTAwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3JlZ2lvbicpKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZXF1ZXN0LnNwZWNpYWwoe30sICcvcmVnaW9uL2dldEFsbExpc3QnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmV0ID0+IHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3JlZ2lvbicsIHJldCkpXHJcbiAgICAgICAgICAgIH0sIDQwMDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJJbmZvKGNiKSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgICBpZiAodGhpcy5nbG9iYWwudXNlckluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsLnVzZXJJbmZvXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdlcHkuZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgICBzdWNjZXNzIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZ2xvYmFsLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXHJcbiAgICAgICAgICAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==