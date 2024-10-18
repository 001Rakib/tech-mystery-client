import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { DeleteIcon, EditIcon, VerifiedLogo } from "../../icons";
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import { format } from "date-fns";
import { useGetAllUser } from "@/src/hooks/user.hook";
import Loading from "../../UI/Loading";
import { IUserResponse } from "@/src/types";
import { Spinner } from "@nextui-org/spinner";
import EditUserStatusModal from "./Admin/EditUserStatusModal";

const ManageUsers = () => {
  const { data, isLoading } = useGetAllUser();

  return (
    <>
      {isLoading && <Loading />}
      {data?.length ? (
        <Table aria-label="Users table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>LAST LOGIN</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map((user: IUserResponse) => (
              <TableRow key={user._id}>
                <TableCell>
                  <div className="flex gap-5">
                    <Avatar
                      radius="full"
                      size="md"
                      src={user?.profileImg || ""}
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600 flex gap-1">
                        {user.name || "Unknown"}
                        {user.isPremiumMember && <VerifiedLogo />}
                      </h4>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {user.role && typeof user.role === "string"
                    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {user.isBlocked ? (
                    <Chip color="danger" size="sm">
                      Blocked
                    </Chip>
                  ) : (
                    <Chip color="primary" size="sm">
                      Active
                    </Chip>
                  )}
                </TableCell>
                <TableCell>
                  {user.lastLogin
                    ? format(new Date(user.lastLogin), "PPpp")
                    : "N/A"}
                </TableCell>
                <TableCell className="flex gap-3">
                  <EditUserStatusModal
                    id={user?._id}
                    role={user?.role}
                    status={user?.isBlocked}
                  />
                  <div className="text-red-600">
                    <DeleteIcon />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Spinner size="md" />
      )}
    </>
  );
};

export default ManageUsers;
