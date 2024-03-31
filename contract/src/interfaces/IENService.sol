// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IENService{

    struct User {
        string name;
        string avatar;
        address address_;
    }

    event UserRegistered(address indexed _address, string indexed name);

function createAccount(address _from, string calldata avatar, string calldata name) external;

function getUserFromAddress(address _address) external view returns (User memory);

function getUserInfoFromName(string calldata _name) external view returns (User memory);

function getAddressFromName(string calldata _name) external view returns (address);

function usernameExist(string calldata _name) external  view returns (bool);

function getAllUsers() external view returns (User[] memory);

}