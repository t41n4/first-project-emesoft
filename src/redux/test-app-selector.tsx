import { RootState } from "./store/store";

const state: RootState = {
  mood: "",
};

// Mock useSelector hook
export const testUseAppSelector = <Selected,>(
  selector: (state: RootState) => Selected
): Selected => {
  return selector(state);
};
