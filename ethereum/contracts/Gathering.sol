// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Gathering {
    enum Status {
        INITIALIZED,
        INVITATION_OPEN,
        INVITATION_CLOSED,
        REGISTRATION_OPEN,
        REGISTRATION_CLOSED,
        CLOSED
    }

    address public manager;
    string public name;
    uint256 public downpayment;
    Status public status;

    mapping(address => bool) participants;
    uint256 public participantsCount;

    constructor(string memory _name, uint256 _downpayment) {
        manager = msg.sender;
        name = _name;
        downpayment = _downpayment;
        status = Status.INITIALIZED;
    }

    function openInvitation() public managerOnly atStatus(Status.INITIALIZED) {
        status = Status.INVITATION_OPEN;
    }

    function join() public payable atStatus(Status.INVITATION_OPEN) {
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

    function closeInvitation()
        public
        managerOnly
        atStatus(Status.INVITATION_OPEN)
    {
        status = Status.INVITATION_CLOSED;
    }

    modifier managerOnly() {
        require(
            msg.sender == manager,
            "Operation is restricted to the manager only"
        );
        _;
    }

    modifier atStatus(Status _status) {
        require(
            status == _status,
            "Can't perform operation with the current status"
        );

        _;
    }
}
