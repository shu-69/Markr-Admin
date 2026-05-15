import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

interface DialogData {

  // TODO ::::

}

@Component({
  selector: 'app-question-image-picker',
  templateUrl: './question-image-picker.component.html',
  styleUrls: ['./question-image-picker.component.scss']
})
export class QuestionImagePickerComponent {

  fileName = "No file selected";
  selectedImg: any = undefined;

  imageSelectionType: 'url' | 'file' | undefined = undefined

  imageLbl: string = '';

  constructor(public dialogRef: MatDialogRef<QuestionImagePickerComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {



  }

  setImage(e: any) {

    let filePath: string = e.target.value;

    if (filePath == "")
      return

    this.fileName = filePath.substring(filePath.lastIndexOf('\\') + 1, filePath.length)

    this.getBase64(e.target.files[0]).then(
      data => {
        this.imageSelectionType = 'file';
        this.selectedImg = data;
      }
    )

  }

  setImageFromUrl(e: any) {

    let url = e.target.value;

    if (e == '')
      return

    this.selectedImg = url;
    this.imageSelectionType = 'url';

  }

  removeFile() {

    this.fileName = "No file selected";
    this.selectedImg = undefined;

  }

  getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  close() {
    this.dialogRef.close();
  }

  done() {

    let result = {
      'src': this.selectedImg,
      'label': this.imageLbl
    }

    this.dialogRef.close(result);

  }

}
