// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {ENService} from "../src/ENService.sol";

contract ENServiceTest is Test {
    ENService public ensContract;

    address C = address(0xc);
    address D = address(0xd);
    address E = address(0xe);
    address ZERO_ADDRESS = address(0);


    function setUp() public {
        ensContract = new ENService();
        
        C = mkaddr("user c");
        D = mkaddr("user d");
        E = mkaddr("user e");
        
    }

    event UserRegistered(address indexed _address, string indexed name);

    function testingAccountCreation() public {
        uint userLengthBefore = ensContract.getAllUsers().length;
        assertEq(userLengthBefore, 0);

        switchSigner(C);
        ensContract.createAccount(C, "abcdefghijkabcdefghij", "kels.dev");
        switchSigner(D);
        ensContract.createAccount(D, "abcdefghijka", "ify.dev");
        switchSigner(E);
        ensContract.createAccount(E, "zxcvbnmkjgaf", "phil.dev");

        uint userLengthAfter = ensContract.getAllUsers().length;
        assertEq(userLengthAfter, 3);
        assertGt(userLengthAfter, userLengthBefore);
    }

    function testingIfAddressZero() public {
        switchSigner(ZERO_ADDRESS);
         vm.expectRevert(
            abi.encodeWithSelector(ENService.ZERO_ADDRESS_NOT_ALLOWED.selector)
        );
        ensContract.createAccount(ZERO_ADDRESS, "abcdefghijkabcdefghij", "pablo.dev");
    }

    function testingRevertIfUserExists() public {
        switchSigner(C);
        ensContract.createAccount(C, "abcdefghijkabcdefghij", "kels.dev");
        vm.expectRevert(
            abi.encodeWithSelector(ENService.NAME_NOT_AVAILABLE.selector)
        );
        ensContract.createAccount(C, "abcdefghijkabcdefghij", "kels.dev");
    }

    function testingForEventOnAccountCreation() public {
        switchSigner(C);

        vm.expectEmit(address(ensContract));
        emit UserRegistered(C, "kels.dev");

        ensContract.createAccount(C, "abcdefghijkabcdefghij", "kels.dev");
        
    }

    function testingForNameAndAddressMatching() public {
        switchSigner(C);

        ensContract.createAccount(C, "abcdefghijkabcdefghij", "kels.dev");
        
        string memory _name = ensContract.getUserFromAddress(C).name;

        assertEq(_name, "kels.dev");

        address _addr = ensContract.getAddressFromName("kels.dev");

        assertEq(_addr, C);
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
