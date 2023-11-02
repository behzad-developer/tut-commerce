export interface ManagerUserInterface {
  id: number;
  firstName: string;
  lastName: string;
  phonenumber: number;
  password: string;
  typeId: number;
  permissionId: number[];
  roleId: number[];
}
