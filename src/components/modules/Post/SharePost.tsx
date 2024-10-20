import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
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

import { ShareLogo } from "../../icons";

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
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Share</ModalHeader>
              <ModalBody>
                <div className="share-container">
                  <h3>Share this post:</h3>
                  <div className="share-buttons flex gap-2 my-2">
                    {/* Facebook Share Button */}
                    <FacebookShareButton title={postTitle} url={postUrl}>
                      <FacebookIcon round={true} size={32} />
                    </FacebookShareButton>

                    {/* Twitter Share Button */}
                    <TwitterShareButton title={postTitle} url={postUrl}>
                      <TwitterIcon round={true} size={32} />
                    </TwitterShareButton>

                    {/* LinkedIn Share Button */}
                    <LinkedinShareButton url={postUrl}>
                      <LinkedinIcon round={true} size={32} />
                    </LinkedinShareButton>

                    {/* WhatsApp Share Button */}
                    <WhatsappShareButton title={postTitle} url={postUrl}>
                      <WhatsappIcon round={true} size={32} />
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
