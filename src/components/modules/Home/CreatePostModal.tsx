"use client";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { WriteLogo } from "../../icons";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Input } from "@nextui-org/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { uploadImage } from "@/src/utils/uploadImage";
import { useCreatePost } from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/user.provider";
import { Select, SelectItem } from "@nextui-org/select";
import { categoryField, statusField } from "@/src/constant";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function CreatePostModal() {
  const { register, handleSubmit } = useForm();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [content, setContent] = useState("");
  const { user } = useUser();

  const { mutate: createPost } = useCreatePost();

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
          ],
        },
      ],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

  const handleCreatePost: SubmitHandler<FieldValues> = async (data) => {
    const imageUrl = await uploadImage(data.image[0]);

    const postData = {
      ...data,
      description: content,
      image: imageUrl.data.url,
      author: user?.name,
      authorImage: user?.profilePicture,
    };
    const res = await createPost(postData);
    console.log(res);
  };

  return (
    <>
      <Button
        startContent={<WriteLogo />}
        onPress={onOpen}
        variant="bordered"
        color="primary"
      >
        Create Post
      </Button>
      <Modal
        size="full"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(handleCreatePost)}>
                <ModalHeader className="flex flex-col gap-1">
                  Create Post
                </ModalHeader>
                <ModalBody>
                  <div className="h-full">
                    <Input
                      isRequired
                      type="text"
                      label="Title"
                      className="w-full mb-2"
                      {...register("title")}
                    />

                    <div className="flex gap-5">
                      <Select
                        label="Category"
                        placeholder="Select Category"
                        className=""
                        {...register("category")}
                      >
                        {categoryField.map((item) => (
                          <SelectItem key={item.key}>{item.label}</SelectItem>
                        ))}
                      </Select>
                      <Select
                        label="Post Status"
                        placeholder="Select Post Status"
                        className=""
                        {...register("status")}
                      >
                        {statusField.map((item) => (
                          <SelectItem key={item.key}>{item.label}</SelectItem>
                        ))}
                      </Select>
                    </div>
                    <label htmlFor="image">Upload Image</label>
                    <input
                      className="block mb-2"
                      type="file"
                      id="image"
                      {...register("image")}
                    />

                    <div className="h-full">
                      <label>Description</label>
                      <QuillEditor
                        value={content}
                        onChange={handleEditorChange}
                        modules={quillModules}
                        formats={quillFormats}
                        className="w-full h-[70%]  bg-white"
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Discard Post
                  </Button>
                  <Button type="submit" color="primary" onPress={onClose}>
                    Post
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
