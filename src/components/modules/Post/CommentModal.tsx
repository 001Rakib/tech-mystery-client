import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Textarea } from "@nextui-org/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useUser } from "@/src/context/user.provider";
import { useCommentONPost } from "@/src/hooks/post.hook";

import { CommentLogo } from "../../icons";

const CommentModal = ({ postId }: { postId: string }) => {
  const { user } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const { mutate: comment, isPending } = useCommentONPost();

  const handleComment: SubmitHandler<FieldValues> = (data) => {
    const commentData = {
      user: user?._id,
      comment: data.comment,
      postId: postId,
    };

    comment(commentData);
  };

  return (
    <>
      <Button isLoading={isPending} onPress={onOpen}>
        <CommentLogo />
        Comment
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(handleComment)}>
                <ModalHeader className="flex flex-col gap-1">
                  Comment
                </ModalHeader>
                <ModalBody>
                  <Textarea
                    isRequired
                    className="max-w-xs"
                    label="Comment"
                    labelPlacement="outside"
                    placeholder="Enter your comment"
                    {...register("comment")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
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
};

export default CommentModal;
