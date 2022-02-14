// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Gathering {

    struct Participant {
        string name;
    }

    address public manager;
    string public name;
    uint256 public downpayment;
    string public status;

    mapping(address => bool) participants;
    mapping(address => Participant) public participantsMapping;
    address[] public participantIds;
    uint16 public participantsCount;

    constructor(
        address _manager,
        string memory _name,
        uint256 _downpayment
    ) {
        manager = _manager;
        name = _name;
        downpayment = _downpayment;
        status = "INITIALIZED";
        participantsCount = 0;
    }

    function openInvitation() public managerOnly atStatus("INITIALIZED") {
        status = "INVITATION_OPEN";
    }

    function join(string memory _name) public payable atStatus("INVITATION_OPEN") {
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

        participantsMapping[msg.sender] = Participant({ name: _name });
        participantIds.push(msg.sender);
    }

    function isParticipant() public view returns (bool) {
        return participants[msg.sender];
    }

    function getParticipants() public view returns (Participant[] memory) {
        Participant[] memory results = new Participant[](participantIds.length);

        return results;
    }

    function closeInvitation() public managerOnly atStatus("INVITATION_OPEN") {
        status = "INVITATION_CLOSED";
    }

    function getDetails()
        external
        view
        returns (
            string memory,
            uint256,
            string memory,
            address,
            uint256,
            uint16
        )
    {
        return (
            name,
            downpayment,
            status,
            manager,
            address(this).balance,
            participantsCount
        );
    }


    modifier managerOnly() {
        require(
            msg.sender == manager,
            "Operation is restricted to the manager only."
        );
        _;
    }

    modifier atStatus(string memory _status) {
        require(
            keccak256(abi.encodePacked(status)) ==
                keccak256(abi.encodePacked(_status)),
            "Can't perform operation with the current status."
        );

        _;
    }
}
