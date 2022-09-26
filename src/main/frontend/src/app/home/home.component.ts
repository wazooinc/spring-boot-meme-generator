import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  memeItems: any = [];
  dataURL: string = '/api/meme-items';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getMemeItems().subscribe(response => {
      this.memeItems = response;
      console.log(response);
    });
  }

  getMemeItems = () => {
    return this.http.get(this.dataURL);
  }

}
