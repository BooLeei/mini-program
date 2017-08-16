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

var Loading = function (_wepy$component) {
    _inherits(Loading, _wepy$component);

    // watch = {
    //     show (newVal, oldVal) {
    //         if (newVal) {
    //             this.fade = {}
    //             this.hidden = false
    //             this.init = 1
    //         } else {
    //             this.fade = this.animate.opacity(0).step().export()
    //             setTimeout(() => {
    //                 this.hidden = true
    //                 this.$apply()
    //             }, 510)
    //         }
    //         this.$apply()
    //     }
    // }
    function Loading() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Loading);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Loading.__proto__ || Object.getPrototypeOf(Loading)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            show: {
                type: Boolean,
                default: false,
                twoWay: true
            }
        }, _this.animate = _wepy2.default.createAnimation({
            duration: 500
        }), _this.data = {
            fade: {},
            init: 0,
            hidden: true }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return Loading;
}(_wepy2.default.component);

exports.default = Loading;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmcuanMiXSwibmFtZXMiOlsiTG9hZGluZyIsInByb3BzIiwic2hvdyIsInR5cGUiLCJCb29sZWFuIiwiZGVmYXVsdCIsInR3b1dheSIsImFuaW1hdGUiLCJjcmVhdGVBbmltYXRpb24iLCJkdXJhdGlvbiIsImRhdGEiLCJmYWRlIiwiaW5pdCIsImhpZGRlbiIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87OztBQW9CakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs0TEFqQ0FDLEssR0FBUTtBQUNKQyxrQkFBTTtBQUNGQyxzQkFBTUMsT0FESjtBQUVGQyx5QkFBUyxLQUZQO0FBR0ZDLHdCQUFRO0FBSE47QUFERixTLFFBUVJDLE8sR0FBVSxlQUFLQyxlQUFMLENBQXFCO0FBQzNCQyxzQkFBVTtBQURpQixTQUFyQixDLFFBSVZDLEksR0FBTztBQUNIQyxrQkFBTSxFQURIO0FBRUhDLGtCQUFNLENBRkg7QUFHSEMsb0JBQVEsSUFITCxFOzs7O0VBZDBCLGVBQUtDLFM7O2tCQUFyQmQsTyIsImZpbGUiOiJsb2FkaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG5cclxuICAgIHByb3BzID0ge1xyXG4gICAgICAgIHNob3c6IHtcclxuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHR3b1dheTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlID0gd2VweS5jcmVhdGVBbmltYXRpb24oe1xyXG4gICAgICAgIGR1cmF0aW9uOiA1MDBcclxuICAgIH0pXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBmYWRlOiB7fSxcclxuICAgICAgICBpbml0OiAwLFxyXG4gICAgICAgIGhpZGRlbjogdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHdhdGNoID0ge1xyXG4gICAgLy8gICAgIHNob3cgKG5ld1ZhbCwgb2xkVmFsKSB7XHJcbiAgICAvLyAgICAgICAgIGlmIChuZXdWYWwpIHtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuZmFkZSA9IHt9XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlXHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmluaXQgPSAxXHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmZhZGUgPSB0aGlzLmFuaW1hdGUub3BhY2l0eSgwKS5zdGVwKCkuZXhwb3J0KClcclxuICAgIC8vICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIC8vICAgICAgICAgICAgIH0sIDUxMClcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG59XHJcbiJdfQ==