import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { ShareLogo } from "../../icons";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

interface PostShareProps {
  postUrl: string;
  postTitle: string;
}

const SharePost = ({ postUrl, postTitle }: PostShareProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen}>
        <ShareLogo /> Share
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Share</ModalHeader>
              <ModalBody>
                <div className="share-container">
                  <h3>Share this post:</h3>
                  <div className="share-buttons flex gap-2 my-2">
                    {/* Facebook Share Button */}
                    <FacebookShareButton url={postUrl} title={postTitle}>
                      <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>

                    {/* Twitter Share Button */}
                    <TwitterShareButton url={postUrl} title={postTitle}>
                      <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>

                    {/* LinkedIn Share Button */}
                    <LinkedinShareButton url={postUrl}>
                      <LinkedinIcon size={32} round={true} />
                    </LinkedinShareButton>

                    {/* WhatsApp Share Button */}
                    <WhatsappShareButton url={postUrl} title={postTitle}>
                      <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                  </div>
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

export default SharePost;
