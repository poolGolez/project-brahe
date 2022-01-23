// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Gathering {
    address public manager;
    string public name;
    uint256 public downpayment;
    string public status;

    mapping(address => bool) participants;
    uint256 public participantsCount;

    constructor(string memory _name, uint256 _downpayment) {
        manager = msg.sender;
        name = _name;
        downpayment = _downpayment;
        status = "INITIALIZED";
    }

    function openInvitation() public managerOnly atStatus("INITIALIZED") {
        status = "INVITATION_OPEN";
    }

    function join() public payable atStatus("INVITATION_OPEN") {
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

    function isParticipant() public view returns (bool) {
        return participants[msg.sender];
    }

    function closeInvitation() public managerOnly atStatus("INVITATION_OPEN") {
        status = "INVITATION_CLOSED";
    }

    modifier managerOnly() {
        require(
            msg.sender == manager,
            "Operation is restricted to the manager only"
        );
        _;
    }

    modifier atStatus(string memory _status) {
        require(
            keccak256(abi.encodePacked(status)) ==
                keccak256(abi.encodePacked(_status)),
            "Can't perform operation with the current status"
        );

        _;
    }
}
