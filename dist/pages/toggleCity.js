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

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _log = require('./../utils/log.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToggleCity = function (_wepy$page) {
    _inherits(ToggleCity, _wepy$page);

    function ToggleCity() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ToggleCity);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ToggleCity.__proto__ || Object.getPrototypeOf(ToggleCity)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '城市切换',
            enablePullDownRefresh: false,
            disableScroll: false
        }, _this.data = {
            loading: false,
            height: 0,
            location: '',
            hotCity: [],
            provList: [],
            cityList: [],
            activeProv: '',
            activeCity: ''
        }, _this.request = new _request2.default(), _this.components = {
            'loading': _loading2.default,
            'toast': _toast2.default
        }, _this.methods = {
            selectProv: function selectProv(item) {
                this.cityList = item.children;
                this.activeProv = item.value;
                // this.$parent.global.choose.selectProv = item.value
            },
            selectCity: function selectCity(item) {
                Object.assign(this.$parent.global.choose, { 'region_id': item.value, 'region_name': item.text });
                this.activeCity = item.value;
                _wepy2.default.reLaunch({ url: './jobs' });
            },
            selectHotCity: function selectHotCity(item) {
                Object.assign(this.$parent.global.choose, item);
                _wepy2.default.reLaunch({ url: './jobs' });
            },
            selectLocalCity: function selectLocalCity() {
                Object.assign(this.$parent.global.choose, this.$parent.global.location);
                _wepy2.default.reLaunch({ url: './jobs' });
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ToggleCity, [{
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
            var _this3 = this;

            var region = _wepy2.default.getStorageSync('region');
            var hotCity = _wepy2.default.getStorageSync('hotCity');
            if (region && hotCity) {
                region = Promise.resolve(region);
                hotCity = Promise.resolve({ data: hotCity });
            } else {
                // this.loading = true
                _wepy2.default.showLoading({ title: '加载中...', mask: true });
                hotCity = this.request.Get({ provinceId: -1 }, '/Region/getCityList');
                region = this.request.special({}, '/region/getAllList');
            }
            _wepy2.default.getSystemInfo({
                success: function success(res) {
                    wx.createSelectorQuery().select('.location').boundingClientRect().select('.hot-city').boundingClientRect().exec(function (_ref2) {
                        var _ref3 = _slicedToArray(_ref2, 2),
                            location = _ref3[0],
                            hotCity = _ref3[1];

                        _this3.height = res.windowHeight - location.height - hotCity.height;
                        _this3.$apply();
                    });
                }
            });
            // region = region ? Promise.resolve(region) : this.request.special({}, '/region/getAllList')
            Promise.all([hotCity, region]).then(function (_ref4) {
                var _ref5 = _slicedToArray(_ref4, 2),
                    data = _ref5[0].data,
                    region = _ref5[1];

                _this3.hotCity = data;
                _this3.provList = region;
                _this3.location = _this3.$parent.global.location.region_id === '0' ? '定位中...' : _this3.$parent.global.location.region_name;
                // this.activeProv = this.$parent.global.choose.selectProv
                // this.activeCity = this.$parent.global.choose.region_id
                // this.loading = false
                _wepy2.default.hideLoading();
                _this3.$apply();
            });
        }
    }]);

    return ToggleCity;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ToggleCity , 'pages/toggleCity'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZ2dsZUNpdHkuanMiXSwibmFtZXMiOlsiVG9nZ2xlQ2l0eSIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJsb2FkaW5nIiwiaGVpZ2h0IiwibG9jYXRpb24iLCJob3RDaXR5IiwicHJvdkxpc3QiLCJjaXR5TGlzdCIsImFjdGl2ZVByb3YiLCJhY3RpdmVDaXR5IiwicmVxdWVzdCIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwic2VsZWN0UHJvdiIsIml0ZW0iLCJjaGlsZHJlbiIsInZhbHVlIiwic2VsZWN0Q2l0eSIsIk9iamVjdCIsImFzc2lnbiIsIiRwYXJlbnQiLCJnbG9iYWwiLCJjaG9vc2UiLCJ0ZXh0IiwicmVMYXVuY2giLCJ1cmwiLCJzZWxlY3RIb3RDaXR5Iiwic2VsZWN0TG9jYWxDaXR5IiwiZXZlbnRzIiwiJGludm9rZSIsIm9uU29ja2V0TWVzc2FnZSIsImN1clZhbCIsIk51bWJlciIsInBhcnNlSW50IiwidG9hc3QiLCJjb250ZW50IiwicGFyYW1zIiwicmVnaW9uIiwiZ2V0U3RvcmFnZVN5bmMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiR2V0IiwicHJvdmluY2VJZCIsInNwZWNpYWwiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInd4IiwiY3JlYXRlU2VsZWN0b3JRdWVyeSIsInNlbGVjdCIsImJvdW5kaW5nQ2xpZW50UmVjdCIsImV4ZWMiLCJyZXMiLCJ3aW5kb3dIZWlnaHQiLCIkYXBwbHkiLCJhbGwiLCJ0aGVuIiwicmVnaW9uX2lkIiwicmVnaW9uX25hbWUiLCJoaWRlTG9hZGluZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsVTs7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QUF5QixvQkFBekIsQ0FBVDtBQUNIO0FBQ0QsMkJBQUtDLGFBQUwsQ0FBbUI7QUFDZkMseUJBQVMsc0JBQU87QUFDWkMsdUJBQUdDLG1CQUFILEdBQXlCQyxNQUF6QixDQUFnQyxXQUFoQyxFQUE2Q0Msa0JBQTdDLEdBQ0NELE1BREQsQ0FDUSxXQURSLEVBQ3FCQyxrQkFEckIsR0FDMENDLElBRDFDLENBQytDLGlCQUF5QjtBQUFBO0FBQUEsNEJBQXZCakQsUUFBdUI7QUFBQSw0QkFBYkMsT0FBYTs7QUFDcEUsK0JBQUtGLE1BQUwsR0FBY21ELElBQUlDLFlBQUosR0FBbUJuRCxTQUFTRCxNQUE1QixHQUFxQ0UsUUFBUUYsTUFBM0Q7QUFDQSwrQkFBS3FELE1BQUw7QUFDSCxxQkFKRDtBQUtIO0FBUGMsYUFBbkI7QUFTQTtBQUNBakIsb0JBQVFrQixHQUFSLENBQVksQ0FBQ3BELE9BQUQsRUFBVWdDLE1BQVYsQ0FBWixFQUNDcUIsSUFERCxDQUNNLGlCQUFzQjtBQUFBO0FBQUEsb0JBQW5CekQsSUFBbUIsWUFBbkJBLElBQW1CO0FBQUEsb0JBQVpvQyxNQUFZOztBQUN4Qix1QkFBS2hDLE9BQUwsR0FBZUosSUFBZjtBQUNBLHVCQUFLSyxRQUFMLEdBQWdCK0IsTUFBaEI7QUFDQSx1QkFBS2pDLFFBQUwsR0FBZ0IsT0FBS2dCLE9BQUwsQ0FBYUMsTUFBYixDQUFvQmpCLFFBQXBCLENBQTZCdUQsU0FBN0IsS0FBMkMsR0FBM0MsR0FBaUQsUUFBakQsR0FBNEQsT0FBS3ZDLE9BQUwsQ0FBYUMsTUFBYixDQUFvQmpCLFFBQXBCLENBQTZCd0QsV0FBekc7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBS0MsV0FBTDtBQUNBLHVCQUFLTCxNQUFMO0FBQ0gsYUFWRDtBQVdIOzs7O0VBOUZtQyxlQUFLTSxJOztrQkFBeEJuRSxVIiwiZmlsZSI6InRvZ2dsZUNpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFRvYXN0IGZyb20gJy4uL2NvbXBvbmVudHMvdG9hc3QnXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcbmltcG9ydCBsb2FkaW5nIGZyb20gJy4uL2NvbXBvbmVudHMvbG9hZGluZydcclxuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9nZ2xlQ2l0eSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2RhcmsnLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfln47luILliIfmjaInLFxyXG4gICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXHJcbiAgICAgICAgZGlzYWJsZVNjcm9sbDogZmFsc2VcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgIGxvY2F0aW9uOiAnJyxcclxuICAgICAgICBob3RDaXR5OiBbXSxcclxuICAgICAgICBwcm92TGlzdDogW10sXHJcbiAgICAgICAgY2l0eUxpc3Q6IFtdLFxyXG4gICAgICAgIGFjdGl2ZVByb3Y6ICcnLFxyXG4gICAgICAgIGFjdGl2ZUNpdHk6ICcnXHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KClcclxuXHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICdsb2FkaW5nJzogbG9hZGluZyxcclxuICAgICAgICAndG9hc3QnOiBUb2FzdFxyXG4gICAgfVxyXG5cclxuICAgIHRvYXN0IChkYXRhID0ge30pIHtcclxuICAgICAgICB0aGlzLiRpbnZva2UoJ3RvYXN0JywgJ3Nob3dUb2FzdCcsIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgb25TaG93ICgpIHtcclxuICAgICAgICB3ZXB5Lm9uU29ja2V0TWVzc2FnZShyZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCA9IE51bWJlci5wYXJzZUludCh0aGlzLiRwYXJlbnQuZ2xvYmFsLmN1clZhbCkgKyAxXHJcbiAgICAgICAgICAgIHRoaXMudG9hc3Qoe2NvbnRlbnQ6ICfmgqjmnInmlrDmtojmga8nfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgc2VsZWN0UHJvdiAoaXRlbSkge1xyXG4gICAgICAgICAgICB0aGlzLmNpdHlMaXN0ID0gaXRlbS5jaGlsZHJlblxyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVByb3YgPSBpdGVtLnZhbHVlXHJcbiAgICAgICAgICAgIC8vIHRoaXMuJHBhcmVudC5nbG9iYWwuY2hvb3NlLnNlbGVjdFByb3YgPSBpdGVtLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3RDaXR5IChpdGVtKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy4kcGFyZW50Lmdsb2JhbC5jaG9vc2UsIHsncmVnaW9uX2lkJzogaXRlbS52YWx1ZSwgJ3JlZ2lvbl9uYW1lJzogaXRlbS50ZXh0fSlcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVDaXR5ID0gaXRlbS52YWx1ZVxyXG4gICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHt1cmw6ICcuL2pvYnMnfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbGVjdEhvdENpdHkgKGl0ZW0pIHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLiRwYXJlbnQuZ2xvYmFsLmNob29zZSwgaXRlbSlcclxuICAgICAgICAgICAgd2VweS5yZUxhdW5jaCh7dXJsOiAnLi9qb2JzJ30pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3RMb2NhbENpdHkgKCkge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuJHBhcmVudC5nbG9iYWwuY2hvb3NlLCB0aGlzLiRwYXJlbnQuZ2xvYmFsLmxvY2F0aW9uKVxyXG4gICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHt1cmw6ICcuL2pvYnMnfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHBhcmFtcykge1xyXG4gICAgICAgIGxldCByZWdpb24gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdyZWdpb24nKVxyXG4gICAgICAgIGxldCBob3RDaXR5ID0gd2VweS5nZXRTdG9yYWdlU3luYygnaG90Q2l0eScpXHJcbiAgICAgICAgaWYgKHJlZ2lvbiAmJiBob3RDaXR5KSB7XHJcbiAgICAgICAgICAgIHJlZ2lvbiA9IFByb21pc2UucmVzb2x2ZShyZWdpb24pXHJcbiAgICAgICAgICAgIGhvdENpdHkgPSBQcm9taXNlLnJlc29sdmUoe2RhdGE6IGhvdENpdHl9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubG9hZGluZyA9IHRydWVcclxuICAgICAgICAgICAgd2VweS5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0uLi4nLCBtYXNrOiB0cnVlfSlcclxuICAgICAgICAgICAgaG90Q2l0eSA9IHRoaXMucmVxdWVzdC5HZXQoe3Byb3ZpbmNlSWQ6IC0xfSwgJy9SZWdpb24vZ2V0Q2l0eUxpc3QnKVxyXG4gICAgICAgICAgICByZWdpb24gPSB0aGlzLnJlcXVlc3Quc3BlY2lhbCh7fSwgJy9yZWdpb24vZ2V0QWxsTGlzdCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB3eC5jcmVhdGVTZWxlY3RvclF1ZXJ5KCkuc2VsZWN0KCcubG9jYXRpb24nKS5ib3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgICAgICAgICAgICAgLnNlbGVjdCgnLmhvdC1jaXR5JykuYm91bmRpbmdDbGllbnRSZWN0KCkuZXhlYygoW2xvY2F0aW9uLCBob3RDaXR5XSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCAtIGxvY2F0aW9uLmhlaWdodCAtIGhvdENpdHkuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gcmVnaW9uID0gcmVnaW9uID8gUHJvbWlzZS5yZXNvbHZlKHJlZ2lvbikgOiB0aGlzLnJlcXVlc3Quc3BlY2lhbCh7fSwgJy9yZWdpb24vZ2V0QWxsTGlzdCcpXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW2hvdENpdHksIHJlZ2lvbl0pXHJcbiAgICAgICAgLnRoZW4oKFt7ZGF0YX0sIHJlZ2lvbl0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ob3RDaXR5ID0gZGF0YVxyXG4gICAgICAgICAgICB0aGlzLnByb3ZMaXN0ID0gcmVnaW9uXHJcbiAgICAgICAgICAgIHRoaXMubG9jYXRpb24gPSB0aGlzLiRwYXJlbnQuZ2xvYmFsLmxvY2F0aW9uLnJlZ2lvbl9pZCA9PT0gJzAnID8gJ+WumuS9jeS4rS4uLicgOiB0aGlzLiRwYXJlbnQuZ2xvYmFsLmxvY2F0aW9uLnJlZ2lvbl9uYW1lXHJcbiAgICAgICAgICAgIC8vIHRoaXMuYWN0aXZlUHJvdiA9IHRoaXMuJHBhcmVudC5nbG9iYWwuY2hvb3NlLnNlbGVjdFByb3ZcclxuICAgICAgICAgICAgLy8gdGhpcy5hY3RpdmVDaXR5ID0gdGhpcy4kcGFyZW50Lmdsb2JhbC5jaG9vc2UucmVnaW9uX2lkXHJcbiAgICAgICAgICAgIC8vIHRoaXMubG9hZGluZyA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=