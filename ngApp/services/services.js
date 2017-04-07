var album;
(function (album) {
    var Services;
    (function (Services) {
        var PhotoService = (function () {
            function PhotoService($resource) {
                this.PhotoResource = $resource('/api/photos/:id');
            }
            PhotoService.prototype.get = function (id) {
                return this.PhotoResource.get({ id: id });
            };
            PhotoService.prototype.list = function () {
                return this.PhotoResource.query();
            };
            PhotoService.prototype.save = function (photo) {
                return this.PhotoResource.save({ id: photo._id }, photo).$promise;
            };
            PhotoService.prototype.remove = function (photoId) {
                return this.PhotoResource.remove({ id: photoId }).$promise;
            };
            return PhotoService;
        }());
        Services.PhotoService = PhotoService;
        angular.module('album').service('photoService', PhotoService);
    })(Services = album.Services || (album.Services = {}));
})(album || (album = {}));
