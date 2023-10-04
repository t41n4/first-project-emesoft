import { IAddress, IName, IUser } from "@/common/user";
import ProfileCard from "@/modules/users/ProfileCard";
import ProfileCardSkeleton from "@/modules/users/ProfileCardSkeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearUser, fetchUsersByID } from "@/redux/reducer/UserSlice";
import { validateSlug } from "@/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";

type Props = {};

function createUserInformation(singleUser: IUser): IUser {
  const { email, username, name, address, id, password, phone } = singleUser;
  return { email, username, name, address, id, password, phone };
}

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { singleUser } = useAppSelector((state) => state.users);

  const { email, username, name, address, id, password, phone } =
    createUserInformation(singleUser);
  const formatName = (name: IName) => {
    return `${name.firstname} ${name.lastname}`;
  };

  const formatAddress = (address: IAddress) => {
    return `${address.number} ${address.street}, ${address.city}, ${address.zipcode}`;
  };

  const isLoading = singleUser.id && router.query.slug;

  useEffect(() => {
    if (!router.query.slug) return;
    if (!validateSlug(router.query.slug)) {
      router.push("/404");
    }
    dispatch(fetchUsersByID(Number(router.query.slug)));
    return () => {
      dispatch(clearUser());
    };
  }, [dispatch, router]);

  return (
    <div className="p-10">
      {isLoading ? <ProfileCard user={singleUser} /> : <ProfileCardSkeleton />}
    </div>
  );
};

export default Page;
