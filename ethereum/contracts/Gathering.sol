// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Gathering {

    address public manager;
    string public name;
    uint public downpayment;

    mapping(address => bool) public participants;
    uint public participantsCount;

    constructor(string memory _name, uint _downpayment) {
        manager = msg.sender;
        name = _name;
        downpayment = _downpayment;
    }

    function join() public payable {
        require(
            msg.value >= downpayment,
            "Insufficient funds to make a downpayment."
        );

        require(
            !participants[msg.sender],
            "Already registered to the gathering."
        );

        participants[msg.sender] = true;
        participantsCount++;
    }

    function isParticipant() public view returns(bool) {
        return participants[msg.sender];
    }
}
