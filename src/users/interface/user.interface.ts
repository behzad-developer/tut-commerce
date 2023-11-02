export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  phonenumber: number;
  password: string;
  typeId: number;
  permissionIds: number[];
  roleIds: number[];
}
