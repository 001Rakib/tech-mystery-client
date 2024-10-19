import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { CommentLogo } from "../../icons";
import { Textarea } from "@nextui-org/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@/src/context/user.provider";
import { useCommentONPost, useEditComment } from "@/src/hooks/post.hook";

const EditCommentModal = ({
  commentId,
  comment,
  postId,
}: {
  commentId: string;
  comment: string;
  postId: string;
}) => {
  const { user } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const { mutate: editComment, isPending } = useEditComment();

  const handleComment: SubmitHandler<FieldValues> = (data) => {
    const commentData = {
      user: user?._id,
      comment: data.comment,
      commentId,
      postId,
    };
    editComment(commentData);
  };

  return (
    <>
      <Button
        isLoading={isPending}
        variant="light"
        size="sm"
        color="primary"
        className="px-0 py-0"
        onPress={onOpen}
      >
        Edit Comment
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(handleComment)}>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Comment
                </ModalHeader>
                <ModalBody>
                  <Textarea
                    isRequired
                    label="Comment"
                    labelPlacement="outside"
                    defaultValue={comment}
                    className="max-w-xs"
                    {...register("comment")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
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
};

export default EditCommentModal;
