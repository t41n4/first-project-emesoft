import StickyHeadTable from "@/components/StickyHeadTable";
import { useUserContext } from "@/context/UserContext";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUsers } from "@/redux/reducer/UserSlice";
import { useEffect } from "react";

export default function Page() {
  const { displayData } = useUserContext();
  // const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="flex w-full h-full px-10 pt-5">
      <StickyHeadTable data={displayData} />
    </div>
  );
}
