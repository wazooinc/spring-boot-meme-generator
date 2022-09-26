import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {

  @ViewChild('designerCanvas', {static: false}) designerCanvas: any;
  lineOneText: string = '';
  lineTwoText: string = '';
  fileEvent: any;

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
  }

  updateLineText = () => {
    const canvas = this.designerCanvas.nativeElement;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    this.preview(this.fileEvent);
    context.font = "50px Anton";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText(this.lineOneText.toUpperCase(), canvas.width / 2, 100);
    context.fillText(this.lineTwoText.toUpperCase(), canvas.width / 2, 700);
  }

  preview = (event:any) => {
    console.log('preview file', event);
    this.fileEvent = event;
    const canvas = this.designerCanvas.nativeElement;
    const context = canvas.getContext('2d');

    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = (e:any) => {
      console.log('fileReader onload', e);
      const img = new Image();
      img.src = e.target.result as string;
      img.onload = () => {
        context.drawImage(img, 30, 150, 600, 500);
      }
    }
  }

  uploadImage = () => {
    console.log('uploading image...');
    const canvas = this.designerCanvas.nativeElement;
    const data = canvas.toDataURL('image/png');

    const formData = new FormData();
    formData.append('image', data);

    const baseUrl = 'http://localhost:8080';
    this.http.post<any>(`${baseUrl}/api/meme-items`, formData).subscribe(response => {
      console.log('post response', response);

      this.router.navigate(['/']);
    });
  }

}
