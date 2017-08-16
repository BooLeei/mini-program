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

var JobListItem = function (_wepy$component) {
    _inherits(JobListItem, _wepy$component);

    function JobListItem() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, JobListItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = JobListItem.__proto__ || Object.getPrototypeOf(JobListItem)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            listItem: {},
            type: {
                type: String,
                default: '1'
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return JobListItem;
}(_wepy2.default.component);

exports.default = JobListItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYi1saXN0LWl0ZW0uanMiXSwibmFtZXMiOlsiSm9iTGlzdEl0ZW0iLCJwcm9wcyIsImxpc3RJdGVtIiwidHlwZSIsIlN0cmluZyIsImRlZmF1bHQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxXOzs7Ozs7Ozs7Ozs7OztvTUFDakJDLEssR0FBUTtBQUNKQyxzQkFBVSxFQUROO0FBRUpDLGtCQUFNO0FBQ0ZBLHNCQUFNQyxNQURKO0FBRUZDLHlCQUFTO0FBRlA7QUFGRixTOzs7O0VBRDZCLGVBQUtDLFM7O2tCQUF6Qk4sVyIsImZpbGUiOiJqb2ItbGlzdC1pdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvYkxpc3RJdGVtIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICAgICAgbGlzdEl0ZW06IHt9LFxyXG4gICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAnMSdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19