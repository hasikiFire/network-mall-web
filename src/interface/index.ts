export * from './apiTypes/PackageEditReqDto';
export * from './apiTypes/RestRespUsageRecord';
export * from './apiTypes/UsageRecord';
export * from './apiTypes/RestRespVoid';
export * from './apiTypes/ForeignEditReqDto';
export * from './apiTypes/UsersendEmailCodeDto';
export * from './apiTypes/UserRegisterReqDto';
export * from './apiTypes/RestRespUserRegisterRespDto';
export * from './apiTypes/UserRegisterRespDto';
export * from './apiTypes/UserLoginReqDto';
export * from './apiTypes/RestRespUserLoginRespDto';
export * from './apiTypes/UserLoginRespDto';
export * from './apiTypes/PackageBuyReqDto';
export * from './apiTypes/PackageItem';
export * from './apiTypes/PackageRespDto';
export * from './apiTypes/RestRespPackageRespDto';
export * from './apiTypes/UserEditDto';
export * from './apiTypes/RestRespUser';
export * from './apiTypes/User';
export * from './apiTypes/UserCreateDto';
export * from './apiTypes/RestRespString';
export * from './apiTypes/PackageAddReqDto';
export * from './apiTypes/RestRespBoolean';
export * from './apiTypes/RestRespUserInfoRespDto';
export * from './apiTypes/UserInfoRespDto';
export * from './apiTypes/PackageListReqDto';
export * from './apiTypes/PackageListRespDto';
export * from './apiTypes/PageRespDtoPackageListRespDto';
export * from './apiTypes/RestRespPageRespDtoPackageListRespDto';
export * from './apiTypes/PageReqDto';
export * from './apiTypes/UserListReqDto';
export * from './apiTypes/PageRespDtoUserListRespDto';
export * from './apiTypes/RestRespPageRespDtoUserListRespDto';
export * from './apiTypes/UserListRespDto';
export * from './apiTypes/ForeignServer';
export * from './apiTypes/RestRespForeignServer';
export * from './apiTypes/ForeignServerListReqDto';
export * from './apiTypes/ForeignServerListRespDto';
export * from './apiTypes/PageRespDtoForeignServerListRespDto';
export * from './apiTypes/RestRespPageRespDtoForeignServerListRespDto';

export type Primitive = undefined | null | boolean | string | number | symbol;
export type DeepRequired<T> = T extends Primitive
  ? T
  : keyof T extends never
  ? T
  : { [K in keyof T]-?: DeepRequired<T[K]> };
