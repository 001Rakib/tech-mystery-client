// @ts-nocheck
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Checkbox } from "@nextui-org/checkbox";
import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { Image } from "@nextui-org/image";

import { uploadImage } from "@/src/utils/uploadImage";
import { useCreatePost } from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/user.provider";
import { categoryField } from "@/src/constant";

import Loading from "../../UI/Loading";
import { WriteLogo } from "../../icons";

interface EditorInstance {
  getContent: () => string;
}

export default function CreatePostModal() {
  const { register, handleSubmit, reset } = useForm();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useUser();
  const { mutate: createPost, isPending } = useCreatePost();
  const [content, setContent] = useState("");
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const editorRef = useRef<EditorInstance | null>(null);

  // Function to handle TinyMCE content update
  const handleEditorInit: IAllProps["onInit"] = (evt, editor) => {
    editorRef.current = editor;
  };

  const handleCreatePost: SubmitHandler<FieldValues> = async (data) => {
    const imageUrl =
      imageFiles.length > 0 ? await uploadImage(imageFiles[0]) : null;

    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }

    const postData = {
      ...data,
      description: content,
      images: imageUrl?.data?.url || "",
      author: user?._id,
    };

    await createPost(postData);
    reset();
    setContent(""); // Clear content after submission
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file) {
      setImageFiles((prev) => [...prev, file]);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {isPending && <Loading />}
      <Button
        color="primary"
        startContent={<WriteLogo />}
        variant="bordered"
        onPress={onOpen}
      >
        Create Post
      </Button>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="top-center"
        scrollBehavior="outside"
        size="full"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(handleCreatePost)}>
              <ModalHeader className="flex flex-col gap-1">
                Create Post
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  className="w-full mb-2"
                  label="Title"
                  type="text"
                  {...register("title")}
                />
                <Textarea
                  isRequired
                  {...register("shortDescription")}
                  className="w-full mb-2"
                  label="Short Description"
                  placeholder="Enter your description"
                />
                <Select
                  label="Category"
                  placeholder="Select Category"
                  {...register("category")}
                >
                  {categoryField.map((item) => (
                    <SelectItem key={item.key}>{item.label}</SelectItem>
                  ))}
                </Select>

                <label
                  className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400 mt-2"
                  htmlFor="image"
                >
                  Upload Photo
                </label>
                <input
                  required
                  className="hidden"
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                />

                {imagePreviews.length > 0 && (
                  <div className="flex gap-5 my-5 flex-wrap">
                    {imagePreviews.map((imageDataUrl) => (
                      <div
                        key={imageDataUrl}
                        className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                      >
                        <Image
                          alt="item"
                          className="h-full w-full object-cover object-center rounded-md"
                          src={imageDataUrl}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="h-full">
                  <label>Description</label>
                  {/* // @ts-ignore */}
                  <Editor
                    apiKey="kt1assz7z4seywy42wxjnla1vh604njk9iz95k31qd3o7tky"
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    onInit={handleEditorInit}
                  />
                </div>

                <Checkbox
                  isDisabled={!user?.isPremiumMember}
                  {...register("isPremium")}
                  size="md"
                >
                  Post as Premium Content (only for Premium Member)
                </Checkbox>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Discard Post
                </Button>
                <Button color="primary" type="submit" onPress={onClose}>
                  Post
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
