'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
            location: '',
            hotCity: [],
            provList: [],
            cityList: [],
            activeProv: '',
            activeCity: ''
        }, _this.request = new _request2.default(), _this.$props = { "loading": { "xmlns:v-bind": "", "v-bind:show.sync": "loading" } }, _this.$events = {}, _this.components = {
            'loading': _loading2.default
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
        key: 'onLoad',
        value: function onLoad(params) {
            var _this2 = this;

            var region = _wepy2.default.getStorageSync('region');
            var hotCity = _wepy2.default.getStorageSync('hotCity');
            if (region && hotCity) {
                region = Promise.resolve(region);
                hotCity = Promise.resolve({ data: hotCity });
            } else {
                this.loading = true;
                hotCity = this.request.Get({ provinceId: -1 }, '/Region/getCityList');
                region = this.request.special({}, '/region/getAllList');
            }
            // region = region ? Promise.resolve(region) : this.request.special({}, '/region/getAllList')
            Promise.all([hotCity, region]).then(function (_ref2) {
                var _ref3 = _slicedToArray(_ref2, 2),
                    data = _ref3[0].data,
                    region = _ref3[1];

                _this2.hotCity = data;
                _this2.provList = region;
                _this2.location = _this2.$parent.global.location.region_id === '0' ? '定位中...' : _this2.$parent.global.location.region_name;
                // this.activeProv = this.$parent.global.choose.selectProv
                // this.activeCity = this.$parent.global.choose.region_id
                _this2.loading = false;
                _this2.$apply();
            });
        }
    }]);

    return ToggleCity;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(ToggleCity , 'pages/toggleCity'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZ2dsZUNpdHkuanMiXSwibmFtZXMiOlsiVG9nZ2xlQ2l0eSIsImNvbmZpZyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGlzYWJsZVNjcm9sbCIsImRhdGEiLCJsb2FkaW5nIiwibG9jYXRpb24iLCJob3RDaXR5IiwicHJvdkxpc3QiLCJjaXR5TGlzdCIsImFjdGl2ZVByb3YiLCJhY3RpdmVDaXR5IiwicmVxdWVzdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibWV0aG9kcyIsInNlbGVjdFByb3YiLCJpdGVtIiwiY2hpbGRyZW4iLCJ2YWx1ZSIsInNlbGVjdENpdHkiLCJPYmplY3QiLCJhc3NpZ24iLCIkcGFyZW50IiwiZ2xvYmFsIiwiY2hvb3NlIiwidGV4dCIsInJlTGF1bmNoIiwidXJsIiwic2VsZWN0SG90Q2l0eSIsInNlbGVjdExvY2FsQ2l0eSIsImV2ZW50cyIsInBhcmFtcyIsInJlZ2lvbiIsImdldFN0b3JhZ2VTeW5jIiwiUHJvbWlzZSIsInJlc29sdmUiLCJHZXQiLCJwcm92aW5jZUlkIiwic3BlY2lhbCIsImFsbCIsInRoZW4iLCJyZWdpb25faWQiLCJyZWdpb25fbmFtZSIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7Ozs7O2tNQUNqQkMsTSxHQUFTO0FBQ0xDLGlDQUFxQixNQURoQjtBQUVMQyxvQ0FBd0IsTUFGbkI7QUFHTEMsbUNBQXVCLEtBSGxCO0FBSUxDLDJCQUFlO0FBSlYsUyxRQU1UQyxJLEdBQU87QUFDSEMscUJBQVMsS0FETjtBQUVIQyxzQkFBVSxFQUZQO0FBR0hDLHFCQUFTLEVBSE47QUFJSEMsc0JBQVUsRUFKUDtBQUtIQyxzQkFBVSxFQUxQO0FBTUhDLHdCQUFZLEVBTlQ7QUFPSEMsd0JB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IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvcmVxdWVzdCdcclxuaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xyXG5pbXBvcnQgeyBsb2cgfSBmcm9tICcuLi91dGlscy9sb2cnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2dnbGVDaXR5IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnZGFyaycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WfjuW4guWIh+aNoicsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgICAgICBkaXNhYmxlU2Nyb2xsOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICBsb2NhdGlvbjogJycsXHJcbiAgICAgICAgaG90Q2l0eTogW10sXHJcbiAgICAgICAgcHJvdkxpc3Q6IFtdLFxyXG4gICAgICAgIGNpdHlMaXN0OiBbXSxcclxuICAgICAgICBhY3RpdmVQcm92OiAnJyxcclxuICAgICAgICBhY3RpdmVDaXR5OiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAkcHJvcHMgPSB7XCJsb2FkaW5nXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzaG93LnN5bmNcIjpcImxvYWRpbmdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICdsb2FkaW5nJzogbG9hZGluZ1xyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgc2VsZWN0UHJvdiAoaXRlbSkge1xyXG4gICAgICAgICAgICB0aGlzLmNpdHlMaXN0ID0gaXRlbS5jaGlsZHJlblxyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVByb3YgPSBpdGVtLnZhbHVlXHJcbiAgICAgICAgICAgIC8vIHRoaXMuJHBhcmVudC5nbG9iYWwuY2hvb3NlLnNlbGVjdFByb3YgPSBpdGVtLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3RDaXR5IChpdGVtKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy4kcGFyZW50Lmdsb2JhbC5jaG9vc2UsIHsncmVnaW9uX2lkJzogaXRlbS52YWx1ZSwgJ3JlZ2lvbl9uYW1lJzogaXRlbS50ZXh0fSlcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVDaXR5ID0gaXRlbS52YWx1ZVxyXG4gICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHt1cmw6ICcuL2pvYnMnfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlbGVjdEhvdENpdHkgKGl0ZW0pIHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLiRwYXJlbnQuZ2xvYmFsLmNob29zZSwgaXRlbSlcclxuICAgICAgICAgICAgd2VweS5yZUxhdW5jaCh7dXJsOiAnLi9qb2JzJ30pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3RMb2NhbENpdHkgKCkge1xyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuJHBhcmVudC5nbG9iYWwuY2hvb3NlLCB0aGlzLiRwYXJlbnQuZ2xvYmFsLmxvY2F0aW9uKVxyXG4gICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHt1cmw6ICcuL2pvYnMnfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKHBhcmFtcykge1xyXG4gICAgICAgIGxldCByZWdpb24gPSB3ZXB5LmdldFN0b3JhZ2VTeW5jKCdyZWdpb24nKVxyXG4gICAgICAgIGxldCBob3RDaXR5ID0gd2VweS5nZXRTdG9yYWdlU3luYygnaG90Q2l0eScpXHJcbiAgICAgICAgaWYgKHJlZ2lvbiAmJiBob3RDaXR5KSB7XHJcbiAgICAgICAgICAgIHJlZ2lvbiA9IFByb21pc2UucmVzb2x2ZShyZWdpb24pXHJcbiAgICAgICAgICAgIGhvdENpdHkgPSBQcm9taXNlLnJlc29sdmUoe2RhdGE6IGhvdENpdHl9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWVcclxuICAgICAgICAgICAgaG90Q2l0eSA9IHRoaXMucmVxdWVzdC5HZXQoe3Byb3ZpbmNlSWQ6IC0xfSwgJy9SZWdpb24vZ2V0Q2l0eUxpc3QnKVxyXG4gICAgICAgICAgICByZWdpb24gPSB0aGlzLnJlcXVlc3Quc3BlY2lhbCh7fSwgJy9yZWdpb24vZ2V0QWxsTGlzdCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJlZ2lvbiA9IHJlZ2lvbiA/IFByb21pc2UucmVzb2x2ZShyZWdpb24pIDogdGhpcy5yZXF1ZXN0LnNwZWNpYWwoe30sICcvcmVnaW9uL2dldEFsbExpc3QnKVxyXG4gICAgICAgIFByb21pc2UuYWxsKFtob3RDaXR5LCByZWdpb25dKVxyXG4gICAgICAgIC50aGVuKChbe2RhdGF9LCByZWdpb25dKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaG90Q2l0eSA9IGRhdGFcclxuICAgICAgICAgICAgdGhpcy5wcm92TGlzdCA9IHJlZ2lvblxyXG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uID0gdGhpcy4kcGFyZW50Lmdsb2JhbC5sb2NhdGlvbi5yZWdpb25faWQgPT09ICcwJyA/ICflrprkvY3kuK0uLi4nIDogdGhpcy4kcGFyZW50Lmdsb2JhbC5sb2NhdGlvbi5yZWdpb25fbmFtZVxyXG4gICAgICAgICAgICAvLyB0aGlzLmFjdGl2ZVByb3YgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsLmNob29zZS5zZWxlY3RQcm92XHJcbiAgICAgICAgICAgIC8vIHRoaXMuYWN0aXZlQ2l0eSA9IHRoaXMuJHBhcmVudC5nbG9iYWwuY2hvb3NlLnJlZ2lvbl9pZFxyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=