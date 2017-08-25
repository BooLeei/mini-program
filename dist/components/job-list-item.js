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
        }, _this.methods = {
            toJobDetail: function toJobDetail(type, id) {
                if (type == '9') {
                    _wepy2.default.redirectTo({
                        url: 'jobDetail?id=' + id + '&type=1'
                    });
                } else {
                    _wepy2.default.navigateTo({
                        url: 'jobDetail?id=' + id + '&type=' + type
                    });
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return JobListItem;
}(_wepy2.default.component);

exports.default = JobListItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYi1saXN0LWl0ZW0uanMiXSwibmFtZXMiOlsiSm9iTGlzdEl0ZW0iLCJwcm9wcyIsImxpc3RJdGVtIiwidHlwZSIsIlN0cmluZyIsImRlZmF1bHQiLCJtZXRob2RzIiwidG9Kb2JEZXRhaWwiLCJpZCIsInJlZGlyZWN0VG8iLCJ1cmwiLCJuYXZpZ2F0ZVRvIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsVzs7Ozs7Ozs7Ozs7Ozs7b01BQ2pCQyxLLEdBQVE7QUFDSkMsc0JBQVUsRUFETjtBQUVKQyxrQkFBTTtBQUNGQSxzQkFBTUMsTUFESjtBQUVGQyx5QkFBUztBQUZQO0FBRkYsUyxRQVFSQyxPLEdBQVU7QUFDTkMsdUJBRE0sdUJBQ09KLElBRFAsRUFDYUssRUFEYixFQUNpQjtBQUNuQixvQkFBSUwsUUFBUSxHQUFaLEVBQWlCO0FBQ2IsbUNBQUtNLFVBQUwsQ0FBZ0I7QUFDWkMsK0NBQXFCRixFQUFyQjtBQURZLHFCQUFoQjtBQUdILGlCQUpELE1BSU87QUFDSCxtQ0FBS0csVUFBTCxDQUFnQjtBQUNaRCwrQ0FBcUJGLEVBQXJCLGNBQWdDTDtBQURwQixxQkFBaEI7QUFHSDtBQUNKO0FBWEssUzs7OztFQVQyQixlQUFLUyxTOztrQkFBekJaLFciLCJmaWxlIjoiam9iLWxpc3QtaXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb2JMaXN0SXRlbSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIHByb3BzID0ge1xyXG4gICAgICAgIGxpc3RJdGVtOiB7fSxcclxuICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgZGVmYXVsdDogJzEnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgdG9Kb2JEZXRhaWwgKHR5cGUsIGlkKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09ICc5Jykge1xyXG4gICAgICAgICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBqb2JEZXRhaWw/aWQ9JHtpZH0mdHlwZT0xYFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgam9iRGV0YWlsP2lkPSR7aWR9JnR5cGU9JHt0eXBlfWBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19