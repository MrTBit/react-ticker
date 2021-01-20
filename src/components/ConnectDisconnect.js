import React from "react";
import {Button} from "react-bootstrap";

const ConnectDisconnect = ({socketOpen, connect, disconnect}) => {
    if (socketOpen) {
        return <Button onClick={() => disconnect()}>Disconnect</Button>
    } else {
        return <Button onClick={() => connect()}>Connect</Button>
    }
}

export default ConnectDisconnect;