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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Toast.__proto__ || Object.getPrototypeOf(Toast)).call.apply(_ref, [this].concat(args))), _this), _this.busy = 0, _this.data = {
            hide: true,
            content: '还有未填项',
            top: 200
        }, _this.methods = {
            showToast: function showToast(_ref2) {
                var _this2 = this;

                var _ref2$content = _ref2.content,
                    content = _ref2$content === undefined ? '还有未填项' : _ref2$content,
                    _ref2$delay = _ref2.delay,
                    delay = _ref2$delay === undefined ? 2000 : _ref2$delay,
                    _ref2$top = _ref2.top,
                    top = _ref2$top === undefined ? 300 : _ref2$top;

                this.content = content;
                this.hide = false;
                this.$apply();
                clearTimeout(this.busy);
                this.busy = setTimeout(function () {
                    _this2.hide = true;
                    _this2.$apply();
                }, delay);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Toast;
}(_wepy2.default.component);

exports.default = Toast;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvYXN0LmpzIl0sIm5hbWVzIjpbIlRvYXN0IiwiYnVzeSIsImRhdGEiLCJoaWRlIiwiY29udGVudCIsInRvcCIsIm1ldGhvZHMiLCJzaG93VG9hc3QiLCJkZWxheSIsIiRhcHBseSIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLEksR0FBTyxDLFFBRVBDLEksR0FBTztBQUNIQyxrQkFBTSxJQURIO0FBRUhDLHFCQUFTLE9BRk47QUFHSEMsaUJBQUs7QUFIRixTLFFBTVBDLE8sR0FBVTtBQUNOQyxxQkFETSw0QkFDbUQ7QUFBQTs7QUFBQSwwQ0FBN0NILE9BQTZDO0FBQUEsb0JBQTdDQSxPQUE2QyxpQ0FBbkMsT0FBbUM7QUFBQSx3Q0FBMUJJLEtBQTBCO0FBQUEsb0JBQTFCQSxLQUEwQiwrQkFBbEIsSUFBa0I7QUFBQSxzQ0FBWkgsR0FBWTtBQUFBLG9CQUFaQSxHQUFZLDZCQUFOLEdBQU07O0FBQ2pELHFCQUFLRCxPQUFMLEdBQWVBLE9BQWY7QUFDQSxxQkFBS0QsSUFBTCxHQUFZLEtBQVo7QUFDQSxxQkFBS00sTUFBTDtBQUNBQyw2QkFBYSxLQUFLVCxJQUFsQjtBQUNBLHFCQUFLQSxJQUFMLEdBQVlVLFdBQVcsWUFBTTtBQUN6QiwyQkFBS1IsSUFBTCxHQUFZLElBQVo7QUFDQSwyQkFBS00sTUFBTDtBQUNILGlCQUhXLEVBR1RELEtBSFMsQ0FBWjtBQUlQO0FBVkssUzs7OztFQVRxQixlQUFLSSxTOztrQkFBbkJaLEsiLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvYXN0IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgYnVzeSA9IDBcclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGhpZGU6IHRydWUsXHJcbiAgICAgICAgY29udGVudDogJ+i/mOacieacquWhq+mhuScsXHJcbiAgICAgICAgdG9wOiAyMDBcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIHNob3dUb2FzdCAoe2NvbnRlbnQgPSAn6L+Y5pyJ5pyq5aGr6aG5JywgZGVsYXkgPSAyMDAwLCB0b3AgPSAzMDB9KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYnVzeSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVzeSA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9LCBkZWxheSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19