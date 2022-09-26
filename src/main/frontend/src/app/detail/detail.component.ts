import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @ViewChild('designerCanvas', { static: false}) designerCanvas: any;
  memeItem: any = {};
  dataURL: string = '/api/meme-items/';

  constructor(private http: HttpClient,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMemeItem(this.route.snapshot.paramMap.get('id'))
      .subscribe(response => {
        this.memeItem = response;
        const canvas = this.designerCanvas.nativeElement;
        const context = canvas.getContext('2d');
        const img = new Image();
        // @ts-ignore
        img.src = 'data:image/png;base64,' + response.image as string;

        img.onload = () => {
          context.drawImage(img, 30, 30);
        }

      });
  }

  getMemeItem = (id: any) => {
    return this.http.get(this.dataURL + id);
  }

  download = () => {
    const canvas = this.designerCanvas.nativeElement;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'memeImage.png';
    link.href = image;
    link.click();
  }

}
