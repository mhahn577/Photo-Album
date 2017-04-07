namespace album.Controllers {

  export class HomeController {
    public photos;
    public photo;
    public validationErrors;
    public file;

    public save() {
      this.photo = {};
      this.photo.name = this.file.filename;
      this.photo.description = "User-added photo";
      this.photo.imageURL = this.file.url;
      this.photoService.save(this.photo).then(()=> {
        this.photos = this.photoService.list(); // redisplay list
        this.photo = {};  // clear form
        this.validationErrors = null; // clear validation
      }).catch((err) => {
        console.error(err);
        this.validationErrors = err.data.errors;
      })
    }

    public remove(photoId) {
      this.photoService.remove(photoId).then(() => {
        this.photos = this.photoService.list(); // redisplay list
      }).catch((err) => {
        console.error(err);
      });
    }

    public pickFile() {
        this.filepickerService.pick(
            { mimetype: 'image/*' },
            this.fileUploaded.bind(this)
        );
    }

    public fileUploaded(file) {
        // save file url to database
        this.file = file;
        this.save();
        this.$scope.$apply(); // force page to update
    }

    constructor(private photoService:album.Services.PhotoService, private filepickerService, private $scope: ng.IScope) {
      this.photos = this.photoService.list();
    }
  }

    export class EditController {
        public photo;

        public save() {
          this.photoService.save(this.photo).then(()=> {
            this.$state.go('home'); // navigate back to home
          }).catch((err) => {
            console.error(err);
          })
        }

        constructor(
          private photoService:album.Services.PhotoService,
          private $state: ng.ui.IStateService,
          private $stateParams: ng.ui.IStateParamsService
        ) {
          let photoId = $stateParams['id'];
          this.photo = this.photoService.get(photoId);
        }
    }


    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
