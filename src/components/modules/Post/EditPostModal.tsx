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
import { ChangeEvent, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Input, Textarea } from "@nextui-org/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { uploadImage } from "@/src/utils/uploadImage";
import { useCreatePost, useEditPost } from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/user.provider";
import { Select, SelectItem } from "@nextui-org/select";
import { categoryField } from "@/src/constant";
import { Checkbox } from "@nextui-org/checkbox";
import Loading from "../../UI/Loading";
import { IPost } from "@/src/types";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function EditPostModal({ post }: { post: IPost }) {
  const { register, handleSubmit } = useForm();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [content, setContent] = useState("");
  const { user } = useUser();
  const { mutate: editPost, isPending } = useEditPost();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [url, setUrl] = useState("");

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

  const handleEditPost: SubmitHandler<FieldValues> = async (data) => {
    if (imageFiles.length) {
      const imageUrl = await uploadImage(imageFiles[0]);
      setUrl(imageUrl?.data.url);
    }

    const postData = {
      ...data,
      description: content,
      images: url || post.images[0],
      author: user?._id,
      category: data.category || post?.category,
      id: post._id,
    };
    await editPost(postData);
  };

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

  return (
    <>
      {isPending && <Loading />}
      <Button size="sm" color="primary" variant="light" onPress={onOpen}>
        Edit Post
      </Button>

      <Modal
        size="full"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        scrollBehavior="outside"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(handleEditPost)}>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Post
                </ModalHeader>
                <ModalBody>
                  <div className="h-full">
                    <Input
                      isRequired
                      type="text"
                      label="Title"
                      defaultValue={post?.title}
                      className="w-full mb-2"
                      {...register("title")}
                    />
                    <Textarea
                      isRequired
                      {...register("shortDescription")}
                      label="Short Description"
                      defaultValue={post?.shortDescription}
                      placeholder="Enter your description"
                      className="w-full mb-2"
                    />

                    <div className="flex gap-5">
                      <Select
                        label="Category"
                        placeholder="Select Category"
                        {...register("category")}
                      >
                        {categoryField.map((item) => (
                          <SelectItem key={item.key}>{item.label}</SelectItem>
                        ))}
                      </Select>
                    </div>
                    <label
                      className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400 mt-2"
                      htmlFor="image"
                    >
                      Upload Photo
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

                    <div className="h-full">
                      <label>Description</label>
                      <QuillEditor
                        value={post?.description || content}
                        onChange={handleEditorChange}
                        modules={quillModules}
                        formats={quillFormats}
                        className="w-full h-[70%]  bg-white"
                      />
                    </div>
                  </div>
                  <Checkbox
                    isDisabled={!user?.isPremiumMember}
                    {...register("isPremium")}
                    defaultChecked={post?.isPremium}
                    size="md"
                  >
                    Post as Premium Content (only for Premium Member)
                  </Checkbox>
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
