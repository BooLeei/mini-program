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

var SearchBar = function (_wepy$component) {
    _inherits(SearchBar, _wepy$component);

    function SearchBar() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SearchBar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            searchMsg: ''
        }, _this.methods = {
            toSearch: function toSearch() {
                _wepy2.default.navigateTo({
                    url: 'search'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return SearchBar;
}(_wepy2.default.component);

exports.default = SearchBar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC1pbnB1dC5qcyJdLCJuYW1lcyI6WyJTZWFyY2hCYXIiLCJkYXRhIiwic2VhcmNoTXNnIiwibWV0aG9kcyIsInRvU2VhcmNoIiwibmF2aWdhdGVUbyIsInVybCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7O2dNQUNqQkMsSSxHQUFPO0FBQ0hDLHVCQUFXO0FBRFIsUyxRQUlQQyxPLEdBQVU7QUFDTkMsb0JBRE0sc0JBQ007QUFDUiwrQkFBS0MsVUFBTCxDQUFnQjtBQUNaQztBQURZLGlCQUFoQjtBQUdIO0FBTEssUzs7OztFQUx5QixlQUFLQyxTOztrQkFBdkJQLFMiLCJmaWxlIjoic2VhcmNoLWlucHV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaEJhciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgc2VhcmNoTXNnOiAnJ1xyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgdG9TZWFyY2ggKCkge1xyXG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBgc2VhcmNoYFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=