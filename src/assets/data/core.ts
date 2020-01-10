import { Credentials } from '@app/shared/model/credentials.model';

// Mock data for testing

export const TESTING_ACCOUNT = new Credentials({
  username: "admin",
  password: "1234"
});

export const TYPES = [
  {
    id: 1,
    type: "Routine Check",
    color: "#587cff"
  },
  {
    id: 2,
    type: "Emergency",
    color: "#ff036c"
  },
  {
    id: 3,
    type:"Grooming",
    color: "#09c3c3"
  }
];
