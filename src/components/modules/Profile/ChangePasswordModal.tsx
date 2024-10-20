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
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useChangePassword } from "@/src/hooks/auth.hook";

const ChangePasswordModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const { mutate: changePassword, isPending } = useChangePassword();

  const handleChangePassword: SubmitHandler<FieldValues> = (data) => {
    if (data.newPassword !== data.newPassword2) {
      setErrorMsg("Password do not matched");

      return;
    }

    const passChangeData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    changePassword(passChangeData);
    reset();
  };

  return (
    <div>
      <Button color="primary" size="sm" variant="bordered" onPress={onOpen}>
        Change Password
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="auto"
        size="lg"
        onOpenChange={onOpenChange}
      >
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">
                Change Password
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Current Password"
                  size="sm"
                  type="password"
                  variant="bordered"
                  {...register("oldPassword")}
                />
                <Input
                  label="New Password"
                  size="sm"
                  type="password"
                  variant="bordered"
                  {...register("newPassword")}
                />
                {errorMsg && (
                  <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
                )}
                <Input
                  label="Confirm New Password"
                  size="sm"
                  type="password"
                  variant="bordered"
                  {...register("newPassword2")}
                />
                {errorMsg && (
                  <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={isPending}
                  type="submit"
                  variant="flat"
                >
                  Update Now
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default ChangePasswordModal;
