// @ts-nocheck
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */

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
import { ChangeEvent, useRef, useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/select";
import { Checkbox } from "@nextui-org/checkbox";
import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { Image } from "@nextui-org/image";

import { uploadImage } from "@/src/utils/uploadImage";
import { useEditPost } from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/user.provider";
import { categoryField } from "@/src/constant";
import { IPost } from "@/src/types";

import Loading from "../../UI/Loading";

interface EditorInstance {
  getContent: () => string;
}

export default function EditPostModal({ post }: { post: IPost }) {
  const editorRef = useRef<EditorInstance | null>(null);
  const { register, handleSubmit, setValue } = useForm();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useUser();
  const { mutate: editPost, isPending } = useEditPost();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    post?.category,
  );
  const [content, setContent] = useState<string>(post?.description || "");

  const handleEditPost: SubmitHandler<FieldValues> = async (data) => {
    let imageUrl = post.images[0];

    if (imageFiles.length) {
      const imageResponse = await uploadImage(imageFiles[0]);

      imageUrl = imageResponse?.data?.url;
    }

    const postData = {
      ...data,
      description: content || post?.description,
      images: imageUrl || post.images[0],
      author: user?._id,
      category: selectedCategory || post?.category,
      id: post._id,
    };

    await editPost(postData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file) {
      setImageFiles([file]);

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews([reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorInit: IAllProps["onInit"] = (evt, editor) => {
    editorRef.current = editor;
    if (post?.description) {
      editor.setContent(post.description);
    }
  };

  return (
    <>
      {isPending && <Loading />}
      <Button color="primary" size="sm" variant="light" onPress={onOpen}>
        Edit Post
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
            <>
              <form onSubmit={handleSubmit(handleEditPost)}>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Post
                </ModalHeader>
                <ModalBody>
                  <div className="h-full">
                    <Input
                      isRequired
                      className="w-full mb-2"
                      defaultValue={post?.title}
                      label="Title"
                      type="text"
                      {...register("title")}
                    />
                    <Textarea
                      isRequired
                      {...register("shortDescription")}
                      className="w-full mb-2"
                      defaultValue={post?.shortDescription}
                      label="Short Description"
                      placeholder="Enter your description"
                    />

                    <div className="flex gap-5">
                      <Select
                        label="Category"
                        placeholder="Select Category"
                        value={selectedCategory}
                        onChange={(value) => {
                          setSelectedCategory(value as string);
                          setValue("category", value); // Update form value
                        }}
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
                        onEditorChange={(newContent) => setContent(newContent)}
                        onInit={handleEditorInit}
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
                  <Button color="primary" type="submit" onPress={onClose}>
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
