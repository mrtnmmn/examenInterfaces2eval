import { Component, OnInit } from '@angular/core';

import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { UsersService } from '../servicio.service';

@Component({
  selector: 'app-component01',
  templateUrl: './component01.component.html',
  styleUrls: ['./component01.component.css']
})
export class Component01Component implements OnInit {

  constructor(private user: UsersService) {
    this.user.getData()
  }

  generated: Boolean = false

  sexo: String = 'none'
  nombreCompleto: String = 'nombre'
  email : String = 'email'
  telefono: String = 'telefono'
  edad: number = 0
  img: String = ""
  
  usuario: any = undefined;

  ngOnInit(): void {
  }

  async generate() { 

    this.user.getData().subscribe(data => console.warn(data))

    const data = await this.user.getData().subscribe((res) => {
      console.log(res);
      // @ts-ignore
      this.usuario = res.results[0];
      console.log("datos : " + this.usuario)
      console.log(this.usuario.gender)
      this.sexo = this.usuario.gender
      this.nombreCompleto = this.usuario.name.first + ' ' + this.usuario.name.last
      this.email = this.usuario.email
      this.telefono = this.usuario.phone
      this.edad = this.usuario.dob.age
      this.img = this.usuario.picture.large

    })

    await (this.generated = true)
  }
}
