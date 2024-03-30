// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.13;
import "./interfaces/IENService.sol";

contract Chatzone {
    IENService ensContract;

    mapping(address => uint) public msgCount;

    struct Message {
        address from;
        address to;
        string message;
    }

    Message[] public messages;

    event MessageSent(address indexed from, address indexed to, string message);

    constructor(address _ensAddress) {
        ensContract = IENService(_ensAddress);
    }

    function sendMessage(address _from, string calldata _msg, string calldata _to) external {
        address _addr = ensContract.getAddressFromName(_to);
        msgCount[_from] += 1;
        msgCount[_addr] += 1;
        messages.push(Message({from: _from, to: _addr, message: _msg}));

        emit MessageSent(_from, _addr, _msg);
    }

    function getUserMessages() external view returns (Message[] memory) {
        Message[] memory l = new Message[](msgCount[msg.sender]);
        uint _count = 0;
        for (uint i = 0; i < messages.length; i++) {
            if (
                messages[i].from == msg.sender || messages[i].to == msg.sender
            ) {
                l[_count] = messages[i];
                _count++;
            }
        }
        return l;
    }

     function getCountOfMsg() external view returns (Message[] memory) {
        return messages;
    }

    function getMessagesBetweenUsers(string calldata _name1, string calldata _name2) external view returns (Message[] memory) {

        address user1 = ensContract.getAddressFromName(_name1);
        address user2 = ensContract.getAddressFromName(_name2);
        
        Message[] memory userMessages;
        uint count = 0;

        for (uint i = 0; i < messages.length; i++) {
            if ((messages[i].from == user1 && messages[i].to == user2) || (messages[i].from == user2 && messages[i].to == user1)) {
                count++;
            }
        }

        userMessages = new Message[](count);
        count = 0;

        for (uint i = 0; i < messages.length; i++) {
            if ((messages[i].from == user1 && messages[i].to == user2) || (messages[i].from == user2 && messages[i].to == user1)) {
                userMessages[count] = messages[i];
                count++;
            }
        }

        return userMessages;
    }
}