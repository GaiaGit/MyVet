export class User {
  id: number;
  username: string;
  name: string;
  lastname: string;
  token?: string;

  constructor(id:number, username:string, name:string, lastname:string){
    this.id = id;
    this.username = username;
    this.name = name;
    this.lastname = lastname;
  }
}
