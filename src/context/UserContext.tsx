import { IQuery, UserContextType } from "@/common/types";
import { IUser } from "@/common/user";
import usePagination from "@/hooks/usePagination";
import { useAppSelector } from "@/redux/hooks";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { users } = useAppSelector((state) => state.users);

  const handleSearchTermChange = (searchTerm: string) => {
    handleQueryChange({
      searchTerm,
    });
  };

  const [displayData, setDisplayData] = useState<IUser[]>([]);

  useEffect(() => {
    setDisplayData(users);
  }, [users]);

  const handleQueryChange = (props: IQuery) => {
    const { searchTerm } = props;
    console.log("carts: ", users);
    const originalData = users;
    const [IDResult, UsernameResult, EmailResult, PhoneResult] = users.reduce(
      ([IDResult, UsernameResult, EmailResult, PhoneResult], user: IUser) => {
        const { id, email, username, phone } = user;

        const usernameMatch =
          searchTerm &&
          username.toLowerCase().includes(searchTerm.toLowerCase());
        usernameMatch && IDResult.push(user);

        const IDMatch =
          searchTerm &&
          id.toString().toLowerCase().includes(searchTerm.toLowerCase());
        IDMatch && UsernameResult.push(user);

        const emailMatch =
          searchTerm && email.toLowerCase().includes(searchTerm.toLowerCase());
        emailMatch && EmailResult.push(user);

        const phoneMatch =
          searchTerm &&
          phone.toString().toLowerCase().includes(searchTerm.toLowerCase());
        phoneMatch && PhoneResult.push(user);

        return [IDResult, UsernameResult, EmailResult, PhoneResult];
      },
      [[], [], [], []] as [IUser[], IUser[], IUser[], IUser[]]
    );

    // join 4 result with origin data result together
    const joinedResult = [
      IDResult,
      UsernameResult,
      EmailResult,
      PhoneResult,
      originalData,
    ]
      .filter((result) => result.length !== 0)
      .reduce((a, b) => a.filter((c) => b.includes(c)));

    console.log("joinedResult: ", joinedResult);

    setDisplayData(joinedResult);
  };

  const value: UserContextType = {
    users,
    displayData,
    handleSearchTermChange,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
