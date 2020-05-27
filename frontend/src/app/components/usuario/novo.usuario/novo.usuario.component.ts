import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import  * as _ from 'lodash';
@Component({
  selector: 'app-novo.usuario',
  templateUrl: './novo.usuario.component.html',
  styleUrls: ['./novo.usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {
    
  hide = true;
  form: FormGroup;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.validar();
  }
   
  validar(){
    this.form = this.formBuilder.group({
       nome: ['',Validators.required],
       telefone: ['',Validators.required]
    });
  }
    removeImage() {
      this.cardImageBase64 = null;
      this.isImageSaved = false;
    }
    fileChangeEvent(fileInput: any) {

      console.log('Ok Ok');
      this.imageError = null;
      if (fileInput.target.files && fileInput.target.files[0]) {
          // Size Filter Bytes
          const max_size = 20971520;
          const allowed_types = ['image/png', 'image/jpeg'];
          const max_height = 15200;
          const max_width = 25600;

          if (fileInput.target.files[0].size > max_size) {
              this.imageError =
                  'Maximum size allowed is ' + max_size / 1000 + 'Mb';

              return false;
          }

          if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
              this.imageError = 'Only Images are allowed ( JPG | PNG )';
              return false;
          }
          const reader = new FileReader();
          reader.onload = (e: any) => {
              const image = new Image();
              image.src = e.target.result;
              image.onload = rs => {
                  const img_height = rs.currentTarget['height'];
                  const img_width = rs.currentTarget['width'];

                  console.log(img_height, img_width);


                  if (img_height > max_height && img_width > max_width) {
                      this.imageError =
                          'Maximum dimentions allowed ' +
                          max_height +
                          '*' +
                          max_width +
                          'px';
                      return false;
                  } else {
                      const imgBase64Path = e.target.result;
                      this.cardImageBase64 = imgBase64Path;
                      this.isImageSaved = true;
                      // this.previewImagePath = imgBase64Path;
                  }
              };
          };

          reader.readAsDataURL(fileInput.target.files[0]);
      }
    }

}
