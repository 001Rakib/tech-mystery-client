import { useUpdateUser } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types";
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
import React, { ChangeEvent, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Loading from "../../UI/Loading";
import { uploadImage } from "@/src/utils/uploadImage";

const ProfileEditModal = ({ user }: { user: IUser }) => {
  const { register, handleSubmit } = useForm();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [imageUrl, setImageUrl] = useState<string>(user?.profilePicture);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUpdateUser: SubmitHandler<FieldValues> = async (data) => {
    if (imageFiles.length) {
      const uploadImg = await uploadImage(imageFiles[0]);
      setImageUrl(uploadImg?.data.url);
    }

    const updateData = {
      name: data.name,
      profileImg: imageUrl,
    };
    // console.log(updateData);
    updateUser(updateData);
  };

  return (
    <>
      {isPending && <Loading />}
      <Button
        className="px-0 py-0"
        size="sm"
        onPress={onOpen}
        color="primary"
        variant="light"
      >
        Edit Profile
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Profile
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Name"
                    defaultValue={user.name}
                    variant="bordered"
                    {...register("name")}
                  />
                  <label
                    className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                    htmlFor="image"
                  >
                    Upload Profile Photo
                  </label>
                  <input
                    className="hidden"
                    id="image"
                    type="file"
                    onChange={(e) => handleImageChange(e)}
                  />
                  {imagePreviews.length > 0 && (
                    <div className="flex gap-5 my-5 flex-wrap">
                      {imagePreviews.map((imageDataUrl) => (
                        <div
                          key={imageDataUrl}
                          className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                        >
                          <img
                            alt="item"
                            className="h-full w-full object-cover object-center rounded-md"
                            src={imageDataUrl}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" onPress={onClose}>
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
