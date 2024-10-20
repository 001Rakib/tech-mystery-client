import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import { useUpdateUserStatus } from "@/src/hooks/user.hook";
import { EditIcon } from "@/src/components/icons";

const EditUserStatusModal = ({
  id,
  role,
  status,
}: {
  id: string;
  role: "user" | "admin";
  status: boolean;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: updateUserStatus, isPending } = useUpdateUserStatus(id);

  const handleChangeRole = (updatedRole: string) => {
    const changeRole = {
      role: updatedRole,
    };

    updateUserStatus(changeRole);
  };
  const handleBlockUser = (updatedStatus: boolean) => {
    const changeStatus = {
      isBlocked: updatedStatus,
    };

    updateUserStatus(changeStatus);
  };

  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => {
          onOpen();
        }}
      >
        <EditIcon />
      </div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Change User Status
              </ModalHeader>
              <ModalBody>
                <div className="w-full space-y-2">
                  <Button
                    className="px-10 w-full"
                    color="primary"
                    isLoading={isPending}
                    variant="flat"
                    onClick={() => {
                      const newRole = role === "user" ? "admin" : "user";

                      handleChangeRole(newRole);
                    }}
                  >
                    Switch Role
                  </Button>
                  <Button
                    className="px-10 w-full"
                    color="danger"
                    isLoading={isPending}
                    variant="flat"
                    onClick={() => {
                      const newStatus = status === false ? true : false;

                      handleBlockUser(newStatus);
                    }}
                  >
                    Switch Status
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditUserStatusModal;
