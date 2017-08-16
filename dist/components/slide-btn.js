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

var SlideBtn = function (_wepy$component) {
    _inherits(SlideBtn, _wepy$component);

    function SlideBtn() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SlideBtn);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SlideBtn.__proto__ || Object.getPrototypeOf(SlideBtn)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            eventName: String,
            disable: {
                type: Boolean,
                default: false
            }

        }, _this.data = {
            slide: false
        }, _this.methods = {
            slides: function slides() {
                if (this.disable) {
                    return false;
                }
                this.slide = !this.slide;
            },
            sure: function sure() {
                this.$emit(this.eventName, 1);
            },
            no: function no() {
                this.$emit(this.eventName, 0);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return SlideBtn;
}(_wepy2.default.component);

exports.default = SlideBtn;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNsaWRlLWJ0bi5qcyJdLCJuYW1lcyI6WyJTbGlkZUJ0biIsInByb3BzIiwiZXZlbnROYW1lIiwiU3RyaW5nIiwiZGlzYWJsZSIsInR5cGUiLCJCb29sZWFuIiwiZGVmYXVsdCIsImRhdGEiLCJzbGlkZSIsIm1ldGhvZHMiLCJzbGlkZXMiLCJzdXJlIiwiJGVtaXQiLCJubyIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzhMQUNqQkMsSyxHQUFRO0FBQ0pDLHVCQUFXQyxNQURQO0FBRUpDLHFCQUFTO0FBQ0xDLHNCQUFNQyxPQUREO0FBRUxDLHlCQUFTO0FBRko7O0FBRkwsUyxRQVNSQyxJLEdBQU87QUFDSEMsbUJBQU87QUFESixTLFFBSVBDLE8sR0FBVTtBQUNOQyxrQkFETSxvQkFDSTtBQUNOLG9CQUFJLEtBQUtQLE9BQVQsRUFBa0I7QUFDZCwyQkFBTyxLQUFQO0FBQ0g7QUFDRCxxQkFBS0ssS0FBTCxHQUFhLENBQUMsS0FBS0EsS0FBbkI7QUFDSCxhQU5LO0FBT05HLGdCQVBNLGtCQU9FO0FBQ0oscUJBQUtDLEtBQUwsQ0FBVyxLQUFLWCxTQUFoQixFQUEyQixDQUEzQjtBQUNILGFBVEs7QUFVTlksY0FWTSxnQkFVQTtBQUNGLHFCQUFLRCxLQUFMLENBQVcsS0FBS1gsU0FBaEIsRUFBMkIsQ0FBM0I7QUFDSDtBQVpLLFM7Ozs7RUFkd0IsZUFBS2EsUzs7a0JBQXRCZixRIiwiZmlsZSI6InNsaWRlLWJ0bi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVCdG4gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgICBldmVudE5hbWU6IFN0cmluZyxcclxuICAgICAgICBkaXNhYmxlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHNsaWRlOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgc2xpZGVzICgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGlzYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zbGlkZSA9ICF0aGlzLnNsaWRlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdXJlICgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCh0aGlzLmV2ZW50TmFtZSwgMSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5vICgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCh0aGlzLmV2ZW50TmFtZSwgMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19