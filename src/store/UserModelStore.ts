import { createTypedHooks } from "easy-peasy";
import { UserModel } from "./UserModel";

const { useStoreActions, useStoreState } = createTypedHooks<UserModel>();

export { useStoreActions, useStoreState };
