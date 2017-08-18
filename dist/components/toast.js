'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toast = function (_wepy$component) {
    _inherits(Toast, _wepy$component);

    function Toast() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Toast);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Toast.__proto__ || Object.getPrototypeOf(Toast)).call.apply(_ref, [this].concat(args))), _this), _this.busy = false, _this.data = {
            hide: true,
            content: '还有未填项',
            top: 200
        }, _this.methods = {
            showToast: function showToast(_ref2) {
                var _this2 = this;

                var _ref2$content = _ref2.content,
                    content = _ref2$content === undefined ? '还有未填项' : _ref2$content,
                    _ref2$delay = _ref2.delay,
                    delay = _ref2$delay === undefined ? 1500 : _ref2$delay,
                    _ref2$top = _ref2.top,
                    top = _ref2$top === undefined ? 300 : _ref2$top;

                if (this.busy) {
                    return false;
                } else {
                    this.content = content;
                    this.busy = true;
                    this.hide = false;
                    this.$apply();
                    setTimeout(function () {
                        _this2.hide = true;
                        _this2.busy = false;
                        _this2.$apply();
                    }, delay);
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Toast;
}(_wepy2.default.component);

exports.default = Toast;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvYXN0LmpzIl0sIm5hbWVzIjpbIlRvYXN0IiwiYnVzeSIsImRhdGEiLCJoaWRlIiwiY29udGVudCIsInRvcCIsIm1ldGhvZHMiLCJzaG93VG9hc3QiLCJkZWxheSIsIiRhcHBseSIsInNldFRpbWVvdXQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLEksR0FBTyxLLFFBRVBDLEksR0FBTztBQUNIQyxrQkFBTSxJQURIO0FBRUhDLHFCQUFTLE9BRk47QUFHSEMsaUJBQUs7QUFIRixTLFFBTVBDLE8sR0FBVTtBQUNOQyxxQkFETSw0QkFDbUQ7QUFBQTs7QUFBQSwwQ0FBN0NILE9BQTZDO0FBQUEsb0JBQTdDQSxPQUE2QyxpQ0FBbkMsT0FBbUM7QUFBQSx3Q0FBMUJJLEtBQTBCO0FBQUEsb0JBQTFCQSxLQUEwQiwrQkFBbEIsSUFBa0I7QUFBQSxzQ0FBWkgsR0FBWTtBQUFBLG9CQUFaQSxHQUFZLDZCQUFOLEdBQU07O0FBQ3JELG9CQUFJLEtBQUtKLElBQVQsRUFBZTtBQUNYLDJCQUFPLEtBQVA7QUFDSCxpQkFGRCxNQUVPO0FBQ0gseUJBQUtHLE9BQUwsR0FBZUEsT0FBZjtBQUNBLHlCQUFLSCxJQUFMLEdBQVksSUFBWjtBQUNBLHlCQUFLRSxJQUFMLEdBQVksS0FBWjtBQUNBLHlCQUFLTSxNQUFMO0FBQ0FDLCtCQUFXLFlBQU07QUFDYiwrQkFBS1AsSUFBTCxHQUFZLElBQVo7QUFDQSwrQkFBS0YsSUFBTCxHQUFZLEtBQVo7QUFDQSwrQkFBS1EsTUFBTDtBQUNILHFCQUpELEVBSUdELEtBSkg7QUFLSDtBQUNKO0FBZkssUzs7OztFQVRxQixlQUFLRyxTOztrQkFBbkJYLEsiLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvYXN0IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgYnVzeSA9IGZhbHNlXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBoaWRlOiB0cnVlLFxyXG4gICAgICAgIGNvbnRlbnQ6ICfov5jmnInmnKrloavpobknLFxyXG4gICAgICAgIHRvcDogMjAwXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBzaG93VG9hc3QgKHtjb250ZW50ID0gJ+i/mOacieacquWhq+mhuScsIGRlbGF5ID0gMTUwMCwgdG9wID0gMzAwfSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5idXN5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnRcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVzeSA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXN5ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9LCBkZWxheSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=