// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {ENService} from "../src/ENService.sol";
import {Chatzone} from "../src/Chatzone.sol";


contract ENServiceTest is Test {
    ENService public ensContract;
    Chatzone public chatzoneContract;

    address C = address(0xc);
    address D = address(0xd);
    address E = address(0xe);
    address ZERO_ADDRESS = address(0);


    function setUp() public {
        ensContract = new ENService();
        chatzoneContract = new Chatzone(address(ensContract));
        
        C = mkaddr("user c");
        D = mkaddr("user d");
        E = mkaddr("user e");
        
    }

    event MessageSent(address indexed from, address indexed to, string message);

    function testingMessageSending() public {
        uint msgLengthBefore = chatzoneContract.getCountOfMsg().length;
        assertEq(msgLengthBefore, 0);

        switchSigner(C);
        ensContract.createAccount(C, "abcdefghijkabcdefghij", "kels.dev");
        switchSigner(D);
        ensContract.createAccount(D, "abcdefghijka", "ify.dev");

        switchSigner(C);
        chatzoneContract.sendMessage(C, "hello Ify",  "ify.dev");

        switchSigner(D);
        chatzoneContract.sendMessage(D, "hello kels",  "kels.dev");
        

        uint msgLengthAfter = chatzoneContract.getCountOfMsg().length;
        assertEq(msgLengthAfter, 2);
        assertGt(msgLengthAfter, msgLengthBefore);
    }

    function testingEventOnMsgSent() public {

        switchSigner(C);
        ensContract.createAccount(C, "abcdefghijkabcdefghij", "kels.dev");
        switchSigner(D);
        ensContract.createAccount(D, "abcdefghijka", "ify.dev");

        switchSigner(C);

        vm.expectEmit(address(chatzoneContract));

        emit MessageSent(C, D, "hello Ify");

        chatzoneContract.sendMessage(C, "hello Ify",  "ify.dev");
        
    }

    function testingGetMsgBtwTwoUsers() public {
        switchSigner(C);
        ensContract.createAccount(C, "abcdefghijkabcdefghij", "kels.dev");
        switchSigner(D);
        ensContract.createAccount(D, "abcdefghijka", "ify.dev");

        switchSigner(C);
        chatzoneContract.sendMessage(C, "hello Ify",  "ify.dev");

        switchSigner(D);
        chatzoneContract.sendMessage(D, "hello kels",  "kels.dev");

        uint num = chatzoneContract.getMessagesBetweenUsers("ify.dev", "kels.dev").length;

        assertEq(num, 2);
    }


    function mkaddr(string memory name) public returns (address) {
        address addr = address(
            uint160(uint256(keccak256(abi.encodePacked(name))))
        );
        vm.label(addr, name);
        return addr;
    }

    function switchSigner(address _newSigner) public {
        address foundrySigner = 0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38;
        if (msg.sender == foundrySigner) {
            vm.startPrank(_newSigner);
        } else {
            vm.stopPrank();
            vm.startPrank(_newSigner);
        }
    }
}
