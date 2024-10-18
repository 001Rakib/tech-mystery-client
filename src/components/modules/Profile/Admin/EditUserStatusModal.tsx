import { EditIcon } from "@/src/components/icons";
import { useUpdateUserStatus } from "@/src/hooks/user.hook";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useState } from "react";

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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
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
                    onClick={() => {
                      const newRole = role === "user" ? "admin" : "user";
                      handleChangeRole(newRole);
                    }}
                    isLoading={isPending}
                    className="px-10 w-full"
                    color="primary"
                    variant="flat"
                  >
                    Switch Role
                  </Button>
                  <Button
                    className="px-10 w-full"
                    isLoading={isPending}
                    color="danger"
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
