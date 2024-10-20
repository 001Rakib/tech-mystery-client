import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import { DangerIcon, DeleteIcon } from "@/src/components/icons";
import { useDeleteUser } from "@/src/hooks/user.hook";

const DeleteUserModal = ({ id }: { id: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const handleDeleteUser = () => {
    deleteUser(id);
  };

  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => {
          onOpen();
        }}
      >
        <DeleteIcon />
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
                Delete User
              </ModalHeader>
              <ModalBody>
                <div className="w-full space-y-2">
                  <div className="grid justify-center">
                    <DangerIcon />
                  </div>
                  <h1 className="text-center">
                    Are you sure you want to delete?
                  </h1>

                  <Button
                    className="px-10 w-full"
                    color="danger"
                    isLoading={isPending}
                    variant="flat"
                    onClick={() => handleDeleteUser()}
                  >
                    Delete
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteUserModal;
