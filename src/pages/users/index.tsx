import StickyHeadTable from "@/components/StickyHeadTable";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUsers } from "@/redux/reducer/UserSlice";
import { useEffect } from "react";

export default function Page() {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="flex w-full h-[100vh] px-10">
      <StickyHeadTable data={users} />
    </div>
  );
}
