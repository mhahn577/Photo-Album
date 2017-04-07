namespace album.Services {

  export class PhotoService {
      private PhotoResource;

      public get(id) {
        return this.PhotoResource.get({id:id});
      }

      public list() {
        return this.PhotoResource.query();
      }

      public save(photo) {
        return this.PhotoResource.save({id:photo._id}, photo).$promise;
      }

      public remove(photoId) {
        return this.PhotoResource.remove({id:photoId}).$promise;
      }

      constructor($resource:ng.resource.IResourceService) {
        this.PhotoResource = $resource('/api/photos/:id');
      }
  }

  angular.module('album').service('photoService', PhotoService);
}
