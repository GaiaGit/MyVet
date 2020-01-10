export class Credentials {
  username: string;
  password: string;

  constructor(data){
    this.username = data.username ? data.username : null;
    this.password = data.password ? data.password : null;
  }
}
