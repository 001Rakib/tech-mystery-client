import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { IUser } from "@/src/types";
import { useUpdateUser } from "@/src/hooks/user.hook";

import Loading from "../../UI/Loading";

const ProfileEditModal = ({ user }: { user: IUser }) => {
  const { register, handleSubmit } = useForm();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleChangeName: SubmitHandler<FieldValues> = (data) => {
    const updateData = {
      name: data.name,
    };

    updateUser(updateData);
  };

  return (
    <>
      {isPending && <Loading />}
      <Button
        className="px-0 py-0"
        color="primary"
        size="sm"
        variant="light"
        onPress={onOpen}
      >
        Edit Name
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <form onSubmit={handleSubmit(handleChangeName)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Name
                </ModalHeader>
                <ModalBody>
                  <Input
                    defaultValue={user.name}
                    label="Name"
                    variant="bordered"
                    {...register("name")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit" onPress={onClose}>
                    Update
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default ProfileEditModal;
