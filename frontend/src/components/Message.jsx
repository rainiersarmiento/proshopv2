import React from "react";
import { Alert } from "react-bootstrap";
const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

/**
 * passing in children create passing children
 * <Message> {Children} </Message>
 */

// You can set defaultProps this way
Message.defaulProps = {
  variant: "info",
};

export default Message;
