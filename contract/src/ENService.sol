// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract ENService {

    error ZERO_ADDRESS_NOT_ALLOWED();
    error NAME_NOT_AVAILABLE();

    struct User {
        string name;
        string avatar;
        address address_;
    }

    event UserRegistered(address indexed _address, string indexed name);

    mapping(address => User) addressToUserInfo;

    mapping(string => address) nameToAddress;

    User[] public users;

    function createAccount(string calldata avatar, string calldata name) external {
        if(msg.sender == address(0)) {
            revert ZERO_ADDRESS_NOT_ALLOWED();
        }
        if(nameToAddress[name] != address(0)) {
            revert NAME_NOT_AVAILABLE();
        }

        nameToAddress[name] = msg.sender;

        User storage _newUserInfo = addressToUserInfo[msg.sender];
        _newUserInfo.avatar = avatar;
        _newUserInfo.name = name;
        _newUserInfo.address_ = msg.sender;

        users.push(_newUserInfo);

        emit UserRegistered(msg.sender, name);
    }

    function getUserFromAddress(
        address _address
    ) external view returns (User memory) {
        return addressToUserInfo[_address];
    }

    function getUserInfoFromName(
        string calldata _name
    ) external view returns (User memory) {
        return addressToUserInfo[nameToAddress[_name]];
    }

    function getAddressFromName(
        string calldata _name
    ) external view returns (address) {
        return nameToAddress[_name];
    }

    function usernameExist(string calldata _name) external view returns (bool) {
        return nameToAddress[_name] != address(0);
    }

    function getAllUsers() external view returns (User[] memory) {
        return users;
    }
}