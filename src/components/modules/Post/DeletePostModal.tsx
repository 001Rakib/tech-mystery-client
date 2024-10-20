import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import { DangerIcon } from "@/src/components/icons";
import { useDeletePost } from "@/src/hooks/post.hook";

const DeletePostModal = ({ id }: { id: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: deletePost, isPending } = useDeletePost();

  const handleDeleteUser = () => {
    deletePost(id);
  };

  return (
    <>
      <Button color="danger" size="sm" variant="light" onPress={onOpen}>
        Delete Post
      </Button>

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
                Delete Post
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

export default DeletePostModal;
