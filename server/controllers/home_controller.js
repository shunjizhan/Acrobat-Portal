/**
 * @class HomeController
 * @constructor
 * @classdesc Controller for index pages, profile management, and about pages.
 */
function HomeController() {
    var self = this;

    this.index = function(req, res) { self._index(self, req, res); };
    this.success = function(req, res) { self._success(self, req, res); };
    this.failure = function(req, res) { self._failure(self, req, res); };
}

/**
 * Controller function for index page.
 * @memberof HomeController
 * @function
 * @alias index
 */
HomeController.prototype._index = function (self, req, res) {
    // 不太清楚react是怎么render页面的，这里就假设有个index.html
    // res.render("home/index.html", {
    //     loggedIn: req.loggedIn,
    //     user: req.user,
    // });
};

/**
 * Controller function for success page. Shown when user actions are successful
 * @memberOf HomeController
 * @function
 * @alias success
 */
 HomeController.prototype._success = function (self, req, res) {
    // res.render("home/success", {
    //     loggedIn: req.loggedIn,
    //     user: req.user
    // });
};

/**
 * Controller function for failure page. Shown when user actions fail
 * @memberOf HomeController
 * @function
 * @alias failure
 */
 HomeController.prototype._failure = function (self, req, res) {
    // res.render("home/failure", {
    //     loggedIn: req.loggedIn,
    //     user: req.user
    // });
};
