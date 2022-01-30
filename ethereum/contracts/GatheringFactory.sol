// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "./Gathering.sol";

contract GatheringFactory {
    address public manager;
    address[] public gatherings;

    constructor() {
        manager = msg.sender;
    }

    function create(string memory _name, uint256 _downpayment) public {
        address g = (address)(new Gathering(manager, _name, _downpayment));
        gatherings.push(g);
    }

    function getGatherings() public view returns (address[] memory) {
        return gatherings;
    }
}
