export class Session {
  public token: string;
  public username: string;

  constructor(username, token){
    this.username = username || null;
    this.token = token || null;
  }
}
