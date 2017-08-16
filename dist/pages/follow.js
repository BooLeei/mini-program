'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./../utils/request.js');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Follow = function (_wepy$page) {
    _inherits(Follow, _wepy$page);

    function Follow() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Follow);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Follow.__proto__ || Object.getPrototypeOf(Follow)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            backgroundTextStyle: 'dark',
            navigationBarTitleText: '关注公司'
        }, _this.request = new _request2.default(), _this.userId = '', _this.page = {
            index: 1,
            busy: false,
            hasNot: false
        }, _this.data = {
            follow: []
        }, _this.methods = {
            cancelFollow: function cancelFollow(e) {
                var _this2 = this;

                console.log(e);
                if (e.target.dataset.btnindex != undefined) {
                    this.request.Post({
                        userId: this.userId,
                        objectId: e.target.dataset.id,
                        type: 1,
                        status: 0
                    }, '/UserOperate/addUserOperate').then(function (ret) {
                        _this2.follow.splice(Number.parseInt(e.target.dataset.btnindex), 1);
                        _this2.$apply();
                    });
                }
            },
            toCompany: function toCompany(id) {
                _wepy2.default.navigateTo({
                    url: 'company?id=' + id
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Follow, [{
        key: 'getFollowCompany',
        value: function getFollowCompany() {
            var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

            return this.request.Get({
                userId: this.userId,
                page: page,
                pageSize: pageSize
            }, '/UserOperate/getCompanyList');
        }
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            var _this3 = this;

            if (this.page.busy) {
                return false;
            }
            if (this.page.hasNot) {
                return false;
            }
            this.page.index++;
            this.page.busy = true;
            this.getFollowCompany(this.page.index).then(function (_ref2) {
                var data = _ref2.data;

                if (Array.isArray(data) && data.length === 0) {
                    _this3.hasNot = true;
                }
                _this3.follow = [].concat(_toConsumableArray(_this3.follow), _toConsumableArray(data));
                _this3.$apply();
            });
        }
    }, {
        key: 'onPullDownRefresh',
        value: function onPullDownRefresh() {
            var _this4 = this;

            this.getFollowCompany().then(function (_ref3) {
                var data = _ref3.data;

                _this4.follow = data;
                _wepy2.default.stopPullDownRefresh();
                _this4.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(params) {
            var _this5 = this;

            this.userId = params.id;
            this.getFollowCompany().then(function (_ref4) {
                var data = _ref4.data;

                _this5.follow = data;
                _this5.$apply();
            });
        }
    }, {
        key: 'onUnload',
        value: function onUnload() {
            this.page.index = 1;
            this.page.busy = false;
            this.page.hasNot = false;
        }
    }]);

    return Follow;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Follow , 'pages/follow'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvbGxvdy5qcyJdLCJuYW1lcyI6WyJGb2xsb3ciLCJjb25maWciLCJiYWNrZ3JvdW5kVGV4dFN0eWxlIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInJlcXVlc3QiLCJ1c2VySWQiLCJwYWdlIiwiaW5kZXgiLCJidXN5IiwiaGFzTm90IiwiZGF0YSIsImZvbGxvdyIsIm1ldGhvZHMiLCJjYW5jZWxGb2xsb3ciLCJlIiwiY29uc29sZSIsImxvZyIsInRhcmdldCIsImRhdGFzZXQiLCJidG5pbmRleCIsInVuZGVmaW5lZCIsIlBvc3QiLCJvYmplY3RJZCIsImlkIiwidHlwZSIsInN0YXR1cyIsInRoZW4iLCJzcGxpY2UiLCJOdW1iZXIiLCJwYXJzZUludCIsIiRhcHBseSIsInRvQ29tcGFueSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJwYWdlU2l6ZSIsIkdldCIsImdldEZvbGxvd0NvbXBhbnkiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJzdG9wUHVsbERvd25SZWZyZXNoIiwicGFyYW1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7MExBQ2pCQyxNLEdBQVM7QUFDTEMsaUNBQXFCLE1BRGhCO0FBRUxDLG9DQUF3QjtBQUZuQixTLFFBS1RDLE8sR0FBVSx1QixRQUVWQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDSEMsbUJBQU8sQ0FESjtBQUVIQyxrQkFBTSxLQUZIO0FBR0hDLG9CQUFRO0FBSEwsUyxRQWNQQyxJLEdBQU87QUFDSEMsb0JBQVE7QUFETCxTLFFBSVBDLE8sR0FBVTtBQUNOQyx3QkFETSx3QkFDUUMsQ0FEUixFQUNXO0FBQUE7O0FBQ2JDLHdCQUFRQyxHQUFSLENBQVlGLENBQVo7QUFDQSxvQkFBSUEsRUFBRUcsTUFBRixDQUFTQyxPQUFULENBQWlCQyxRQUFqQixJQUE2QkMsU0FBakMsRUFBNEM7QUFDeEMseUJBQUtoQixPQUFMLENBQWFpQixJQUFiLENBQWtCO0FBQ2RoQixnQ0FBUSxLQUFLQSxNQURDO0FBRWRpQixrQ0FBVVIsRUFBRUcsTUFBRixDQUFTQyxPQUFULENBQWlCSyxFQUZiO0FBR2RDLDhCQUFNLENBSFE7QUFJZEMsZ0NBQVE7QUFKTSxxQkFBbEIsRUFLRyw2QkFMSCxFQU1DQyxJQU5ELENBTU0sZUFBTztBQUNULCtCQUFLZixNQUFMLENBQVlnQixNQUFaLENBQW1CQyxPQUFPQyxRQUFQLENBQWdCZixFQUFFRyxNQUFGLENBQVNDLE9BQVQsQ0FBaUJDLFFBQWpDLENBQW5CLEVBQStELENBQS9EO0FBQ0EsK0JBQUtXLE1BQUw7QUFDSCxxQkFURDtBQVVIO0FBQ0osYUFmSztBQWdCTkMscUJBaEJNLHFCQWdCS1IsRUFoQkwsRUFnQlM7QUFDWCwrQkFBS1MsVUFBTCxDQUFnQjtBQUNaQyx5Q0FBbUJWO0FBRFAsaUJBQWhCO0FBR0g7QUFwQkssUzs7Ozs7MkNBWmdDO0FBQUEsZ0JBQXhCakIsSUFBd0IsdUVBQWpCLENBQWlCO0FBQUEsZ0JBQWQ0QixRQUFjLHVFQUFILENBQUc7O0FBQ3RDLG1CQUFPLEtBQUs5QixPQUFMLENBQWErQixHQUFiLENBQWlCO0FBQ3BCOUIsd0JBQVEsS0FBS0EsTUFETztBQUVwQkMsc0JBQU1BLElBRmM7QUFHcEI0QiwwQkFBVUE7QUFIVSxhQUFqQixFQUlKLDZCQUpJLENBQVA7QUFLSDs7O3dDQTZCZ0I7QUFBQTs7QUFDYixnQkFBSSxLQUFLNUIsSUFBTCxDQUFVRSxJQUFkLEVBQW9CO0FBQ2hCLHVCQUFPLEtBQVA7QUFDSDtBQUNELGdCQUFJLEtBQUtGLElBQUwsQ0FBVUcsTUFBZCxFQUFzQjtBQUNsQix1QkFBTyxLQUFQO0FBQ0g7QUFDRCxpQkFBS0gsSUFBTCxDQUFVQyxLQUFWO0FBQ0EsaUJBQUtELElBQUwsQ0FBVUUsSUFBVixHQUFpQixJQUFqQjtBQUNBLGlCQUFLNEIsZ0JBQUwsQ0FBc0IsS0FBSzlCLElBQUwsQ0FBVUMsS0FBaEMsRUFDQ21CLElBREQsQ0FDTSxpQkFBWTtBQUFBLG9CQUFWaEIsSUFBVSxTQUFWQSxJQUFVOztBQUNkLG9CQUFJMkIsTUFBTUMsT0FBTixDQUFjNUIsSUFBZCxLQUF1QkEsS0FBSzZCLE1BQUwsS0FBZ0IsQ0FBM0MsRUFBOEM7QUFDMUMsMkJBQUs5QixNQUFMLEdBQWMsSUFBZDtBQUNIO0FBQ0QsdUJBQUtFLE1BQUwsZ0NBQWtCLE9BQUtBLE1BQXZCLHNCQUFrQ0QsSUFBbEM7QUFDQSx1QkFBS29CLE1BQUw7QUFDSCxhQVBEO0FBUUg7Ozs0Q0FFb0I7QUFBQTs7QUFDakIsaUJBQUtNLGdCQUFMLEdBQ0NWLElBREQsQ0FDTSxpQkFBWTtBQUFBLG9CQUFWaEIsSUFBVSxTQUFWQSxJQUFVOztBQUNkLHVCQUFLQyxNQUFMLEdBQWNELElBQWQ7QUFDQSwrQkFBSzhCLG1CQUFMO0FBQ0EsdUJBQUtWLE1BQUw7QUFDSCxhQUxEO0FBTUg7OzsrQkFFT1csTSxFQUFRO0FBQUE7O0FBQ1osaUJBQUtwQyxNQUFMLEdBQWNvQyxPQUFPbEIsRUFBckI7QUFDQSxpQkFBS2EsZ0JBQUwsR0FDQ1YsSUFERCxDQUNNLGlCQUFZO0FBQUEsb0JBQVZoQixJQUFVLFNBQVZBLElBQVU7O0FBQ2QsdUJBQUtDLE1BQUwsR0FBY0QsSUFBZDtBQUNBLHVCQUFLb0IsTUFBTDtBQUNILGFBSkQ7QUFLSDs7O21DQUVXO0FBQ1IsaUJBQUt4QixJQUFMLENBQVVDLEtBQVYsR0FBa0IsQ0FBbEI7QUFDQSxpQkFBS0QsSUFBTCxDQUFVRSxJQUFWLEdBQWlCLEtBQWpCO0FBQ0EsaUJBQUtGLElBQUwsQ0FBVUcsTUFBVixHQUFtQixLQUFuQjtBQUNIOzs7O0VBNUYrQixlQUFLSCxJOztrQkFBcEJOLE0iLCJmaWxlIjoiZm9sbG93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL3JlcXVlc3QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb2xsb3cgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5YWz5rOo5YWs5Y+4J1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgpXHJcblxyXG4gICAgdXNlcklkID0gJydcclxuXHJcbiAgICBwYWdlID0ge1xyXG4gICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgIGJ1c3k6IGZhbHNlLFxyXG4gICAgICAgIGhhc05vdDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBnZXRGb2xsb3dDb21wYW55IChwYWdlID0gMSwgcGFnZVNpemUgPSA4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5HZXQoe1xyXG4gICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxyXG4gICAgICAgICAgICBwYWdlOiBwYWdlLFxyXG4gICAgICAgICAgICBwYWdlU2l6ZTogcGFnZVNpemVcclxuICAgICAgICB9LCAnL1VzZXJPcGVyYXRlL2dldENvbXBhbnlMaXN0JylcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGZvbGxvdzogW11cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGNhbmNlbEZvbGxvdyAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5idG5pbmRleCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5Qb3N0KHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMudXNlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdElkOiBlLnRhcmdldC5kYXRhc2V0LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAwXHJcbiAgICAgICAgICAgICAgICB9LCAnL1VzZXJPcGVyYXRlL2FkZFVzZXJPcGVyYXRlJylcclxuICAgICAgICAgICAgICAgIC50aGVuKHJldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2xsb3cuc3BsaWNlKE51bWJlci5wYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmJ0bmluZGV4KSwgMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b0NvbXBhbnkgKGlkKSB7XHJcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGBjb21wYW55P2lkPSR7aWR9YFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblJlYWNoQm90dG9tICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlLmJ1c3kpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UuaGFzTm90KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2UuaW5kZXgrK1xyXG4gICAgICAgIHRoaXMucGFnZS5idXN5ID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuZ2V0Rm9sbG93Q29tcGFueSh0aGlzLnBhZ2UuaW5kZXgpXHJcbiAgICAgICAgLnRoZW4oKHtkYXRhfSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSAmJiBkYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYXNOb3QgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5mb2xsb3cgPSBbLi4udGhpcy5mb2xsb3csIC4uLmRhdGFdXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uUHVsbERvd25SZWZyZXNoICgpIHtcclxuICAgICAgICB0aGlzLmdldEZvbGxvd0NvbXBhbnkoKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mb2xsb3cgPSBkYXRhXHJcbiAgICAgICAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAocGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy51c2VySWQgPSBwYXJhbXMuaWRcclxuICAgICAgICB0aGlzLmdldEZvbGxvd0NvbXBhbnkoKVxyXG4gICAgICAgIC50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mb2xsb3cgPSBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uVW5sb2FkICgpIHtcclxuICAgICAgICB0aGlzLnBhZ2UuaW5kZXggPSAxXHJcbiAgICAgICAgdGhpcy5wYWdlLmJ1c3kgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMucGFnZS5oYXNOb3QgPSBmYWxzZVxyXG4gICAgfVxyXG59XHJcbiJdfQ==