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

var ModalPopup = function (_wepy$component) {
    _inherits(ModalPopup, _wepy$component);

    function ModalPopup() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ModalPopup);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ModalPopup.__proto__ || Object.getPrototypeOf(ModalPopup)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            show: {
                type: Boolean,
                default: true,
                twoWay: true
            },
            eventName: {
                type: String,
                default: 'king-popup-sure'
            }
        }, _this.methods = {
            hide: function hide() {
                this.show = false;
            },
            sure: function sure() {
                this.$emit(this.eventName);
            },
            stopPropagation: function stopPropagation() {
                return false;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return ModalPopup;
}(_wepy2.default.component);

exports.default = ModalPopup;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGFsLXBvcHVwLmpzIl0sIm5hbWVzIjpbIk1vZGFsUG9wdXAiLCJwcm9wcyIsInNob3ciLCJ0eXBlIiwiQm9vbGVhbiIsImRlZmF1bHQiLCJ0d29XYXkiLCJldmVudE5hbWUiLCJTdHJpbmciLCJtZXRob2RzIiwiaGlkZSIsInN1cmUiLCIkZW1pdCIsInN0b3BQcm9wYWdhdGlvbiIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7Ozs7O2tNQUNqQkMsSyxHQUFRO0FBQ0pDLGtCQUFNO0FBQ0ZDLHNCQUFNQyxPQURKO0FBRUZDLHlCQUFTLElBRlA7QUFHRkMsd0JBQVE7QUFITixhQURGO0FBTUpDLHVCQUFXO0FBQ1BKLHNCQUFNSyxNQURDO0FBRVBILHlCQUFTO0FBRkY7QUFOUCxTLFFBWVJJLE8sR0FBVTtBQUNOQyxnQkFETSxrQkFDRTtBQUNKLHFCQUFLUixJQUFMLEdBQVksS0FBWjtBQUNILGFBSEs7QUFJTlMsZ0JBSk0sa0JBSUU7QUFDSixxQkFBS0MsS0FBTCxDQUFXLEtBQUtMLFNBQWhCO0FBQ0gsYUFOSztBQU9OTSwyQkFQTSw2QkFPYTtBQUNmLHVCQUFPLEtBQVA7QUFDSDtBQVRLLFM7Ozs7RUFiMEIsZUFBS0MsUzs7a0JBQXhCZCxVIiwiZmlsZSI6Im1vZGFsLXBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbFBvcHVwIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICAgICAgc2hvdzoge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxyXG4gICAgICAgICAgICB0d29XYXk6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGV2ZW50TmFtZToge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdraW5nLXBvcHVwLXN1cmUnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgaGlkZSAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdyA9IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdXJlICgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCh0aGlzLmV2ZW50TmFtZSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0b3BQcm9wYWdhdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=