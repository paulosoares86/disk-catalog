export class FileUploader {
    public backendEndpoint: string = '/uploads';
    private _filesToUpload: Array<File> = [];

    makeFileRequest() {
        return new Promise((resolve, reject) => {
            var url: string = `//${window.location.hostname}:3000${this.backendEndpoint}`;
            var files = this._filesToUpload;
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }

    fileChangeEvent(fileInput: any) {
        this._filesToUpload = <Array<File>> fileInput.target.files;
    }
}
