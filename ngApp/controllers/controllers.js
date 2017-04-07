var album;
(function (album) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(photoService, filepickerService, $scope) {
                this.photoService = photoService;
                this.filepickerService = filepickerService;
                this.$scope = $scope;
                this.photos = this.photoService.list();
            }
            HomeController.prototype.save = function () {
                var _this = this;
                this.photo = {};
                this.photo.name = this.file.filename;
                this.photo.description = "User-added photo";
                this.photo.imageURL = this.file.url;
                this.photoService.save(this.photo).then(function () {
                    _this.photos = _this.photoService.list();
                    _this.photo = {};
                    _this.validationErrors = null;
                }).catch(function (err) {
                    console.error(err);
                    _this.validationErrors = err.data.errors;
                });
            };
            HomeController.prototype.remove = function (photoId) {
                var _this = this;
                this.photoService.remove(photoId).then(function () {
                    _this.photos = _this.photoService.list();
                }).catch(function (err) {
                    console.error(err);
                });
            };
            HomeController.prototype.pickFile = function () {
                this.filepickerService.pick({ mimetype: 'image/*' }, this.fileUploaded.bind(this));
            };
            HomeController.prototype.fileUploaded = function (file) {
                this.file = file;
                this.save();
                this.$scope.$apply();
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        var EditController = (function () {
            function EditController(photoService, $state, $stateParams) {
                this.photoService = photoService;
                this.$state = $state;
                this.$stateParams = $stateParams;
                var photoId = $stateParams['id'];
                this.photo = this.photoService.get(photoId);
            }
            EditController.prototype.save = function () {
                var _this = this;
                this.photoService.save(this.photo).then(function () {
                    _this.$state.go('home');
                }).catch(function (err) {
                    console.error(err);
                });
            };
            return EditController;
        }());
        Controllers.EditController = EditController;
        var AboutController = (function () {
            function AboutController() {
                this.message = 'Hello from the about page!';
            }
            return AboutController;
        }());
        Controllers.AboutController = AboutController;
    })(Controllers = album.Controllers || (album.Controllers = {}));
})(album || (album = {}));
