import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getData() {
    let url = "https://randomuser.me/api"
    return this.http.get(url)
  }
}